"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const MediaPlayer = ({ src, loop = true, autoplay = true, className = "" }) => {
  const [animationData, setAnimationData] = useState(null);
  const fileType = src.split(".").pop(); // Determine the file extension

  useEffect(() => {
    const loadMedia = async () => {
      if (fileType === "json") {
        // Fetch the animation JSON file
        try {
          const response = await fetch(src);
          if (!response.ok) {
            return console.log(
              `Failed to fetch animation from ${src}: ${response.statusText}`
            );
          }
          const data = await response.json();
          setAnimationData(data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    loadMedia();
  }, [src, fileType]);

  return (
    <div className={className}>
      {fileType === "json" && animationData ? (
        <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
      ) : fileType === "mp4" ? (
        <video
          src={src}
          loop={loop}
          autoPlay={autoplay}
          muted // This allows autoplay without sound
          playsInline // This helps on mobile devices
          className="w-full h-auto object-cover" // Use object-cover for better scaling
        />
      ) : (
        <p>Unsupported media type: {fileType}</p>
      )}
    </div>
  );
};

export default MediaPlayer;
