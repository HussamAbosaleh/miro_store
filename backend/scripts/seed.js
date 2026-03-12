require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const products = require("../data/products");

const seedProducts = async () => {

  try {

    // حماية من التشغيل في production
    if (process.env.NODE_ENV === "production") {
      console.log("Seeding is not allowed in production");
      process.exit(1);
    }

    await connectDB();
    console.log("MongoDB connected");

    // حذف المنتجات القديمة
    await Product.deleteMany({});
    console.log("Old products removed");

    // إدخال المنتجات الجديدة
    await Product.insertMany(products);
    console.log("Products inserted");

    await mongoose.connection.close();
    console.log("Database connection closed");

    process.exit(0);

  } catch (error) {

    console.error("Seeding failed:", error);

    await mongoose.connection.close();

    process.exit(1);

  }

};

seedProducts();