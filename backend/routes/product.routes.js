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

/* ================= الجميع ================= */

router.get("/", getProducts);
router.get("/:id", getProductById);

/* ================= الادمن ================= */

/* اضافة منتج */

router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),
  createProduct
);

/* تحديث المنتج */

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("images", 5),
  updateProduct
);

/* حذف المنتج */

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

/* ================= مخطط المراجعات ================= */

router.post(
  "/:id/reviews",
  protect,
  addProductReview
);

module.exports = router;