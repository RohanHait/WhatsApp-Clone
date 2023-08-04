import React, {useEffect , useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast } from "react-toastify"
import senderNameShould from "../../Logic/senderName"
import API from "../../config/apiConfig";
import ScrollableFeed from "react-scrollable-feed";
import { isSameSender } from "../../Logic/setAvater";
import Lottie from "lottie-react";
import animationData from "./../../svgs/typing.json"
import {io} from "socket.io-client";
import { addMessages, initialMessages } from "../../reduxStore/Context/messageSlice";
import { selectChat } from "../../reduxStore/Context/chatSlice";
const ENDPOINT = "http://localhost:5000" ;
var socket , selectedCompChat ;

function ChatBox() {

  const bottomDiv = useRef(null) ;
  const [message , setMessage ] = useState("")
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const user = useSelector((state) => state.user.user)
  const [socketConnected , setSocketConnected ] = useState(false) ;
  const [typing, setTyping] = useState(false) ;
  const [isTyping, setIsTyping] = useState(false) ;
  const allMessages = useSelector(state => state.messages.messages) ;
  const dispatch = useDispatch() ;
  
  useEffect(()=>{
    socket = io(ENDPOINT) ;
    socket.emit('set-up',user);
    socket.on('connected',()=>{
      setSocketConnected(true) ;
    }) ;
    socket.on("typing is on",()=> setIsTyping(true)) ;
    socket.on("typing is off",()=> setIsTyping(false)) ;
    
  },[])
  useEffect(() => {
    fetchMessages() ;
    selectedCompChat = selectedChat ;
    bottomDiv?.current?.scrollIntoView({behavior: 'smooth'})
  }, [selectedChat])
  useEffect(() => {
    socket.on("message-received",(newMessage)=>{
      if(selectedCompChat?._id !== newMessage?.chat?._id)
      {
        // notification
      }
      else
      {
        AddMessage(newMessage) ;
      }
    })
  }, [])
  const AddMessage = (newMessage) =>{
    dispatch(addMessages(newMessage)) ;
  }
  const sendMessage = async()=>{
    if(message.trim() !== ""){
      setMessage("") ;
      const data = {
        content : message.trim(),
        chatId : selectedChat._id
      }
      try{
      const res = await API.post("/api/message",data)
      console.log(res.data);
      if(socketConnected){
        socket.emit('send-message',res.data) ;
        socket.emit("stop typing", selectedChat._id);
      }
      AddMessage(res.data)
    }catch(error)
    {
      toast.error(error.response.data.ERROR.message) ;
    }
    }
  }
  const fetchMessages = async()=>{
    if(!selectedChat) return ;
    try{
    const res = await API.get(`/api/message/${selectedChat._id}`)
    console.log(res.data)
    dispatch(initialMessages(res.data)) ;
    socket.emit("join",selectedChat._id) ;
    }
    catch(error)
    {
      toast.error("something occurs ") ;
    }
  }
  const typingHandler = (e)=>{
    setMessage(e.target.value.trimStart())
    if(!socketConnected) return ;
    if(!typing)
    {
      setTyping(true) ;
      socket.emit("typing",selectedChat._id);
    }
    let lasTypingTime = new Date().getTime() ;
    var timeLength = 3000 ;
    setTimeout(()=>{
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lasTypingTime ;
      if(timeDiff >= timeLength)
      {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false) ;
      }
    },timeLength)
    }
  
  if(selectedChat)
  return (
    <div className={` flex-[2] w-full sm:flex ${selectedChat ? "" : "hidden"}`}>
      <div className="model flex flex-col flex-1 mx-0  max-w-[100vw] ">
        <div className="model-header flex ">
        <button className="model-header-close pr-2 inline-block  sm:hidden" onClick={()=>{dispatch(selectChat(null)); dispatch(initialMessages([]))}} >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>
                    </button>
          <div className="px-2">     
            <img
              src={
                selectedChat.isGroupChat
                  ? selectedChat?.groupProfilePic
                  : senderNameShould(selectedChat.users, user).profilePic
              }
              className="w-12 inline-block h-12 rounded-full border-2  "
              alt=""
            />
          </div>
          <div className="flex-1">{selectedChat.isGroupChat ? selectedChat?.chatName : senderNameShould(selectedChat.users, user).name}</div>
        </div>
        <div className=" relative flex-1 ">
        <div
          className=" block z-10 inset-0  right-auto w-full overflow-y-auto absolute bg-gray-200 dark:bg-slate-950/80 text-left text-gray-800 dark:text-gray-200 scroll-m-0 "
          id="Message-Box"
          >
            <ScrollableFeed  >
          <ul className={"flex  flex-col-reverse "}>
            {allMessages.map((message ,i) => {
                 return (i === allMessages.length -1) ?
                     (<li className={`w-full items-center flex ${message.sender._id === user._id ? "justify-end" : " justify-start"}`} key={message._id}>
                            <div className="flex items-center p-1 my-1 w-8 h-8">
                                {
                                    isSameSender(allMessages,i,user._id) ?
                                    <img
                                  className="w-6 h-6  rounded-full"
                                  src={message.sender.profilePic}
                                  alt="avatar"/> : null
                                
                                }
                            </div>
                            <div className= {`message ${message.sender._id === user._id ? "msg-sent" : "msg-received mx-0 "}`}>
                                <p>{message.content}</p>
                            </div>
                        </li>            
                      )
                 :
               (
                <li className={`w-full items-center flex ${message.sender._id === user._id ? "justify-end" : " justify-start"}`} key={message._id}>
                    <div className="flex items-center p-1 my-1 w-8 h-8">
                        {
                            isSameSender(allMessages,i,user._id) ?
                            <img
                          className="w-6 h-6  rounded-full"
                          src={message.sender.profilePic}
                          alt="avatar"/> : null
                        
                        }
                    </div>
                    <div className= {`message ${message.sender._id === user._id ? "msg-sent" : "msg-received mx-0 "}`}>
                        <p>{message.content}</p>
                    </div>
                </li>            
              );
            })}
            <div ref={bottomDiv}></div>
          </ul>
    </ScrollableFeed>
        </div>
      </div>
        <div className="model-footer relative dark:bg-slate-700/80  bg-slate-300/80 ">
          {isTyping ?<><div className="absolute left-2 z-50  rounded-xl typing-animation  flex bg-transparent" style={{top 
          : "-30px", maxWidth : "70px", }}> <Lottie animationData={animationData} loop = {true}  /> </div> </>: <></>}
        <textarea className="message-type resize-none h-10 w-full rounded-md bg-gray-200 dark:bg-slate-800"  type="textarea" value={message} onChange={typingHandler} placeholder="Type a Message " onKeyDown={(e)=>{
            if(e.key === "Enter"){
              // console.log("Enter")
              sendMessage()
            }
          }}>
        </textarea>
        <button className="px-3" onClick={()=> {sendMessage()}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
</svg>

        </button>
        </div>
      </div>
    </div>
  );
  else return (<>
  <div className={` flex-[2] w-full m-auto content-center justify-center text-slate-900 dark:text-gray-50  text-center text-xl sm:flex ${selectedChat ? "" : "hidden"}`}>
    Click on a chat to start messaging
  </div>
  </>)
}

export default ChatBox;
