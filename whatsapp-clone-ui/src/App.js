import "./App.css";
import React ,{useEffect} from "react";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import { useDispatch, useSelector } from "react-redux";
import {logIn} from "./reduxStore/Context/userSlice" ;
import api from "./config/apiConfig";
import AlertProvider, { AlertState } from "./component/alert";
import 'react-toastify/dist/ReactToastify.css';
import setTheme from "./Logic/setTheme";
function App() { 
  const user = useSelector(state => state.user.user) ;
    const dispatch = useDispatch() ;
  useEffect(()=> {
    // document.body.classList.toggle('dark-mode')
    const userInfo = JSON.parse(localStorage.getItem("chat-app-userInfo")) ;
    api.get("/api/user/getInfo").then(data => {
      // console.log(data) ;
    })
    .catch((err) =>{})
    // console.log(userInfo) ;
    // setTheme("light")
    dispatch(logIn(userInfo)) ;
  } , []) ;


  return (
    <>
    <AlertProvider>
      {!user && <Homepage/>}
      {user && <Chatpage/>}
    </AlertProvider>
    </>
  );
}

export default App;
