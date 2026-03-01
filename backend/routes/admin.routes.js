const express = require("express");
const router = express.Router();

const { getAdminStats } = require("../controllers/admin.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

router.get("/stats", protect, adminOnly, getAdminStats);

module.exports = router;