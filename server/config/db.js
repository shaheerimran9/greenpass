const mongoose = require('mongoose');
const logger = require('../logger');

const connectDB = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        logger.info('MongoDB connected succesfully');
    } catch (err) {
        logger.error('MongoDB connection failed:', err);
        throw err;
    }
};

module.exports = connectDB;