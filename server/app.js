const express = require('express');
const app = express();
require('express-async-errors');

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

module.exports = app;