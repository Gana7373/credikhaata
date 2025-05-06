const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getLoanSummary, getOverdueCustomers } = require('../controllers/loanController');

// Loan summary
router.get('/summary', authMiddleware, getLoanSummary);

// Overdue loans
router.get('/overdue', authMiddleware, getOverdueCustomers);

module.exports = router;