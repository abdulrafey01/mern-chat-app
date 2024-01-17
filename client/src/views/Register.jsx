import React from "react";
import PcLogo from "../assets/registercomputer.svg?react";
import Input from "../components/Input";
import Icons from "../assets/socialmediaicons.svg?react";
export default function Register() {
  return (
    <div className="flex flex-row bg-[#EBEFFF] h-screen justify-center items-center ">
      <div className=" h-full flex-1 flex ">
        <PcLogo className="absolute z-20 w-[436px] h-[392px] left-[163px] top-[170px]" />
        <div className="z-10  w-[535px] h-[277px] bg-[#AFB3FF] rounded-[105px] rotate-90"></div>
        <div className="absolute w-[520px] h-[275px] bg-[#656ED3] rotate-[-97.17deg] rounded-[105px]"></div>
      </div>
      <div className="h-full flex-1 flex justify-center items-center">
        <div className="0  flex items-center flex-col">
          <div className="font-bold font-sans">
            Please Fill out form to Register!
          </div>
          <div className="flex flex-col items-center w-full m-3">
            <Input title="Full name" />
            <Input title="Username" />
            <Input title="Email" />
            <Input title="Password" />
            <Input title="Confirm Password" />
            <button className="w-[365px] m-2 h-[34px] rounded-[50px] bg-[#656ED3] text-white hover:bg-[#2d2660]">
              Register
            </button>
            <div className="m-2">Yes i have an account? Login </div>
            <Icons />
          </div>
        </div>
      </div>
    </div>
  );
}
