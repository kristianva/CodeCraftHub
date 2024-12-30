// src/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, updateUsername } = require('../controllers/userController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // Assuming you have an auth middleware

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Update username
router.put('/username', authMiddleware, updateUsername); // More descriptive endpoint

module.exports = router;