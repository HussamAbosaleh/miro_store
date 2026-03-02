const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { addToCart, getMyCart } = require("../controllers/cart.controller");

router.get("/my", protect, getMyCart);
router.post("/add", protect, addToCart);

module.exports = router;