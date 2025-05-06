const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const loanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'paid', 'overdue'],
    default: 'pending'
  },
  loanType: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  repayments: [repaymentSchema],  // Track individual repayments
  totalPaid: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan; 