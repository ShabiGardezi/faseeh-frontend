import React from "react";
import { HeroParallax } from "../ui/hero-parallax";

function HeroSection() {
  return (
    <div className="overflow-x-hidden pb-10 bg-[#DEF4F7]">
      <HeroParallax products={products} />
    </div>
  );
}

export default HeroSection;

export const products = [
  {
    title: "خدماتنا",
    link: "/services",
    thumbnail: "/images/589-scaled-1-1536x1024-1.jpg",
  },
  {
    title: "خدمة الإعراب",
    link: "/services/custom-development",
    thumbnail: "/images/afsdcfgs-scaled-1-1536x1024-1-1.jpg",
  },
  {
    title: "خدمة التشكيل",
    link: "/services/customer-support",
    thumbnail: "/images/asfdcasdf-scaled-1-1536x1024-1.jpg",
  },

  {
    title: "خدمة التدقيق اللغوي",
    link: "/services/digital-marketing",
    thumbnail: "/images/asfdfdsaq-scaled-1-1536x1024-1.jpg",
  },
  {
    title: "خدمة توليد نصوص",
    link: "/services/custom-development/automation",
    thumbnail:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
  },
  {
    title: "نصوص تسويقية",
    link: "/services/customer-support/appointment-setting",
    thumbnail:
      "/images/business-meeting-and-teamwork-by-business-people-REGXPAZ.jpg",
  },

  {
    title: "رسائل بريد الكتروني احترافية",
    link: "/services/digital-marketing/app-store-optimization-and-marketing",
    thumbnail: "/images/business-meeting-in-modern-conference-room.jpg",
  },
  {
    title: "قصص الأمثال العربية للأطفال",
    link: "/services/custom-development/crm-development",
    thumbnail:
      "/images/creative-business-people-working-on-business-project-1536x1024-1.jpg",
  },
  {
    title: "خدمة توليد نصوص",
    link: "/services/custom-development/automation",
    thumbnail:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
  },
  {
    title: "نصوص تسويقية",
    link: "/services/customer-support/appointment-setting",
    thumbnail:
      "/images/business-meeting-and-teamwork-by-business-people-REGXPAZ.jpg",
  },

  {
    title: "رسائل بريد الكتروني احترافية",
    link: "/services/digital-marketing/app-store-optimization-and-marketing",
    thumbnail: "/images/business-meeting-in-modern-conference-room.jpg",
  },
  {
    title: "قصص الأمثال العربية للأطفال",
    link: "/services/custom-development/crm-development",
    thumbnail:
      "/images/creative-business-people-working-on-business-project-1536x1024-1.jpg",
  },
  

  
];
