// src/controllers/userController.js
   const User = require('../models/userModel');
   const bcrypt = require('bcryptjs');
   const jwt = require('jsonwebtoken');

   // Register a new user
   const registerUser = async (req, res) => {
       const { username, email, password } = req.body;
       try {
           const hashedPassword = await bcrypt.hash(password, 10);
           const newUser = new User({ username, email, password: hashedPassword });
           await newUser.save();
           res.status(201).json({ message: 'User registered successfully' });
       } catch (error) {
           res.status(500).json({ message: error.message });
       }
   };

   // Login user
   const loginUser = async (req, res) => {
       const { email, password } = req.body;
       try {
           const user = await User.findOne({ email });
           if (!user || !(await bcrypt.compare(password, user.password))) {
               return res.status(401).json({ message: 'Invalid credentials' });
           }
           const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
           res.json({ token });
       } catch (error) {
           res.status(500).json({ message: error.message });
       }
   };

   module.exports = { registerUser, loginUser };