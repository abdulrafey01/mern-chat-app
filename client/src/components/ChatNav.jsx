import React from "react";

import Avatar from "../assets/groupicon.png";
import Call from "../assets/call.svg?react";
import VideoCall from "../assets/videocall.svg?react";
import Menu from "../assets/chatmenu.svg?react";
import GoBack from "../assets/backicon.svg?react";
import { resetMessageState } from "../features/messageSlice";
import { useDispatch } from "react-redux";
export default function ChatNav({ name, email, avatar, setMessages }) {
  const dispatch = useDispatch();
  return (
    <div className="w-[95%] h-[13%] flex justify-center items-center rounded-3xl bg-gradient-to-b from-rgba1 to-rgba4">
      <div className="flex-1 flex gap-4 px-4  ">
        <div className="w-12 h-12  rounded-full overflow-hidden">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={Avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <div className="font-bold font-rubik text-white">
            {name ? name : "No Chat Selected"}
          </div>
          <div className="font-rubik text-[10px] text-white">{email}</div>
        </div>
      </div>
      <div className="flex-1 flex justify-end gap-8 items-center px-4">
        <Call className="cursor-pointer" />
        <VideoCall className="cursor-pointer" />
        <Menu className="cursor-pointer" />
        <GoBack
          className="cursor-pointer w-6 h-6"
          onClick={() => {
            dispatch(resetMessageState());
            setMessages([]);
          }}
        />
      </div>
    </div>
  );
}
