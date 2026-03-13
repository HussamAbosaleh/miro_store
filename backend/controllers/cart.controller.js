const Cart = require("../models/cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");


// ================= اضافة إلى السلة =================
const addToCart = async (req, res) => {

try {

const { productId, size, quantity } = req.body;

const pid = String(productId);

if (!mongoose.Types.ObjectId.isValid(pid)) {
return res.status(400).json({ message: "Invalid productId" });
}

if (!size) {
return res.status(400).json({ message: "Size is required" });
}

const qty = Number(quantity);

if (!Number.isInteger(qty) || qty < 1) {
return res.status(400).json({ message: "Quantity must be >= 1" });
}

const product = await Product.findById(pid);

if (!product || product.isActive === false) {
return res.status(404).json({ message: "Product not found" });
}

const sizeObj = product.sizes?.find(s => s.size === size);

if (!sizeObj) {
return res.status(400).json({ message: "Size not available" });
}

let cart = await Cart.findOne({ user: req.user._id });

if (!cart) {
cart = await Cart.create({
user: req.user._id,
items: []
});
}

const existingIndex = cart.items.findIndex(it =>
String(it.product) === pid && it.size === size
);

const image = product.images?.[0] || "/uploads/products/default.png";


if (existingIndex >= 0) {

const newQty = cart.items[existingIndex].quantity + qty;

if (newQty > sizeObj.stock) {
return res.status(400).json({ message: "Not enough stock" });
}

cart.items[existingIndex].quantity = newQty;

} else {

if (qty > sizeObj.stock) {
return res.status(400).json({ message: "Not enough stock" });
}

cart.items.push({
product: product._id,
name: product.name,
price: product.price,
image,
size,
quantity: qty
});

}

await cart.save();

const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
"items.product",
"name price images sizes"
);

res.json(updatedCart);

} catch (error) {

res.status(500).json({ message: "Failed to add to cart" });

}

};



// ================= جلب السلة =================
const getMyCart = async (req, res) => {

try {

const cart = await Cart.findOne({
user: req.user._id
}).populate("items.product", "name price images sizes");

if (!cart) {
return res.json({
user: req.user._id,
items: []
});
}

res.json(cart);

} catch {

res.status(500).json({
message: "Failed to fetch cart"
});

}

};



// ================= تعديل عنصر السلة =================
const updateCartItem = async (req, res) => {

try {

const { productId, size, quantity } = req.body;

const pid = String(productId);
const qty = Number(quantity);

if (!Number.isInteger(qty) || qty < 1) {
return res.status(400).json({
message: "Quantity must be >= 1"
});
}

const cart = await Cart.findOne({ user: req.user._id });

if (!cart) {
return res.status(404).json({
message: "Cart not found"
});
}

const item = cart.items.find(it =>
String(it.product) === pid && it.size === size
);

if (!item) {
return res.status(404).json({
message: "Item not found in cart"
});
}

//=================* تحقق من المخزون *=================

const product = await Product.findById(pid);
const sizeObj = product.sizes?.find(s => s.size === size);

if (!sizeObj || qty > sizeObj.stock) {
return res.status(400).json({
message: "Not enough stock"
});
}

item.quantity = qty;

await cart.save();

const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
"items.product",
"name price images sizes"
);

res.json(updatedCart);

} catch {

res.status(500).json({
message: "Failed to update cart"
});

}

};



// ================= حذف من السلة =================
const removeFromCart = async (req, res) => {

try {

const { productId, size } = req.body;

const pid = String(productId);

const cart = await Cart.findOne({
user: req.user._id
});

if (!cart) {
return res.status(404).json({
message: "Cart not found"
});
}

cart.items = cart.items.filter(item =>
!(String(item.product) === pid && item.size === size)
);

await cart.save();

const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
"items.product",
"name price images sizes"
);

res.json(updatedCart);

} catch {

res.status(500).json({
message: "Failed to remove item"
});

}

};



module.exports = {
addToCart,
getMyCart,
updateCartItem,
removeFromCart
};