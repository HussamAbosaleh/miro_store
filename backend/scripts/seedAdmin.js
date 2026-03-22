require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/user.model");

async function seedAdmin() {
  try {
   
    await connectDB();

    const hashed = await bcrypt.hash("123123123", 10);

    const user = await User.findOne({ email: "user9@test.com" });

    if (user) {
      user.password = hashed;
      user.role = "admin";
      await user.save();

      console.log("Admin updated");
    } else {
      await User.create({
        name: "Admin",
        email: "user9@test.com",
        password: hashed,
        role: "admin",
      });

      console.log("Admin created");
    }

    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

seedAdmin();