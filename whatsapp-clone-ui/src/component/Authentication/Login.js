import React, { useState } from "react";
import API from "../../config/apiConfig" ;
import { useDispatch } from "react-redux";
import { logIn } from "../../reduxStore/Context/userSlice";
import { toast } from 'react-toastify';
function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch() ;
  return (
    <>
      <form className="space-y-6" action="/api/user/login" method="POST">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-100"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              placeholder="abc@xyz.com"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900 dark:text-gray-100 dark:bg-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Password
            </label>
            <div className="text-sm">
              <a
                href="/"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md   border-0 py-1.5 px-1 text-gray-900 dark:text-gray-100 dark:bg-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-slate-800 focus:outline-none  sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            onClick={async (e)=>{
              e.preventDefault() ;
              if(!email || !password)
              {
                toast.warn("Fill All the Form") ;
                // console.log("Fill all the form")
              }
              else
              {
                await API.post("./api/user/login",{
                  email ,
                  password
                }).then(res =>{
                  toast.success("SuccessFully Logged In")
                  // console.log(res.data) ;
                  const userInfo = JSON.stringify(res.data) ;
                  localStorage.setItem("chat-app-userInfo",userInfo) ;
                  dispatch(logIn(res.data))
                }).catch(err => {
                  toast.error(err?.response?.data?.ERROR?.message)
                  // console.log(err)
                })
              }
            }}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
