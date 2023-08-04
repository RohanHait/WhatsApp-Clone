const express = require('express');
const router = express.Router();

// const { registerUser, loginUser, logoutUser, getUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const { registerUser, authUser ,allUser,logout,userInfo } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.route('/').post(registerUser).get( authMiddleware ,allUser);
router.route('/login').post(authUser) ;
router.route('/logout').get(logout)
router.route('/getInfo').get(authMiddleware,userInfo)

module.exports = router;
