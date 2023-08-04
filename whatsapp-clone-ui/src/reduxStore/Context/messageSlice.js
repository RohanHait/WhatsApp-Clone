import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name : "messages",
    initialState : {
        messages : []
    },
    reducers : {
        
        addMessages : (state,action)=>{
            state.messages = [action.payload , ...state.messages] ;
        },
        initialMessages : (state,action)=>{
            state.messages = action.payload ;
        }
    }
})


export const {addMessages,initialMessages} = messagesSlice.actions ;
export default messagesSlice.reducer ;