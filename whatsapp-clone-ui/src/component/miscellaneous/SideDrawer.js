import React, {  } from "react";
import ProfileModel from "../DialogBox/ProfileModel";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reduxStore/Context/userSlice";
import SearchDrawer from "../DialogBox/SearchDrawer";
import { Menu } from "@headlessui/react";
import apiConfig from "../../config/apiConfig";

function SideDrawer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <div className="sticky top-0 z-20 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-30 border-b-2 border-slate-900/10  dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/60 dark:bg-slate-900">
        <div className='max-w-8xl mx-auto"'>
          <div className="py-3 border-b border-slate-900/10 lg:px-6 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0 dark:text-white text-black">
            <div className="relative flex items-center justify-between">
              <div className="relative">
                <SearchDrawer>
                  <button
                    className=" sm:flex items-center z-40 p-2 mx-2 sm:w-64 text-left space-x-3   bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800 shadow-sm rounded-lg text-slate-400  dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700 "
                    
                  >
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
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                    <p className="hidden sm:flex">Search</p>
                  </button>
                </SearchDrawer>
              </div>
              <div>
                <p>WhatsApp</p>
              </div>
              <div className="MenuBar flex ">
                <div className="notification-bar relative px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {/* <span className="notification-count absolute w-3 h-3 bg-red-600 text-center rounded-xl bottom-1 top-0 right-0"></span> */}
                </div>
                <div className="Profile-Bar ">
                  <Menu>
                    <Menu.Button>
                      <img
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white mx-1"
                        src={user.profilePic}
                        alt={""}
                      />
                    </Menu.Button>
                    <Menu.Items
                      className={
                        "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white  ring-slate-900/10 hover:ring-slate-300  text-slate-400  dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
                      }
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <ProfileModel user={user}>
                            <button
                              className={`${
                                active
                                  ? "bg-violet-500 text-white dark:bg-violet-800 dark:text-gray-200"
                                  : "bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400  dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <p> Profile Details </p>
                            </button>
                          </ProfileModel>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400  dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => {
                              apiConfig.get('/api/user/logout').catch(err => console.log(err)) ;
                              localStorage.removeItem("chat-app-userInfo");
                              dispatch(logOut());
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p>Log Out</p>
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideDrawer;
