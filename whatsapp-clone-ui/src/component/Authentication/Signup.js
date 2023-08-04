import React, { useState } from "react";
import API from "../../config/apiConfig";
import spinner from "../../svgs/DualRing-18px.svg";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { logIn } from "../../reduxStore/Context/userSlice";

function Signup() {
  const dispatch = useDispatch() ;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cnfPsw, setCnfPsw] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const postPicture = async (pic) => {
    setLoading(true);
    console.log(pic);
    if (pic === null) {
      console.log("Please Add a Pic");
    }
    if (
      pic.type === "image/png" ||
      pic.type === "image/jpg" ||
      pic.type === "image/jpeg"
    ) {
      console.log("Sending pic...");
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dkd85osik");
      try{
      const res = await toast.promise(
        fetch("https://api.cloudinary.com/v1_1/dkd85osik/image/upload", {
        method: "post",
        body: data,
      }),
        {
          pending : "Uploading the Picture" ,
          success : "Upload Successful",
          error : "Something Occurs "
        }
      )
      const result = await res.json()
      console.log(result);
      setPic(result.url);
      }catch(err){
        console.log(err) ;
      }
    }
    else{
      console.log("Picture must be in jpeg ,jpg or png form");
      toast.warn("Picture must be in jpeg ,jpg or png form");
    }
    setLoading(false);

  };

  return (
    <>
      <ToastContainer theme="dark" />
      <form className="space-y-4" action="/api/user" method="POST">
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-100"
            >
              Name
            </label>
          </div>
          <div className="">
            <input
              id="username"
              name="username"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900 dark:text-gray-100 dark:bg-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-100"
          >
            Email address
          </label>
          <div className="">
            <input
              id="email"
              name="email"
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
              className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-100"
            >
              Password
            </label>
          </div>
          <div className="">
            <input
              id="password"
              name="password"
              type="password"
              //   autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900 dark:text-gray-100 dark:bg-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-100"
            >
              Confirm Password
            </label>
          </div>
          <div className="mt">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={(e) => setCnfPsw(e.target.value)}
              //   autoComplete="current-password"
              required
              className={`block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900 dark:text-gray-100 dark:bg-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 ${
                cnfPsw !== password
                  ? "ring-red-400 focus:ring-pink-600"
                  : "ring-gray-300 focus:ring-indigo-600"
              }`}
            />
          </div>
          {cnfPsw !== password && (
            <p className="block text-sm font-medium leading-6 text-red-600">
              *Confirm Password did not match the Password
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="profilePic"
              className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-100  "
            >
              Profile Picture
            </label>
          </div>
          <div className="mt">
            <input
              id="profilePic"
              name="profilePic"
              type="file"
              //   autoComplete="current-password"
              onChange={(e) => {
                postPicture(e.target.files[0]);
              }}
              accept="image/*"
              className="block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900 dark:text-gray-100 dark:bg-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 file:bg-slate-300 file:dark:bg-slate-500 file:border-2 file:border-gray-500"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={async (e) => {
              if (password !== cnfPsw) {
                toast("Confirm Password and Password did not match", {
                  type: "error",
                });
                console.log("Please match the Confirm Password");
                return ;
              }
              setLoading(true);
              e.preventDefault();
              API.post("/api/user/", {
                name,
                password,
                email,
                pic,
              })
                .then((res) => {
                  toast("Success fully Signed Up", {
                    type: "success",
                  });
                  console.log(res.data);
                  toast.success("Successfully Signed Up")
                  localStorage.setItem(
                    "chat-app-userInfo",
                    JSON.stringify(res.data)
                  );
                    dispatch(logIn(res.data)) ;
                })
                .catch((err) => {
                  toast(err.response.data.ERROR.message, {
                    type: "error",
                  });
                  console.log(err);
                });
              setLoading(false);
            }}
            disabled={loading}
            className={`flex w-full justify-center rounded-md ${
              loading ? "bg-indigo-300" : "bg-indigo-600"
            } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
              loading
                ? ""
                : "hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }`}
          >
            {loading ? <img src={spinner} /> : "Sign up"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Signup ;
