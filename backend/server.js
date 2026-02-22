require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const healthRoutes = require("./routes/health.routes");

const app = express();
const PORT = process.env.PORT || 5000;

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

const productRoutes = require("./routes/product.routes");


if (missingEnvVars.length) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
  process.exit(1);
}

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use("/api/products", productRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
