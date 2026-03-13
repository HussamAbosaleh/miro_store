const mongoose = require("mongoose");

// ================= عناصر سلة التسوق =================

const cartItemSchema = new mongoose.Schema(
{
product: {
type: mongoose.Schema.Types.ObjectId,
ref: "Product",
required: true,
},

name: {
type: String,
required: true, // snapshot
},

price: {
type: Number,
required: true, // snapshot
},

image: {
type: String,
required: true, // snapshot
},

size: {
type: String,
required: true,
},

quantity: {
type: Number,
required: true,
min: 1,
default: 1,
},
},
{ _id: false }
);


// ================= سلة التسوق =================

const cartSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
unique: true, // سلة واحدة لكل مستخدم
index: true,
},

items: {
type: [cartItemSchema],
default: [],
},
},
{
timestamps: true,
}
);


// ================= EXPORT =================

module.exports = mongoose.model("Cart", cartSchema);