const express = require("express");
const router = express.Router();

const { loginUser, forgotPassword } = require("../controllers/auth.controller");

/* LOGIN */

router.post("/login", loginUser);

/* FORGOT PASSWORD */

router.post("/forgot-password", forgotPassword);

module.exports = router;