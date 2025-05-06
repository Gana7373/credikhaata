const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');

// POST /customers (Create a new customer)
router.post('/', authMiddleware, createCustomer);

// GET /customers/:id (Get customer details)
router.get('/:id', authMiddleware, getCustomer);

// PUT /customers/:id (Update customer details)
router.put('/:id', authMiddleware, updateCustomer);

// DELETE /customers/:id (Delete customer)
router.delete('/:id', authMiddleware, deleteCustomer);

module.exports = router;