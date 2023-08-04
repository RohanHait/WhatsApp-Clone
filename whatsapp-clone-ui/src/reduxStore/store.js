import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Context/userSlice'
import chatsSlice from './Context/chatSlice'
import messageSlice from './Context/messageSlice'
export const store = configureStore({
  reducer: {
    user : userSlice,
    chats : chatsSlice,
    messages : messageSlice
  },
})