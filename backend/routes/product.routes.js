const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock
} = require("../controllers/product.controller");


const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

// ================= PUBLIC ROUTES =================
router.get("/", getProducts);
router.get("/:id", getProductById);

// ================= ADMIN ROUTES =================
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// 🔥 تحديث المخزون فقط
router.patch("/:id/stock", protect, adminOnly, updateStock);

module.exports = router;