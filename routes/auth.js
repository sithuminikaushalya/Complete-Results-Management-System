const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', async (req, res) => {
  try {
    const { username, password, role, batch, department } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role, batch, department });

    // Handle file uploads (profile image and ID photo)
    if (req.files && req.files.profileImage) {
      const profileImage = req.files.profileImage;
      // Handle storing profile image, e.g., using multer or similar middleware
      // Example: newUser.profileImage = profileImage.path; (store path in database)
    }

    if (req.files && req.files.idPhoto) {
      const idPhoto = req.files.idPhoto;
      // Handle storing ID photo, e.g., using multer or similar middleware
      // Example: newUser.idPhoto = idPhoto.path; (store path in database)
    }

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Determine login message based on user role
    let message = 'Login successful';
    if (user.role === 'admin') {
      message = 'Admin login successful';
    } else if (user.role === 'student') {
      message = 'Student login successful';
    }

    res.status(200).json({ message, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
