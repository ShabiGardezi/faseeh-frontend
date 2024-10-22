import { ImagesSliderShower } from '@/components/shared/ImagesSliderShower';
import MediaPlayer from '@/components/shared/MediaPlayer';
import React from 'react'

function MarketingStrategy({showHeroSection=true}) {
  return (
    <>
      {/* hero section  */}
      {showHeroSection && <ImagesSliderShower title={"marketing strategy"} />}

      <div className="min-h-[70vh] p-10 grid grid-cols-1 md:grid-cols-[1fr_1fr]">
        {/* left side  */}
        <div
          className="w-full h-full flex items-center mt-4 p-10"
          data-aos="fade-right"
        >
          <MediaPlayer src={"/videos/Marketing Strategy.json"} />
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
            className="mt-2 text-lg text-opacity-85 font_barlow text-justify custom_font"
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
    </>
  )
}

export default MarketingStrategy