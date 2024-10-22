import { ImagesSliderShower } from '@/components/shared/ImagesSliderShower';
import MediaPlayer from '@/components/shared/MediaPlayer';
import ServiceCard from '@/components/shared/ServiceCard';
import Link from 'next/link';
import React from 'react'

const services = [
  {
    image: "/images/business-meeting-in-modern-conference-room.jpg",
    title: "App Store Optimization",
    description:
      "Welcome to Rank BPO, your one-stop solution for premium digital services. We are a team of experienced...",
    url: "/services/digital-marketing/app-store-optimization-and-marketing",
  },
  {
    image:
      "/images/creative-business-people-working-on-business-project-1536x1024-1.jpg",
    title: "content writing and Marketing",
    description:
      "CRYSTAL SERUM CERAMIC COATING provides a Supreme Hard Protection, Scratch & Swirls Resistant. This Coating Provides...",
    url: "/services/digital-marketing/content-writing-and-marketing",
  },
  {
    image:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
    title: "conversion rate optimization",
    description:
      "LEATHER GUARD COATING is made out of nanotechnology and is a Super Hydro-Phobic Coating that Protects, Leather...",
    url: "/services/digital-marketing/conversion-rate-optimization",
  },
  {
    image: "/images/business-meeting-in-modern-conference-room.jpg",
    title: "e commerce marketing",
    description:
      "Welcome to Rank BPO, your one-stop solution for premium digital services. We are a team of experienced...",
    url: "/services/digital-marketing/e-commerce-marketing",
  },
  {
    image:
      "/images/creative-business-people-working-on-business-project-1536x1024-1.jpg",
    title: "marketing strategy",
    description:
      "CRYSTAL SERUM CERAMIC COATING provides a Supreme Hard Protection, Scratch & Swirls Resistant. This Coating Provides...",
    url: "/services/digital-marketing/marketing-strategy",
  },
  {
    image:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
    title: "ppc management",
    description:
      "LEATHER GUARD COATING is made out of nanotechnology and is a Super Hydro-Phobic Coating that Protects, Leather...",
    url: "/services/digital-marketing/ppc-management",
  },
  {
    image:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
    title: "search engine marketing",
    description:
      "LEATHER GUARD COATING is made out of nanotechnology and is a Super Hydro-Phobic Coating that Protects, Leather...",
    url: "/services/digital-marketing/search-engine-marketing",
  },
  {
    image:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
    title: "search engine optimization",
    description:
      "LEATHER GUARD COATING is made out of nanotechnology and is a Super Hydro-Phobic Coating that Protects, Leather...",
    url: "/services/digital-marketing/search-engine-optimization",
  },
  {
    image:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
    title: "social media marketing",
    description:
      "LEATHER GUARD COATING is made out of nanotechnology and is a Super Hydro-Phobic Coating that Protects, Leather...",
    url: "/services/digital-marketing/social-media-marketing",
  },
  {
    image:
      "/images/business-colleagues-collaborating-and-discussing-project-plans-e1603078432543-1.jpg",
    title: "youtube channel",
    description:
      "LEATHER GUARD COATING is made out of nanotechnology and is a Super Hydro-Phobic Coating that Protects, Leather...",
    url: "/services/digital-marketing/youtube-channel",
  },
];

function DigitalMarketingPage({showHeroSection=true}) {
  return (
    <>
      {/* hero section  */}
      {showHeroSection && (
        <ImagesSliderShower title={"Customer Support Services"} />
      )}

      <div className="min-h-[70vh] py-10 grid grid-cols-1 md:grid-cols-[1fr_1fr]">
        {/* left side  */}
        <div className="w-full h-full flex items-center mt-4 p-10">
          <MediaPlayer src={"/videos/Social Media Marketing.json"} />
        </div>

        {/* right side  */}
        <div className="text-white/80 p-10">
          <span className="inline-block mt-5 text-2xl uppercase border-b-4 border-blue-600">
            About Service
          </span>

          <h1
            data-aos="fade-down"
            className="mt-10 text-xl md:text-3xl font-extrabold"
          >
            Customer Support Services
          </h1>

          <p
            data-aos="fade-up"
            className="mt-2 text-lg text-opacity-85 custom_font text-justify"
          >
            A few years ago, when digital marketing was not as big as it is now,
            there was no need for a company&apos;s marketing department and their
            customer support to work together. However, today a company cannot
            become so successful unless both these departments work hand in
            hand. This is primarily because the channel where the company will
            market is often the same channel that their customers turn to if
            they have concerns and issues with the company&apos;s products and
            services. One of the biggest digital channels a company can use to
            build brand reputation and promote its products and services is
            social media. Social media platforms have huge traffic and it is
            only right for businesses to use this huge amount of traffic to
            market their services. In fact, these platforms are also where
            customers prefer and spend most of their time. Communication on
            social media is almost instantaneous and there is nothing better
            than when you need to send a message to a business and get an
            instant response. What does it mean? This means that social media is
            both a marketing and customer service tool. Ultimately, marketing
            and customer support will use the same channels to manage their
            business operations. With this in mind, it has become a requirement
            that these two departments work together to create a con
          </p>
        </div>
      </div>


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
        {services.map(({ image, title, description, url }) => (
          <ServiceCard
            key={title}
            image={image}
            title={title}
            description={description}
            url={url}
          />
        ))}
      </div>

    </>
  )
}

export default DigitalMarketingPage