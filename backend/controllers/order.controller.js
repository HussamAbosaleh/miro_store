const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res) => {

  try {
    const { orderItems } = req.body;
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    let totalPrice = 0;
    const finalItems = [];

      for (const item of orderItems) {
        const { product, size, quantity } = item;

        if (!product || !size || !quantity) {
          throw new Error("product, size, quantity required");
        }

        const productDoc = await Product.findById(product)

        if (!productDoc) {
          throw new Error("Product not found");
        }

        // 🔥 خصم stock بشكل atomic داخل transaction
        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: product,
            sizes: {
              $elemMatch: {
                size: size,
                stock: { $gte: quantity },
              },
            },
          },
          {
            $inc: { "sizes.$.stock": -quantity },
          },
          { new: true }
        );

        if (!updatedProduct) {
          throw new Error(`Not enough stock for size ${size}`);
        }

        finalItems.push({
          product: productDoc._id,
          name: productDoc.name,
          price: productDoc.price,
          size,
          quantity,
        });

        totalPrice += productDoc.price * quantity;
      }

      Order.create(
        [
          {
            user: req.user._id,
            orderItems: finalItems,
            totalPrice,
          },
        ],
      );


    res.status(201).json({ message: "Order created successfully" });

  } catch (error) {
    res.status(400).json({ message: error.message || "Order failed" });
  } 
};

module.exports = { createOrder };