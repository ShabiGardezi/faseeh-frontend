"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineAttachEmail } from "react-icons/md";
import MediaPlayer from "@/components/shared/MediaPlayer";

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

      {/* contact us section  */}
      <div className="w-full flex flex-col items-center gap-2 pb-5 mt-[20%] md:mt-[4%]">
        <span className="inline-block mt-20 text-2xl uppercase border-b-4 text-[#20b1c9]">
          تواصل معنا
        </span>

        <p
          data-aos="fade-up"
          className="text-4xl font-extrabold text-md text-opacity-85 font_barlow text-center md:w-[35%]"
        >
          تواصل معنا اليوم
        </p>

        <p
          data-aos="fade-up"
          className="mt-2 text-md text-opacity-85 font_barlow text-center p-2"
        >
          تواصل معنا لحجز موعدك. اتصل بنا مباشرة أو املأ نموذج معلومات الاتصال
          لأننا نأتي إليك!
        </p>
      </div>

      {/* contact details  */}
      <div className="min-h-[40vh] grid grid-cols-1 md:grid-cols-3 gap-5 m-5 md:mx-10">
        <div className="bg-base-300 flex flex-col gap-5 items-center justify-center rounded-3xl text-white p-5">
          <div className="bg-[#20b1c9] w-20 h-20 rounded-full flex items-center justify-center">
            <IoLocationOutline className="text-5xl text-white" />
          </div>

          <h1 className="text-2xl font-bold">عنوان</h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-md text-opacity-85 font_barlow text-center "
          >
            2360 Hood Avenue, San Diego, CA, 92123
          </p>
        </div>
        
        <div className="bg-[#20b1c9] flex flex-col gap-5 items-center justify-center rounded-3xl text-white p-5">
          <div className="bg-base-300 w-20 h-20 rounded-full flex items-center justify-center">
            <LuPhoneCall className="text-5xl text-white" />
          </div>

          <h1 className="text-2xl font-bold">رقم الهاتف</h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-md text-opacity-85 font_barlow text-center "
          >
            02012156485
          </p>
        </div>
        
        <div className="bg-base-300 flex flex-col gap-5 items-center justify-center rounded-3xl text-white p-5">
          <div className="bg-[#20b1c9] w-20 h-20 rounded-full flex items-center justify-center">
            <MdOutlineAttachEmail className="text-5xl text-white" />
          </div>

          <h1 className="text-2xl font-bold">صندوق البريد الخاص بنا</h1>
          <p
            data-aos="fade-up"
            className="mt-2 text-md text-opacity-85 font_barlow text-center "
          >
            contact@example.com
          </p>
        </div>
      </div>

      {/* contact form  */}
      <div className="min-h-[60vh] rounded-3xl grid grid-cols-1 md:grid-cols-[1fr_1fr] m-5 md:m-20">
        {/* left side  */}
        <div
          className=" text-black rounded-3xl shadow-xl bg-[#acd6dd] p-5 md:p-10"
          data-aos="fade-right"
          dir="rtl"
        >
           <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-100"
              >
                الاسم الكامل
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-2">حقل الاسم مطلوب</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">حقل البريد الإلكتروني</p>
              )}
            </div>

            {/* subject Field */}
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-200"
              >
                 موضوع الرسالة
              </label>
              <input
                type="number"
                id="subject"
                {...register("subject", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-2">الموضوع مطلوب</p>
              )}
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-200"
              >
                محتوى الرسالة
              </label>
              <textarea
                type="text"
                id="message"
                {...register("message", { required: true })}
                className={`mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                  errors.message ? "border-red-500" : ""
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-2">حقل محتوى الرسالة مطلوب</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#20b1c9] text-white p-4 mt-10 rounded-md hover:bg-[#1C9AAF] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              أرسل الآن
            </button>
          </form>
        </div>

        {/* right side  */}
        <div className="w-full hidden md:block" data-aos="fade-left">
          <MediaPlayer src={"/videos/contact-us.mp4"} />
        </div>
      </div>

      {/* location  */}
      {/* <div className="w-full h-[70vh]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.3425370187233!2d74.28167577496285!3d31.459762250135157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905a8d2b043c1%3A0xa44ac366851e4f27!2sRank%20BPO%20Pvt%20Ltd.!5e0!3m2!1sen!2s!4v1726672885485!5m2!1sen!2s"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        ></iframe>
      </div> */}
    </div>
  );
}

export default ContactUsPage;
