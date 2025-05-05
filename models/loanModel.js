const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // The loan is associated with a customer
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
  }
}, { timestamps: true });

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;