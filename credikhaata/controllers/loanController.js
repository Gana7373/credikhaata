const Loan = require('../models/loanModel');
const Customer = require('../models/customerModel');
const { isAfter, parseISO, differenceInDays } = require('date-fns');

// /summary route
const getLoanSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    const loans = await Loan.find({ user: userId });

    let totalLoaned = 0;
    let totalCollected = 0;
    let overdueAmount = 0;
    let totalRepaymentDays = 0;
    let paidLoanCount = 0;

    for (const loan of loans) {
      // Auto-tag overdue
      if (loan.status !== 'paid' && isAfter(new Date(), loan.endDate)) {
        loan.status = 'overdue';
        await loan.save();
      }

      totalLoaned += loan.amount;
      totalCollected += loan.totalPaid;

      if (loan.status === 'overdue') {
        overdueAmount += (loan.amount - loan.totalPaid);
      }

      if (loan.status === 'paid') {
        const start = loan.startDate;
        const lastRepayment = loan.repayments.at(-1)?.date;
        if (lastRepayment) {
          totalRepaymentDays += differenceInDays(new Date(lastRepayment), new Date(start));
          paidLoanCount++;
        }
      }
    }

    const averageRepaymentTime = paidLoanCount > 0
      ? (totalRepaymentDays / paidLoanCount).toFixed(2)
      : 0;

    res.status(200).json({
      totalLoaned,
      totalCollected,
      overdueAmount,
      averageRepaymentTime
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan summary', error: error.message });
  }
};

// /overdue route
const getOverdueCustomers = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find overdue loans for the current user
    const overdueLoans = await Loan.find({
      user: userId,
      status: { $ne: 'paid' },
      endDate: { $lt: new Date() }
    }).populate('customer');

    // Auto-tag them as overdue
    for (const loan of overdueLoans) {
      if (loan.status !== 'paid') {
        loan.status = 'overdue';
        await loan.save();
      }
    }

    const customersWithOverdues = overdueLoans.map(loan => ({
      customerName: loan.customer.name,
      phone: loan.customer.phone,
      loanAmount: loan.amount,
      paid: loan.totalPaid,
      dueDate: loan.endDate,
      status: loan.status
    }));

    res.status(200).json(customersWithOverdues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching overdue loans', error: error.message });
  }
};

module.exports = {
  getLoanSummary,
  getOverdueCustomers
};