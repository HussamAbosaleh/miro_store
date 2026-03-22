require("dotenv").config(); 

const User = require("../models/User");
const connectDB = require("../config/db");
const bcrypt = require("bcryptjs");

async function seedAdmin() {
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
      role: "admin"
    });

    console.log("Admin created");
  }

  process.exit();
}

seedAdmin();