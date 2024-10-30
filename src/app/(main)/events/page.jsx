import React from "react";
import { EventsViewer } from "./EventsViewer";
import { ImagesSliderShower } from "@/components/shared/ImagesSliderShower";

function EventsPage({ showHeroSection = true }) {
  return (
    <>
      {showHeroSection && (
        <ImagesSliderShower title="Events" pageName="Events" />
      )}

      <EventsViewer />
    </>
  );
}

export default EventsPage;
