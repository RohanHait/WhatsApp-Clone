import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import No_Result_svg from "../../svgs/No_Result.svg";
// import Looking_svg from "../../svgs/Looking_svg.svg";
import Spinner from "../../svgs/Spinner.svg"
import API from "../../config/apiConfig";
import { selectChat,addChat } from "../../reduxStore/Context/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function SearchDrawer({ children }) {
  const backButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false)
  const [use, setUse] = useState(false);
  const dispatch = useDispatch() ;
  const chat = useSelector(state => state.chats.chat);
  const handelclick = ((users)=>{
    // console.log(users) ;
    setLoadingPage(true) ;
    const data = {userId : users._id};
    // console.log(data) ;
      API.post("/api/chat",data).then(res =>{
        if(!chat.find(e => e._id===res.data._id)){
          dispatch(addChat(res.data)) ;
        }
        console.log(res.data) ;
        dispatch(selectChat(res.data)) ;
        setLoadingPage(false) ;
        setSearch("") ;
        setOpen(false) ;
      }).catch(err =>{setLoadingPage(false); toast.error(err.response.data.ERROR.message) ; console.log(err)}) ;
  })
  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          initialFocus={backButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className=" model-container">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative model h-full ">
                  <Dialog.Title
                    as="header"
                    className="model-header flex-row-reverse sm:flex-row text-3xl font-semibold leading-6 text-gray-900 dark:text-gray-200 py-4"
                  >
                    <form className="model-header-title justify-center items-center">
                      <label className="px-2">
                        {loading && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            style={{
                              margin: "auto",
                              background: "none",
                              display: "block",
                              shapeRendering: "auto",
                            }}
                            width="24px"
                            height="24px"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="10"
                              r="35"
                              strokeDasharray="164.93361431346415 56.97787143782138"
                            >
                              <animateTransform
                                attributeName="transform"
                                type="rotate"
                                repeatCount="indefinite"
                                dur="1s"
                                values="0 50 50;360 50 50"
                                keyTimes="0;1"
                              ></animateTransform>
                            </circle>{" "}
                          </svg>
                        )}
                        {!loading && (
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
                        )}
                      </label>
                      <input
                        className="message-type"
                        value={search}
                        onChange={(e) => {
                          setLoading(true);
                          setSearch(e.target.value);
                          API.get("/api/user", {
                            params: {
                              search: e.target.value,
                            },
                          })
                            .then((res) => {
                              setUse(true);
                              setSearchResult(res.data);

                              console.log("res data : ", res.data);
                              setLoading(false);
                              // console.log("search Data: " ,searchResult) ;
                            })
                            .catch((error) => {
                              setLoading(false);
                              toast.error("Something Occurs")
                              console.log(error);
                            });
                        }}
                      />
                    </form>
                    <button
                      className="model-header-close"
                      ref={backButtonRef}
                      onClick={() => setOpen(false)}
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
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>
                    </button>
                  </Dialog.Title>
                  <div className="model-body text-left text-gray-800 dark:text-gray-200">
                    {!use && (
                      <section
                        className="flex flex-col justify-center items-center mb-3"
                        style={{ overflow: "none" }}
                      >
                        <div>Search Anyone To Talk </div>
                      </section>
                    )}
                    {use && (
                      <section className="model-body-container mb-3">
                        <div className="pb-4 px-6 border-b-2 dark:border-gray-700 border-gray-300 font-semibold text-lg">
                          Search Result
                        </div>
                        <ul>
                          {searchResult.map((user) => (
                            <li className="flex " key={user._id}>
                              <button className=" px-6 my-1 mx-2 py-4 hover:bg-inherit dark:bg-slate-700 hover:dark:bg-inherit bg-slate-300 flex-1 flex flex-row rounded-lg justify-between items-center  "
                              onClick={(e) => {
                                e.preventDefault() ;
                                handelclick(user)}}>
                                <img
                                  src={user.profilePic}
                                  className="w-8 inline-block h-8 rounded-full border-2  "
                                  alt={user.name[0]}
                                />
                                <div className=" flex flex-col flex-1 px-4 text-left ">
                                  <div>{user.name}</div>
                                  <div className="text-sm text-gray-400">
                                    Email: {user.email}
                                  </div>
                                </div>
                              </button>
                            </li>
                          ))}
                          {searchResult.length === 0 && (
                            <div>
                              <img
                                src={No_Result_svg}
                                className=" object-scale-down"
                                alt=""
                              />
                            </div>
                          )}
                        </ul>
                      </section>
                    )}
                  </div>
                  {loadingPage && (<div><img src= {Spinner} alt = ""/></div>)}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default SearchDrawer;
