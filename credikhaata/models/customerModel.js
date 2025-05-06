const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  trustScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;