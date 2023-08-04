

export const isSameSender = (allMessages , i , userId) => {
    if(i < allMessages.length - 1)
        return allMessages[i+1].sender._id !== allMessages[i].sender._id && allMessages[i].sender._id !== userId ;
    else  {
        return allMessages[i].sender._id !== userId
    }
    }