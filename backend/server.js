require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});