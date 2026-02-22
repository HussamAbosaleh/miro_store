const Product = require("../models/Product");

// ================= CREATE PRODUCT =================
const createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 مهم
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log("ERROR:", error); // 👈 مهم جداً
    res.status(400).json({ message: "Invalid product data" });
  }
};

// ================= GET ALL PRODUCTS =================
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// ================= GET SINGLE PRODUCT =================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};

// ================= UPDATE PRODUCT =================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
};

// ================= DELETE PRODUCT =================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};