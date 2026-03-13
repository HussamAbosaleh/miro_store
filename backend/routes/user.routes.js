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
// التحقق من صحة تسجيل الدخول
// --------------------

router.post("/register", registerUser);
router.post("/login", loginUser);


// --------------------
// استعادة كلمة المرور
// --------------------

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


// --------------------
// بروفايل المستخدم
// --------------------

router.get("/profile", protect, (req, res) => {
res.json(req.user);
});


// --------------------
// اختبار صلاحيات الادمن
// --------------------

router.get("/admin-test", protect, adminOnly, (req, res) => {
res.json({ message: "Welcome Admin" });
});


module.exports = router;