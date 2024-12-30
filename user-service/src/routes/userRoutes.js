// src/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, updateUsername } = require('../controllers/userController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // Assuming you have an auth middleware

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/', authMiddleware, updateUsername); // New endpoint

module.exports = router;