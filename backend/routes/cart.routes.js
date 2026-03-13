const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const {
  addToCart,
  getMyCart,
  updateCartItem,
  removeFromCart
} = require("../controllers/cart.controller");

// جلب سلة المستخدم الحالية
router.get("/my", protect, getMyCart);

// اضافة منتج إلى السلة
router.post("/add", protect, addToCart);

// تحديث كمية منتج في السلة
router.put("/update", protect, updateCartItem);

// حذف منتج من السلة
router.delete("/remove", protect, removeFromCart);

module.exports = router;