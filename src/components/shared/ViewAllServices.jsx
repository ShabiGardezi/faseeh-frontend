"use client";
import { useRouter } from "next/navigation";
import React from "react";

function ViewAllServices() {
  const router = useRouter();

  return (
    <div
      className="text-white/80 p-10 flex flex-col justify-center items-center"
      data-aos="fade-left"
    >
      <span className="inline-block mt-5 text-2xl uppercase border-b-4 border-blue-600">
        Services
      </span>

      <h1
        data-aos="fade-down"
        className="mt-10 text-xl md:text-3xl font-extrabold"
      >
        Explore Our Proud Services
      </h1>

      <p className="max-w-md mt-3 text-lg text-center text-opacity-85 font_barlow">
        Here are the services that we offer here at Rank BPO to optimize sales
        processes and maximize results
      </p>

      <button
        onClick={() => router.push("/services")}
        className="mt-8 px-4 py-2 rounded-md text-sm font-medium text-white bg-[#005bea] hover:bg-[#0046b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005bea]"
      >
        Veiw All Services
      </button>
    </div>
  );
}

export default ViewAllServices;
