const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../authMiddleware');

// POST /register
router.post('/register', registerUser);

// POST /login
router.post('/login', loginUser);

// GET /profile (Protected route)
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Profile data',
    user: {
      userId: req.user.userId,
    },
  });
});

module.exports = router;