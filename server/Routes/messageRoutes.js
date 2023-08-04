const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { sendMessage, fetchMessage } = require('../controllers/messageController');

router.route('/').post(authMiddleware ,sendMessage) 
router.route('/:chatId').get(authMiddleware ,fetchMessage) 
 

module.exports = router;