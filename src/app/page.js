"use client";
// import HomePage from "./(pages)/(main)/home/page";
import HomePage from "./(main)/home/page";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS CSS
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 400, // Customize the animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <>
      <HomePage />
    </>
  );
}
