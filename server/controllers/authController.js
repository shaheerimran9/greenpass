const User = require('../models/User');
const { generateTokenAndSetCookie } = require('../utils/token');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        const error = new Error('Please provide all required fields');
        error.status = 400;
        throw error;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error('Email already in use');
        error.status = 400;
        throw error;
    }

    const newUser = await User.create({ username, email, password });

    generateTokenAndSetCookie(res, newUser._id);

    res.status(201).json({
        success: true,
        message: "User successfully created",
        data: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error('Email and password are required');
        error.status = 400;
        throw error
    };

    const user = await User.findOne({ email }).select('+password');
    const match = user ? await user.comparePassword(password) : false;

    if (!match) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
};

const logout = async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

const me = async (req, res) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        message: 'Authenticated user',
        data: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
};

module.exports = { register, login, logout, me };