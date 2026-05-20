import { useState, useEffect, useRef } from "react";

const videos = [
  "https://res.cloudinary.com/dz1nn391z/video/upload/v1779314280/vandan_darshan/ft7srmp9yn7sfrjfwb5k.mp4",
  "https://res.cloudinary.com/dz1nn391z/video/upload/v1779314283/vandan_darshan/ezc5sqgkosfxbuuy6c9e.mp4",
  "https://res.cloudinary.com/dz1nn391z/video/upload/v1779314332/vandan_darshan/llntuqzgzs9rvq9q5ysi.mp4"
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
