import React from "react";

export default function Input({ title, onChange, value, type = "text" }) {
  return (
    <>
      <div className="w-full ml-10">{title}</div>
      <input
        className={`w-[367px] h-[34px] rounded-[50px] border-[#656ED3] border-[1px] m-2 outline-none ${
          type === "file" ? "p-2 ml-8 h-10 border-none" : "p-4"
        }`}
        type={type}
        onChange={onChange}
        value={value}
      />
    </>
  );
}
