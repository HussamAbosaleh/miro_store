const cors = require("cors");
require("dotenv").config();
const path = require("path");
console.log("loaded mongo_uri:", process.env.MONGO_URI);
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const healthRoutes = require("./routes/health.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
  process.exit(1);
}


connectDB();

// PayPal config endpoint
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
