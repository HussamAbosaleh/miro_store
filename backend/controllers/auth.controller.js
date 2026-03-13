const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");

/* =========== انشاء توكن لتسجيل الدخول ========== */

const generateToken = (id, role) => {

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

};


/* ========== تسجيل الدخول ========== */
const loginUser = async (req, res) => {

  try {

    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    email = email.trim().toLowerCase();

    const user = await User
      .findOne({ email })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const role = user.role || "user";

    const token = generateToken(
      user._id,
      role
    );

    return res.status(200).json({

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role
      },

      token

    });

  } catch (error) {

    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error"
    });

  }

};


/* =========== نسيان كلمة المرور ============= */

const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    console.log("Forgot password request:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000;

    await user.save();

    const resetLink =
      `http://localhost:5173/reset-password/${resetToken}`;

    console.log("RESET LINK:");
    console.log(resetLink);

    res.json({
      message: "Reset link generated"
    });

  } catch (error) {

    console.error("Forgot password error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


module.exports = {
  loginUser,
  forgotPassword
};