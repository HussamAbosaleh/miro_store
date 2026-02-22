require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email:"hussamabosaleh@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456789", salt);

    const admin = await User.create({
      name: "mohamed hussam abosaleh",
      email: "hussamabosaleh@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully:");
    console.log(admin);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();