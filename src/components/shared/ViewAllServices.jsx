"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

function ViewAllServices() {
  const router = useRouter();

  return (
    <div
      className="bg-[#FFFFFF] text-black/80 p-10 flex flex-col justify-center items-center"
      data-aos="fade-left"
    >
      <span className="inline-block mt-5 text-2xl uppercase border-b-4 border-[#20b1c9]">
        خدمات
      </span>

      <h1
        data-aos="fade-down"
        className="mt-10 text-xl md:text-3xl font-extrabold"
      >
        استكشف خدماتنا التي نفخر بها
      </h1>

      <p className="max-w-md mt-3 text-lg text-center text-opacity-85 font_barlow">
        إليك الخدمات التي نقدمها هنا في فصيح
      </p>

      <Button
        type="button"
        onClick={() => router.push("/services")}
        className="mt-8"
      >
        عرض جميع الخدمات
      </Button>
    </div>
  );
}

export default ViewAllServices;
