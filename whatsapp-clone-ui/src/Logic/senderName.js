
export default function senderNameShould(users ,myUser){
    if(users)
    return users[0]._id === myUser._id ? users[1] : users[0] ;
    return ""
}