import { ReactNode } from "react";

interface HeroBannerProps {
  videoSrc?: string;
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  transparent?: boolean;
  scrollEffect?: boolean;
}

export const HeroBanner = ({
  videoSrc,
  imageSrc,
  imageAlt,
  children,
  transparent = false,
  scrollEffect = true
}: HeroBannerProps) => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        transform: scrollEffect ? `translateY(0px)` : "none",
      } as React.CSSProperties & { "--scroll-offset"?: string }}
    >
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0">
        {videoSrc && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            {/* Fallback to image if video not supported */}
            <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
          </video>
        )}
        {!videoSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
        )}

        {/* OVERLAY GRADIENT */}
        <div
          className={`absolute inset-0 ${transparent
              ? "bg-gradient-to-r from-background/50 via-background/60 to-background/30"
              : "bg-gradient-to-r from-background via-background/85 to-background/30"
            } ${scrollEffect ? "transition-opacity duration-300" : ""}`}
        />
      </div>

      {/* CONTENT */}
      <div className="container-prose relative">
        {children}
      </div>
    </section>
  );
};
