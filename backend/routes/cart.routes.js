const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const {
  addToCart,
  getMyCart,
  updateCartItem,
  removeFromCart
} = require("../controllers/cart.controller");

// get user cart
router.get("/my", protect, getMyCart);

// add item
router.post("/add", protect, addToCart);

// update quantity
router.put("/update", protect, updateCartItem);

// remove item
router.delete("/remove", protect, removeFromCart);

module.exports = router;