import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";

export default function AllMessages({ messages }) {
  const { user } = useSelector((state) => state.auth);

  const messagesContainerRef = useRef();

  // scroll to bottom on new message
  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);
  return (
    <div
      ref={messagesContainerRef}
      className="w-full flex-1 flex-col scrollbar flex p-2 gap-1 my-2 h-40 overflow-y-auto "
    >
      <div className="flex-grow "></div>
      {messages[0]?.messages.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center text-white">
          No Messages To Show
        </div>
      ) : (
        messages[0]?.messages.map((message) => {
          return (
            <Message
              key={message._id}
              myMessage={
                // checking if the message is from logged in user
                message.from._id === user._id
              }
              content={message.message}
              from={message.from.username}
            />
          );
        })
      )}
    </div>
  );
}
