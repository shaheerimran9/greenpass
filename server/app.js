const express = require('express');
const app = express();
require('express-async-errors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const auth = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', auth, userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;