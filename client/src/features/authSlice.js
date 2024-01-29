import { createSlice } from "@reduxjs/toolkit";
import { signup, login } from "./authActions";
import { removeCookie, removeLocalStorage } from "../helpers/storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: null,
    error: null,
    registerMessage: null,
  },
  reducers: {
    logout: (state, action) => {
      removeCookie("token");
      removeLocalStorage("user");
      state.user = null;
      state.token = null;
      state.error = null;
      state.registerMessage = null;
    },
  },
  extraReducers: (builder) => {
    // signup success
    builder.addCase(signup.fulfilled, (state, action) => {
      const { message } = action.payload;
      state.registerMessage = message;
      state.error = null;
      state.user = null;
      state.token = null;
    });

    // signup failure
    builder.addCase(signup.rejected, (state, action) => {
      state.error = action.payload.error;
      state.user = null;
      state.token = null;
      state.registerMessage = null;
    });
    // login success
    builder.addCase(login.fulfilled, (state, action) => {
      const { authToken, user } = action.payload;
      state.user = user;
      state.token = authToken;
      state.error = null;
      state.registerMessage = null;
    });

    // login failure
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload.error;
      state.user = null;
      state.token = null;
      state.registerMessage = null;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
