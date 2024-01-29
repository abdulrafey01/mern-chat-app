import React from "react";
import { useSelector } from "react-redux";

export default function Message({ myMessage, content, from }) {
  const { currentChatWith } = useSelector((state) => state.messages);
  return (
    <>
      {myMessage ? (
        <div className="w-[15rem] flex flex-col items-end h-20 self-end">
          <div className="w-full px-4 h-16 bg-white text-black flex items-center font-rubik rounded-3xl rounded-tr-none">
            {content}
          </div>
          <div className="w-[5rem] h-4 text-sm text-end text-white font-rubik"></div>
        </div>
      ) : (
        <div className="w-[15rem] flex flex-col items-start h-20">
          <div className="w-full px-4 h-16 bg-[#11348F] text-white flex items-center font-rubik rounded-3xl rounded-tl-none">
            {content}
          </div>
          <div className="w-[5rem] h-4 text-sm text-white font-rubik">
            {currentChatWith.type === "group" ? from : ""}
          </div>
        </div>
      )}
    </>
  );
}
