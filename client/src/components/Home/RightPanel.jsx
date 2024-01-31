import React, { useEffect, useState } from "react";
import ChatNav from "../ChatNav";
import AllMessages from "../AllMessages";
import ChatInput from "../ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../features/messageSlice";
import { socket } from "../../helpers/socket";
import { toast } from "react-toastify";
export default function RightPanel() {
  const dispatch = useDispatch();
  const { notifiedMessages, chatMessages, currentChatWith, currentChat } =
    useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // filtering so that updated messages come not from db
    setMessages(chatMessages.filter((m) => m.chatId === currentChat?._id));
    console.log(chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      // if respective chat is open on other end then append only else just notify

      // if chat is closed from which message came then notify
      if (data.chatId !== currentChat?._id) {
        if (data.type === "group") {
          toast.success(`Message came from ${data.groupname}`);
        } else {
          toast.success(`Message came from ${data.from.username}`);
        }
      }
      dispatch(addMessage(data));
      console.log(data);
    };

    socket.on("receive_message", receiveMessageHandler);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [currentChat]);

  return (
    <div className="flex-[3] flex items-center">
      <div className="w-[35rem] h-[33rem] flex flex-col items-center shadow-xl shadow-black p-4 rounded-3xl bg-gradient-to-br from-rgba5 to-rgba6">
        <ChatNav
          name={currentChatWith.username}
          email={currentChatWith.email}
          avatar={currentChatWith.avatar}
          setMessages={setMessages}
        />
        <AllMessages messages={messages} />
        {messages.length > 0 && <ChatInput />}
      </div>
    </div>
  );
}
