const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { viewLoans } = require('../controllers/loanController');

// GET /loans (View all loans for a specific user, optionally filtered by status)
router.get('/', authMiddleware, viewLoans);

module.exports = router;