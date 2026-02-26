const express = require('express');
const router = express.Router();
const { getMe, updatePassword, getFavorites, addFavorite, deleteFavorite } = require('../controllers/userController');

router.route('/me').get(getMe);
router.route('/password').put(updatePassword);
router.route('/favorites').get(getFavorites).post(addFavorite).delete(deleteFavorite);


module.exports = router;