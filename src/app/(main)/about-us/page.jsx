"use client";
import NumberAnimation from "@/components/shared/NumberAnimation";
import { TestimonialCarousel } from "@/components/shared/TestimonialCarousel";
import React from "react";
import { RiCustomerService2Fill, RiTeamFill } from "react-icons/ri";

function AboutUsPage() {
  return (
    <div className="bg-white pt-[25%] md:pt-[10%]">

      {/* about us  */}
      <div data-aos="fade-up" className="min-h-[70vh] grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-x-10  p-10">
        {/* left side  */}

        <div className="flex justify-center mb-10 md:ml-16">
          <img src="/images/about-us.svg" alt="" srcset="" />

        </div>

        {/* right side  */}
        <div className="text-black md:mr-24" dir="rtl">
          <span className="inline-block mt-20 text-2xl uppercase border-b-4 text-[#20b1c9]">
            معلومات عنا
          </span>

          <h1
            data-aos="fade-down"
            className="mt-10 text-lg md:text-3xl font-semibold"
          >
            نحن حيث تُصاغ الكلمات وتتحقق النجاحات
          </h1>

          <p
            data-aos="fade-up"
            className="mt-5 text-md text-opacity-85 text-justify font_barlow"
          >
            فصيح هو منصة رائدة للخدمات اللغوية العربية، نتخصص في تحسين جودة
            النصوص، وتقديم خدمات التدقيق والتحليل اللغوي، وتشكيل النصوص بأعلى
            مستويات الاحترافية. نساعد عملاءنا على تقديم محتوى متقن يخاطب جمهورهم
            ويضمن تحقيق أهدافهم اللغوية. هل ترغب في تحسين جودة نصوصك أيضًا؟ ليس
            بالأمر الصعب! يمكننا تحويل محتواك إلى نموذج لغوي متميز!
          </p>
        </div>
      </div>

      {/* counter section  */}
      <div className="mt-10 flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-around py-5 pb-10 text-[#20b1c9]">
        <div className="flex flex-col justify-center ">
          <div className="flex items-center gap-2 justify-center text-xl">
            <RiCustomerService2Fill className="text-4xl md:text-6xl mt-3" />
            <NumberAnimation end={20} suffix={"+"} />
          </div>

          <p className="text-center text-xl text-black">عملاء سعداء</p>
        </div>

        <div className="flex flex-col justify-center ">
          <div className="flex items-center gap-2 justify-center text-xl">
            <RiTeamFill className="text-4xl md:text-6xl" />
            <NumberAnimation end={500} suffix={"+"} />
          </div>

          <p className="text-center text-xl text-black">أعضاء الفريق</p>
        </div>
      </div>


      {/* icons  */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 p-10" dir="rtl">
        <div className="flex flex-col justify-center items-center">
          <img
            src="/icons/business-direction.svg"
            alt="My Icon"
            width="100"
            height="100"
            className="mb-5"
          />
          <h2 className="text-lg font-semibold">قرارات مدروسة بناءً على البيانات</h2>
          <p className="text-md text-center">
          من خلال استراتيجياتنا، نحوّل المشكلات المعقدة إلى فرص نمو لغوي.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            src="/icons/ideas.svg"
            alt="My Icon"
            width="100"
            height="100"
            className="mb-5"
          />
          <h2 className="text-lg font-semibold">أفكار ذكية ومتقدمة</h2>
          <p className="text-md text-center">
          نقوم بتوحيد العقول الإبداعية المتنوعة للعمل بانسجام من أجل نمو وتطوير محتواك اللغوي.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            src="/icons/trust.svg"
            alt="My Icon"
            width="100"
            height="100"
            className="mb-5"
          />
          <h2 className="text-lg font-semibold">ثقة لا تتزعزع</h2>
          <p className="text-md text-center">
          فصيح ملتزم بالشفافية الكاملة ورضا عملائنا من خلال تقديم خدمات لغوية دقيقة.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            src="/icons/24-support.svg"
            alt="My Icon"
            width="100"
            height="100"
            className="mb-5"
          />
          <h2 className="text-lg font-semibold">دعم على مدار الساعة</h2>
          <p className="text-md text-center">
          نحن هنا دائمًا، جاهزون لحل أي مشكلة تواجهك في أي وقت لتضمن نموك اللغوي المستمر.
          </p>
        </div>
      </div>

      {/* testimonials */}
      <div className="pb-10 mb-20">
        <div className="flex flex-col justify-center items-center text-black p-10">
          <span className="inline-block mt-20 text-2xl uppercase border-b-4 text-[#20b1c9]">
          آراء العملاء
          </span>

          <h1
            data-aos="fade-down"
            className="mt-10 text-3xl font-semibold"
          >
            ماذا يقول العملاء عن خدماتنا؟
          </h1>
        </div>

        <div data-aos="fade-up" className="w-[85vw] m-auto">
          <TestimonialCarousel />
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
