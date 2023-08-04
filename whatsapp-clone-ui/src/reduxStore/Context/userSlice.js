import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name : "user",
    initialState : {
        user : null,
        theme : 'dark'
    } ,
    reducers : {
        logIn : (state,action) => {state.user = action.payload },
        logOut : state => {state.user = null},
        changeTheme : (state, action) => {state.theme = action.payload} 
    }
})

export const {logIn , logOut} = userSlice.actions  ;
export default userSlice.reducer ;