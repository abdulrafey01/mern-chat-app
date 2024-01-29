import React, { useEffect } from "react";
import ChatBubble from "../ChatBubble";
import { useSelector, useDispatch } from "react-redux";
import { getChats } from "../../features/chatActions";
import { toast } from "react-toastify";
import { getAllUsers } from "../../features/userActions";
import { socket } from "../../helpers/socket";
export default function MiddlePanel() {
  const dispatch = useDispatch();

  // Accessing Chats
  const { directChats, groupChats, error } = useSelector(
    (state) => state.chats
  );

  // Accessing Users Error
  const { allUsers, usersError } = useSelector((state) => state.users);

  // Accessing User
  const { user } = useSelector((state) => state.auth);

  // Fetching Chats
  useEffect(() => {
    if (!user) return;
    dispatch(getChats(user));
  }, []);

  // Fetching Users
  useEffect(() => {
    if (!user) return;
    dispatch(getAllUsers());
  }, []);

  // Error Handling Users
  useEffect(() => {
    if (usersError) {
      toast.error("Error While Dispatching Users");
    }
  }, [usersError]);

  // Error Handling Chats and joining sockets
  useEffect(() => {
    if (directChats) {
      directChats.forEach((chat) => {
        socket.emit("join_room", chat._id);
      });
    }
    if (groupChats) {
      groupChats.forEach((chat) => {
        socket.emit("join_room", chat._id);
      });
    }
    if (error) {
      toast.error("Error While Dispatching Chats");
    }
  }, [directChats, groupChats]);

  return (
    <div className="flex-[2] px-4 flex flex-col  justify-center space-y-9">
      <ChatBubble title={"Personal"} chats={directChats} />
      <ChatBubble title={"Groups"} chats={groupChats} />
    </div>
  );
}
