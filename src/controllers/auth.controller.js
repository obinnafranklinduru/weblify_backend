const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { ErrorResponse } = require('../utils/ErrorResponse');

dotenv.config();

const register = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorResponse('User already exists', 400));
        }

        // Create a new user
        user = new User({
            email,
            password,
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        // Check if the provided password matches the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};