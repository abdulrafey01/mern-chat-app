import React, { useEffect, useState } from "react";
import PcLogo from "../assets/registercomputer.svg?react";
import Input from "../components/Input";
import Icons from "../assets/socialmediaicons.svg?react";

import { useSelector, useDispatch } from "react-redux";
import { signup } from "../features/authActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetError, resetRegisterMessage } from "../features/authSlice";
export default function Register() {
  const { registerMessage, error, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState("");
  const handleSignup = () => {
    if (password !== confirmPassword) {
      return toast.error("Password does not match");
    }
    if (!firstName || !lastName || !email || !password) {
      return toast.error("All fields are required");
    }

    const formData = new FormData();
    formData.append("username", firstName + " " + lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", file);
    dispatch(signup(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // if (error) {
    //   toast.error(error);
    //   dispatch(resetError());
    // }
  }, [user, error]);

  useEffect(() => {
    console.log(file);
  }, [file]);

  useEffect(() => {
    if (registerMessage) {
      toast.success(registerMessage);
      dispatch(resetRegisterMessage());
      navigate("/login");
    }
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [registerMessage, error]);
  return (
    <div className="flex flex-row bg-[#EBEFFF] h-screen justify-center items-center ">
      <div className=" h-full max-lg:hidden flex-1 flex ">
        <PcLogo className="absolute z-20 w-[436px] h-[392px] left-[163px] top-[170px]" />
        <div className="z-10  w-[535px] h-[277px] bg-[#AFB3FF] rounded-[105px] rotate-90"></div>
        <div className="absolute w-[520px] h-[275px] bg-[#656ED3] rotate-[-97.17deg] rounded-[105px]"></div>
      </div>
      <div className="h-full flex-1 flex justify-center items-center">
        <div className="max-sm:w-[90%]  flex items-center flex-col">
          <div className="font-bold font-sans">
            Please Fill out form to Register!
          </div>
          <div className="flex flex-col items-center w-full m-3">
            <Input
              title="First name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <Input
              title="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <Input
              title="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />
            <Input
              title="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            <Input
              title="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
            />
            <div className="w-full ml-10">Choose Your Avatar</div>
            <input
              className=" m-2 outline-none"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              onClick={handleSignup}
              className="w-[365px] m-2 h-[34px] rounded-[50px] bg-[#656ED3] text-white hover:bg-[#2d2660]"
            >
              Register
            </button>
            <div
              onClick={() => navigate("/login")}
              className="m-2 cursor-pointer"
            >
              Yes i have an account?{" "}
              <span className="hover:text-[#656ED3]"> Login </span>
            </div>
            <Icons />
          </div>
        </div>
      </div>
    </div>
  );
}
