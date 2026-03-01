const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateProductSizes,
  deleteProduct,
  addProductReview,
} = require("../controllers/product.controller");

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

// PUBLIC
router.get("/", getProducts);
router.get("/:id", getProductById);

// ADMIN
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.put("/:id/sizes", protect, adminOnly, updateProductSizes);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.post("/:id/reviews", protect, addProductReview);

module.exports = router;