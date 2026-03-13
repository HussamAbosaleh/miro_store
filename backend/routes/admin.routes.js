const express = require("express");
const router = express.Router();

/* ================= وحدة الإدارة ================= */

const {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser
} = require("../controllers/admin.controller");

/* ================= البرمجة ================= */

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

/* ==============احصائيات الادمن  ================= */

router.get("/stats", protect, adminOnly, getAdminStats);

/* ================= مخطط المستخدمين ================= */

/* get all users */

router.get("/users", protect, adminOnly, getAllUsers);

/* update user role */

router.put("/users/:id/role", protect, adminOnly, updateUserRole);

/* delete user */

router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;