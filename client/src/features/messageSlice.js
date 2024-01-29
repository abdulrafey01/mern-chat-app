import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    chatMessages: [],
    currentMessages: [],
    currentChatWith: [],
    notifiedMessages: [],
    currentChat: null,
    error: null,
  },
  reducers: {
    showMessages: (state, action) => {
      // add unread messages
      let newMessages = state.notifiedMessages.filter((m) => {
        return m.chatId === action.payload.currentchat._id;
      });
      state.chatMessages.push({
        chatId: action.payload.currentchat._id,
        messages: action.payload.messages.concat(newMessages),
      });

      // set current messages
      state.chatMessages.forEach((chat) => {
        if (chat.chatId === action.payload.currentchat._id) {
          state.currentMessages = chat.messages;
        }
      });

      state.currentChatWith = action.payload.chatwith;
      state.currentChat = action.payload.currentchat;
      console.log("Messages to show", state.chatMessages);
      state.error = null;
    },
    addMessage: (state, action) => {
      // state.messages = [...state.messages, action.payload];
      let found = false;
      state.chatMessages.forEach((chat) => {
        if (chat.chatId === action.payload.chatId) {
          chat.messages = [...chat.messages, action.payload];
          found = true;
        }
      });

      if (!found) {
        state.notifiedMessages.push(action.payload);
      }

      //  to solve double click
      state.currentMessages = [...state.currentMessages, action.payload];
      console.log("Messages after adding", state.chatMessages);
      state.error = null;
    },

    resetMessageState: (state) => {
      state.messages = [];
      state.currentChatWith = [];
      state.currentMessages = [];
      state.currentChat = null;
      state.error = null;
      state.notifiedMessages = [];
    },
  },
});

export const { showMessages, addMessage, resetMessageState } =
  messageSlice.actions;
export default messageSlice.reducer;
