import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "../assets/closecircle.svg?react";
import { closeModal } from "../features/modalSlice";
import ChatBubble from "./ChatBubble";
import { toast } from "react-toastify";
import { getChats } from "../features/chatActions";
import { resetCreateChatState } from "../features/createChatSlice";

export default function Modal() {
  const { user } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.modal);
  const { allUsers } = useSelector((state) => state.users);
  const { directChats } = useSelector((state) => state.chats);
  const { isChatCreated, error, groupwith } = useSelector(
    (state) => state.chatCreator
  );
  const dispatch = useDispatch();

  // Filtered Users (Including only with new chats)
  const [filteredUsers, setFilteredUsers] = useState([]);

  // On chat created
  useEffect(() => {
    if (isChatCreated) {
      toast.success("Chat Created Successfully");
      dispatch(closeModal());
      dispatch(getChats(user));
      dispatch(resetCreateChatState());
    }
    if (error) {
      toast.error("Error While Creating Chat");
      dispatch(resetCreateChatState());
    }
  }, [isChatCreated, error]);

  useEffect(() => {
    console.log(groupwith);
  }, [groupwith]);

  // Filtering those users whose chat are not created yet.
  // Useffect will run when both allUsers and directChats are updated
  useEffect(() => {
    setFilteredUsers(
      directChats.length > 0
        ? allUsers.filter(
            (singleUser) =>
              // singleUser._id == user._id && // Exclude logged-in user
              !directChats.some(
                (chat) =>
                  chat.chatof._id === singleUser._id ||
                  chat.chatwith.some((u) => u._id === singleUser._id)
              )
          )
        : allUsers
    );
  }, [allUsers, directChats]);

  return (
    <div
      className={`w-full h-full z-10 absolute  ${
        isOpen ? "block" : "hidden"
      } flex justify-center items-center`}
    >
      <div className="relative h-[20rem] w-[60rem] max-w-[80%] flex justify-center gap-10 items-center bg-gradient-to-tr from-rgba1 to-rgba3 shadow-xl shadow-black rounded-[20px]">
        <CloseIcon
          className="cursor-pointer w-6 h-6 absolute top-0 right-0 m-5"
          onClick={() => {
            dispatch(closeModal());
          }}
        />
        <ChatBubble title={"Chat with"} users={filteredUsers} />
        <ChatBubble title={"Group with"} groupusers={allUsers} type="group" />
      </div>
    </div>
  );
}
