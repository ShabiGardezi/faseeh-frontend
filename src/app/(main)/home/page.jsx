import React from "react";
import AboutUsPage from "../about-us/page";
import { HomePageComponent } from "./home-page-component";

function HomePage() {
  return (
    <>
      <HomePageComponent />
      <AboutUsPage showHeroSection={false} />
    </>
  );
}

export default HomePage;
