import { createSlice } from "@reduxjs/toolkit";
import { createChat } from "./createChatActions";

const createChatSlice = createSlice({
  name: "createChat",
  initialState: {
    isChatCreated: null,
    error: null,
    groupwith: [],
  },
  reducers: {
    addMember: (state, action) => {
      state.groupwith.push(action.payload);
    },
    removeMember: (state, action) => {
      state.groupwith = state.groupwith.filter(
        (user) => user._id !== action.payload._id
      );
    },
    resetCreateChatState: (state) => {
      state.isChatCreated = null;
      state.groupwith = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // createChat
    builder.addCase(createChat.fulfilled, (state, action) => {
      state.isChatCreated = true;
      state.error = null;
    });
    // createChat failure
    builder.addCase(createChat.rejected, (state, action) => {
      state.isChatCreated = false;
      state.error = action.payload;
    });
  },
});

export const { addMember, removeMember, resetCreateChatState } =
  createChatSlice.actions;
export default createChatSlice.reducer;
