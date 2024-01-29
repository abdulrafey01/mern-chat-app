import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get All Users
export const getAllUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/users");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
