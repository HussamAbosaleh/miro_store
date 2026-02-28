const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("Database connection failed ❌");
    console.error("Reason:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;