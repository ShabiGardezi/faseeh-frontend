"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineAttachEmail } from "react-icons/md";
import MediaPlayer from "@/components/shared/MediaPlayer";
import { ImagesSliderShower } from "@/components/shared/ImagesSliderShower";

function ContactUsPage({ showHeroSection = true }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    // Clear the form fields after submission
    reset();
  };

  return (
    <div className="overflow-x-hidden text-white">
      {/* hero section  */}
      {showHeroSection && (
        <ImagesSliderShower title="Contact Us" pageName="Contact Us" />
      )}

      {/* contact us section  */}
      <div className="w-full flex flex-col items-center gap-2 pb-5">
        <span className="inline-block mt-20 text-2xl uppercase border-b-4 text-blue-600">
          Contact Us
        </span>

        <p
          data-aos="fade-up"
          className="text-4xl font-extrabold text-md text-opacity-85 font_barlow text-center md:w-[35%]"
        >
          Get In Touch Today
        </p>

        <p
          data-aos="fade-up"
          className="mt-2 text-md text-opacity-85 font_barlow text-center p-2"
        >
          Get in touch with us to book your appointment. Call us directly or
          fill out the contact information form because, We Come To You!
        </p>
      </div>

      {/* contact details  */}
      <div className="min-h-[40vh] grid grid-cols-1 md:grid-cols-3 gap-5 m-5 md:mx-10">
        <div className="bg-base-300 flex flex-col gap-5 items-center justify-center rounded-3xl text-white p-5">
          <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center">
            <IoLocationOutline className="text-5xl text-white" />
          </div>

          <h1 className="text-2xl font-bold">Address</h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-md text-opacity-85 font_barlow text-center "
          >
            Plot# 90, Block D2, Phase 1 Johar Town, Lahore
          </p>
        </div>
        <div className="bg-blue-600 flex flex-col gap-5 items-center justify-center rounded-3xl text-white p-5">
          <div className="bg-base-300 w-20 h-20 rounded-full flex items-center justify-center">
            <LuPhoneCall className="text-5xl text-white" />
          </div>

          <h1 className="text-2xl font-bold">Phone Number</h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-md text-opacity-85 font_barlow text-center "
          >
            04232322782
            <br />
            03000332782
          </p>
        </div>
        <div className="bg-base-300 flex flex-col gap-5 items-center justify-center rounded-3xl text-white p-5">
          <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center">
            <MdOutlineAttachEmail className="text-5xl text-white" />
          </div>

          <h1 className="text-2xl font-bold">Our Mailbox</h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-md text-opacity-85 font_barlow text-center "
          >
            info@rankbpo.com
          </p>
        </div>
      </div>

      {/* contact form  */}
      <div className="min-h-[60vh] rounded-3xl grid grid-cols-1 md:grid-cols-[1fr_1fr] m-5 md:m-20">
        {/* left side  */}
        <div
          className=" text-black rounded-3xl shadow-xl bg-[#001b47]/30 p-5 md:p-10"
          data-aos="fade-right"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border text-gray-200 bg-white/10 border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-2">Name is required</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-400"
              >
                Phone
              </label>
              <input
                type="number"
                id="phone"
                {...register("phone", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border text-gray-200 bg-white/10 border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">Phone is required</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className={`mt-1 block w-full px-3 py-2 border text-gray-200 bg-white/10 border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">Email is required</p>
              )}
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-400"
              >
                Message
              </label>
              <textarea
                type="text"
                id="message"
                {...register("message", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border text-gray-200 bg-white/10 border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.message ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">Message is required</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#314361d3] text-white p-4 mt-10 rounded-md hover:bg-[#283750d3] focus:outline-none focus:ring-2 focus:ring-[#0c131fd3] focus:ring-offset-2"
            >
              Send
            </button>
          </form>
        </div>

        {/* right side  */}
        <div className="w-full hidden md:block" data-aos="fade-left">
          <MediaPlayer src={"/videos/Contact Us.json"} />
        </div>
      </div>

      {/* location  */}
      <div className="w-full h-[70vh]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.3425370187233!2d74.28167577496285!3d31.459762250135157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905a8d2b043c1%3A0xa44ac366851e4f27!2sRank%20BPO%20Pvt%20Ltd.!5e0!3m2!1sen!2s!4v1726672885485!5m2!1sen!2s"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUsPage;
