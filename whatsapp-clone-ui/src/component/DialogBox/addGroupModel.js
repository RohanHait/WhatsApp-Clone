import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import No_Result_svg from "../../svgs/No_Result.svg";
// import Looking_svg from "../../svgs/Looking_svg.svg";
import Spinner from "../../svgs/Spinner.svg"
import API from "../../config/apiConfig";
import { selectChat,addChat } from "../../reduxStore/Context/chatSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
function AddGroupModel({ children }) {
    // react hooks define
  const backButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false)
  const [groupName, setGroupName] = useState("") ;

//  all state define 
  const dispatch = useDispatch() ;

// all logical function
    const removeUserFromSelectedUser = (user)=>{
        const filterUser = selectedUser.filter(e => user._id !== e._id) ;
        setSelectedUser(filterUser);
    }
    const createNewGroup= async ()=>{
        setLoadingPage(true) ;
        if(selectedUser.length > 1 && groupName){
            const data = {
                name : groupName ,
                users : JSON.stringify(selectedUser)
            }
            try {
                const res = await API.post("/api/chat/group",data)
                toast.success("Group successfully created")
                dispatch(addChat(res.data)) ;
                dispatch(selectChat(res.data)) ;
                setLoadingPage(false)
                setOpen(false) ;
            } catch (error) {
                // console.warn(error)
                toast.error(error.response.data.ERROR.message) ;
                setLoadingPage(false)
            }
        }
        setLoadingPage(false) ;
    }
  const handelclick = ((users)=>{
    // console.log(users) ;
    setSelectedUser([...selectedUser,users]) ;

    // console.log(selectedUser) ;
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
                    className="model-header flex-col text-3xl font-semibold leading-6 text-gray-900 dark:text-gray-200 py-4"
                  >
                    <form className="model-header-title flex flex-col text-left space-x-3 w-full bg-white ring-1 ring-slate-900/10 ring-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800 shadow-sm rounded-lg text-slate-400   dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:bg-slate-700  ">
                        <div className="flex items-center justify-center ">
                            <label htmlFor="groupName" className="px-2" >Group Name : </label>
                            <input type="text" id="groupName" name="groupName  " className="flex-1 p-2 mx-2 outline-none focus:outline-none bg-inherit border-b-2 border-slate-300/80 dark:border-gray-500/40" value={groupName} onChange={(e)=>{
                                e.preventDefault();
                                setGroupName(e.target.value) ;
                            }}/>
                        </div>
                        <div className="flex items-center justify-center py-2">
                      <label htmlFor="search" className="px-2">
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
                        className="message-type "
                        name="search" 
                        id="search"
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
                              setSearchResult(res.data);

                            //   console.log("res data : ", res.data);
                              setLoading(false);
                              // console.log("search Data: " ,searchResult) ;
                            })
                            .catch((error) => {
                              setLoading(false);
                              toast.error("Something Occurs")
                              console.warn(error);
                            });
                        }}
                      />
                      </div>
                    </form>
                    <section className=" items-center justify-start mt-1 w-full">
                        {selectedUser.map((user) =>
                    (<span key={user._id} id="badge-dismiss-indigo" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
                    {user.name}
                    <button type="button" className="inline-flex items-center p-1 ml-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300"
                    onClick={()=> removeUserFromSelectedUser(user)}
                    data-dismiss-target="#badge-dismiss-indigo" aria-label="Remove">
                        <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Remove badge</span>
                    </button>
                    </span>)
                        )}
                    </section>
                  </Dialog.Title>
                  <div className="model-body text-left text-gray-800 dark:text-gray-200">
                    
                      <section className="model-body-container mb-3">
                        {/* <div className="pb-4 px-6 border-b-2 dark:border-gray-700 border-gray-300 font-semibold text-lg">
                          Search Result
                        </div> */}
                        <ul>
                          {searchResult.map((user) =>  {

                            if(selectedUser.find(e => e._id === user._id)) return "";

                            return(
                            <li className="flex " key={user._id}>
                              <button className=" px-6 my-1 mx-2 py-4 hover:bg-inherit dark:bg-slate-700 bg-slate-300 flex-1 flex flex-row rounded-lg justify-between items-center  "
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
                          )})}
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
                  {loadingPage && (<div><img src= {Spinner} alt = ""/></div>)}
                  <div className="model-body-footer flex p-3 border-t-2  justify-end border-slate-300/80 dark:border-gray-500/40">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => createNewGroup()}
                    >
                    Create 
                  </button>
                  <button
                    ref={backButtonRef}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 outline-none focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default AddGroupModel;
