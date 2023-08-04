const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    isGroupChat: {type: Boolean, default: false},
    users: [
        {
            type : Schema.Types.ObjectId,
            ref: 'User'
        }],
    chatName: {type: String, default: "Group"},
    groupProfilePic : {type : String , default : "https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824146_1280.png"},
    latestMessage: {type: Schema.Types.ObjectId, ref: 'Message'},
    groupAdmin : {type: Schema.Types.ObjectId, ref: 'User'},
}
    , {timestamps: true}
) ;

module.exports = mongoose.model('Chat', chatSchema);
