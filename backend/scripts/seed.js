require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const products = require("../data/products");

const seedProducts = async () => {
  try {
    // 🔥 حماية من التشغيل في production
    if (process.env.NODE_ENV === "production") {
      console.log("Seeding is not allowed in production");
      process.exit();
    }

    await connectDB();

    console.log("Connected to DB");

    // حذف كل المنتجات (للتطوير فقط)
    await Product.deleteMany();
    console.log("All products deleted");

    // إدخال البيانات الجديدة
    await Product.insertMany(products);
    console.log("Products inserted successfully");

    await mongoose.connection.close();
    console.log("Database connection closed");

    process.exit();

  } catch (error) {
    console.error("Seeding failed:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedProducts();