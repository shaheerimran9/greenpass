const User = require('../models/User');
const { generateTokenAndSetCookie } = require('../utils/token');

const getMe = async (req, res) => {
    const user = req.user;

    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    };

    res.status(200).json({
        success: true,
        message: 'Retrieved user',
        data: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
};

const updatePassword = async (req, res) => {
    const user = req.user;

    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    };

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        const error = new Error('Current and new passwords are required');
        error.status = 400;
        throw error;
    };

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        const error = new Error('Current password is incorrect');
        error.status = 401;
        throw error;
    };

    user.password = newPassword;
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    });
};

const getFavorites = async (req, res) => {
    const user = req.user;

    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    };

    const favorites = user.favorites || [];

    res.status(200).json({
        success: true,
        message: 'Retrieved favorite parks',
        data: favorites
    });
};

const addFavorite = async (req, res) => {
    const user = req.user;

    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    };

    const { parkCode } = req.body;

    if (!parkCode) {
        const error = new Error('Park code is required');
        error.status = 400;
        throw error;
    }

    if (user.favorites.includes(parkCode)) {
        return res.status(200).json({
            success: true,
            message: 'Park already in favorites',
            data: user.favorites
        });
    };

    user.favorites.push(parkCode);

    await user.save();

    res.status(201).json({
        success: true,
        message: 'Park added to favorites',
        data: user.favorites
    });
};

const deleteFavorite = async (req, res) => {
    const user = req.user;

    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    };

    const { parkCode } = req.body;

    if (!parkCode) {
        const error = new Error('Park code is required');
        error.status = 400;
        throw error;
    }

    const newFavorites = user.favorites.filter((code) => code !== parkCode);

    user.favorites = newFavorites;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Park removed from favorites',
        data: user.favorites
    });
};

module.exports = { getMe, updatePassword, getFavorites, addFavorite, deleteFavorite };