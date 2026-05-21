import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Flame, Gift, Heart, ArrowRight, Clock, MapPin,
  Compass, Shield, AlertTriangle, HelpCircle, Users, CheckCircle, XCircle
} from "lucide-react";
import { templeMetadata } from "../data/templeMetadata";
import { getTempleSpecificConfig } from "../data/dynamicTempleConfig";
import { Button } from "../components/ui/button";
import { DocxRenderer } from "./DocxRenderer";

interface AhobilamCustomDarshanProps {
  onOpenBooking: (service: string) => void;
  templeSlug?: string;
  docxPath?: string;
  h1Override?: string;
}

export const AhobilamCustomDarshan = ({ onOpenBooking, templeSlug = "ahobilam", docxPath, h1Override }: AhobilamCustomDarshanProps) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [showSubheader, setShowSubheader] = useState(false);

  // Dynamic slug resolution
  const baseSlug = templeSlug.toLowerCase().replace(/-temple$/, "");
  const templeData = templeMetadata[baseSlug as keyof typeof templeMetadata];
  const mainImage = templeData?.image || "https://images.unsplash.com/photo-1544013585-446a362cb705?q=80&w=1920&fit=crop";
  const rawGallery = templeData?.gallery && templeData.gallery.length > 0 ? templeData.gallery : [mainImage];
  const gallery = Array.from(new Set(rawGallery));

  // Dynamic configuration
  const config = getTempleSpecificConfig(baseSlug, templeData);
  const displayTitle = templeData?.name || baseSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") + " Temple";
  const deityName = config.deityName;

  const sublinks = [
    { id: "overview", label: config.terrainType === "trekking" ? "Trek Challenges" : "Queue & Crowd" },
    { id: "facts", label: "Quick Facts" },
    { id: "vip-truth", label: "VIP Reality" },
    { id: "timings", label: "Timings" },
    { id: "what-we-provide", label: "Our Services" },
    { id: "poojas", label: "Rituals & Poojas" },
    { id: "comparison", label: "Comparison" },
    { id: "faqs", label: "FAQs" }
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowSubheader(true);
      } else {
        setShowSubheader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-100px 0px -40% 0px" }
    );

    const sectionIds = ["overview", "facts", "vip-truth", "timings", "what-we-provide", "poojas", "comparison", "faqs"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const timingsData = baseSlug === "ahobilam" ? [
    {
      area: "Lower Ahobilam (Prahalada Varada)",
      time: "6:30 AM – 1:00 PM & 3:00 PM – 8:00 PM",
      notes: "Easily accessible by road, ideal starting point.",
      accent: "bg-[#FFF8F0] border-l-4 border-[#D85A30]"
    },
    {
      area: "Upper Ahobilam (Ahobila Narasimha)",
      time: "7:00 AM – 1:00 PM & 3:00 PM – 7:00 PM",
      notes: "Deep cave inside the forest, base for the upper treks.",
      accent: "bg-[#FFF8F0] border-l-4 border-[#E6A817]"
    },
    {
      area: "Other 7 Temples (Forest Area)",
      time: "7:00 AM – 5:00 PM",
      notes: "Requires deep forest trekking. Must return before sunset.",
      accent: "bg-[#FFF8F0] border-l-4 border-[#6B1A1A]"
    },
    {
      area: "Abhishekam (Upper Ahobilam)",
      time: "8:00 AM – 9:00 AM",
      notes: "Daily sacred bath ritual. Sponsoring this requires advance planning.",
      accent: "bg-[#FFF8F0] border-l-4 border-[#1A1240]"
    }
  ] : [
    {
      area: "Morning Darshan & Aarti",
      time: "06:00 AM – 12:00 PM",
      notes: "Best for early dynamic morning aartis. Highly recommended.",
      accent: "bg-[#FFF8F0] border-l-4 border-[#D85A30]"
    },
    {
      area: "Afternoon Rest Hours",
      time: "12:00 PM – 04:00 PM",
      notes: "The deities rest. Outer corridors remain open for quiet walks.",
      accent: "bg-[#FFF8F0] border-l-4 border-[#E6A817]"
    },
    {
      area: "Evening Darshan & Shringar",
      time: "04:00 PM – 09:00 PM",
      notes: "Beautiful night lighting. High crowd volumes expected.",
      accent: "bg-[#FFF8F0] border-l-4 border-[#6B1A1A]"
    },
    {
      area: "Special Aarti Services",
      time: "07:00 PM – 08:00 PM",
      notes: "Sponsoring or viewing requires prior security coordination.",
      accent: "bg-[#FFF8F0] border-l-4 border-[#1A1240]"
    }
  ];

  const servicesProvided = [
    {
      title: "Easy Pickups",
      description: `Seamless private transfers from the nearest railway stations, airports, or directly from your local boarding hotel.`,
      icon: MapPin,
      bg: "bg-[#D85A30]/5 border-[#D85A30]/10 hover:border-[#D85A30]",
      iconBg: "bg-[#D85A30] text-white"
    },
    {
      title: config.terrainType === "trekking" ? "Guided Trekking Support" : "Guided Queue Support",
      description: config.terrainType === "trekking"
        ? "Experienced, native local forest guides who navigate paths smoothly and ensure safe wildlife passage."
        : "Attentive ground handlers who guide you past crowded bottleneck gates and speed up entry processes.",
      icon: Compass,
      bg: "bg-[#E6A817]/5 border-[#E6A817]/10 hover:border-[#E6A817]",
      iconBg: "bg-[#E6A817] text-white"
    },
    {
      title: "Special Care for Seniors",
      description: config.terrainType === "trekking"
        ? "Pre-arranged reliable Dolly (palanquin) services to carry seniors to Upper Ahobilam & Jwala Narasimha treks."
        : "Wheelchair support, priority elevators access, and slow-paced queue management for senior citizens.",
      icon: Sparkles,
      bg: "bg-[#6B1A1A]/5 border-[#6B1A1A]/10 hover:border-[#6B1A1A]",
      iconBg: "bg-[#6B1A1A] text-white"
    },
    {
      title: "Safe Storage & Logistics",
      description: "Dedicated shoe custody, cloakroom drops, and baggage management while you focus entirely on your prayer.",
      icon: Shield,
      bg: "bg-[#1A1240]/5 border-[#1A1240]/10 hover:border-[#1A1240]",
      iconBg: "bg-[#1A1240] text-white"
    },
    {
      title: "Nearby Temple Planning",
      description: "Extend your holy pilgrimage to include nearby sister shrines and historic spots with seamless vehicles.",
      icon: Users,
      bg: "bg-[#F4A835]/5 border-[#F4A835]/10 hover:border-[#F4A835]",
      iconBg: "bg-[#F4A835] text-white"
    },
    {
      title: "Complete Yatra Support",
      description: "Managing government permits, local parking passes, pure-veg dining bookings, and sacred Prasad delivery.",
      icon: Heart,
      bg: "bg-[#D85A30]/5 border-[#D85A30]/10 hover:border-[#D85A30]",
      iconBg: "bg-[#D85A30] text-white"
    }
  ];

  return (
    <div className="bg-[#FFF8F0] min-h-screen text-[#2E2520] font-sans overflow-x-hidden relative selection:bg-[#D85A30] selection:text-white">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-48 lg:pt-56 pb-20 overflow-hidden bg-[#1A1240] text-white">

        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1240] via-[#1A1240]/65 to-[#1A1240]/30 z-10" />
          <img
            src={gallery[2] || gallery[0]}
            alt={displayTitle}
            className="absolute inset-0 w-full h-full object-cover scale-105 opacity-35"
          />
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Typography */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E6A817] font-black border border-[#E6A817]/25 px-4 py-1.5 rounded-full bg-[#E6A817]/5 inline-block">
                Assisted Pilgrimage Support
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight"
              >
                {h1Override || displayTitle} <br />
                <span className="text-[#E6A817] italic font-light italic-font">Darshan & Yatra Support</span>
              </motion.h1>
              <p className="text-white/80 max-w-xl leading-relaxed text-sm md:text-base font-medium">
                {config.quickFacts.terrainText === "rugged"
                  ? `Experience the raw spiritual charge of all sacred cave temples without the exhaustion. Navigate the trails with expert local guides and Palanquin support.`
                  : `Ensure a highly respectful, tranquil, and comfortable darshan of ${deityName}. Bypass chaotic crowding spots, secure premium line routing, and protect your family.`}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-6 w-full max-w-4xl">
                <Button
                  onClick={() => onOpenBooking(`${displayTitle} Assisted Darshan`)}
                  className="relative overflow-hidden flex items-center justify-center bg-[#D85A30] hover:bg-[#B04320] text-white rounded-2xl h-16 text-xs font-black uppercase tracking-widest shadow-gold border-none cursor-pointer w-full group font-bold"
                >
                  <Sparkles className="mr-3 h-5 w-5 text-[#E6A817] group-hover:scale-125 transition-transform shrink-0" />
                  Book Darshan
                </Button>
                <Link
                  to={`/${baseSlug}-temple/puja`}
                  className="relative overflow-hidden flex items-center justify-center bg-[#6B1A1A] hover:bg-[#521313] text-white rounded-2xl h-16 text-xs font-black uppercase tracking-widest transition-all duration-300 border border-[#E6A817]/20 w-full shadow-lg group font-bold"
                >
                  <Flame className="mr-3 h-5 w-5 text-[#E6A817] group-hover:scale-125 transition-transform shrink-0" />
                  Book Puja
                </Link>
                <Link
                  to={`/${baseSlug}-temple/prasad`}
                  className="relative overflow-hidden flex items-center justify-center bg-white hover:bg-[#FFF8F0] text-[#1A1240] rounded-2xl h-16 text-xs font-black uppercase tracking-widest transition-all duration-300 border border-[#E6A817]/30 w-full shadow-md group font-bold"
                >
                  <Gift className="mr-3 h-5 w-5 text-[#E6A817] group-hover:scale-125 transition-transform shrink-0" />
                  Order Prasad
                </Link>
                <Link
                  to={`/${baseSlug}-temple/chadhava`}
                  className="relative overflow-hidden flex items-center justify-center bg-white hover:bg-[#FFF8F0] text-[#1A1240] rounded-2xl h-16 text-xs font-black uppercase tracking-widest transition-all duration-300 border border-[#E6A817]/30 w-full shadow-md group font-bold"
                >
                  <Heart className="mr-3 h-5 w-5 text-[#D85A30] group-hover:scale-125 transition-transform shrink-0" />
                  Offer Chadhava
                </Link>
              </div>
            </div>

            {/* Right Column: Quick Facts Card Grid */}
            <div id="facts" className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-10 border border-white/10 shadow-2xl relative">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Clock className="h-44 w-44" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#E6A817] mb-6 flex items-center gap-3">
                <Clock className="h-6 w-6 text-[#D85A30]" />
                Quick Facts & Info
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="h-8 w-8 rounded-xl bg-[#D85A30]/20 flex items-center justify-center text-[#D85A30] shrink-0 font-bold text-xs">📍</div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E6A817]">Location</h4>
                    <p className="text-white text-xs font-medium mt-1">{config.quickFacts.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="h-8 w-8 rounded-xl bg-[#E6A817]/20 flex items-center justify-center text-[#E6A817] shrink-0 font-bold text-xs">🛕</div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E6A817]">Deity</h4>
                    <p className="text-white text-xs font-medium mt-1">{deityName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="h-8 w-8 rounded-xl bg-[#6B1A1A]/20 flex items-center justify-center text-[#E6A817] shrink-0 font-bold text-xs">⏳</div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E6A817]">Average Duration</h4>
                    <p className="text-white text-xs font-medium mt-1">
                      {config.terrainType === "trekking" ? "1 to 2 Full Days for complete yatra" : "3 to 5 Hours for serene darshan"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="h-8 w-8 rounded-xl bg-[#1A1240]/20 flex items-center justify-center text-[#E6A817] shrink-0 font-bold text-xs">⛰️</div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E6A817]">Terrain</h4>
                    <p className="text-white text-xs font-medium mt-1">{config.quickFacts.terrainText}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="h-8 w-8 rounded-xl bg-[#F4A835]/20 flex items-center justify-center text-[#F4A835] shrink-0 font-bold text-xs">🔥</div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E6A817]">Peak Rush Days</h4>
                    <p className="text-white text-xs font-medium mt-1">{config.quickFacts.rushDays}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STICKY SUB-HEADER */}
      <div className={`fixed top-[84px] lg:top-[128px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-border/40 py-4 hidden md:block transition-all duration-300 transform shadow-sm ${showSubheader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {sublinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#D85A30] py-2 relative ${isActive ? "text-[#D85A30]" : "text-[#1A1240]/60"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeDarshanSub"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D85A30] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          <button
            onClick={() => onOpenBooking(`${displayTitle} Assisted Darshan`)}
            className="h-10 rounded-full px-6 bg-[#D85A30] hover:bg-[#B04320] text-white text-[10px] font-black uppercase tracking-widest border-none cursor-pointer shadow-md transition-all flex items-center justify-center font-bold"
          >
            Book Darshan Now
          </button>
        </div>
      </div>

      {/* 3. SECTION: TREK CHALLENGES VS CROWD CHALLENGES */}
      <section id="overview" className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left Side: Image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D85A30] to-[#E6A817] rounded-[3rem] rotate-3 opacity-5 scale-95 blur-sm" />
              <div className="relative border border-[#E6A817]/15 rounded-[3rem] p-2 bg-[#FFF8F0] shadow-xl overflow-hidden aspect-[4/5] group">
                <img
                  src={gallery[3] || gallery[1] || gallery[0]}
                  alt={displayTitle}
                  className="w-full h-full object-cover rounded-[2.8rem] group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                  <span className="h-10 w-10 bg-[#D85A30] rounded-full flex items-center justify-center text-white text-lg font-bold">🛕</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#E6A817] font-black">Serene Sanctum</p>
                    <p className="text-white text-xs font-serif italic">Divine pathways designed for absolute pure energy connection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="lg:col-span-7 space-y-8">
              {config.terrainType === "trekking" ? (
                // Trekking challenge details
                <>
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">The Trekking Challenge</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1240] leading-tight">
                      Spiritual Devotion Meets <br />
                      <span className="text-[#D85A30] italic font-light italic-font">Rugged Forest Wilderness</span>
                    </h2>
                    <div className="h-0.5 w-20 bg-[#E6A817] rounded-full my-4" />
                  </div>

                  <div className="space-y-6 text-[#2E2520]/80 text-sm md:text-base leading-relaxed font-medium">
                    <p>
                      Completing a yatra across the thick, raw beauty of the forest involves significant physical effort. While visiting the main temples takes about <strong>4 to 6 hours</strong>, covering all distinct shrines often requires <strong>2 full days</strong>.
                    </p>
                    <p>
                      The terrain is rugged, involving intense rocky paths and steep mountain climbs. Dealing with limited food amenities, unpredictable mountain weather, and rough routes can be physically exhausting, especially for senior family members.
                    </p>
                    <p className="text-[#6B1A1A] font-semibold">
                      With Vandan Darshan, your sacred pilgrimage is no longer a physical struggle. It becomes a safely guided, highly immersive spiritual journey.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 pt-4">
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#D85A30]/10 flex items-center justify-center text-[#D85A30] shrink-0 font-bold">✓</div>
                      <div>
                        <h4 className="font-bold text-base text-[#1A1240]">Avoid Trail Confusion</h4>
                        <p className="text-xs text-muted-foreground mt-1">Native local guides navigate forest paths seamlessly.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#E6A817]/10 flex items-center justify-center text-[#E6A817] shrink-0 font-bold">✓</div>
                      <div>
                        <h4 className="font-bold text-base text-[#1A1240]">Optimize Travel Time</h4>
                        <p className="text-xs text-muted-foreground mt-1">Efficient schedules to witness all shrines smoothly.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#6B1A1A]/10 flex items-center justify-center text-[#6B1A1A] shrink-0 font-bold">✓</div>
                      <div>
                        <h4 className="font-bold text-base text-[#1A1240]">Keep Your Family Safe</h4>
                        <p className="text-xs text-muted-foreground mt-1">We track trail conditions and weather live.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#1A1240]/10 flex items-center justify-center text-[#1A1240] shrink-0 font-bold">✓</div>
                      <div>
                        <h4 className="font-bold text-base text-[#1A1240]">Dolly/Palanquin Services</h4>
                        <p className="text-xs text-muted-foreground mt-1">Reliable physical support for seniors during climbs.</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Queue & Crowd challenge details
                <>
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">Crowd & Queue Management</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1240] leading-tight">
                      Sacred Devotion past <br />
                      <span className="text-[#D85A30] italic font-light italic-font">Long Queues & Electronic Locks</span>
                    </h2>
                    <div className="h-0.5 w-20 bg-[#E6A817] rounded-full my-4" />
                  </div>

                  <div className="space-y-6 text-[#2E2520]/80 text-sm md:text-base leading-relaxed font-medium">
                    <p>
                      Visiting the sacred temple of {displayTitle} is an unforgettable spiritual milestone. However, during festivals, weekends, and holidays, daily footfalls can scale to tens of thousands. This creates long, exhausting, chaotic queues where wait times exceed <strong>3 to 5 hours</strong>.
                    </p>
                    <p>
                      Security protocols are highly strict. Bags, cameras, belts, and mobile phones are prohibited inside the main complexes, requiring long waits at crowded shoe stands and locker counters. Navigating these bottlenecks under extreme fatigue is highly challenging, particularly for children and elderly parents.
                    </p>
                    <p className="text-[#D85A30] font-bold">
                      Vandan Darshan solves these challenges. We provide dedicated ground assistants who handle storage logistics, pace queue walking, and coordinate entry slots seamlessly.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 pt-4">
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#D85A30]/10 flex items-center justify-center text-[#D85A30] shrink-0 font-bold">✓</div>
                      <div>
                        <h4 className="font-bold text-base text-[#1A1240]">Bypass Queue Stress</h4>
                        <p className="text-xs text-muted-foreground mt-1">Coordinated routing past major congested gates.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#E6A817]/10 flex items-center justify-center text-[#E6A817] shrink-0 font-bold">✓</div>
                      <div>
                        <h4 className="font-bold text-base text-[#1A1240]">Locker & Shoe custody</h4>
                        <p className="text-xs text-muted-foreground mt-1">Seamless handling of electronics and footwear.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#6B1A1A]/10 flex items-center justify-center text-[#6B1A1A] shrink-0 font-bold">✓</div>
                      <div>
                        <h4 className="font-bold text-base text-[#1A1240]">Priority Elder Care</h4>
                        <p className="text-xs text-muted-foreground mt-1">Paced movement, seating support, and wheelchairs.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#1A1240]/10 flex items-center justify-center text-[#1A1240] shrink-0 font-bold">✓</div>
                      <div>
                        <h4 className="font-bold text-base text-[#1A1240]">Perfect Puja slots</h4>
                        <p className="text-xs text-muted-foreground mt-1">Arrangement of authentic rituals and sankalp prayers.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 4. SECTION: VIP DARSHAN TRUTH */}
      <section id="vip-truth" className="py-20 bg-[#FFF8F0] border-y border-[#E6A817]/15">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block h-12 w-12 rounded-full bg-[#D85A30]/10 flex items-center justify-center text-[#D85A30] mb-6">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1240] mb-4">
            {config.vipReality.title}
          </h2>
          <p className="text-xs uppercase tracking-widest text-[#D85A30] font-black mb-8">
            Important Information for Visiting Devotees
          </p>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-soft border border-[#E6A817]/20 max-w-4xl mx-auto text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
              <Sparkles className="h-32 w-32 text-secondary" />
            </div>

            <p className="text-[#2E2520]/80 leading-relaxed text-sm md:text-base mb-8">
              {config.vipReality.description}
            </p>

            <h4 className="font-bold text-[#1A1240] text-lg mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#E6A817]" />
              How Vandan Darshan ensures your family is fully cared for:
            </h4>

            <ul className="space-y-4 text-sm font-medium text-[#2E2520]/90">
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-[#D85A30] mt-2 shrink-0" />
                <span><strong>Priority Queue Coordination:</strong> Skip long physical security lines with pre-arranged support passes or timing schedules.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-[#D85A30] mt-2 shrink-0" />
                <span><strong>Personalized Priest Liaison:</strong> Skip the spots search; your sacred sankalpa puja is coordinated smoothly with authentic native priests.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-[#D85A30] mt-2 shrink-0" />
                <span><strong>Footwear & Belongings Assist:</strong> Leave electronics, leather articles, and footwear in our custody; no waiting at public baggage vaults.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. SECTION: TIMINGS TABLE */}
      <section id="timings" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">Sacred Schedule</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1240]">
              {displayTitle} <span className="text-[#D85A30] italic font-light italic-font">Darshan Timings</span>
            </h2>
            <div className="h-0.5 w-20 bg-[#E6A817] rounded-full mx-auto" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              Verify the dynamic daily hours and session times to secure your holy view precisely.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {timingsData.map((timing, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-border/60 ${timing.accent}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-[#1A1240] text-lg font-serif">{timing.area}</h4>
                  <Clock className="h-5 w-5 text-[#D85A30] shrink-0" />
                </div>
                <p className="text-2xl font-black text-[#D85A30] tracking-tight mb-3">
                  {timing.time}
                </p>
                <p className="text-xs text-[#2E2520]/70 font-medium leading-relaxed">
                  {timing.notes}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-3xl bg-[#6B1A1A]/5 border border-[#6B1A1A]/10 text-center max-w-2xl mx-auto">
            <p className="text-xs text-[#6B1A1A] font-bold">
              ⚠️ Important Note: Slots during major festival days (e.g. Navratri, Maha Shivratri, Janmashtami) are heavily congested. Prior slots booking is highly recommended.
            </p>
          </div>
        </div>
      </section>

      {/* 6. SECTION: WHAT WE PROVIDE */}
      <section id="what-we-provide" className="py-24 md:py-32 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center space-y-4 mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">Yatra Logistics</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1240]">
              What <span className="text-[#D85A30] italic font-light italic-font">Vandan Darshan</span> Provides
            </h2>
            <div className="h-0.5 w-20 bg-[#E6A817] rounded-full mx-auto" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              We manage the entire logistics spectrum, letting your family immerse in complete devotion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesProvided.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className={`group p-8 rounded-[2.5rem] bg-white border transition-all duration-300 shadow-sm hover:shadow-xl ${service.bg}`}
                >
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform ${service.iconBg}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-[#1A1240] text-xl mb-3">{service.title}</h3>
                  <p className="text-xs leading-relaxed text-[#2E2520]/80 font-medium">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Button
              onClick={() => onOpenBooking(`${displayTitle} Logistics Package`)}
              size="lg"
              className="bg-[#1A1240] hover:bg-[#271C5C] text-white rounded-2xl h-16 px-10 text-xs font-black uppercase tracking-widest shadow-xl group border-none cursor-pointer font-bold"
            >
              Request Custom Assisted Package
              <ArrowRight className="ml-3 h-4 w-4 text-[#E6A817] group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

        </div>
      </section>

      {/* 7. SECTION: POOJAS & RITUALS */}
      <section id="poojas" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center space-y-4 mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">Sacred Rituals</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1240]">
              Pooja Booking & <span className="text-[#D85A30] italic font-light italic-font">Facilitation</span>
            </h2>
            <div className="h-0.5 w-20 bg-[#E6A817] rounded-full mx-auto" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              Enhance your spiritual connection with special Vedic offerings dedicated to the deity.
            </p>
          </div>

          {/* Core Sacred Poojas Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {config.poojas.map((pooja, index) => (
              <div key={index} className="p-8 rounded-[2.5rem] bg-[#FFF8F0] border border-[#D85A30]/25 shadow-sm text-center flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-[#D85A30] text-white flex items-center justify-center mx-auto mb-6 text-xl">
                    {index === 0 ? "🔥" : index === 1 ? "🌸" : "🍶"}
                  </div>
                  <h4 className="font-bold text-lg text-[#1A1240] mb-3">{pooja.name}</h4>
                  <p className="text-xs text-[#2E2520]/80 leading-relaxed font-medium">
                    {pooja.desc}
                  </p>
                </div>
                <button
                  onClick={() => onOpenBooking(pooja.name)}
                  className="w-full mt-6 h-11 bg-white hover:bg-[#D85A30] hover:text-white text-[#D85A30] border border-[#D85A30]/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer font-bold"
                >
                  Book Pooja Seva
                </button>
              </div>
            ))}
          </div>

          {/* Daily Offerings List */}
          <div className="bg-[#FFF8F0] rounded-[3rem] p-8 md:p-12 border border-[#E6A817]/25 shadow-sm">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1240] text-center mb-8">
              Daily Devotional Assistance Offerings
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Personalized Sankalp Puja", desc: "Special prayer performed with your name and gotra by experienced Sanskrit scholars." },
                { title: "Maha Archana", desc: "Chanting of the deity's sacred names accompanied by beautiful fresh flower offerings." },
                { title: "Special Abhishek Support", desc: "Coordinating standard dynamic purification baths with honey, milk, and holy waters." },
                { title: "Holy Prasad Sewa", desc: "Dry fruit and traditional sweets offered in your family's name, packed and shipped to your home." },
                { title: "Remote Chadhava Offerings", desc: "Remote offering of beautiful pure silk vastrams or gold foil ornaments directly to the deities." },
                { title: "Temple Annadanam Sewa", desc: "Sponsoring sacred free food distribution to visiting pilgrims in holy memory of your ancestors." }
              ].map((pooja, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-white border border-[#E6A817]/10">
                  <span className="h-6 w-6 rounded-full bg-[#D85A30]/10 flex items-center justify-center text-[#D85A30] font-black text-xs shrink-0 mt-1">
                    ✓
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-[#1a1240]">{pooja.title}</h4>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{pooja.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. SECTION: BOOKING STEPS */}
      <section className="py-24 bg-[#1A1240] text-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center space-y-4 mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E6A817] font-black">Simple Process</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Easy 5-Step <span className="text-[#E6A817] italic font-light italic-font">Booking Process</span>
            </h2>
            <div className="h-0.5 w-20 bg-[#D85A30] rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { num: "1", title: "Select Service", desc: "Pick dynamic priority darshan, pooja, prasad, or full transport support." },
              { num: "2", title: "Specify Dates", desc: "Select your desired pilgrimage dates and timeframes." },
              { num: "3", title: "Add Group Details", desc: "List number of pilgrims and specify special senior needs." },
              { num: "4", title: "Coordinate logistics", desc: "Verify pickups, shoe/bag custodians, and custom guides." },
              { num: "5", title: "Secure Confirmation", desc: "Get your fully coordinated digital pilgrim itinerary instantly." }
            ].map((step, idx) => (
              <div key={idx} className="relative text-center space-y-4 group">
                <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-black text-[#E6A817] mx-auto group-hover:bg-[#D85A30] group-hover:text-white transition-all">
                  {step.num}
                </div>
                <h4 className="font-bold text-lg text-white">{step.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. SECTION: COMPARISON TABLE */}
      <section id="comparison" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center space-y-4 mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">Smart Planning</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1240]">
              Serenity Comparison <span className="text-[#D85A30] italic font-light italic-font">Analysis</span>
            </h2>
            <div className="h-0.5 w-20 bg-[#E6A817] rounded-full mx-auto" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              Contrast self-planned exhausting yatras with the absolute safety and comfort of Vandan Darshan.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-[3rem] border border-[#E6A817]/25 shadow-soft">
            <div className="grid grid-cols-3 bg-[#1A1240] text-white p-6 text-center font-bold text-xs uppercase tracking-widest shrink-0">
              <div className="text-left pl-4 font-bold">Pilgrimage Factor</div>
              <div className="font-bold">Self-Planned Yatra</div>
              <div className="text-[#E6A817] font-bold">With Vandan Darshan</div>
            </div>

            {[
              {
                factor: config.terrainType === "trekking" ? "Trail Navigation" : "Queue Navigation",
                self: { text: config.terrainType === "trekking" ? "High risk of trail confusion." : "Exhausting wait queues (3-5 Hours).", isGood: false },
                vandan: { text: config.terrainType === "trekking" ? "Led by native expert guides." : "Managed slot entry and paced line walking.", isGood: true }
              },
              {
                factor: "Storage Logistics",
                self: { text: "Long queues at public shoe/bag deposits.", isGood: false },
                vandan: { text: "Dedicated secure custodian custody.", isGood: true }
              },
              {
                factor: "Senior Assistance",
                self: { text: "No support. Severe climbing or pushy lines.", isGood: false },
                vandan: { text: "Wheelchairs, elevators, or pre-arranged Dollys.", isGood: true }
              },
              {
                factor: "Pooja Coordination",
                self: { text: "Spot searching for reliable native priests.", isGood: false },
                vandan: { text: "Pre-slotting, naming, and gotra sankalp coordination.", isGood: true }
              }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 border-b border-border/40 p-6 text-center text-xs font-medium text-[#2E2520]/80 items-center">
                <div className="text-left font-bold text-[#1A1240] pl-4">{row.factor}</div>
                <div className="bg-[#6B1A1A]/5 p-4 rounded-2xl flex flex-col items-center gap-2 mx-2">
                  <XCircle className="h-5 w-5 text-[#6B1A1A] shrink-0" />
                  <span>{row.self.text}</span>
                </div>
                <div className="bg-[#D85A30]/5 p-4 rounded-2xl flex flex-col items-center gap-2 mx-2 text-[#D85A30] font-semibold">
                  <CheckCircle className="h-5 w-5 text-[#D85A30] shrink-0" />
                  <span>{row.vandan.text}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. SECTION: DEVOTEE GUIDELINES */}
      <section className="py-24 bg-[#FFF8F0] border-t border-[#E6A817]/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">Devotee Code</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1240]">
                Conduct & <br />
                <span className="text-[#D85A30] italic font-light italic-font">Safety Protocol</span>
              </h2>
              <div className="h-0.5 w-20 bg-[#E6A817] rounded-full" />
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                Keep these crucial safety tips in mind while walking through the holy bounds of {displayTitle}.
              </p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {config.terrainType === "trekking" ? (
                <>
                  <div className="p-6 rounded-3xl bg-white border border-[#E6A817]/15 hover:shadow-md transition-all">
                    <h4 className="font-bold text-base text-[#1A1240] mb-2">Devotional Attire</h4>
                    <p className="text-xs text-[#2E2520]/75 leading-relaxed font-medium">Wear traditional comfortable clothes. High-grip sturdy trekking shoes are strictly recommended.</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white border border-[#E6A817]/15 hover:shadow-md transition-all">
                    <h4 className="font-bold text-base text-[#1A1240] mb-2">Physical Fitness</h4>
                    <p className="text-xs text-[#2E2520]/75 leading-relaxed font-medium">Ensure basic walking stamina. Carry critical personal medication as forest zones have minimal chemist outlets.</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white border border-[#E6A817]/15 hover:shadow-md transition-all">
                    <h4 className="font-bold text-base text-[#1A1240] mb-2">Monkey Caution</h4>
                    <p className="text-xs text-[#2E2520]/75 leading-relaxed font-medium">Do not carry loose plastic bags or visible food packages; wild monkeys are extremely active and quick.</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white border border-[#E6A817]/15 hover:shadow-md transition-all">
                    <h4 className="font-bold text-base text-[#1A1240] mb-2">Respect Sacred Nature</h4>
                    <p className="text-xs text-[#2E2520]/75 leading-relaxed font-medium">Stay entirely on marked pilgrimage paths. Avoid littering to maintain the pristine holiness of the range.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-6 rounded-3xl bg-white border border-[#E6A817]/15 hover:shadow-md transition-all">
                    <h4 className="font-bold text-base text-[#1A1240] mb-2">Traditional Dressing</h4>
                    <p className="text-xs text-[#2E2520]/75 leading-relaxed font-medium">Devotees must wear traditional Indian clothing. Jeans, shorts, and western outfits are highly discouraged.</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white border border-[#E6A817]/15 hover:shadow-md transition-all">
                    <h4 className="font-bold text-base text-[#1A1240] mb-2">Locker Protocol</h4>
                    <p className="text-xs text-[#2E2520]/75 leading-relaxed font-medium">Mobile phones, leather belts, wallets, and bags are prohibited in security lines. Deposit them beforehand.</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white border border-[#E6A817]/15 hover:shadow-md transition-all">
                    <h4 className="font-bold text-base text-[#1A1240] mb-2">Steady Walking</h4>
                    <p className="text-xs text-[#2E2520]/75 leading-relaxed font-medium">Walk calmly past bottleneck corridors. Do not push, run, or attempt to skip lines out of order.</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white border border-[#E6A817]/15 hover:shadow-md transition-all">
                    <h4 className="font-bold text-base text-[#1A1240] mb-2">Hydration & Rest</h4>
                    <p className="text-xs text-[#2E2520]/75 leading-relaxed font-medium">Drink water regularly before entering queue corridors. Rest benches are placed in waiting shades.</p>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 11. SECTION: FAQs */}
      <section id="faqs" className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">

          <div className="text-center space-y-4 mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">Pilgrimage Support</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1240]">
              Info & <span className="text-[#D85A30] italic font-light italic-font">FAQs</span>
            </h2>
            <div className="h-0.5 w-20 bg-[#E6A817] rounded-full mx-auto" />
          </div>

          <div className="space-y-4">
            {config.faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-border/80 overflow-hidden bg-[#FFF8F0]/30 transition-colors"
                >
                  <button
                    onClick={() => handleFaqToggle(idx)}
                    className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 font-serif text-lg md:text-xl font-bold text-[#1A1240] hover:text-[#D85A30] transition-colors cursor-pointer border-none bg-transparent font-bold"
                  >
                    <span>{faq.question}</span>
                    <HelpCircle className={`h-5 w-5 text-[#D85A30] transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 pt-0 text-xs md:text-sm text-[#2E2520]/80 leading-relaxed font-medium border-t border-border/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Final Call to Action Booking Banner */}
          <div className="mt-20 p-10 md:p-12 rounded-[3.5rem] bg-[#1A1240] text-center border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[#D85A30]/5 mix-blend-color-dodge" />
            </div>

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white">
                Ready for the ultimate {displayTitle} pilgrimage?
              </h3>
              <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                Secure your priority guided slots, luggage custody, and senior logistics support in advance. Let your family worship with peace.
              </p>
              <div className="pt-4">
                <Button
                  onClick={() => onOpenBooking(`${displayTitle} Coordinated Darshan`)}
                  size="lg"
                  className="bg-[#D85A30] hover:bg-[#B04320] text-white rounded-2xl h-16 px-10 text-xs font-black uppercase tracking-widest shadow-gold border-none cursor-pointer font-bold"
                >
                  Book Your Coordinated Darshan Now
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: DOCX CONTENT (Standardized Sections) */}
      {docxPath && (
        <section id="official-details" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <DocxRenderer
              filePath={docxPath}
              templeSlug={baseSlug}
              templeName={displayTitle}
              gallery={gallery}
            />
          </div>
        </section>
      )}

    </div>
  );
};
