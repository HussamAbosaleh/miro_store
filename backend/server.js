const express = require("express");
const healthRoutes = require("./routes/health.routes");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/health", healthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});