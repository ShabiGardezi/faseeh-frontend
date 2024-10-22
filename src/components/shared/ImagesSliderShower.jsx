"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";
import { FaArrowLeftLong } from "react-icons/fa6";

export function ImagesSliderShower({ title = "main title", pageName }) {
  const images = [
    "/images/589-scaled-1-1536x1024-1.jpg",
    "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
    "/images/business-meeting-and-teamwork-by-business-people-REGXPAZ.jpg",
    "/images/business-meeting-in-modern-conference-room.jpg",
    "/images/creative-business-people-working-on-business-project-1536x1024-1.jpg",
    "/images/managers-analyzing-reports-1536x1024-1.jpg",
    "/images/Mockup-3.jpg",
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold capitalize text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          {title}
        </motion.p>
        {pageName && (
          <button className="px-4 py-2 backdrop-blur-sm border bg-blue-300/10 border-blue-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>
            بيت
              <>
                <span className="text-blue-400 text-lg font-extrabold "><FaArrowLeftLong className="text-lg inline mx-2"/></span>
                <span>{pageName}</span>
              </>
            </span>
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent" />
          </button>
        )}
      </motion.div>
    </ImagesSlider>
  );
}
