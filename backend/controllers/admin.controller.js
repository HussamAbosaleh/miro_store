const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();
    const totalPaidOrders = await Order.countDocuments({ isPaid: true });

    // 🔥 حساب الإيراد بطريقة احترافية باستخدام aggregation
    const revenueData = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalPaidOrders,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

module.exports = { getAdminStats };