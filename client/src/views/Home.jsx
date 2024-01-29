import React, { useState } from "react";

import LeftPanel from "../components/Home/LeftPanel";

import MiddlePanel from "../components/Home/MiddlePanel";
import RightPanel from "../components/Home/RightPanel";
import Modal from "../components/Modal";
export default function Home() {
  return (
    <div className="flex bg-white h-screen">
      <Modal />
      <LeftPanel />
      <MiddlePanel />
      <RightPanel />
    </div>
  );
}
