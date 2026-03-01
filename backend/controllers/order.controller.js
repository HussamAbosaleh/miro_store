const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");



// ================== CREATE ORDER ==================
const createOrder = async (req, res) => {
  try {
    const { product, size, quantity } = req.body;

    if (!product || !size || !quantity || quantity < 1) {
      return res.status(400).json({
        message: "product, size and valid quantity required",
      });
    }

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
      return res.status(400).json({
        message: "Size not available or not enough stock",
      });
    }

    const selectedSize = updatedProduct.sizes.find(
      (s) => s.size === size
    );

    const order = await Order.create({
      user: req.user._id,
      orderItems: [
        {
          product: updatedProduct._id,
          name: updatedProduct.name,
          price: updatedProduct.price,
          size,
          quantity,
        },
      ],
      totalPrice: updatedProduct.price * quantity,
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
};

// ================== GET MY ORDERS ==================
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ================== GET ORDER BY ID ==================
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// ================== GET ALL ORDERS (ADMIN) ==================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ================== MARK ORDER AS PAID ==================
const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // منع إعادة الدفع
    if (order.isPaid) {
      return res.status(400).json({ message: "Order already paid" });
    }

    // تأكد من أن الدفع مكتمل
    if (req.body.status !== "COMPLETED") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // فقط صاحب الطلب أو الأدمن
    if (
      order.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer?.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ message: "Payment update failed" });
  }
};

// ================== MARK ORDER AS DELIVERED ==================
const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.isPaid) {
      return res.status(400).json({ message: "Order not paid yet" });
    }

    if (order.isDelivered) {
      return res.status(400).json({ message: "Order already delivered" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ message: "Failed to update delivery status" });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  markOrderAsPaid,
  markOrderAsDelivered,
};
