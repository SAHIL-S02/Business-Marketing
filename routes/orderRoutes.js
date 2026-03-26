const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { clientName, email, businessName, serviceType, budget, message } = req.body;
    
    if (!clientName || !email || !businessName || !serviceType) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newOrder = new Order({
      userId: req.user._id,
      clientName,
      email,
      businessName,
      serviceType,
      budget,
      message
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/orders/my
// @desc    Get logged in user orders
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    // Populate user info if desired: .populate('userId', 'id name email')
    const orders = await Order.find().populate('userId', 'id name email').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
