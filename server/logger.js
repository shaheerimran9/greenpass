const winston = require('winston');

const env = process.env.NODE_ENV || 'development';

prodFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

devFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
);

const logger = winston.createLogger({
    level: 'info',
    format: env === 'production' ? prodFormat : devFormat,
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = logger;