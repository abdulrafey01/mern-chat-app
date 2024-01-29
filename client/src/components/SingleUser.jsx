import React, { useEffect } from "react";

import Avatar from "../assets/avatar.png";
import { createChat } from "../features/createChatActions";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modalSlice";
import { toast } from "react-toastify";
export default function SingleUser({ user: otherUser }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      onClick={() => {
        dispatch(
          createChat({
            chatof: user._id,
            chatwith: otherUser._id,
            type: "direct",
          })
        );
      }}
      className="w-full cursor-pointer  flex flex-row space-x-2 items-center "
    >
      <div className="w-12 h-12  rounded-full overflow-hidden">
        <img src={Avatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <div className="w-[230px] h-[50px] bg-white rounded-[18px] p-2">
        <div className="font-bold font-rubik text-[12px]">
          {otherUser.username}
        </div>
        <div className="font-rubik text-[10px]">{otherUser.email}</div>
      </div>
    </div>
  );
}
