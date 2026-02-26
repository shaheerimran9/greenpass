const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1];

    if (!token) {
        const error = new Error('Unauthorized: No token provided');
        error.status = 401;
        throw error;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
        const error = new Error('Unauthorized: User not found');
        error.status = 401;
        throw error;
    }

    req.user = user;
    next();
};

module.exports = auth;