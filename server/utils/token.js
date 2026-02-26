const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    });
};

module.exports = { generateTokenAndSetCookie };