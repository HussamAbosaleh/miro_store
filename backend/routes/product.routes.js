const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProductReview
} = require("../controllers/product.controller");

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

const upload = require("../middleware/upload");

/* ================= PUBLIC ================= */

router.get("/", getProducts);
router.get("/:id", getProductById);

/* ================= ADMIN ================= */

/* CREATE PRODUCT */

router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),
  createProduct
);

/* UPDATE PRODUCT */

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("images", 5),
  updateProduct
);

/* DELETE PRODUCT */

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

/* ================= REVIEWS ================= */

router.post(
  "/:id/reviews",
  protect,
  addProductReview
);

module.exports = router;