const path = require("path");
// Point to the config/.env file which the user is actively editing
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS (IMPORTANT for deployment)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// --- MONOLITHIC RENDER: SERVE COMPILED REACT FRONTEND ---
// path is already required at the top

// Safely bypasses the API and points every request explicitly to the Vite compiled JS/CSS objects
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
// --------------------------------------------------------
// Database Connection
const startServer = async () => {
  try {
    // Connect to actual MongoDB rather than in-memory
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is not defined in the environment.');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

startServer();
