import React, { useEffect, useState } from "react";

import Avatar from "../assets/avatar.png";
import { createChat } from "../features/createChatActions";
import { useDispatch, useSelector } from "react-redux";
import { addMember, removeMember } from "../features/createChatSlice";
export default function GroupUser({ user: otherUser }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleAddParticipants = (e) => {
    if (e.target.checked) {
      dispatch(addMember(otherUser));
    }
    if (!e.target.checked) {
      dispatch(removeMember(otherUser));
    }
  };

  return (
    <div className="w-full cursor-pointer  flex flex-row space-x-2 items-center ">
      <div className="w-12 h-12  rounded-full overflow-hidden">
        <img src={Avatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <div className="relative w-[230px] h-[50px] bg-white rounded-[18px] p-2 flex">
        <div>
          <div className="font-bold font-rubik text-[12px]">
            {otherUser.username}
          </div>
          <div className="font-rubik text-[10px]">{otherUser.email}</div>
        </div>
        <div className="absolute top-3 right-3 ">
          <input
            onChange={handleAddParticipants}
            className="rounded-4 accent-rgba1"
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
}
