import { useState, useEffect, useRef } from "react";

const videos = [
  "/assets/banner_videos/v1.mp4",
  "/assets/banner_videos/v2.mp4",
  "/assets/banner_videos/v3.mp4",
  "/assets/banner_videos/v4.mp4"
];

export const VideoBanner = () => {
  const [currentVideo, setCurrentVideo] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Pick a random video on mount
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    setCurrentVideo(randomVideo);
  }, []);

  const handleVideoEnd = () => {
    // Cycle to next video
    const currentIndex = videos.indexOf(currentVideo);
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentVideo(videos[nextIndex]);
  };

  if (!currentVideo) return <div className="absolute inset-0 bg-secondary" />;

  return (
    <video 
      ref={videoRef}
      key={currentVideo}
      autoPlay 
      muted 
      playsInline
      onEnded={handleVideoEnd}
      className="h-full w-full object-cover"
      poster="/assets/images/temples/default-temple.jpg"
    >
      <source src={currentVideo} type="video/mp4" />
    </video>
  );
};
