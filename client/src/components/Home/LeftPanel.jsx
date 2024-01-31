import React, { useEffect, useState } from "react";
import HomeIcon from "../../assets/homeicon.svg?react";
import ChatIcon from "../../assets/chaticon.svg?react";
import MenuIcon from "../../assets/menuicon.svg?react";
import BellIcon from "../../assets/bellicon.svg?react";
import LogoutIcon from "../../assets/logouticon.svg?react";
import Avatar from "../../assets/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";

import { useNavigate } from "react-router-dom";
import {
  closeModal,
  openModal,
  resetModalState,
} from "../../features/modalSlice";
import { resetChatState } from "../../features/chatSlice";
import { resetCreateChatState } from "../../features/createChatSlice";
import { resetMessageState } from "../../features/messageSlice";
export default function LeftPanel() {
  const [activeIcon, setActiveIcon] = useState("home");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.modal);

  const handleLogout = () => {
    dispatch(resetChatState());
    dispatch(resetCreateChatState());
    dispatch(resetMessageState());
    dispatch(resetMessageState());
    dispatch(resetModalState());
    dispatch(logout());
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  // On closing Modal change active icons
  useEffect(() => {
    if (!isOpen) {
      setActiveIcon("home");
    }
  }, [isOpen]);
  const NavigationIcon = ({ icon, name }) => (
    <div
      className={`w-full flex justify-center items-center ${
        activeIcon === name ? "bg-[#11348F]" : ""
      } `}
    >
      {icon}
      <div
        className={`relative left-12 w-1 h-full ${
          activeIcon === name ? "bg-white" : ""
        } `}
      ></div>
    </div>
  );

  const icons = [
    {
      name: "home",
      icon: (
        <HomeIcon
          className="my-5 cursor-pointer"
          onClick={() => setActiveIcon("home")}
        />
      ),
    },
    {
      name: "chat",
      icon: (
        <ChatIcon
          className="my-5 cursor-pointer"
          onClick={() => {
            setActiveIcon("chat");
            dispatch(openModal());
          }}
        />
      ),
    },
    {
      name: "menu",
      icon: (
        <MenuIcon
          className="my-5 cursor-pointer"
          onClick={() => setActiveIcon("menu")}
        />
      ),
    },
    {
      name: "bell",
      icon: (
        <BellIcon
          className="my-5 cursor-pointer"
          onClick={() => setActiveIcon("bell")}
        />
      ),
    },
    {
      name: "logout",
      icon: (
        <LogoutIcon
          className="absolute cursor-pointer bottom-10 my-5"
          onClick={() => {
            handleLogout();
            navigate("/login");
          }}
        />
      ),
    },
  ];

  return (
    <div className="flex-1 flex justify-center items-center ">
      <div className="relative shadow-xl shadow-black flex flex-col items-center py-4 w-[114px] h-[520px] bg-gradient-to-b from-rgba1 to-rgba2 rounded-[20px]">
        <div className="w-12 h-12 my-4 rounded-full overflow-hidden">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {icons.map(({ name, icon }) => (
          <NavigationIcon key={name} name={name} icon={icon} />
        ))}
      </div>
    </div>
  );
}
