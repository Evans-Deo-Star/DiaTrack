// backend/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate a JWT (JSON Web Token)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// @desc    Register a new user (Sign Up)
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // 1. Create User (password hashing happens in the model pre-save hook)
        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id), // 2. Generate and return JWT
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// @desc    Authenticate user (Login)
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Check if user exists AND if password matches (using model method)
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id), // Generate and return JWT
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
     } catch (error) {
        // 🌟 NEW: Log the full Mongoose error here 🌟
        console.error("MongoDB Registration Error:", error); 
        res.status(500).json({ message: 'Server error during registration. Check backend console.' });
    }
};