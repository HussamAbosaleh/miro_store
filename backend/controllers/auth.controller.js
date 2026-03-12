const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

/* ===== Generate JWT ===== */

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

/* ===== Login User ===== */

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    /* التحقق من المدخلات */

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    /* جلب المستخدم مع كلمة المرور */

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    /* مقارنة كلمة المرور */

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    /* إنشاء التوكن */

    const role = user.role || "user";
    const token = generateToken(user._id, role);

    /* إرسال الرد */

    res.status(200).json({
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

    res.status(500).json({
      message: "Server error"
    });

  }

};

module.exports = { loginUser };