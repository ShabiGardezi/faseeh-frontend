import { ImagesSliderShower } from "@/components/shared/ImagesSliderShower";
import MediaPlayer from "@/components/shared/MediaPlayer";
import ServiceCard from "@/components/shared/ServiceCard";
import Link from "next/link";
import React from "react";

const services = [
  {
    image: "/images/business-meeting-in-modern-conference-room.jpg",
    title: "Web Development",
    description:
      "Welcome to Rank BPO, your one-stop solution for premium digital services. We are a team of experienced...",
    url: "/services/custom-development/web-development",
  },
  {
    image:
      "/images/creative-business-people-working-on-business-project-1536x1024-1.jpg",
    title: "Mobile Development",
    description:
      "CRYSTAL SERUM CERAMIC COATING provides a Supreme Hard Protection, Scratch & Swirls Resistant. This Coating Provides...",
    url: "/services/custom-development/mobile-development",
  },
  {
    image:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
    title: "CRM Development",
    description:
      "LEATHER GUARD COATING is made out of nanotechnology and is a Super Hydro-Phobic Coating that Protects, Leather...",
    url: "/services/custom-development/crm-development",
  },
  {
    image: "/images/business-meeting-in-modern-conference-room.jpg",
    title: "Quality Assurance",
    description:
      "Welcome to Rank BPO, your one-stop solution for premium digital services. We are a team of experienced...",
    url: "/services/custom-development/quality-assurance",
  },
  {
    image:
      "/images/creative-business-people-working-on-business-project-1536x1024-1.jpg",
    title: "Automation",
    description:
      "CRYSTAL SERUM CERAMIC COATING provides a Supreme Hard Protection, Scratch & Swirls Resistant. This Coating Provides...",
    url: "/services/custom-development/automation",
  },
  {
    image:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
    title: "Customization",
    description:
      "LEATHER GUARD COATING is made out of nanotechnology and is a Super Hydro-Phobic Coating that Protects, Leather...",
    url: "/services/custom-development/customization",
  },
];

function CustomDevelopmentPage({ showHeroSection = true }) {
  return (
    <>
      {/* hero section  */}
      {showHeroSection && (
        <ImagesSliderShower title={"Custom Development Services"} />
      )}

      <div className="min-h-[70vh] py-10 grid grid-cols-1 md:grid-cols-[1fr_1fr]">
        {/* left side  */}
        <div
          className="w-full h-full flex items-center mt-4 p-10"
          data-aos="fade-right"
        >
          <MediaPlayer src={"/videos/Custom Coding.json"} />
        </div>

        {/* right side  */}
        <div className="text-white/80 p-10" data-aos="fade-left">
          <span className="inline-block mt-5 text-2xl uppercase border-b-4 border-blue-600">
            About Service
          </span>

          <h1
            data-aos="fade-down"
            className="mt-10 text-xl md:text-3xl font-extrabold"
          >
            Custom Development Services
          </h1>

          <p
            data-aos="fade-up"
            className="mt-2 text-lg text-opacity-85 text-justify custom_font"
          >
            A few years ago, when custom development services were not as
            critical as they are now, companies didn&apos;t always need close
            collaboration between their development teams and other departments.
            However, today, success in the business world is harder to achieve
            without a cohesive effort from all areas, particularly custom
            development and business strategy. This is because the tools and
            platforms that companies use to enhance their operations often
            require tailored solutions that meet their specific needs and
            objectives. One of the biggest opportunities a company can
            capitalize on today is the use of custom development services to
            improve business processes, provide personalized customer
            experiences, and optimize their digital infrastructure. Businesses
            now rely heavily on software and applications to interact with
            customers, manage workflows, and deliver their products and services
            efficiently. Custom development enables companies to build unique,
            purpose-driven solutions that align perfectly with their operations.
            In fact, the platforms that customers engage with—whether it&apos;s
            websites, apps, or other digital services—often require specific
            features that off-the-shelf solutions cannot provide.
          </p>
        </div>
      </div>

      <div>
        {/* service cards  */}
        {showHeroSection ? (
          <div className="flex flex-col items-center gap-2 pb-5">
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

            <div className="flex justify-end items-center pr-10">
              <Link
                href={"/services"}
                className="btn bg-blue-600 border-0 text-white hover:bg-red-600 hover:scale-110"
                data-aos="fade-left"
              >
                All Services
              </Link>
            </div>
          </div>
        )}

        <div className=" grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 p-10">
          {services.map(({ image, title, description, url, iconVideoSrc }) => (
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
    </>
  );
}

export default CustomDevelopmentPage;
