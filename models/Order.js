const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  clientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
