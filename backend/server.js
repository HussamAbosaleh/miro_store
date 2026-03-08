const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const healthRoutes = require("./routes/health.routes");

const app = express();

const PORT = process.env.PORT || 5000;

/* ================= ENV CHECK ================= */

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter(
(key) => !process.env[key]
);

if (missingEnvVars.length) {
console.error(
`Missing required environment variables: ${missingEnvVars.join(", ")}`
);
process.exit(1);
}

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */

connectDB();

/* ================= STATIC FILES ================= */

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
res.send("Backend is running");
});

/* ================= PAYPAL CONFIG ================= */

app.get("/api/config/paypal", (req, res) => {
res.send(process.env.PAYPAL_CLIENT_ID);
});

/* ================= API ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/health", healthRoutes);

/* ================= ERROR HANDLER ================= */

app.use((req, res) => {
res.status(404).json({
message: "Route not found",
});
});

/* ================= SERVER ================= */

app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});