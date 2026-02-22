const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    enum: ["S", "M", "L", "XL", "XXL"],
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["men", "women"],
    },
    image: {
      type: String,
      required: true,
    },
    sizes: [sizeSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);