import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },

    resetModalState: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal, resetModalState } = modalSlice.actions;
export default modalSlice.reducer;
