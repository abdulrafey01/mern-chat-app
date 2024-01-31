import React, { useEffect, useState } from "react";
import SingleChat from "./SingleChat";
import SingleUser from "./SingleUser";
import GroupUser from "./GroupUser";

import { createChat } from "../features/createChatActions";
import { useDispatch, useSelector } from "react-redux";

export default function ChatBubble({
  title,
  chats = [],
  users = [],
  groupusers = [],
  type, // to show groupname input field just for group creating bubble
}) {
  const dispatch = useDispatch();
  const { groupwith } = useSelector((state) => state.chatCreator);
  const { user } = useSelector((state) => state.auth);

  const createGroup = () => {
    dispatch(
      createChat({
        chatof: user._id,
        chatwith: groupwith,
        type: "group",
        groupname: groupName,
      })
    );
    setGroupName("");
  };

  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState("");
  return (
    <div className="w-[356px] h-[247px]  shadow-xl shadow-black  p-4 bg-gradient-to-tr from-rgba1 to-rgba3 rounded-[20px]">
      <div
        className={`relative ml-4 font-bold text-white font-rubik ${
          type === "group"
            ? "flex justify-around items-center ml-0"
            : "text-xl "
        } `}
      >
        {title}
        {type === "group" && (
          <>
            <div className="flex flex-row justify-center items-center">
              <input
                onChange={(e) => setGroupName(e.target.value)}
                className="h-6 w-15 p-2  outline-none rounded-md  text-[10px] text-black font-thin"
                placeholder="Group Name"
                type="text"
                value={groupName}
              />
              {/* <input
                onChange={(e) => setGroupName(e.target.value)}
                className="h-6 w-1/2 ml-2
                  outline-none rounded-md  text-[10px] text-black font-thin"
                placeholder="Group Name"
                type="file"
                value={groupName}
              /> */}
            </div>
            <div>
              <button
                onClick={createGroup}
                className="w-10 p-2 text-black rounded-md text-[10px] font-rubik"
              >
                Create
              </button>
            </div>
          </>
        )}
      </div>

      <div className="w-full h-[200px] pt-4 scrollbar flex flex-col overflow-auto gap-2">
        {/* if users are passed then render single user component else if groupusers are passed then render groupuser component else render singlechat */}

        {users.length > 0 ? (
          users.map((user) => <SingleUser key={user._id} user={user} />)
        ) : groupusers.length > 0 ? (
          groupusers.map((user) => <GroupUser key={user._id} user={user} />)
        ) : users.length === 0 &&
          groupusers.length === 0 &&
          chats.length === 0 ? (
          <div className="w-full h-[80%] flex justify-center items-center text-white">
            No Chats To Show
          </div>
        ) : (
          chats.map((chat) => <SingleChat key={chat._id} chat={chat} />)
        )}
      </div>
    </div>
  );
}
