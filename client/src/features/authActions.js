import { setCookie, setLocalStorage } from "../helpers/storage";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const signup = createAsyncThunk(
  "/auth/signup",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/signup",
        body
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const login = createAsyncThunk(
  "/auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        body
      );
      const { authToken, user } = data;
      setCookie("token", authToken);
      setLocalStorage("user", user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export { signup, login };
