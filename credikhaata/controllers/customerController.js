const Customer = require('../credikhaata/models/customerModel');
const validateCustomer = require('../middleware/validateCustomer');

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, phone, address, trustScore } = req.body;

    // Validate customer data
    const { error } = validateCustomer({ name, phone, address, trustScore });
    if (error) {
      return res.status(400).json({ message: error.details.map(e => e.message).join(', ') });
    }

    const userId = req.user.userId;

    // Create a new customer record, associating it with the logged-in user
    const customer = await Customer.create({
      user: userId, // Store the user ID of the logged-in user
      name,
      phone,
      address,
      trustScore,
    });

    res.status(201).json({
      message: 'Customer created successfully',
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get customer details by ID
const getCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const userId = req.user.userId;

    // Find the customer by ID and ensure it belongs to the logged-in user
    const customer = await Customer.findOne({ _id: customerId, user: userId });

    if (!customer) {
      return res.status(403).json({ message: 'You are not authorized to access this customer' });
    }

    res.status(200).json({
      message: 'Customer details fetched successfully',
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update customer details
const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { name, phone, address, trustScore } = req.body;
    const userId = req.user.userId;

    // Validate customer data
    const { error } = validateCustomer({ name, phone, address, trustScore });
    if (error) {
      return res.status(400).json({ message: error.details.map(e => e.message).join(', ') });
    }

    // Find the customer and ensure it belongs to the logged-in user
    const customer = await Customer.findOne({ _id: customerId, user: userId });

    if (!customer) {
      return res.status(403).json({ message: 'You are not authorized to update this customer' });
    }

    // Update the customer data
    customer.name = name || customer.name;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;
    customer.trustScore = trustScore || customer.trustScore;

    await customer.save();

    res.status(200).json({
      message: 'Customer updated successfully',
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const userId = req.user.userId;

    // Find the customer and ensure it belongs to the logged-in user
    const customer = await Customer.findOneAndDelete({ _id: customerId, user: userId });

    if (!customer) {
      return res.status(403).json({ message: 'You are not authorized to delete this customer' });
    }

    res.status(200).json({
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};