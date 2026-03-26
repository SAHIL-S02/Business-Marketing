require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('../config/db');
const orderRoutes = require('../routes/orderRoutes');
const authRoutes = require('../routes/authRoutes');

const app = express();

// Connect to MongoDB using the globally cached connection handler
connectDB();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://your-project.vercel.app' // Replace with actual deployed project vercel.app
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Main Root Ping Route (Required for Vercel cold-boot health checks)
app.get('/api', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Vercel Serverless Backend Active' });
});

// Primary Routes
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Export for Vercel Serverless (Omit app.listen() strictly!)
module.exports = app;
