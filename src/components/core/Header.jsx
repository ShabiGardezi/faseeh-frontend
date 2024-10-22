import React from "react";
import { Navbar } from "../ui/navbar";

function Header() {
  return (
    <div  className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#DEF4F7] w-[80vw] border-2 border-base-400 rounded-box px-5 shadow-xl" >
    <Navbar />
  </div>
  );
}

export default Header;
