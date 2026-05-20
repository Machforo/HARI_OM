import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { Button } from "./ui/button";

export const BackgroundAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // Video ID for the Om humming: 8sYK7lm3UKg
  const videoId = "8sYK7lm3UKg";

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
      }
    };

    window.addEventListener("click", handleInteraction);
    return () => window.removeEventListener("click", handleInteraction);
  }, [hasInteracted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="hidden">
        {/* Hidden YouTube player with autoplay and loop */}
        <iframe
          ref={playerRef}
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&mute=0`}
          title="Background Audio"
          allow="autoplay"
        ></iframe>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        className={`h-9 w-9 rounded-full transition-all duration-300 ${
          isPlaying ? "bg-primary/10 text-primary animate-pulse" : "text-muted-foreground"
        }`}
        title={isPlaying ? "Stop Divine Music" : "Play Divine Music"}
      >
        {isPlaying ? (
          <Volume2 className="h-4 w-4" />
        ) : (
          <VolumeX className="h-4 w-4" />
        )}
      </Button>
      {isPlaying && (
        <span className="text-[10px] uppercase tracking-widest font-semibold text-primary hidden md:block animate-fade-in">
          ॥ ॐ ॥
        </span>
      )}
    </div>
  );
};
