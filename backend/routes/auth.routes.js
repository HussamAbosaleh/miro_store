const express = require("express");
const router = express.Router();

const { loginUser, forgotPassword } = require("../controllers/auth.controller");

/* تسجيل الدخول */

router.post("/login", loginUser);

/* نسيت كلمة المرور */

router.post("/forgot-password", forgotPassword);

module.exports = router;