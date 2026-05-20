import React from "react";
import { motion } from "framer-motion";
import { Shield, Star, Users, Heart, Sparkles, CheckCircle2 } from "lucide-react";

const trustItems = [
  { icon: Shield, text: "100% Secure Divine Bookings" },
  { icon: Users, text: "10,000+ Blessed Journeys Facilitated" },
  { icon: CheckCircle2, text: "Verified Local Temple Teams" },
  { icon: Star, text: "India's Most Trusted Devotional App" },
  { icon: Heart, text: "Elderly & Specialized Care" },
  { icon: Sparkles, text: "Authentic Rituals & Poojas" },
];

export const CredibilityScroller = () => {
  return (
    <div className="bg-primary py-4 overflow-hidden border-y border-white/10 relative z-20">
      <div className="flex whitespace-nowrap animate-infinite-scroll">
        {[...trustItems, ...trustItems].map((item, i) => (
          <div 
            key={i} 
            className="flex items-center gap-4 px-12 text-white/90 border-r border-white/10 last:border-none"
          >
            <item.icon className="h-4 w-4 text-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">{item.text}</span>
            <span className="text-gold opacity-30 text-lg">॥</span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll 40s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
};
