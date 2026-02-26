const express = require('express');
const router = express.Router();

const { register, login, logout, me } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.route('/register').post(register)
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/me').get(auth, me);

module.exports = router;