const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()); 
    }
});

// Multer file filter configuration
const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'idPhoto', maxCount: 1 }
]);

// Route handler for signup endpoint
router.post('/signup', upload, [
    // Implement validation middleware using express-validator
    body('role').notEmpty().withMessage('Role is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        // Validate file uploads
        if (!req.files || !req.files.profileImage || !req.files.idPhoto) {
            return res.status(400).json({ error: 'Profile image and ID photo are required' });
        }
        next(); // Proceed to next middleware if validation passes
    }
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Destructure request body and files
        const { role, username, password, registrationNumber, fullName, batch, department } = req.body;
        const { profileImage, idPhoto } = req.files;

        // Create new user instance
        const user = new User({
            role,
            username,
            password,
            registrationNumber,
            fullName,
            batch,
            department,
            profileImage: profileImage[0].path, 
            idPhoto: idPhoto[0].path 
        });

        // Save user to database
        await user.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle registration error
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

module.exports = router;
