import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getChats = createAsyncThunk(
  "chats/getChats",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/chat/all/${user._id}`
      );

      let chats = { groupChats: [], directChats: [] };

      data.forEach((chat) => {
        if (chat.type === "group") {
          chats.groupChats.push(chat);
        } else {
          chats.directChats.push(chat);
        }
      });
      return chats;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteChat = createAsyncThunk(
  "chats/deleteChat",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/chat/delete/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
