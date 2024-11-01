import HeroSection from "@/components/core/HeroSection";
import React from "react";
import AboutUsPage from "../about-us/page";
import EventsPage from "../events/page";
import { HomePageComponent } from "./home-page-component";

function HomePage() {
  return (
    <>

    <HomePageComponent/>
      <AboutUsPage showHeroSection={false} /> 
    {/* <FuturisticHome/> */}
      {/* <HeroSection />*/}
      {/* <EventsPage showHeroSection={false} /> */}
    </>
  );
}

export default HomePage;
