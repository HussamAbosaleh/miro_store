const Cart = require("../models/cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    if (!size || typeof size !== "string") {
      return res.status(400).json({ message: "Size is required" });
    }

    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({ message: "Quantity must be >= 1" });
    }

    const product = await Product.findById(productId);
    if (!product || product.isActive === false) {
      return res.status(404).json({ message: "Product not found" });
    }

    // تحقق من توفر المقاس
    const sizeObj = product.sizes?.find((s) => s.size === size);
    if (!sizeObj) {
      return res.status(400).json({ message: "Size not available" });
    }

    // احضر أو أنشئ سلة
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    // تحقق إذا المنتج + المقاس موجودين مسبقاً
    const existingIndex = cart.items.findIndex(
      (it) =>
        it.product.toString() === productId &&
        it.size === size
    );

    const image =
      product.images?.[0] || "/uploads/products/default.png";

    if (existingIndex >= 0) {
      const currentQty = cart.items[existingIndex].quantity;
      const newQty = currentQty + qty;

      // 🔥 التحقق الصحيح من stock
      if (newQty > sizeObj.stock) {
        return res
          .status(400)
          .json({ message: "Not enough stock" });
      }

      cart.items[existingIndex].quantity = newQty;
    } else {
      // تحقق من stock في حالة إضافة جديدة
      if (qty > sizeObj.stock) {
        return res
          .status(400)
          .json({ message: "Not enough stock" });
      }

      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image,
        size,
        quantity: qty,
      });
    }

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

// ================= GET MY CART =================
const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product", "name price images sizes");

    if (!cart) {
      return res.json({
        user: req.user._id,
        items: [],
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart",
    });
  }
};

module.exports = {
  addToCart,
  getMyCart,
};