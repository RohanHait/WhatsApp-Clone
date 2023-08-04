import React, {  } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SideDrawer from "../component/miscellaneous/SideDrawer";
import MyChat from "../component/miscellaneous/MyChat";
import ChatBox from "../component/miscellaneous/ChatBox";
import { useSelector } from "react-redux";
// import API from '../config/apiConfig'
// import { ChatState } from "../context/chatContex";

function Chatpage() {
  const user = useSelector(state => state.user.user) ;
  // console.log(user) ;
  return (
    <div className="flex flex-col w-screen h-screen">
      {user && <SideDrawer/>}
      <div className="flex justify-between flex-1 ">
       {user && <MyChat/>}
        {user && <ChatBox/>}
      </div>
    </div>
  );
}

export default Chatpage;
