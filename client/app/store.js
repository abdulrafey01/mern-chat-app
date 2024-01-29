import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/features/authSlice";
import chatReducer from "../src/features/chatSlice";
import messageReducer from "../src/features/messageSlice";
import modalReducer from "../src/features/modalSlice";
import userReducer from "../src/features/userSlice";
import createChatReducer from "../src/features/createChatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatReducer,
    messages: messageReducer,
    modal: modalReducer,
    users: userReducer,
    chatCreator: createChatReducer,
  },
});
