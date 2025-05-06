const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');  // Assuming you have a user model

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];  // Get token from Authorization header

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret

    // Attach user info to the request object
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

module.exports = authMiddleware;
