import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create Chat
export const createChat = createAsyncThunk(
  "chats/createChat",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/chat/create",
        body
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
