import React from "react";
import Input from "../components/Input";
import PcLogo from "../assets/logincomputer.svg?react";
import Icons from "../assets/socialmediaicons.svg?react";

export default function Login() {
  return (
    <div className="h-screen bg-[#EBEFFF] flex">
      <div className="flex-[2] flex justify-center items-center">
        <div className="absolute left-[-252px] bottom-[-150px] w-[553px] z-10 h-[131px] rotate-[-41.1deg] rounded-[105px] bg-[#AFB3FF]"></div>
        <div className="absolute left-[-287px] bottom-[-160px] w-[596px] h-[141px] rotate-[-41.1deg] rounded-[105px] bg-[#838CF1]"></div>
        <div className="relative right-12 flex flex-col gap-1 items-center justify-center">
          <div className="font-bold font-sans">Welcome Back!</div>
          <Input title="Email" />
          <Input title="Password" />
          <button className="w-[365px] m-2 h-[34px] rounded-[50px] bg-[#656ED3] text-white hover:bg-[#2d2660]">
            Login
          </button>
          <div className="m-2 cursor-pointer">
            Dont have and account? Register{" "}
          </div>
          <Icons className="mt-4" />
        </div>
      </div>
      <div className="flex-[1] bg-[#AFB3FF]">
        <PcLogo className="absolute left-[565px] top-[-37px]" />
      </div>
    </div>
  );
}
