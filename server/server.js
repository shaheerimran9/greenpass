require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            logger.info(`Server is running on PORT ${PORT}`);
        })
    } catch (err) {
        logger.error('Failed to start server', err);
        process.exit(1);
    }
};

startServer();