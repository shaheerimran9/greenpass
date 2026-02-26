const logger = require('../logger');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    logger.error(`Error ${statusCode} on ${req.method} ${req.url}`, err);

    res.status(statusCode).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;