const express = require('express');
const router = express.Router();

// const { registerUser, loginUser, logoutUser, getUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');
const { accessChat,fetchChat,createGroupChat,renameGroup,removeFromGroup,addToGroup } = require('../controllers/chatController');

router.route('/').post(authMiddleware ,accessChat) 
router.route('/').get(authMiddleware ,fetchChat) ; 
router.route('/group').post(authMiddleware ,createGroupChat) ; 
router.route('/rename').put(authMiddleware ,renameGroup) ; 
router.route('/groupremove').put(authMiddleware ,removeFromGroup) ; 
router.route('/groupadd').put(authMiddleware ,addToGroup) ; 

module.exports = router;