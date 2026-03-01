const Product = require("../models/Product");
const mongoose = require("mongoose");

const ALLOWED_GENDERS = ["men", "women"];
const ALLOWED_SORTS = ["price", "-price", "newest"];

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const normalizePositiveInt = (value, fallback) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

// ================= CREATE PRODUCT (ADMIN) =================
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, gender, image } = req.body;

    if (!name || !description || !price || !category || !gender || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (price < 0) {
      return res.status(400).json({ message: "Price must be positive" });
    }

    if (!ALLOWED_GENDERS.includes(gender)) {
      return res.status(400).json({ message: "Invalid gender" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      gender,
      image,
      sizes: [],
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product" });
  }
};

// ================= GET ALL PRODUCTS =================
const getProducts = async (req, res) => {
  try {
    const page = normalizePositiveInt(req.query.page, 1);
    const limit = normalizePositiveInt(req.query.limit, 6);
    const skip = (page - 1) * limit;

    const filter = { isActive: true };

    // 🔥 Search by keyword (with trim)
    if (req.query.keyword) {
      const keyword = req.query.keyword.trim();
      filter.name = { $regex: keyword, $options: "i" };
    }

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
      if (req.query.minPrice)
        filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice)
        filter.price.$lte = Number(req.query.maxPrice);
    }

    const sortOption = {};
    if (req.query.sort && !ALLOWED_SORTS.includes(req.query.sort)) {
      return res.status(400).json({ message: "Invalid sort option" });
    }

    if (req.query.sort === "price") sortOption.price = 1;
    else if (req.query.sort === "-price") sortOption.price = -1;
    else if (req.query.sort === "newest") sortOption.createdAt = -1;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return res.json({
      page,
      pages: Math.ceil(total / limit),
      total,
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= GET SINGLE PRODUCT =================
const getProductById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= UPDATE PRODUCT =================
const updateProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, price, category, gender, image } = req.body;

    if (price !== undefined && price < 0) {
      return res.status(400).json({ message: "Price must be positive" });
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.gender = gender ?? product.gender;
    product.image = image ?? product.image;

    const updated = await product.save();
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Update failed" });
  }
};

// ================= UPDATE SIZES =================
const updateProductSizes = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const { sizes } = req.body;

    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ message: "Sizes array required" });
    }

    const sizeNames = sizes.map((s) => s.size);
    const uniqueSizes = new Set(sizeNames);

    if (uniqueSizes.size !== sizeNames.length) {
      return res.status(400).json({
        message: "Duplicate sizes are not allowed",
      });
    }

    for (const s of sizes) {
      if (!s.size || s.stock < 0) {
        return res.status(400).json({ message: "Invalid size data" });
      }
    }

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.sizes = sizes;

    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update sizes" });
  }
};

// ================= SOFT DELETE PRODUCT =================
const deleteProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.isActive = false;
    await product.save();

    return res.json({ message: "Product deactivated" });
  } catch (error) {
    return res.status(500).json({ message: "Delete failed" });
  }
};

// ================= ADD PRODUCT REVIEW =================
const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res
        .status(400)
        .json({ message: "Rating and comment required" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const Order = require("../models/Order");

    const hasPurchased = await Order.findOne({
      user: req.user._id,
      isPaid: true,
      "orderItems.product": product._id,
    });

    if (!hasPurchased) {
      return res.status(403).json({
        message: "You can review only products you have purchased",
      });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "Product already reviewed" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews += 1;
    product.rating =
      (product.rating * (product.numReviews - 1) + Number(rating)) /
      product.numReviews;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateProductSizes,
  deleteProduct,
  addProductReview,
};