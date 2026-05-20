import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, Flame, Gift, Compass, Heart, ArrowRight, Check, MapPin,
  Clock, AlertTriangle, Calendar, Star, ChevronLeft, ChevronRight, PhoneCall, Home, Volume2
} from "lucide-react";
import { templeMetadata } from "../data/templeMetadata";
import { getTempleSpecificConfig, getNearbyTemples } from "../data/dynamicTempleConfig";
import { getShlokaAndTranslation } from "../pages/TempleDetail";
import { DocxRenderer } from "./DocxRenderer";

interface AhobilamCustomDetailProps {
  onOpenBooking: (serviceName: string) => void;
  templeSlug?: string;
  docxPath?: string;
}

export const AhobilamCustomDetail = ({ onOpenBooking, templeSlug = "ahobilam", docxPath }: AhobilamCustomDetailProps) => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Dynamic slug resolution
  const baseSlug = templeSlug.toLowerCase().replace(/-temple$/, "");
  const templeData = templeMetadata[baseSlug as keyof typeof templeMetadata];
  const mainImage = templeData?.image || "https://images.unsplash.com/photo-1544013585-446a362cb705?q=80&w=1920&fit=crop";
  const rawGallery = templeData?.gallery && templeData.gallery.length > 0 ? templeData.gallery : [mainImage];
  const gallery = Array.from(new Set(rawGallery));

  // Load dynamic configuration
  const config = getTempleSpecificConfig(baseSlug, templeData);
  const displayTitle = templeData?.name || baseSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") + " Temple";
  const deityName = config.deityName;

  // Custom counters state
  const [templeCount, setTempleCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [zonesCount, setZonesCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  // Dynamic Shloka
  const shlokaInfo = getShlokaAndTranslation(baseSlug);

  // Animated counters trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedStats) {
          setHasAnimatedStats(true);

          // Animate shrines count (0 to shrines limit)
          const targetShrines = config.stats.shrines;
          let startT = 0;
          const intervalT = setInterval(() => {
            startT += 1;
            setTempleCount(startT);
            if (startT >= targetShrines) clearInterval(intervalT);
          }, Math.max(50, 1000 / targetShrines));

          // Animate years legacy (0 to legacy target)
          const targetLegacy = config.stats.legacyYears;
          let startY = 0;
          const intervalY = setInterval(() => {
            startY += Math.ceil(targetLegacy / 20);
            if (startY >= targetLegacy) {
              setYearsCount(targetLegacy);
              clearInterval(intervalY);
            } else {
              setYearsCount(startY);
            }
          }, 40);

          // Animate third stat (0 to third target)
          const targetThird = config.stats.pilgrimsCount;
          let startZ = 0;
          const intervalZ = setInterval(() => {
            startZ += Math.ceil(targetThird / 15);
            if (startZ >= targetThird) {
              setZonesCount(targetThird);
              clearInterval(intervalZ);
            } else {
              setZonesCount(startZ);
            }
          }, 50);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimatedStats, config]);

  // Lotus Petals canvas particle animation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = ["#FFF8F0", "#F4A835", "#D85A30"];
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      rotSpeed: number;
      angle: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 4,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 0.8 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotSpeed: Math.random() * 0.02 - 0.01,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.rotSpeed;

        if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          p.x = Math.random() * width;
          p.y = -20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Personalized Reviews
  const pilgrimReviews = [
    {
      quote: `Great assisted darshan options at ${displayTitle}. Felt deeply connected with the divine space without worrying about any queues or coordination. Strongly recommended!`,
      name: "Achutam Nair",
      location: "Bangalore",
      initials: "AN"
    },
    {
      quote: `The divine presence of ${deityName} was absolutely powerful. Vandan Darshan coordinated everything flawlessly, pacing the queue beautifully.`,
      name: "Rajesh Chandra Bhatt",
      location: "Nagpur",
      initials: "RB"
    },
    {
      quote: `Wonderful coordination up to the main sanctum. Unparalleled premium service that helped my elderly parents secure their holy darshan safely.`,
      name: "Sharmila Devi",
      location: "Chennai",
      initials: "SD"
    }
  ];

  // Auto-play reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % pilgrimReviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [pilgrimReviews.length]);

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex((prev) => (prev === index ? null : index));
  };

  const [activeSection, setActiveSection] = useState("legend");
  const [showSubheader, setShowSubheader] = useState(false);

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
      { threshold: 0.15, rootMargin: "-120px 0px -40% 0px" }
    );

    const sectionIds = ["story", "legend", "shrines", "timings", "highlights", "zones", "reaching", "festivals", "services", "hotels", "nearby"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const sublinks = [
    { id: "story", label: "Story" },
    { id: "legend", label: "Legend" },
    { id: "shrines", label: baseSlug === "ahobilam" ? "Nava Shrines" : "Key Shrines" },
    { id: "timings", label: "Timings" },
    { id: "highlights", label: "Must Experience" },
    { id: "zones", label: "Zones" },
    { id: "reaching", label: "How to Reach" },
    { id: "festivals", label: "Festivals" },
    { id: "services", label: "Services" },
    { id: "hotels", label: "Hotels & Places" },
    { id: "nearby", label: "Nearby" }
  ];

  // Shrines data resolution
  const navaShrines = [
    { name: "Ahobila Narasimha", desc: "The main self-manifested (Swayambhu) deity, represented in a fierce, majestic form deep inside a natural cave structure.", type: "Form 1", icon: "🛕", trek: "Base / Upper" },
    { name: "Kroda (Varaha) Narasimha", desc: "A unique manifestation depicting the combination of Lord Varaha (the Boar) and Lord Narasimha. Highly sacred for removing all planetary hurdles.", type: "Form 2", icon: "🐗", trek: "1 km from Upper" },
    { name: "Jwala Narasimha", desc: "Located on a high cliff edge in Upper Ahobilam. The exact spot of ultimate rage where Hiranyakashipu was slain and the divine blood washed in Raktha Kunda.", type: "Form 3", icon: "🔥", trek: "Steep Cliff Trek" },
    { name: "Malola Narasimha", desc: "A peaceful (Soumya) form where the Lord is seen in a loving aspect with Goddess Lakshmi sitting on His lap. 'Maa' means Lakshmi, 'Lola' means beloved.", type: "Form 4", icon: "❤️", trek: "1.5 km (Paved path)" },
    { name: "Yogananda Narasimha", desc: "Depicts the Lord in an auspicious yogic posture (dhyana mudra). Legendary tales link this shrine as the place where Prahlada received his spiritual education.", type: "Form 5", icon: "🧘", trek: "2 km from Lower" },
    { name: "Chatravata Narasimha", desc: "Deity seated beneath a sacred 'Chatravata' tree canopy. The Lord is represented with a beautiful smile, pleased by divine musicians Hahala and Huhu.", type: "Form 6", icon: "🌳", trek: "3 km from Lower" },
    { name: "Pavana Narasimha", desc: "Set in a remote jungle valley. Devotees traverse severe deep-forested terrain to offer their respects. Jeep transportation is highly recommended for safety.", type: "Form 7", icon: "🐆", trek: "6 km forest trail" },
    { name: "Bhargava Narasimha", desc: "Named after Maharishi Bhargava (Parashurama), who performed intense penance at this deep-pond temple base to seek the glorious vision of Narasimha Swamy.", type: "Form 8", icon: "🏹", trek: "2 km off-road" },
    { name: "Karanja Narasimha", desc: "The deity is seated beneath the shade of a Karanja tree. Uniquely represented holding a bow, reflecting the divine vision granted to Lord Hanuman.", type: "Form 9", icon: "🕊️", trek: "Road-facing access" }
  ];

  const nearbyPlaces = getNearbyTemples(baseSlug);

  return (
    <div className="bg-[#FFF8F0] min-h-screen text-[#2E2520] font-sans selection:bg-[#D85A30] selection:text-white overflow-x-hidden relative">

      {/* Floating Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-48 lg:pt-56 pb-20 overflow-hidden bg-[#1A1240] text-white">

        {/* Parallax Image Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1240] via-[#1A1240]/60 to-[#1A1240]/25 z-10" />
          <img
            src={gallery[0] || "https://images.unsplash.com/photo-1544013585-446a362cb705?q=80&w=1920&fit=crop"}
            alt={displayTitle}
            className="absolute inset-0 w-full h-full object-cover scale-105 opacity-40 blur-[1px]"
          />
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 relative z-20 text-center flex flex-col items-center justify-center gap-10 mt-10 w-full">

          {/* Shloka Mantra */}
          <div className="space-y-4 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-serif text-lg md:text-2xl text-[#E6A817] italic leading-relaxed tracking-wide"
            >
              "{shlokaInfo.shloka.split("\n")[0]}"
              {shlokaInfo.shloka.split("\n")[1] && (
                <>
                  <br className="md:hidden" />
                  {` ${shlokaInfo.shloka.split("\n")[1]}`}
                </>
              )}
            </motion.p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#F4A835]/80 font-black tracking-widest">
              Sacred Divine Invocation Shloka
            </p>
          </div>

          {/* Core Branding Title */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="font-serif text-5xl md:text-8xl font-bold tracking-tight text-white leading-tight"
            >
              {displayTitle}
            </motion.h1>
            <p className="font-serif text-xl md:text-3.5xl font-light italic text-[#E6A817]/90">
              {config.subtitle}
            </p>
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed mt-4 font-medium">
              Explore the rich heritage, sacred dynamic environment, and pristine assisted pilgrimage coordinates of {displayTitle}, providing spiritual elevation for every visiting devotee.
            </p>
          </div>

          {/* Quick CTAs: Responsive 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 w-full max-w-5xl">
            <Link
              to={`/${baseSlug}-temple/darshan`}
              className="relative overflow-hidden flex items-center justify-center bg-[#D85A30] hover:bg-[#B04320] text-white rounded-2xl h-16 text-xs font-black uppercase tracking-widest shadow-lg transition-all duration-300 border-none cursor-pointer w-full group"
            >
              <Sparkles className="mr-3 h-5 w-5 text-[#E6A817] group-hover:scale-125 transition-transform shrink-0" />
              Book a Darshan
            </Link>
            <Link
              to={`/${baseSlug}-temple/puja`}
              className="relative overflow-hidden flex items-center justify-center bg-[#6B1A1A] hover:bg-[#521313] text-white rounded-2xl h-16 text-xs font-black uppercase tracking-widest transition-all duration-300 border border-[#E6A817]/20 w-full shadow-lg group"
            >
              <Flame className="mr-3 h-5 w-5 text-[#E6A817] group-hover:scale-125 transition-transform shrink-0" />
              Book Puja
            </Link>
            <Link
              to={`/${baseSlug}-temple/prasad`}
              className="relative overflow-hidden flex items-center justify-center bg-white hover:bg-[#FFF8F0] text-[#1A1240] rounded-2xl h-16 text-xs font-black uppercase tracking-widest transition-all duration-300 border border-[#E6A817]/30 w-full shadow-md group"
            >
              <Gift className="mr-3 h-5 w-5 text-[#E6A817] group-hover:scale-125 transition-transform shrink-0" />
              Order Prasad
            </Link>
            <Link
              to={`/${baseSlug}-temple/chadhava`}
              className="relative overflow-hidden flex items-center justify-center bg-white hover:bg-[#FFF8F0] text-[#1A1240] rounded-2xl h-16 text-xs font-black uppercase tracking-widest transition-all duration-300 border border-[#E6A817]/30 w-full shadow-md group"
            >
              <Heart className="mr-3 h-5 w-5 text-[#D85A30] group-hover:scale-125 transition-transform shrink-0" />
              Offer Chadhava
            </Link>
          </div>

        </div>
      </section>

      {/* Sticky Sub-Header */}
      <div className={`fixed top-[84px] lg:top-[128px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-border/40 py-4 hidden md:block transition-all duration-300 transform shadow-sm ${showSubheader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {sublinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#D85A30] py-2 relative ${isActive ? "text-[#D85A30]" : "text-[#1A1240]/60"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeUniversalSub"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D85A30] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          <button
            onClick={() => onOpenBooking("Special Darshan Support")}
            className="h-10 rounded-full px-6 bg-[#D85A30] hover:bg-[#B04320] text-white text-[10px] font-black uppercase tracking-widest border-none cursor-pointer shadow-md transition-all flex items-center justify-center font-bold"
          >
            Start your divine journey
          </button>
        </div>
      </div>

      {/* SECTION: LEGEND & ANIMATED STATS */}
      <section id="legend" className="py-24 md:py-32 bg-[#FDF1E3]/95 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Legend Left Side Picture Frame */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D85A30] to-[#F4A835] rounded-[3rem] rotate-3 opacity-10 scale-95 blur-sm" />
              <div className="relative z-10 border border-[#E6A817]/15 rounded-[3rem] p-2 bg-white shadow-xl overflow-hidden aspect-[4/3] lg:aspect-[4/5] group">
                <img
                  src={gallery[1] || gallery[0]}
                  alt="Sacred Shrine Architecture"
                  className="w-full h-full object-cover rounded-[2.8rem] group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                  <span className="h-10 w-10 bg-[#E6A817] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">🛕</span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#E6A817] font-bold">Divine Sanctum</p>
                    <p className="text-white text-sm font-serif italic">Holy energy portal radiating eternal grace</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Narrative & Animated Counters */}
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">Sacred History</span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1240] leading-tight">
                  The Legend of <br />
                  <span className="text-[#D85A30] italic font-light italic-font">{displayTitle}</span>
                </h2>
                <div className="h-0.5 w-20 bg-[#E6A817] rounded-full my-4" />
              </div>

              <div className="space-y-6 text-[#2E2520]/80 text-sm md:text-base leading-relaxed font-medium">
                {baseSlug === "ahobilam" ? (
                  <>
                    <p>
                      Ahobilam marks the exact site of the holy legend where <strong>Lord Narasimha Swamy</strong> emerged from the stone pillar of Hiranyakashipu's palace to protect his five-year-old child devotee, Prahlada. The name itself reflects two divine definitions:
                    </p>
                    <p className="border-l-4 border-[#E6A817] pl-6 py-2 italic text-[#1A1240] bg-[#E6A817]/5 rounded-r-xl">
                      <strong>“Aho Bilam”</strong> (Oh, what a great cave!) — uttered by the devas in awe of the mysterious cave crevices in the hills where Lord Narasimha resided. <br className="my-2 block" />
                      <strong>“Aho Balam”</strong> (Oh, what majestic strength!) — chanted by the devotees in praise of the infinite power of the half-man, half-lion incarnation.
                    </p>
                    <p>
                      Divided into <strong>Lower Ahobilam</strong> and <strong>Upper Ahobilam</strong>, the shrine complex nestles inside rugged limestone cavern walls, pristine cascading mountain rivers like Bhavanasini, and dense forests where ancient sages did deep penance.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {displayTitle} stands as a supreme spiritual energy center and a cornerstone of Vedic heritage, serving as the physical dwelling of <strong>{deityName}</strong>. Its sacred layout, deep scriptural references, and celestial cosmic alignments have sustained millions of devotees for generations.
                    </p>
                    <p className="border-l-4 border-[#E6A817] pl-6 py-2 italic text-[#1A1240] bg-[#E6A817]/5 rounded-r-xl">
                      According to traditional local history, this supreme shrine represents a direct link to the divine consciousness. Elaborate daily aartis, dynamic chants, and sacred gotra sankalpas conducted here grant unmatched internal peace and clarity.
                    </p>
                    <p>
                      Devotees visiting this sacred space undergo a profound inner transformation. Walking through the gorgeous towering gopurams, holy water tanks (kunds), and powerful pradakshina pathways offers a deeply purifying, assisted spiritual experience.
                    </p>
                  </>
                )}
              </div>

              {/* Dynamic Stats Row */}
              <div ref={statsRef} className="grid grid-cols-3 gap-6 pt-6 border-t border-border/40">
                <div className="text-center md:text-left">
                  <span className="block font-serif text-4xl md:text-5xl font-bold text-[#D85A30]">{templeCount}</span>
                  <span className="block text-[10px] uppercase tracking-widest font-black text-muted-foreground mt-2">Sacred Shrines</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="block font-serif text-4xl md:text-5xl font-bold text-[#6B1A1A]">{yearsCount === config.stats.legacyYears ? `${config.stats.legacyYears}+` : `${yearsCount}+`}</span>
                  <span className="block text-[10px] uppercase tracking-widest font-black text-muted-foreground mt-2">Years of Legacy</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="block font-serif text-4xl md:text-5xl font-bold text-[#E6A817]">
                    {baseSlug === "ahobilam" ? zonesCount : `${zonesCount}k+`}
                  </span>
                  <span className="block text-[10px] uppercase tracking-widest font-black text-muted-foreground mt-2">
                    {baseSlug === "ahobilam" ? "Trekking Zones" : "Blessed Pilgrims"}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION: THE STORY OF THE TEMPLE */}
      <section id="story" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-6 order-2 md:order-1">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Sacred Narrative</span>
                <h2 className="font-serif text-4xl md:text-5.5xl font-bold text-[#1A1240]">The Story of {displayTitle}</h2>
                <div className="h-0.5 w-16 bg-[#E6A817] rounded-full" />
              </div>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-semibold">
                <p>
                  {displayTitle} stands as one of the most sacred spiritual sanctuaries in India, revered for its divine mystique and legendary stories passed down through generations. Its origins trace back to ancient Vedic times when saints and sages ventured to these hallowed grounds seeking divine communion.
                </p>
                <p>
                  According to sacred texts and local tradition, {displayTitle} is associated with profound divine events and celestial blessings. The presiding deity, {deityName}, is believed to manifest their divine grace through this sacred abode, granting spiritual elevation to every sincere devotee who visits with reverent intention.
                </p>
                <p>
                  Through centuries of spiritual practices, countless miracles, and unwavering devotion, {displayTitle} has earned its place as a beacon of divine light. Pilgrims undertaking the sacred journey here experience transformative spiritual experiences that reshape their understanding of the divine purpose.
                </p>
              </div>

              <div className="pt-4 space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-[#D85A30]">Key Aspects of the Temple Story</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-3">
                    <span className="text-[#D85A30] font-bold mt-1">✦</span>
                    <span className="text-muted-foreground font-semibold">Ancient legacy spanning centuries of continuous spiritual practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D85A30] font-bold mt-1">✦</span>
                    <span className="text-muted-foreground font-semibold">Divine manifestations and celestial blessings documented in sacred texts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D85A30] font-bold mt-1">✦</span>
                    <span className="text-muted-foreground font-semibold">Transformative spiritual experiences for pilgrims worldwide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D85A30] font-bold mt-1">✦</span>
                    <span className="text-muted-foreground font-semibold">Extraordinary architectural and spiritual significance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Image */}
            <div className="order-1 md:order-2 relative">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={gallery[1] || gallery[0] || "https://images.unsplash.com/photo-1544013585-446a362cb705?q=80&w=800&fit=crop"}
                  alt={displayTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1240]/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E6A817]/10 rounded-3xl blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: LEGEND */}
      <section id="legend" className="py-20 bg-[#FFF8F0]/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Divine Heritage</span>
              <h2 className="font-serif text-4xl md:text-5.5xl font-bold text-[#1A1240]">Ancient & Sacred Legend</h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-semibold">
                Explore the mystical traditions, scriptural references, and divine narratives surrounding {displayTitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-8 bg-white rounded-2xl border border-border/40 shadow-sm hover:shadow-lg transition-all">
                <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-4 text-[#D85A30]">Scriptural References</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                  This sacred shrine is mentioned in various ancient Vedic texts, Puranas, and regional temple chronicles, affirming its spiritual authenticity and divine significance across centuries.
                </p>
              </div>

              <div className="p-8 bg-white rounded-2xl border border-border/40 shadow-sm hover:shadow-lg transition-all">
                <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-4 text-[#D85A30]">Deity's Divine Nature</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                  The presiding deity {deityName} embodies divine grace, protective power, and supreme consciousness. Devotees worship here seeking blessings, protection, and ultimate spiritual realization.
                </p>
              </div>

              <div className="p-8 bg-white rounded-2xl border border-border/40 shadow-sm hover:shadow-lg transition-all">
                <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-4 text-[#D85A30]">Historical Significance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                  Through various dynasties, rulers, and ages, this temple has stood as a beacon of spiritual power, attracting saints, philosophers, and pilgrims seeking divine connection.
                </p>
              </div>

              <div className="p-8 bg-white rounded-2xl border border-border/40 shadow-sm hover:shadow-lg transition-all">
                <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-4 text-[#D85A30]">Pilgrimage Importance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                  This sacred destination offers profound spiritual experiences, divine darshan, and the opportunity to connect with timeless spiritual traditions maintained here for generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SHRINES */}
      <section id="shrines" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">Divine Pantheon</span>
            <h2 className="font-serif text-4xl md:text-5.5xl font-bold text-[#1A1240] mt-4">
              {baseSlug === "ahobilam" ? "The Nine Shrines of Narasimha" : "Sacred Shrines & Key Deities"}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-semibold">
              {baseSlug === "ahobilam"
                ? "Explore the nine distinct temples representing the nine unique divine aspects of the Lion God, scattered deep across the Nallamala forests."
                : `Explore the prominent shrines, parivar temples, and sacred deities nested within the holy bounds of ${displayTitle}.`}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {baseSlug === "ahobilam" ? (
              navaShrines.map((shrine, index) => (
                <div key={index} className="group bg-[#FFF8F0]/40 rounded-3xl p-8 border border-border/40 hover:border-[#E6A817] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[300px]">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-12 w-12 rounded-2xl bg-[#D85A30]/10 flex items-center justify-center text-[#D85A30] group-hover:rotate-12 transition-transform shadow-sm">
                        <span className="text-xl">{shrine.icon}</span>
                      </div>
                      <span className="px-3.5 py-1 bg-[#E6A817]/15 text-[#1A1240] text-[9px] font-black uppercase tracking-widest rounded-full">{shrine.type}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-3 group-hover:text-[#D85A30] transition-colors">{shrine.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-semibold">{shrine.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-border/20 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-[#1A1240]/80">Trek: {shrine.trek}</span>
                    <button onClick={() => onOpenBooking(`${shrine.name} Pooja`)} className="text-[10px] font-black uppercase tracking-widest text-[#D85A30] hover:underline cursor-pointer border-none bg-transparent font-bold">Enquire Seva</button>
                  </div>
                </div>
              ))
            ) : (
              config.shrines.map((shrine, index) => (
                <div key={index} className="group bg-[#FFF8F0]/40 rounded-3xl overflow-hidden border border-border/40 hover:border-[#E6A817] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
                  <div className="relative h-44 overflow-hidden bg-[#1A1240]">
                    <img src={shrine.image} alt={shrine.name} className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute top-4 right-4 px-3 py-1 bg-[#E6A817] text-[#1A1240] text-[9px] font-black uppercase tracking-widest rounded-full">Sacred Area</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1A1240] mb-2 group-hover:text-[#D85A30] transition-colors">{shrine.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed font-semibold mb-4">{shrine.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-border/25 flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase text-[#1A1240]/70">Access: Main Complex</span>
                      <button onClick={() => onOpenBooking(`${shrine.name} Pooja`)} className="text-[10px] font-black uppercase tracking-widest text-[#D85A30] hover:underline cursor-pointer border-none bg-transparent font-bold">Enquire Seva</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* SECTION: TIMINGS SCHEDULE */}
      <section id="timings" className="py-24 bg-[#FFF8F0] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="p-10 md:p-16 bg-white rounded-[3rem] shadow-soft border border-border/30 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat" />

            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Sacred Schedule</span>
              <h2 className="font-serif text-3xl md:text-5.5xl font-bold text-[#1A1240]">Darshan Timings</h2>
              <div className="h-0.5 w-16 bg-[#E6A817] rounded-full mx-auto my-3" />
            </div>

            {/* Table */}
            <div className="overflow-x-auto my-8 border border-border/35 rounded-2xl">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#E6A817]/10 text-[#1A1240]">
                    <th className="px-6 py-5 text-left font-black text-xs uppercase tracking-wider border-b border-border/25">Darshan Session</th>
                    <th className="px-6 py-5 text-left font-black text-xs uppercase tracking-wider border-b border-border/25">Timings</th>
                    <th className="px-6 py-5 text-left font-black text-xs uppercase tracking-wider border-b border-border/25">Crowd Alert / Access</th>
                  </tr>
                </thead>
                <tbody>
                  {baseSlug === "ahobilam" ? (
                    <>
                      <tr className="hover:bg-[#E6A817]/5 transition-colors duration-300">
                        <td className="px-6 py-5 border-b border-border/20 flex items-center gap-3 text-[#1A1240] font-bold">
                          <Clock className="h-5 w-5 text-[#D85A30]" />
                          Lower Ahobilam Temples
                        </td>
                        <td className="px-6 py-5 border-b border-border/20 text-muted-foreground font-semibold">06:30 AM – 08:00 PM</td>
                        <td className="px-6 py-5 border-b border-border/20 text-xs font-bold text-green-600 uppercase">Fully Accessible by Road</td>
                      </tr>
                      <tr className="hover:bg-[#E6A817]/5 transition-colors duration-300">
                        <td className="px-6 py-5 border-b border-border/20 flex items-center gap-3 text-[#1A1240] font-bold">
                          <Clock className="h-5 w-5 text-[#D85A30]" />
                          Upper Ahobilam Temples
                        </td>
                        <td className="px-6 py-5 border-b border-border/20 text-muted-foreground font-semibold">07:00 AM – 05:00 PM</td>
                        <td className="px-6 py-5 border-b border-border/20 text-xs font-bold text-orange-500 uppercase">Mountain Cave Trek</td>
                      </tr>
                      <tr className="hover:bg-[#E6A817]/5 transition-colors duration-300">
                        <td className="px-6 py-5 flex items-center gap-3 text-[#1A1240] font-bold">
                          <Clock className="h-5 w-5 text-[#D85A30]" />
                          Pavana Narasimha Temple
                        </td>
                        <td className="px-6 py-5 text-muted-foreground font-semibold">07:00 AM – 03:00 PM</td>
                        <td className="px-6 py-5 text-xs font-bold text-red-600 uppercase">Jeep Route Recommended</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="hover:bg-[#E6A817]/5 transition-colors duration-300">
                        <td className="px-6 py-5 border-b border-border/20 flex items-center gap-3 text-[#1A1240] font-bold">
                          <Clock className="h-5 w-5 text-[#D85A30]" />
                          Morning Darshan & Aarti
                        </td>
                        <td className="px-6 py-5 border-b border-border/20 text-muted-foreground font-semibold">06:00 AM – 12:00 PM</td>
                        <td className="px-6 py-5 border-b border-border/20 text-xs font-bold text-orange-500 uppercase">Moderate Wait (1-2 Hours)</td>
                      </tr>
                      <tr className="hover:bg-[#E6A817]/5 transition-colors duration-300">
                        <td className="px-6 py-5 border-b border-border/20 flex items-center gap-3 text-[#1A1240] font-bold">
                          <Clock className="h-5 w-5 text-[#D85A30]" />
                          Afternoon Closing Break
                        </td>
                        <td className="px-6 py-5 border-b border-border/20 text-muted-foreground font-semibold">12:00 PM – 04:00 PM</td>
                        <td className="px-6 py-5 border-b border-border/20 text-xs font-bold text-green-600 uppercase">Sanctum Closed for Bhog</td>
                      </tr>
                      <tr className="hover:bg-[#E6A817]/5 transition-colors duration-300">
                        <td className="px-6 py-5 flex items-center gap-3 text-[#1A1240] font-bold">
                          <Clock className="h-5 w-5 text-[#D85A30]" />
                          Evening Darshan & Shringar
                        </td>
                        <td className="px-6 py-5 text-muted-foreground font-semibold">04:00 PM – 09:00 PM</td>
                        <td className="px-6 py-5 text-xs font-bold text-red-600 uppercase">Heavy Peak Crowds</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* Alert */}
            <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-800 text-sm">Devotee Timing & Security Lock</h4>
                <p className="text-red-700 text-xs mt-1 leading-relaxed font-semibold">
                  {config.terrainType === "trekking"
                    ? "High-altitude and forest routes close strictly by 03:00 PM - 05:00 PM for wilderness safety under local forest department codes. Devotees must pace their treks accordingly."
                    : "Due to heavy security checking, mobile phones, cameras, leather bags, and electronic items are strictly prohibited inside the main temple hallways. Devotees should utilize cloakrooms."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: MUST EXPERIENCE HIGHLIGHTS */}
      <section id="highlights" className="py-24 bg-[#FFF8F0] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Divine Moments</span>
            <h2 className="font-serif text-4xl md:text-5.5xl font-bold text-[#1A1240]">Must Experience Highlights</h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-semibold">
              Discover the most sacred and transformative experiences at {displayTitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-white rounded-3xl border border-border/40 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-[#D85A30]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D85A30]/20 transition-colors">
                  <Star className="h-6 w-6 text-[#D85A30]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1240]">Main Deity Darshan</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                Stand before the divine presence of {deityName} in the sanctum sanctorum. This is the most sacred moment of any pilgrimage - witnessing the deity's divine form and receiving direct spiritual blessings.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-border/40 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-[#E6A817]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E6A817]/20 transition-colors">
                  <Flame className="h-6 w-6 text-[#E6A817]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1240]">Sacred Aarti Experience</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                Witness the elaborate daily aarti ceremonies where the divine is honored with sacred rituals, incense, bells, and flowers. The spiritual energy during aarti is deeply transformative.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-border/40 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-[#6B1A1A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6B1A1A]/20 transition-colors">
                  <Gift className="h-6 w-6 text-[#6B1A1A]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1240]">Divine Prasad & Blessings</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                Receive blessed prasad (sanctified food offering) distributed directly from the deity's altar. This sacred offering carries divine grace and is considered a blessing from the Lord.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-border/40 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-[#4A7C59]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4A7C59]/20 transition-colors">
                  <Heart className="h-6 w-6 text-[#4A7C59]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1240]">Spiritual Meditation</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                Meditate in the sacred atmosphere of the temple. The divine vibrations, ancient mantras, and spiritual energy create an ideal environment for deep spiritual practice and inner transformation.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-border/40 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-[#2E5C4A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2E5C4A]/20 transition-colors">
                  <Compass className="h-6 w-6 text-[#2E5C4A]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1240]">Parikrama Circumambulation</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                Walk the sacred circumambulation path around the temple sanctum. This ancient spiritual practice symbolizes devotion and connects pilgrims with centuries of spiritual seekers.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-border/40 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-[#7A5C5C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7A5C5C]/20 transition-colors">
                  <Volume2 className="h-6 w-6 text-[#7A5C5C]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1240]">Vedic Chanting & Mantras</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                Experience the profound vibrations of ancient Vedic chants and sacred mantras. These divine sounds have transformative power and connect you to the eternal spiritual wisdom of the ages.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => onOpenBooking("Temple Experience Package")} className="inline-flex items-center justify-center h-14 px-10 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg transition-all border-none cursor-pointer font-bold">
              <Gift className="mr-3 h-5 w-5" />
              Enquire Spiritual Experience
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: ZONES & ROUTE SPLIT */}
      <section id="zones" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Sacred Geography</span>
            <h2 className="font-serif text-4xl md:text-5.5xl font-bold text-[#1A1240]">The Pilgrimage Zones</h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-semibold">
              Explore the distinct zones within the sacred bounds of {displayTitle}, each representing a unique spiritual energy level.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {baseSlug === "ahobilam" ? (
              <>
                {/* Lower Ahobilam */}
                <div className="p-10 bg-[#FFF8F0]/40 rounded-[2.5rem] border border-border/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="px-5 py-1.5 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full">Base Camp Zone</span>
                      <span className="text-[10px] font-black uppercase text-muted-foreground">Easy to Moderate</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#1A1240] mb-4">Lower Ahobilam</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-semibold">
                      Located at the base foothills. The legendary Lakshimidevi temple stands here. Features smooth motorable roads, basic boarding amenities, ashrams, and serves as the launching base camp for all Upper Ahobilam trekking.
                    </p>
                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-3">
                        <span className="text-[#D85A30]">🦁</span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold"><strong>Bhargava, Yogananda, Chatravata Shrines</strong> are located in this lower circle, accessible via short walks.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[#D85A30]">🛕</span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold"><strong>Vijayanagara Gopurams</strong> show magnificent medieval Dravidian temple layouts with detailed stone carvings.</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => onOpenBooking("Lower Ahobilam Tour")} className="w-full mt-8 h-12 bg-[#1A1240] hover:bg-[#0D0825] text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-none cursor-pointer font-bold">Explore Lower Shrines</button>
                </div>

                {/* Upper Ahobilam */}
                <div className="p-10 bg-[#FDF1E3]/80 rounded-[2.5rem] border border-[#E6A817]/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="px-5 py-1.5 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-full">High-Altitude Cavern Zone</span>
                      <span className="text-[10px] font-black uppercase text-muted-foreground">Moderate to Difficult</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#1A1240] mb-4">Upper Ahobilam</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-semibold">
                      The rugged mountain terrains, situated 8 kilometers higher. Devotees hike through deep, moist limestone caves, rocky river banks, and dense vegetation to find the powerful ancient cave temples. Requires professional guides.
                    </p>
                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-3">
                        <span className="text-[#D85A30]">⛰️</span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold"><strong>Ahobila, Kroda, Jwala, Malola</strong> temples reside here inside natural rock cracks and steep high cliff-sides.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[#D85A30]">🌊</span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold"><strong>Bhavanasini River Crossing</strong> requires stepping across slippery mountain rocks under forest canopies.</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => onOpenBooking("Upper Ahobilam Forest Trek")} className="w-full mt-8 h-12 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-gold transition-all border-none cursor-pointer font-bold">Book Guided Cave Trek</button>
                </div>
              </>
            ) : (
              <>
                {/* Zone 1: Garbhagriha */}
                <div className="p-10 bg-[#FFF8F0]/40 rounded-[2.5rem] border border-border/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="px-5 py-1.5 bg-[#D85A30]/15 text-[#D85A30] text-[10px] font-black uppercase tracking-widest rounded-full">Inner Sanctum</span>
                      <span className="text-[10px] font-black uppercase text-muted-foreground">Deep Silence & Focus</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#1A1240] mb-4">Garbhagriha (Sanctum)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-semibold">
                      The core spiritual center of the temple where the dynamic self-manifested idol of {deityName} sits in divine splendor. Highly charged with continuous centuries of continuous Vedic chants and mantra offerings.
                    </p>
                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-3">
                        <span className="text-[#D85A30]">🙏</span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold"><strong>Garbhadwara Darshan</strong> is coordinated carefully to ensure close proximity viewing of the deity.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[#D85A30]">🕯️</span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold"><strong>Direct Aarti Sessions</strong> offer direct spiritual connection inside the holy gold-plated inner pillars.</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => onOpenBooking("Inner Sanctum Darshan Support")} className="w-full mt-8 h-12 bg-[#1A1240] hover:bg-[#0D0825] text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-none cursor-pointer font-bold">Enquire Sanctum Entry</button>
                </div>

                {/* Zone 2: Prakaram */}
                <div className="p-10 bg-[#FDF1E3]/80 rounded-[2.5rem] border border-[#E6A817]/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="px-5 py-1.5 bg-[#E6A817]/15 text-[#E6A817] text-[10px] font-black uppercase tracking-widest rounded-full">Parikrama Prakaram</span>
                      <span className="text-[10px] font-black uppercase text-muted-foreground">Vast Heritage Walks</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#1A1240] mb-4">Outer Courtyard & Corridors</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-semibold">
                      The spacious heritage corridors surrounding the main sanctum. Devotees take their parikrama rounds while appreciating the magnificent ancient architecture, temple ponds, and beautiful parivar shrines.
                    </p>
                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-3">
                        <span className="text-[#D85A30]">🛕</span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold"><strong>Parivar Devtas</strong> including auxilary shrines of divine protectors and consorts are nested here.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[#D85A30]">🌊</span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold"><strong>Sacred Kund (Pond)</strong> where devotees wash their hands and feet before entering the inner gates.</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => onOpenBooking("Parikrama Tour Coordination")} className="w-full mt-8 h-12 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-gold transition-all border-none cursor-pointer font-bold">Enquire Parikrama Support</button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION: HOW TO REACH THE TEMPLE */}
      <section id="reaching" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Travel Guide</span>
            <h2 className="font-serif text-4xl md:text-5.5xl font-bold text-[#1A1240]">How to Reach {displayTitle}</h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-semibold">
              Complete travel information to plan your spiritual journey smoothly
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {/* By Air */}
            <div className="p-8 bg-[#FFF8F0] rounded-2xl border border-border/40 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-xl bg-[#D85A30]/15 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-[#D85A30]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A1240] mb-3">By Air</h3>
              <ul className="text-xs text-muted-foreground space-y-2 font-semibold leading-relaxed">
                <li>• Fly to nearest major airport</li>
                <li>• Arrange car rental or taxi</li>
                <li>• 4-6 hours drive typically</li>
                <li>• Direct flights from metros</li>
              </ul>
            </div>

            {/* By Rail */}
            <div className="p-8 bg-[#FFF8F0] rounded-2xl border border-border/40 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-xl bg-[#E6A817]/15 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-[#E6A817]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A1240] mb-3">By Train</h3>
              <ul className="text-xs text-muted-foreground space-y-2 font-semibold leading-relaxed">
                <li>• Book via Indian Railways</li>
                <li>• Nearest major railway station</li>
                <li>• Arrange onward transport</li>
                <li>• Budget-friendly option</li>
              </ul>
            </div>

            {/* By Road */}
            <div className="p-8 bg-[#FFF8F0] rounded-2xl border border-border/40 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-xl bg-[#6B1A1A]/15 flex items-center justify-center mb-4">
                <Compass className="h-6 w-6 text-[#6B1A1A]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A1240] mb-3">By Road</h3>
              <ul className="text-xs text-muted-foreground space-y-2 font-semibold leading-relaxed">
                <li>• Well-connected highway access</li>
                <li>• Self-drive or bus services</li>
                <li>• Various transport options</li>
                <li>• Flexible travel schedules</li>
              </ul>
            </div>

            {/* Best Time */}
            <div className="p-8 bg-[#FFF8F0] rounded-2xl border border-border/40 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-xl bg-[#4A7C59]/15 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-[#4A7C59]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A1240] mb-3">Best Season</h3>
              <ul className="text-xs text-muted-foreground space-y-2 font-semibold leading-relaxed">
                <li>• September to March</li>
                <li>• Pleasant weather</li>
                <li>• Avoid monsoon months</li>
                <li>• Plan ahead for festivals</li>
              </ul>
            </div>
          </div>

          {/* Essential Information */}
          <div className="bg-gradient-to-r from-[#FFF8F0] to-[#FDF1E3] p-10 rounded-3xl border border-border/40">
            <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-6">Essential Travel Information</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-[#D85A30] font-bold mt-1">✓</span>
                  <div>
                    <h4 className="font-bold text-[#1A1240] text-sm">Documentation Required</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Valid ID proof, passport for international travelers, vaccination certificates if required</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#D85A30] font-bold mt-1">✓</span>
                  <div>
                    <h4 className="font-bold text-[#1A1240] text-sm">Accommodation Booking</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Book hotels and guest houses in advance, especially during peak seasons and festival times</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-[#D85A30] font-bold mt-1">✓</span>
                  <div>
                    <h4 className="font-bold text-[#1A1240] text-sm">Health Precautions</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Carry medications, travel insurance, sun protection, and stay hydrated throughout the journey</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#D85A30] font-bold mt-1">✓</span>
                  <div>
                    <h4 className="font-bold text-[#1A1240] text-sm">Temple Etiquette</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Dress modestly, remove shoes as required, silence phones, and follow temple protocols respectfully</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button onClick={() => onOpenBooking("Journey Planning Assistance")} className="inline-flex items-center justify-center h-14 px-10 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg transition-all border-none cursor-pointer font-bold">
              <MapPin className="mr-3 h-5 w-5" />
              Get Travel Assistance
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: FESTIVALS & SEASONS */}
      <section id="festivals" className="relative py-28 bg-gradient-to-br from-[#6B1A1A] to-[#4A1010] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E6A817] font-black">Auspicious Seasons</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">Festivals & Best Time to Visit</h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed font-medium">
                {displayTitle} glows in extraordinary festive splendor during major astronomical periods. Plan your visit accordingly to capture auspicious blessings.
              </p>

              <div className="pt-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#E6A817] mb-3">Ideal Travel Weather Window</h4>
                <div className="flex rounded-full overflow-hidden bg-[#4A1010] border border-white/10 p-1 text-[10px] font-bold text-center">
                  <span className="flex-1 py-2 text-white/40">Apr-Jun</span>
                  <span className="flex-1 py-2 text-white/40">Jul-Aug</span>
                  <span className="flex-1 py-2 bg-gradient-to-r from-[#D85A30] to-[#F4A835] text-white rounded-full font-black shadow-md">Sep-Mar (Gold Window)</span>
                </div>
                <p className="text-[10px] text-white/50 mt-2 italic">* September to March offers comfortable cool weather for hassle-free darshan and travels.</p>
              </div>
            </div>

            {/* Right Cards */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {baseSlug === "ahobilam" ? (
                <>
                  <div className="p-8 rounded-3xl bg-[#4A1010]/60 border border-[#E6A817]/15 shadow-md flex flex-col justify-between min-h-[200px] hover:border-[#E6A817] transition-all duration-300">
                    <div>
                      <span className="text-[#E6A817] text-lg">🌾</span>
                      <h3 className="font-serif text-xl font-bold mt-4 mb-2 text-white">Ahobilam Brahmotsavam</h3>
                      <p className="text-xs text-white/60 leading-relaxed font-semibold">Celebrated grandly in February/March (Phalguna month). Thousands gather to witness the majestic celestial marriage of Lord Narasimha.</p>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#E6A817] mt-4 block">Annual Grand Festival</span>
                  </div>

                  <div className="p-8 rounded-3xl bg-[#4A1010]/60 border border-[#E6A817]/15 shadow-md flex flex-col justify-between min-h-[200px] hover:border-[#E6A817] transition-all duration-300">
                    <div>
                      <span className="text-[#E6A817] text-lg">🔥</span>
                      <h3 className="font-serif text-xl font-bold mt-4 mb-2 text-white">Narasimha Jayanti</h3>
                      <p className="text-xs text-white/60 leading-relaxed font-semibold">Occurs during Vaishakha month (May). The highly powerful appearance day of the deity, celebrated with continuous abhishekams.</p>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#E6A817] mt-4 block">Divine Appearance Day</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-8 rounded-3xl bg-[#4A1010]/60 border border-[#E6A817]/15 shadow-md flex flex-col justify-between min-h-[200px] hover:border-[#E6A817] transition-all duration-300">
                    <div>
                      <span className="text-[#E6A817] text-lg">🌾</span>
                      <h3 className="font-serif text-xl font-bold mt-4 mb-2 text-white">Annual Maha Utsav</h3>
                      <p className="text-xs text-white/60 leading-relaxed font-semibold">The premier annual festival of the temple featuring complex deity processions, gorgeous chariot (Ratha) yatras, and spectacular lighting.</p>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#E6A817] mt-4 block">Annual Grand Celebration</span>
                  </div>

                  <div className="p-8 rounded-3xl bg-[#4A1010]/60 border border-[#E6A817]/15 shadow-md flex flex-col justify-between min-h-[200px] hover:border-[#E6A817] transition-all duration-300">
                    <div>
                      <span className="text-[#E6A817] text-lg">🔥</span>
                      <h3 className="font-serif text-xl font-bold mt-4 mb-2 text-white">Vishesh Appearance Day</h3>
                      <p className="text-xs text-white/60 leading-relaxed font-semibold">Special appearance days or astronomical conjunction day celebrating the principal deity, accompanied by continuous maha dynamic abhishekams.</p>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#E6A817] mt-4 block">Appearance Day Celebration</span>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: SERVICES IN DETAIL */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Pilgrimage Services</span>
            <h2 className="font-serif text-4xl md:text-5.5xl font-bold text-[#1A1240]">Divine Services</h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-semibold">Assisted religious coordination packages mapped to authentic local traditions, styled to support a peaceful pilgrimage.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Service 1 */}
            <div className="group bg-[#FFF8F0]/40 rounded-3xl p-8 border border-border/40 hover:border-[#E6A817] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#D85A30] flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform shadow-md">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-3">Special Darshan</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">Priority queue access and local devotee coordination support to skip long temple queues.</p>
              </div>
              <Link to={`/${baseSlug}-temple/darshan`} className="w-full mt-6 h-11 bg-[#FFF8F0] hover:bg-[#D85A30] hover:text-white text-[#D85A30] border border-[#D85A30]/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center font-bold">Start your divine journey</Link>
            </div>

            {/* Service 2 */}
            <div className="group bg-[#FFF8F0]/40 rounded-3xl p-8 border border-border/40 hover:border-[#E6A817] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#D85A30] flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform shadow-md">
                  <Flame className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-3">Sacred Pooja Seva</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">Personalized pooja chanting arranged with experienced temple priests with live gotra sankalp.</p>
              </div>
              <Link to={`/${baseSlug}-temple/puja`} className="w-full mt-6 h-11 bg-[#FFF8F0] hover:bg-[#D85A30] hover:text-white text-[#D85A30] border border-[#D85A30]/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center font-bold">Start your divine journey</Link>
            </div>

            {/* Service 3 */}
            <div className="group bg-[#FFF8F0]/40 rounded-3xl p-8 border border-border/40 hover:border-[#E6A817] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#D85A30] flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform shadow-md">
                  <Gift className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-3">Blessed Prasad Delivery</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">Sacred temple laddu and holy dry-fruits delivered securely right to your doorstep.</p>
              </div>
              <Link to={`/${baseSlug}-temple/prasad`} className="w-full mt-6 h-11 bg-[#FFF8F0] hover:bg-[#D85A30] hover:text-white text-[#D85A30] border border-[#D85A30]/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center font-bold">Start your divine journey</Link>
            </div>

            {/* Service 4 */}
            <div className="group bg-[#FFF8F0]/40 rounded-3xl p-8 border border-border/40 hover:border-[#E6A817] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#D85A30] flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform shadow-md">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-3">Online Chadhava</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">Offer remote contributions, Vastram, or flower offerings cleanly from the comfort of home.</p>
              </div>
              <Link to={`/${baseSlug}-temple/chadhava`} className="w-full mt-6 h-11 bg-[#FFF8F0] hover:bg-[#D85A30] hover:text-white text-[#D85A30] border border-[#D85A30]/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center font-bold">Start your divine journey</Link>
            </div>

            {/* Service 5 */}
            <div className="group bg-[#FFF8F0]/40 rounded-3xl p-8 border border-border/40 hover:border-[#E6A817] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#D85A30] flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform shadow-md">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-3">Complete Yatra Support</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">Full local transport, hygienic pure-veg boarding stays, and end-to-end itinerary coordination.</p>
              </div>
              <button onClick={() => onOpenBooking("Complete Yatra Support")} className="w-full mt-6 h-11 bg-[#FFF8F0] hover:bg-[#D85A30] hover:text-white text-[#D85A30] border border-[#D85A30]/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer font-bold">Start your divine journey</button>
            </div>

            {/* Service 6 */}
            <div className="group bg-[#FFF8F0]/40 rounded-3xl p-8 border border-border/40 hover:border-[#E6A817] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#D85A30] flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform shadow-md">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-3">
                  {config.terrainType === "trekking" ? "Guided Forest Treks" : "Guided Temple Tours"}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  {config.terrainType === "trekking"
                    ? "Accompanied by verified local guides who know every sacred cave, stream crossing, and forest path."
                    : "Accompanied by learned, expert local guides who describe the deep history, architecture, and sacred folklore."}
                </p>
              </div>
              <button onClick={() => onOpenBooking(config.terrainType === "trekking" ? "Guided Forest Treks" : "Guided Temple Tours")} className="w-full mt-6 h-11 bg-[#FFF8F0] hover:bg-[#D85A30] hover:text-white text-[#D85A30] border border-[#D85A30]/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer font-bold">Start your divine journey</button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: DEVOTEE REVIEWS */}
      <section className="py-24 bg-[#FDF1E3] border-t border-b border-border/20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Sacred Testimonials</span>
            <h3 className="font-serif text-3xl md:text-4.5xl font-bold text-[#1A1240] mt-2">Devotee Experiences</h3>
            <p className="text-muted-foreground text-sm font-semibold mt-2">Read reviews from pilgrims who visited this holy site with our assistance.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden min-h-[220px] flex items-center justify-center relative bg-white rounded-[2.5rem] border border-[#E6A817]/15 p-8 md:p-12 shadow-soft">

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full text-center max-w-2xl mx-auto"
                >
                  <div className="flex justify-center gap-1 text-[#E6A817] mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#E6A817] text-[#E6A817]" />
                    ))}
                  </div>
                  <p className="text-[#1A1240]/80 text-sm md:text-base leading-relaxed italic font-semibold mb-6">
                    "{pilgrimReviews[activeReviewIndex].quote}"
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D85A30]/10 border border-[#E6A817] flex items-center justify-center font-bold text-[#D85A30] shrink-0 font-bold">
                      {pilgrimReviews[activeReviewIndex].initials}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[#1A1240] text-sm">{pilgrimReviews[activeReviewIndex].name}</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{pilgrimReviews[activeReviewIndex].location}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Slider arrows */}
            <button
              onClick={() => setActiveReviewIndex((prev) => (prev - 1 + pilgrimReviews.length) % pilgrimReviews.length)}
              className="absolute left-[-20px] md:left-[-30px] top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white hover:bg-[#E6A817] hover:text-white text-[#1A1240] border border-border/40 shadow-md flex items-center justify-center cursor-pointer transition-all z-20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveReviewIndex((prev) => (prev + 1) % pilgrimReviews.length)}
              className="absolute right-[-20px] md:right-[-30px] top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white hover:bg-[#E6A817] hover:text-white text-[#1A1240] border border-border/40 shadow-md flex items-center justify-center cursor-pointer transition-all z-20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION: SACRED FAQS */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6">

          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Sacred Enquiries</span>
            <h2 className="font-serif text-3xl md:text-5.5xl font-bold text-[#1A1240]">Frequently Asked Questions</h2>
            <div className="h-0.5 w-16 bg-[#E6A817] rounded-full mx-auto my-3" />
          </div>

          <div className="space-y-4">
            {config.faqs.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div key={index} className="border border-border/40 rounded-2xl overflow-hidden hover:border-[#E6A817] transition-colors bg-white">
                  <button
                    onClick={() => handleFaqToggle(index)}
                    className="w-full px-6 py-5 bg-[#FFF8F0]/35 flex items-center justify-between text-left text-[#1A1240] font-bold text-sm md:text-base cursor-pointer border-none font-bold"
                  >
                    {faq.question}
                    <span className={`text-[#E6A817] font-black transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-white"
                      >
                        <p className="p-6 text-xs md:text-sm text-muted-foreground leading-relaxed font-semibold">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION: NEARBY PLACES */}
      <section id="nearby" className="py-24 bg-[#FDF1E3] relative">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Divine Neighborhood</span>
            <h2 className="font-serif text-4xl md:text-5.5xl font-bold text-[#1A1240]">Nearby Sacred Places</h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-semibold">Extend your holy pilgrimage by visiting neighboring ancient shrines and natural wonders.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {nearbyPlaces.map((place, index) => (
              <Link key={index} to={`/${place.slug}`} className="group bg-white rounded-3xl overflow-hidden border border-border/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="relative h-56 bg-[#6B1A1A] overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-4 right-4 px-3 py-1 bg-[#E6A817] text-[#1A1240] font-black text-[9px] uppercase tracking-widest rounded-full">{place.distance} away</span>
                  </div>
                  <div className="p-8 space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-[#1A1240] group-hover:text-[#D85A30] transition-colors">{place.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-semibold">{place.desc}</p>
                  </div>
                </div>
                <div className="px-8 pb-8 flex items-center text-[10px] font-black uppercase tracking-widest text-[#D85A30] font-bold">
                  Explore Temple <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: HOTELS & NEARBY SACRED PLACES */}
      <section id="hotels" className="py-24 bg-[#FDF1E3] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Comfort & Convenience</span>
            <h2 className="font-serif text-4xl md:text-5.5xl font-bold text-[#1A1240]">Hotels & Nearby Sacred Places</h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-semibold">
              Find comfortable accommodations and explore other sacred sites in the region
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Hotels */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#1A1240] mb-6">Accommodation Options</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-semibold mb-6">
                  {displayTitle} has various accommodation options to suit every budget and preference, from luxurious hotels to humble ashram rooms.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl border border-border/40 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#D85A30]/15 flex items-center justify-center flex-shrink-0">
                      <Star className="h-5 w-5 text-[#D85A30]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1240] text-sm">Luxury Hotels</h4>
                      <p className="text-xs text-muted-foreground mt-1 font-semibold">
                        High-end 4-5 star hotels with modern amenities, fine dining, and comfort for discerning travelers seeking premium experience.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-border/40 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#E6A817]/15 flex items-center justify-center flex-shrink-0">
                      <Home className="h-5 w-5 text-[#E6A817]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1240] text-sm">Mid-Range Hotels & Lodges</h4>
                      <p className="text-xs text-muted-foreground mt-1 font-semibold">
                        Comfortable 2-3 star accommodations with decent facilities, good value for money, and excellent service. Most budget-conscious pilgrims stay here.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-border/40 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#6B1A1A]/15 flex items-center justify-center flex-shrink-0">
                      <Gift className="h-5 w-5 text-[#6B1A1A]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1240] text-sm">Temple Ashrams & Dharamshala</h4>
                      <p className="text-xs text-muted-foreground mt-1 font-semibold">
                        Sacred guest houses run by temples or trusts offering simple, clean rooms and spiritual atmosphere at nominal costs. Vegetarian meals often provided.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-border/40 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#4A7C59]/15 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-[#4A7C59]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1240] text-sm">Home-Stay & Budget Options</h4>
                      <p className="text-xs text-muted-foreground mt-1 font-semibold">
                        Local family guesthouses and budget accommodations offering authentic hospitality, home-cooked meals, and personal touch at very affordable rates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => onOpenBooking("Hotel Booking Assistance")} className="w-full h-12 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg border-none cursor-pointer font-bold transition-all">
                Search & Book Hotels
              </button>
            </div>

            {/* Sacred Places */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#1A1240] mb-6">Nearby Sacred Destinations</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-semibold mb-6">
                  Extend your pilgrimage journey by visiting other spiritually significant temples and holy sites in the surrounding region.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl border border-border/40 hover:shadow-lg transition-all cursor-pointer group">
                  <h4 className="font-bold text-[#1A1240] text-sm group-hover:text-[#D85A30] transition-colors">Ancient Historical Temples</h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-semibold">
                    Several centuries-old temples dedicated to various deities are located within 50-100 km radius, each with unique architectural styles and spiritual significance.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-border/40 hover:shadow-lg transition-all cursor-pointer group">
                  <h4 className="font-bold text-[#1A1240] text-sm group-hover:text-[#D85A30] transition-colors">Natural Pilgrimage Sites</h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-semibold">
                    Sacred waterfalls, holy springs, mountain shrines, and natural rock formations with spiritual significance offer profound meditation and contemplation experiences.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-border/40 hover:shadow-lg transition-all cursor-pointer group">
                  <h4 className="font-bold text-[#1A1240] text-sm group-hover:text-[#D85A30] transition-colors">Ashrams & Spiritual Centers</h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-semibold">
                    Active ashrams and spiritual learning centers nearby offer yoga classes, meditation sessions, Vedic study programs, and spiritual guidance from experienced gurus.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-border/40 hover:shadow-lg transition-all cursor-pointer group">
                  <h4 className="font-bold text-[#1A1240] text-sm group-hover:text-[#D85A30] transition-colors">Scenic & Cultural Attractions</h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-semibold">
                    Museums, heritage sites, natural parks, and cultural centers showcasing local art, craft, cuisine, and traditions complement your spiritual journey beautifully.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-border/40 hover:shadow-lg transition-all cursor-pointer group">
                  <h4 className="font-bold text-[#1A1240] text-sm group-hover:text-[#D85A30] transition-colors">Gurukuls & Learning Centers</h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-semibold">
                    Traditional and modern institutions offering courses in ancient texts, Sanskrit, Indian philosophy, yoga, and ayurveda for deeper spiritual knowledge.
                  </p>
                </div>
              </div>

              <button onClick={() => onOpenBooking("Multi-Temple Tour Package")} className="w-full h-12 bg-[#6B1A1A] hover:bg-[#521313] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg border border-[#E6A817]/20 cursor-pointer font-bold transition-all">
                Explore Sacred Circuit
              </button>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-gradient-to-r from-[#FFF8F0] to-[#F4A835]/10 p-8 rounded-2xl border border-[#E6A817]/30">
            <h3 className="font-serif text-2xl font-bold text-[#1A1240] mb-4">Pro Travel Tips</h3>
            <div className="grid md:grid-cols-3 gap-6 text-xs font-semibold text-muted-foreground">
              <div>
                <p className="font-bold text-[#1A1240] mb-2">✓ Advance Booking</p>
                <p>Reserve accommodations at least 1-2 months ahead during peak season for better availability and rates.</p>
              </div>
              <div>
                <p className="font-bold text-[#1A1240] mb-2">✓ Local Guides</p>
                <p>Hire knowledgeable local guides to explore nearby temples and sacred sites safely and learn authentic spiritual stories.</p>
              </div>
              <div>
                <p className="font-bold text-[#1A1240] mb-2">✓ Sacred Protocol</p>
                <p>Respect local customs, dress appropriately, follow temple guidelines, and always seek permission before photography.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: DOCX CONTENT (Standardized Sections) */}
      {docxPath && (
        <section id="official-details" className="py-24 bg-white relative border-t-8 border-gold">
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

      {/* FLOATING BOOKING OVERLAY ROW */}
      <section className="py-12 bg-[#1A1240] text-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="font-serif text-2.5xl font-bold text-white mb-2">Ready for your {displayTitle} Pilgrimage?</h4>
            <p className="text-white/60 text-xs font-semibold">Let our temple advisors organize priority sevas, gotra sankalps, and guides seamlessly.</p>
          </div>
          <Link
            to={`/${baseSlug}-temple/darshan`}
            className="h-14 px-10 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg border-none cursor-pointer flex items-center justify-center font-bold"
          >
            Start your divine journey
          </Link>
        </div>
      </section>

    </div>
  );
};
