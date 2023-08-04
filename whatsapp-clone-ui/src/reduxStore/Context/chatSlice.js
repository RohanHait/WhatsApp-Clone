import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
    name : "chats",
    initialState : {
        selectedChat : null,
        chat : [] ,
    },
    reducers : {
        selectChat : (state, action)=>{
            state.selectedChat = action.payload ;
        },
        addChat : (state,action)=>{
            state.chat = [...state.chat,action.payload] ;
        },
        initialChat : (state,action)=>{
            state.chat = action.payload ;
        }
    }
})


export const {selectChat,addChat,initialChat} = chatsSlice.actions ;
export default chatsSlice.reducer ;