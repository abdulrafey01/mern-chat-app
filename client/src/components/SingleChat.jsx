import React, { useEffect } from "react";

import Avatar from "../assets/groupicon.png";
import BasketIcon from "../assets/basketicon.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { resetMessageState, showMessages } from "../features/messageSlice";

import { socket } from "../helpers/socket";
import { deleteChat } from "../features/chatActions";
export default function SingleChat({ chat }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentMessages, chatMessages, currentChatWith } = useSelector(
    (state) => state.messages
  );

  // useEffect(() => {
  //   console.log("chat messages", chatMessages);
  // }, [chatMessages]);
  return (
    <div className="relative w-full  flex flex-row space-x-2 items-center ">
      <div className="w-12 h-12  rounded-full overflow-hidden">
        <img
          src={
            chat.type === "direct"
              ? user._id === chat.chatof._id //to show the name of other person not of the logged in user
                ? chat.chatwith[0].avatar
                : chat.chatof.avatar
              : Avatar
          }
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        onClick={() => {
          // socket.emit("join_room", chat._id);

          dispatch(
            showMessages({
              messages:
                //  if not changing the chat then show same chat messages otherwise show messages of respective chat
                currentChatWith._id === chat._id
                  ? // if messages are shown first and again clicking on same chat then show latest messages not from chat.messages bcz they are from db and not update until refresh
                    currentMessages
                  : chat.messages,
              chatwith:
                // if direct chat then show other person else show group name
                chat.type === "direct"
                  ? user._id === chat.chatof._id //to select  other person not  the logged in user
                    ? { ...chat.chatwith[0], type: "direct" }
                    : { ...chat.chatof, type: "direct" }
                  : {
                      _id: chat._id,
                      username: chat.groupname,
                      email: `Admin: ${chat.chatof.username}`,
                      type: "group",
                    },
              currentchat: chat,
            })
          );
          console.log(currentChatWith);
        }}
        className="relative w-[230px] h-[50px] cursor-pointer bg-white rounded-[18px] p-2 flex flex-row"
      >
        <div>
          <div className="font-bold font-rubik text-[12px]">
            {chat.type === "direct"
              ? user._id === chat.chatof._id //to show the name of other person not of the logged in user
                ? chat.chatwith[0].username
                : chat.chatof.username
              : chat.groupname}
          </div>
          <div className="font-rubik text-[10px]">
            {chat.messages[chat.messages.length - 1]
              ? chat.messages[chat.messages.length - 1].message
              : "No Messages Yet"}
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          dispatch(deleteChat(chat._id));
          dispatch(resetMessageState());
        }}
      >
        <BasketIcon className="w-6 h-6 absolute right-2  top-3 cursor-pointer" />
      </div>
    </div>
  );
}
