const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/Product");
const connectDB = require("../config/db");

const addReviews = async () => {
 try {

  await connectDB();

  const products = await Product.find();

  for (let product of products) {

   product.reviews = [
    {
     user: new mongoose.Types.ObjectId(),
     name: "John",
     rating: 5,
     comment: "Amazing product!"
    },
    {
     user: new mongoose.Types.ObjectId(),
     name: "Sarah",
     rating: 4,
     comment: "Very good quality"
    }
   ];

   product.numReviews = product.reviews.length;

   product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

   await product.save();
  }

  console.log("Reviews added successfully ⭐");

  process.exit();

 } catch (error) {
  console.error(error);
  process.exit(1);
 }
};

addReviews();