const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  markOrderAsPaid,
  markOrderAsDelivered

} = require("../controllers/order.controller");

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/pay", protect, markOrderAsPaid);
router.put("/:id/deliver", protect, adminOnly, markOrderAsDelivered);

module.exports = router;