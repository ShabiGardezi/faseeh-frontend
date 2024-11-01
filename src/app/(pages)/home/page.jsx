import HeroSection from "@/components/core/HeroSection";
import React from "react";
import AboutUsPage from "../about-us/page";
import EventsPage from "../events/page";
import { HomePageComponent } from "./home-page-component";

function HomePage() {
  return (
    <>

    <HomePageComponent/>
    {/* <FuturisticHome/> */}
      {/* <HeroSection />
      <AboutUsPage showHeroSection={false} /> */}
      {/* <EventsPage showHeroSection={false} /> */}
    </>
  );
}

export default HomePage;
