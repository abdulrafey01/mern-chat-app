import React, { useEffect, useState } from "react";
import Mic from "../assets/micicon.svg?react";
import Clip from "../assets/clipicon.svg?react";
import { useSelector } from "react-redux";
import { socket } from "../helpers/socket";
export default function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const user = useSelector((state) => state.auth.user);
  const { currentChatWith, currentChat } = useSelector(
    (state) => state.messages
  );

  const handleEnterKey = (event) => {
    // check if enter key is pressed
    if (event.key === "Enter") {
      event.preventDefault();

      // send message
      socket.emit("message", {
        chatId: currentChat._id,
        from: {
          _id: user._id,
          username: user.username,
        },
        to: {
          _id: currentChatWith._id,
        },
        message: inputValue,
        type: currentChat.type,
        groupname: currentChat.groupname,
      });
      setInputValue("");
      event.target.blur();
    }
  };
  return (
    <div className="w-full items-center flex gap-4 ">
      <div className="w-full rounded-3xl flex items-center justify-start h-20  bg-gradient-to-r from-rgba7 to-rgba8">
        <div className="ml-6">
          <Clip className="cursor-pointer" />
        </div>
        <input
          className="w-full h-full bg-transparent text-white outline-none p-4"
          placeholder="Enter Your Message"
          onKeyDown={handleEnterKey}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
        />
      </div>
      <div className="w-16 h-16 flex justify-center items-center cursor-pointer  bg-gradient-to-tr from-rgba8 to-rgba7 rounded-3xl">
        <Mic />
      </div>
    </div>
  );
}
