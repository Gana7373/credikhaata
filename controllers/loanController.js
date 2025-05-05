const Loan = require('../models/loanModel');
const Customer = require('../models/customerModel');

// View all loans for the logged-in user with optional status filter
const viewLoans = async (req, res) => {
  try {
    const userId = req.user.userId;  // Extract userId from JWT token (authMiddleware)
    const { status } = req.query;  // Optionally filter by status

    // Build filter criteria
    let filter = { user: userId };

    if (status) {
      filter.status = status; // Add status filter if provided
    }

    // Fetch loans from database for the logged-in user, optionally filtered by status
    const loans = await Loan.find(filter)
      .populate('customer', 'name phone trustScore')  // Populate customer details
      .exec();

    if (loans.length === 0) {
      return res.status(404).json({ message: 'No loans found for this user' });
    }

    res.status(200).json({
      message: 'Loans retrieved successfully',
      loans,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  viewLoans,
};