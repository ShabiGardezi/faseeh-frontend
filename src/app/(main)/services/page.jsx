import Link from "next/link";
import React from "react";
import ServiceCard from "@/components/shared/ServiceCard";
import { ImagesSliderShower } from "@/components/shared/ImagesSliderShower";

const cardsdetail = [
  {
    image: "/images/business-meeting-in-modern-conference-room.jpg",
    title: "تحليل النصوص",
    description:
      "في فصيح، نقدم خدمات تحليل النصوص باستخدام تقنيات متقدمة لفهم وتحليل البيانات النصية بدقة...",
    url: "/services/parsing",
    iconVideoSrc: "/videos/0lVW4c3VGL0RIs9Ad5.mp4",
  },
  {
    image:
      "/images/creative-business-people-working-on-business-project-1536x1024-1.jpg",
    title: "تشكيل النصوص",
    description:
      "نقوم في فصيح بتقديم خدمات تشكيل النصوص بشكل دقيق لضمان وضوح المعاني وسلامة اللغة...",
    url: "/services/formation",
    iconVideoSrc: "/videos/K93ci7841DV532yJ8u.mp4",
  },
  {
    image:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
    title: "التدقيق اللغوي",
    description:
      "يقدم فصيح خدمات التدقيق اللغوي لضمان خلو النصوص من الأخطاء اللغوية والنحوية بشكل احترافي...",
    url: "/services/proof-reading",
    iconVideoSrc: "/videos/1Jnw4Nae2Bg39q.mp4",
  },
  {
    image: "/images/business-meeting-in-modern-conference-room.jpg",
    title: "توليد النصوص",
    description:
      "نستخدم في فصيح تقنيات متقدمة لتوليد النصوص بشكل مبتكر يلبي احتياجاتك اللغوية والإبداعية...",
    url: "/services/text-generation",
    iconVideoSrc: "/videos/0lVW4c3VGL0RIs9Ad5.mp4",
  },
];

function ServicesPage({ showHeroSection = true, limit }) {
  const cardsToShow = limit ? cardsdetail.slice(0, limit) : cardsdetail;

  return (
    <div>
      {/* hero section  */}
      {showHeroSection && (
        <ImagesSliderShower title={"Services"} pageName={"Services"} />
      )}

      {/* service cards  */}
      {showHeroSection ? (
        <div className="flex flex-col bg-[#DEF4F7] items-center gap-2 pb-5">
          <span className="inline-block mt-20 text-2xl uppercase text-blue-600">
            Our Services
          </span>

          <p
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-extrabold text-md text-opacity-85 font_barlow text-center md:w-[35%]"
          >
            Explore Our Services
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr]">
          <div className="text-black/90 flex flex-col items-start pl-10 gap-2 pb-5">
            <span className="inline-block mt-14 text-2xl uppercase text-red-600">
              Our Services
            </span>

            <p
              data-aos="fade-up"
              className="text-3xl md:text-4xl font-extrabold text-md text-opacity-85 font_barlow text-center md:w-[35%]"
            >
              Explore Our Services
            </p>
          </div>

          <div className="flex justify-end items-center pr-10 bg-[#DEF4F7]">
            <Link
              href={"/services"}
              className="btn bg-blue-600 border-0 text-black hover:bg-blue-600 hover:scale-110"
              data-aos="fade-left"
            >
              All Services
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10 bg-[#DEF4F7]">
        {cardsToShow.map(({ image, title, description, url, iconVideoSrc }) => (
          <ServiceCard
            key={title}
            image={image}
            title={title}
            description={description}
            url={url}
          />
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
