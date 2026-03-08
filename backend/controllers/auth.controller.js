const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

/* ===== Generate JWT ===== */

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

/* ===== Login User ===== */

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    /* تحقق من المدخلات */

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

    /* تأكد أن password موجود */

    if (!user.password) {
      return res.status(500).json({
        message: "User password missing in database"
      });
    }

    /* مقارنة كلمة المرور */

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    /* إرسال الرد */

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token: generateToken(user._id)
    });

  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({
      message: "Login failed"
    });

  }

};

module.exports = { loginUser };