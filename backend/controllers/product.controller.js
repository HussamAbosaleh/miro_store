const Product = require("../models/Product");
const mongoose = require("mongoose");

const ALLOWED_GENDERS = ["men", "women"];
const ALLOWED_SORTS = ["price", "-price", "newest"];

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const normalizePositiveInt = (value, fallback) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

// ================= CREATE PRODUCT =================
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Invalid product data" });
  }
};

// ================= GET ALL PRODUCTS (WITH PAGINATION) =================
const getProducts = async (req, res) => {
  try {
    const page = normalizePositiveInt(req.query.page, 1);
    const limit = normalizePositiveInt(req.query.limit, 5);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.gender) {
      if (!ALLOWED_GENDERS.includes(req.query.gender)) {
        return res.status(400).json({ message: "Invalid gender filter" });
      }
      filter.gender = req.query.gender;
    }

    const sortOption = {};
    if (req.query.sort && !ALLOWED_SORTS.includes(req.query.sort)) {
      return res.status(400).json({ message: "Invalid sort option" });
    }

    if (req.query.sort === "price") {
      sortOption.price = 1;
    } else if (req.query.sort === "-price") {
      sortOption.price = -1;
    } else if (req.query.sort === "newest") {
      sortOption.createdAt = -1;
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort(sortOption).skip(skip).limit(limit);

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
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(id);
    if (!product) {
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
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.gender = req.body.gender ?? product.gender;
    product.image = req.body.image ?? product.image;
    product.sizes = req.body.sizes ?? product.sizes;

    const updatedProduct = await product.save();
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Invalid product data" });
  }
};

// ================= UPDATE STOCK ONLY =================
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, stock } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    if (!size || typeof size !== "string") {
      return res.status(400).json({ message: "Size is required" });
    }

    if (!Number.isInteger(stock)) {
      return res.status(400).json({ message: "Stock must be an integer number" });
    }

    if (stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const sizeItem = product.sizes.find((s) => s.size === size);
    if (!sizeItem) {
      return res.status(404).json({ message: "Size not found" });
    }

    sizeItem.stock = stock;
    await product.save();

    return res.json({ message: "Stock updated successfully", product });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= DELETE PRODUCT =================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
};