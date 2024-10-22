"use client";
import React from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function ButtonBorderGradient({ text = "Button", onClick=()=>{console.log('button clicked')} }) {
  return (
    <div className="" onClick={onClick}>
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-blue-600 bg-white text-black dark:text-white flex items-center space-x-2 px-10 py-3"
      >
        <span>{text}</span>
      </HoverBorderGradient>
    </div>
  );
}
