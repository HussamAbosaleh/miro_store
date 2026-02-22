const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");





router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});




module.exports = router;