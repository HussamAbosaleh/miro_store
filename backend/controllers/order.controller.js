const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/cart");



// ================== انشاء طلب ==================
const createOrder = async (req, res) => {
  try {

    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No order items"
      });
    }

    let orderItems = [];
    let totalPrice = 0;

    for (const item of items) {

      if (
        !item.product ||
        !item.size ||
        !item.quantity ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          message: "Invalid order item"
        });
      }

      const product = await Product.findOneAndUpdate(
        {
          _id: item.product,
          sizes: {
            $elemMatch: {
              size: item.size,
              stock: { $gte: item.quantity }
            }
          }
        },
        {
          $inc: { "sizes.$.stock": -item.quantity }
        },
        { new: true }
      );

      if (!product) {
        return res.status(400).json({
          message: "Size not available or not enough stock"
        });
      }


// ================== اضافة عنصر للطلب ==================

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        size: item.size,
        quantity: item.quantity
      });

      totalPrice += product.price * item.quantity;
    }
// ================== اضافة للطلب ==================
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice
    });

    // تفريغ السلة بعد الشراء
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: "Order failed"
    });

  }
};



// ================== جلب الطلبات ==================
const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }
};



// ================= جلب طلب بالمعرف ==================
const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (
      order.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch order"
    });

  }
};



// ================== (جلب جميع الطلبات (ادمن)) ==================
const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }
};



// ================== تعيين طلب كمدفوع ==================
const markOrderAsPaid = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (order.isPaid) {
      return res.status(400).json({
        message: "Order already paid"
      });
    }

    if (req.body.status !== "COMPLETED") {
      return res.status(400).json({
        message: "Payment not completed"
      });
    }

    if (
      order.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer?.email_address
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {

    res.status(500).json({
      message: "Payment update failed"
    });

  }
};



// ==================  تعيين طلب كمُسلَّم ==================
const markOrderAsDelivered = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (!order.isPaid) {
      return res.status(400).json({
        message: "Order not paid yet"
      });
    }

    if (order.isDelivered) {
      return res.status(400).json({
        message: "Order already delivered"
      });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update delivery status"
    });

  }
};



module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  markOrderAsPaid,
  markOrderAsDelivered
};