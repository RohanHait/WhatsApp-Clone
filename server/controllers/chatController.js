const asyncHandler = require("express-async-handler");
const Chat = require("../Model/chatModel");
const User = require("../Model/userModel");

/* 
  @access   Private
  @desc     Create a new chat or return an existing chat
  @route    POST /api/chat
  @params   userId
  @return   chat
*/
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("User Id Params not sent with request");
    return res.status(400).json({
      ERROR: {
        message: "User Id Params not sent with request",
      },
    });
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email profilePic ",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [userId, req.user._id],
    };
    try {
      const createChat = await Chat.create(chatData);
      const FullChat = await Chat.findById(createChat._id).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      console.log(error);
    }
  }
});
/**
 * @access   Private
 * @desc     Fetch all chats for a user
 * @route    GET /api/chat
 * @return   Chats
 */
const fetchChat = asyncHandler(async (req, res) => {
  try {
    var isChat = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    }).sort({ updatedAt: -1 })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email profilePic ",
    });
    res.status(200).send(isChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ ERROR: { message: "Server Error" } });
  }
});

/**
 * @access   Private
 * @desc     Create a new group chat
 * @route    POST /api/chat/group
 * @params     users, name
 * @return   Chat
 */
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({ ERROR: { message: "Please Fill the form" } });
  }
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .json({ ERROR: { message: "more the two user required" } });
  }
  users.push(req.user._id);
  try {
    const newGroup = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user._id,
    });
    Chat.findById(newGroup._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .then((data) => res.status(200).send(data));
  } catch (error) {
    console.log(error);
    res.status(500).send({ ERROR: { message: "Server error" } });
  }
});

/* 
* @access   Private 
* @desc     Rename a group chat
* @route    PUT /api/chat/group/rename
* @params   chatId, chatName
* @return   Chat
*/
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  if (!chatId || !chatName)
    return res
      .status(400)
      .json({ ERROR: { message: "please name can't be empty" } });
  const updateChat = await Chat.findOneAndUpdate(
    { $and: [{ _id: chatId }, { groupAdmin: req.user._id }] },
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updateChat)
    return res.status(404).send({ ERROR: { message: "server error" } });
  return res.status(200).send(updateChat);
});

/** 
 * @access   Private
 * @desc     Delete a group chat
 * @route    DELETE /api/chat/group
 * @params   chatId
 * @return   Chat
 */
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  if (!chatId || !userId)
    return res
      .status(400)
      .send({ ERROR: { message: "Please Provied Chat Id and User Id" } });
  let updateChat; 
  if(req.user._id == userId)
  {
    updateChat = await Chat.findByIdAndUpdate(chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .populate("latestMessage.sender","name email profilePic") ;
  }
  else {
   updateChat = await Chat.findOneAndUpdate(
    { $and: [{ _id: chatId }, { groupAdmin: req.user._id }] },
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .populate("latestMessage.sender","name email profilePic") ;
   }
  if (!updateChat)
    return res.status(401).send({ ERROR: { message: "Authorization Error" } });
  res.status(200).send(updateChat);
});

/**
 * @access   Private
 * @desc     Add a user to a group chat
 * @route    PUT /api/chat/group/add
 * @params   chatId, userId
 * @return   Chat
 * */
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  if (!chatId || !userId)
    return res
      .status(400)
      .send({ ERROR: { message: "Please Provided Chat Id and User Id" } });
  const updateChat = await Chat.findOneAndUpdate(
    { $and: [{ _id: chatId }, { groupAdmin: req.user._id },{users : {$nin : userId}}] },
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage");
  if (!updateChat)
    return res.status(401).send({ ERROR: { message: "Cannot process Your request" } });

  res.status(400).send(updateChat);
});


module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
