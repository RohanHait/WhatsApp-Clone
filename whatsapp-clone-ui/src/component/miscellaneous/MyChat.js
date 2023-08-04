import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../config/apiConfig";
import { initialChat, selectChat } from "../../reduxStore/Context/chatSlice";
import senderNameShould from "../../Logic/senderName";
import AddGroupModel from "../DialogBox/addGroupModel";
import {toast} from "react-toastify"

function MyChat() {
  const user = useSelector((state) => state.user.user);
  const chat = useSelector((state) => state.chats.chat);
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const dispatch = useDispatch();
  const fetchChat = () => {
    API.get("/api/chat")
      .then((res) => {
        // console.log(res.data);
        if(res.status === 200)
        dispatch(initialChat(res.data));
      })
      .catch((err) => {
        if(err?.response?.status === 500){
          console.log("Server Error") ;
          toast.error("Server Error")
        }
        else
        {
          console.log(err?.response?.data?.ERROR?.message)
          toast.error(err.response.data.ERROR.message) ;
        }
      });
  };
  useEffect(() => {
    fetchChat();
    // eslint-disable-next-line
  }, []);
  // console.log( "Selected Chat is ", typeof selectedChat?._id) ;
  return (
    <div
      className={` ${
        selectedChat ? "hidden" : ""
      } sm:flex bg-inherit z-10 border-r-2 border-slate-900/10  dark:border-slate-50/[0.06]  w-full flex-1  `}
    >
      <div className="model bg-inherit   shadow-none flex flex-col">
        <div className="model-header text-xl py-3 px-2 flex justify-between">
          <h1>My Chat </h1>
          <AddGroupModel>
            <button className="sm:flex items-center z-0 p-2 mx-2  text-left   bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800 shadow-sm rounded-lg text-slate-400  dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700 flex ">
              <p className="text-base max-md:hidden pr-2">Create Group</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 "
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </AddGroupModel>
        </div>
        <div className="relative flex-1 ">
        <div className=" block z-20 inset-0  right-auto w-full overflow-y-auto absolute bg-inherit text-left text-gray-800 dark:text-gray-200">
          <div className="model-body-container mb-3">
                {/* <div className="pb-4 px-6 border-b-2 dark:border-gray-700 border-gray-300 font-semibold text-lg">
                        Search Result
                      </div> */}
                <section>
                <ul className="">
                  {chat.map((chat) => {
                    if (selectedChat?._id === chat._id)
                      console.log("This is Selected");
                    return (
                      <li className="flex" key={chat._id}>
                        <button
                          className=" disabled:dark:bg-slate-600 disabled:bg-slate-400 disabled:cursor-default  hover:dark:bg-slate-700/80 hover:bg-slate-300/80  flex-1 flex flex-row justify-between items-center"
                          disabled={selectedChat?._id === chat._id}
                          onClick={(e) => {
                            console.log(chat._id);
                            e.preventDefault();
                            dispatch(selectChat(chat));
                          }}
                        >
                          <div className="pl-3 pr-1 ">
                            <img
                              src={
                                chat.isGroupChat
                                  ? chat?.groupProfilePic
                                  : senderNameShould(chat.users, user)
                                      .profilePic
                              }
                              className="w-12 inline-block h-12 rounded-full border-2  "
                              alt=""
                            />
                          </div>
                          <div className="flex-1 flex flex-col text-left pl-3 overflow-hidden px-6 py-4 border-b-2 border-slate-900/10  dark:border-slate-100/[0.06]">
                            <div className="text-lg text-white truncate">
                              {chat.isGroupChat
                                ? chat.chatName
                                : senderNameShould(chat.users, user).name}
                            </div>
                            <div className="text-sm truncate">
                              {chat?.latestMessage
                                ? ((chat?.latestMessage?.sender._id === user._id
                                    ? "You"
                                    : chat?.latestMessage?.sender.name) +
                                  " : " +
                                  chat?.latestMessage?.content)
                                : " "}
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                  {/* {searchResult.length === 0 && (
                          <div>
                            <img
                              src={No_Result_svg}
                              className=" object-scale-down"
                              alt=""
                            />
                          </div>
                        )} */}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default MyChat;
