const Product = require("../models/Product");
const mongoose = require("mongoose");

const ALLOWED_GENDERS = ["men", "women"];
const ALLOWED_SORTS = ["price", "-price", "newest"];

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const normalizePositiveInt = (value, fallback) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};


/* ================= إنشاء منتج ================= */

const createProduct = async (req, res) => {

  try {

    const { name, description, price, category, gender } = req.body;

    if (!name || !description || !price || !category || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (Number(price) < 0) {
      return res.status(400).json({ message: "Price must be positive" });
    }

    if (!ALLOWED_GENDERS.includes(gender)) {
      return res.status(400).json({ message: "Invalid gender" });
    }

    /* IMAGES */

    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map(file => `/uploads/products/${file.filename}`);
    }

    /* SIZES */

    const sizes = [
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" }
    ];

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      gender,
      images,
      sizes,
      isActive: true
    });

    res.status(201).json(product);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Failed to create product" });

  }

};


/* ================= جلب المنتجات ================= */

const getProducts = async (req, res) => {

  try {

    const page = normalizePositiveInt(req.query.page, 1);
    const limit = normalizePositiveInt(req.query.limit, 25);
    const skip = (page - 1) * limit;

    const filter = { };

    /* SEARCH */

    if (req.query.keyword) {
      filter.name = {
        $regex: req.query.keyword.trim(),
        $options: "i"
      };
    }

    /* FILTERS */

    if (req.query.gender) {

      if (!ALLOWED_GENDERS.includes(req.query.gender)) {
        return res.status(400).json({ message: "Invalid gender filter" });
      }

      filter.gender = req.query.gender;

    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {

      filter.price = {};

      if (req.query.minPrice) {
        filter.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        filter.price.$lte = Number(req.query.maxPrice);
      }

    }

    /* SORT */

    const sortOption = {};

    if (req.query.sort) {

      if (!ALLOWED_SORTS.includes(req.query.sort)) {
        return res.status(400).json({ message: "Invalid sort option" });
      }

      if (req.query.sort === "price") sortOption.price = 1;
      if (req.query.sort === "-price") sortOption.price = -1;
      if (req.query.sort === "newest") sortOption.createdAt = -1;

    }

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      pages: Math.ceil(total / limit),
      total,
      products
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};


/* ================= جلب منتج بالمعرف ================= */

const getProductById = async (req, res) => {

  try {

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};


/* ================= تحديث المنتج ================= */

const updateProduct = async (req, res) => {

  try {

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description, price, category, gender } = req.body;

    if (price !== undefined && Number(price) < 0) {
      return res.status(400).json({ message: "Price must be positive" });
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.gender = gender ?? product.gender;

    /* UPDATE IMAGES */

    if (req.files && req.files.length > 0) {
      product.images = req.files.map(file => `/uploads/products/${file.filename}`);
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Update failed" });

  }

};


/* ================= حذف المنتج ================= */

const deleteProduct = async (req, res) => {

  try {

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isActive = false;

    await product.save();

    res.json({ message: "Product deactivated" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Delete failed" });

  }

};


/* ================= إضافة تقييم ================= */

const addProductReview = async (req, res) => {

  try {

    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment required" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const Order = require("../models/Order");

    const hasPurchased = await Order.findOne({
      user: req.user._id,
      isPaid: true,
      "orderItems.product": product._id
    });

    if (!hasPurchased) {
      return res.status(403).json({
        message: "You can review only products you have purchased"
      });
    }

    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "Product already reviewed"
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.numReviews += 1;

    product.rating =
      (product.rating * (product.numReviews - 1) + Number(rating)) /
      product.numReviews;

    await product.save();

    res.status(201).json({ message: "Review added" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Failed to add review" });

  }

};


module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProductReview
};