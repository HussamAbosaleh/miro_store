const express = require("express");
const router = express.Router();

const {
registerUser,
loginUser,
forgotPassword,
resetPassword
} = require("../controllers/user.controller");

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");


// --------------------
// AUTH ROUTES
// --------------------

router.post("/register", registerUser);
router.post("/login", loginUser);


// --------------------
// PASSWORD RESET
// --------------------

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


// --------------------
// USER PROFILE
// --------------------

router.get("/profile", protect, (req, res) => {
res.json(req.user);
});


// --------------------
// ADMIN TEST ROUTE
// --------------------

router.get("/admin-test", protect, adminOnly, (req, res) => {
res.json({ message: "Welcome Admin" });
});


module.exports = router;