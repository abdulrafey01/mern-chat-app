import { createSlice } from "@reduxjs/toolkit";
import { getChats, deleteChat } from "../features/chatActions";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    directChats: [],
    groupChats: [],
    error: null,
  },
  reducers: {
    // reset state
    resetChatState: (state) => {
      state.directChats = [];
      state.groupChats = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // getChats
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.directChats = action.payload.directChats;
      state.groupChats = action.payload.groupChats;
      console.log("Direct Chats", state.directChats);
      console.log("Group Chats", state.groupChats);
      state.error = null;
    });

    // getChats failure
    builder.addCase(getChats.rejected, (state, action) => {
      state.error = action.payload.error;
      state.directChats = [];
      state.groupChats = [];
    });

    builder.addCase(deleteChat.fulfilled, (state, action) => {
      state.directChats = state.directChats.filter(
        (chat) => chat._id !== action.payload._id
      );

      state.groupChats = state.groupChats.filter(
        (chat) => chat._id !== action.payload._id
      );

      state.error = null;
    });

    builder.addCase(deleteChat.rejected, (state, action) => {
      state.error = action.payload.error;
    });
  },
});

export const { resetChatState } = chatSlice.actions;
export default chatSlice.reducer;
