const asyncHandler = require('express-async-handler');
const Message = require("../Model/messageModel") ;
const Chat = require("../Model/chatModel") ;
const sendMessage = asyncHandler(async (req,res)=>{
    const {content , chatId} = req.body ;
    if(!content || !chatId)
    {
        res.status(400).send({ERROR : {message : "content or chatId is Missing "}}) ;
    }
    try {
        const newMessage = await Message.create({
            content,
            chat : chatId ,
            sender : req.user._id,

        })
        await Chat.findByIdAndUpdate(chatId, {
            latestMessage : newMessage
        })
        await newMessage.populate("sender","-password")
        await newMessage.populate("chat")
        res.status(200).send(newMessage) ;

    } catch (error) {
        console.log(error) ;
        res.status(500).json({ERROR :{message : "server error"}}) ;
    }
})

const fetchMessage = asyncHandler(async (req,res)=>{
    try {
        const chatId = req.params.chatId ;
        const massges = await Message.find({
            chat : chatId,
        }).populate("sender","-password").populate("chat").sort({createdAt : -1}) ;
        
        res.send(massges) ;
    } catch (error) {
        console.log(error)
        res.status(500).json({ERROR :{message : "Server Error"}})
    }
})

module.exports = {sendMessage,fetchMessage}