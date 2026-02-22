const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");





router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

router.get("/admin-test", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});




module.exports = router;