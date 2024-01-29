import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./userActions";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    usersError: null,
  },
  reducers: {
    // reset state
    resetAuthState: (state) => {
      state.allUsers = [];
      state.usersError = null;
    },
  },
  extraReducers: (builder) => {
    // getUsers
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
      console.log("All Users", state.allUsers);
      state.usersError = null;
    });

    // getUsers failure
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.usersError = action.payload.error;
    });
  },
});

export const { resetAuthState } = usersSlice.actions;
export default usersSlice.reducer;
