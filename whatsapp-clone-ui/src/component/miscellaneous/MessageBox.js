import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isSameSender } from "../../Logic/setAvater";
function MessageBox({ allMessages, user  }) {

  return allMessages && (
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
          </ul>
    </ScrollableFeed>
        </div>
      </div>
  );
}

export default MessageBox;
