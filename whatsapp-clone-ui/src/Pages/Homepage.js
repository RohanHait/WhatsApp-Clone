import React, {useState} from "react";
import Login from "../component/Authentication/Login";
import Signup from "../component/Authentication/Signup";


function Homepage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="container ">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:text-gray-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://www.pngmart.com/files/16/Chat-Icon-Transparent-Background.png"
              alt="Your Company"
            />

            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 ">
              {isLogin ? "Sign in to your account" : "Sign up for an account"}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow">
            <div className="flex items-center justify-between border-t  border-gray-200 dark:border-slate-700  px-4 py-3 sm:px-6">
              <button onClick={()=>{setIsLogin(true)}} className={" relative inline-flex w-fit flex-grow items-center rounded-l-lg px-4 py-2 text-sm font-medium  ".concat( (!isLogin? "hover:bg-gray-200 dark:hover:bg-slate-700  text-slate-800 dark:text-gray-200 bg-gray-50 dark:bg-slate-800" : "bg-indigo-600 text-white")) } >
                Sign In
              </button>
              <button onClick={()=>{setIsLogin(false)}} className= {" relative inline-flex w-fit flex-grow items-center rounded-r-lg px-4 py-2 text-sm font-medium  ".concat( (isLogin? "hover:bg-gray-200 dark:hover:bg-slate-700  text-slate-800 dark:text-gray-200 bg-gray-50 dark:bg-slate-800" : "bg-indigo-600 text-white")) } >
                Sign Up
              </button>
            </div>
           { isLogin ?  <Login/> : <Signup/> }
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="/"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
