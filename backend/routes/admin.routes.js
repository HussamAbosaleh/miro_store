const express = require("express");
const router = express.Router();

/* ================= CONTROLLERS ================= */

const {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser
} = require("../controllers/admin.controller");

/* ================= MIDDLEWARE ================= */

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

/* ================= ADMIN STATS ================= */

router.get("/stats", protect, adminOnly, getAdminStats);

/* ================= USERS ================= */

/* get all users */

router.get("/users", protect, adminOnly, getAllUsers);

/* update user role */

router.put("/users/:id/role", protect, adminOnly, updateUserRole);

/* delete user */

router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;