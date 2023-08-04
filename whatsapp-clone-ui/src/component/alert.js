import React, { createContext,useState,useContext} from "react";
import { ToastContainer} from "react-toastify";

const alertContext = createContext();
const AlertProvider = ({ children }) => {
    const [toastTheme, setToastTheme] = useState('light')
    const changeToastTheme = (s) => setToastTheme(s) ;
  return (
    <alertContext.Provider value={{changeToastTheme}}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme= {toastTheme}
      />
      {/* Same as */}
      <ToastContainer />
    </alertContext.Provider>
  );
};
export default AlertProvider;
export const AlertState = () => useContext(alertContext);
;
