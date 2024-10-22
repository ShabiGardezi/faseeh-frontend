"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffect() {
  const words = [
    {
      text: "مرحبا بكم فيفصيح",
      className: "text-blue-500 dark:text-blue-800 ",
    },
  ];
  return (
    <div className="">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
