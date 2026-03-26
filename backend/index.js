require("dotenv").config();
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

const { MongoMemoryServer } = require('mongodb-memory-server');

// Database Connection
const startServer = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    console.log('In-memory MongoDB Connected successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

startServer();