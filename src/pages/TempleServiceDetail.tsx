import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, MapPin, Star, Sparkles, Flame, Gift, Compass, Heart, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { BookingModal } from "@/components/BookingModal";
import { templeMetadata } from "@/data/templeMetadata";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DocxRenderer } from "@/components/DocxRenderer";
import { templeFiles, darshanFiles } from "@/data/templeList";

const serviceTypes = {
  puja: {
    title: "Pooja & Rituals",
    icon: Flame,
    color: "bg-orange-50 text-orange-600",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    tagline: "Sankalp Pujas performed by authentic temple priests in your name.",
    description: "Connect directly with verified temple priests to perform specialized Pujas, Yajnas, and Archanas tailored to your gotra and family lineage."
  },
  prasad: {
    title: "Prasad Delivery",
    icon: Gift,
    color: "bg-gold-soft/30 text-[#E6A817]",
    gradient: "bg-gradient-to-br from-[#E6A817] to-orange-500",
    tagline: "Authentic temple prasadam delivered directly from the shrine to your home.",
    description: "Receive the sacred blessings and energised edible offerings directly from the temple's sanctum, packed with absolute hygiene and pure devotion."
  },
  chadhava: {
    title: "Chadhava & Offerings",
    icon: Heart,
    color: "bg-pink-50 text-pink-600",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    tagline: "Offer Vastram, Flowers, or Shringar to the deity from anywhere in the world.",
    description: "Perform holy remote offerings including specialized garments (Vastram), fresh floral garlands, or decorative shringar to express your deep gratitude."
  },
  yatra: {
    title: "Yatra Packages",
    icon: Compass,
    color: "bg-blue-50 text-blue-600",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    tagline: "Complete spiritual itineraries and logistics for your entire family.",
    description: "Plan a seamless and comfortable pilgrimage including pure-veg boarding, assisted queue clearing, and professional devotional guides."
  }
};

// Helper for dynamic Sanskrit Shlokas based on the deity/slug
function getShlokaAndTranslation(deity: string | undefined, slug: string) {
  const d = (deity || "").toLowerCase();
  const s = slug.toLowerCase();

  if (d.includes("narasimha") || s.includes("ahobilam")) {
    return {
      shloka: "Ugram Viram Maha Vishnum Jvalantam Sarvato Mukham | Nrisimham Bhishanam Bhadram Mriyur Mriyum Namamy Aham ||",
      title: "Sri Narasimha Maha Mantra",
      translation: "I bow down to the highly ferocious, brave, and glorious Lord Narasimha, the protector of all."
    };
  }
  if (d.includes("shiva") || d.includes("jyotirlinga") || s.includes("kashi") || s.includes("mahakaleshwar") || s.includes("somnath") || s.includes("kedarnath") || s.includes("trimbakeshwar")) {
    return {
      shloka: "Tryambakam Yajamahe Sugandhim Pushti-Vardhanam | Urvarukamiva Bandhanan Mrityormukshiya Mamritat ||",
      title: "Maha Mrityunjaya Mantra",
      translation: "We worship the three-eyed Lord Shiva, who is fragrant and nourishes all beings."
    };
  }
  if (d.includes("krishna") || d.includes("vishnu") || d.includes("jagannath") || d.includes("dwarka") || s.includes("tirupati") || s.includes("guruvayur") || s.includes("srinathji")) {
    return {
      shloka: "Vasudeva Sutam Devam Kamsa Chanura Mardanam | Devaki Paramanandam Krishnam Vande Jagadgurum ||",
      title: "Sri Krishna Janmashtami Shloka",
      translation: "I salute Lord Krishna, the teacher of the universe, the son of Vasudeva, the destroyer of Kamsa."
    };
  }
  if (d.includes("rama") || s.includes("ayodhya") || s.includes("rameshwaram")) {
    return {
      shloka: "Ramaya Ramabhadraya Ramachandraya Vedhase | Raghunathaya Nathaya Sitayah Pataye Namah ||",
      title: "Sri Rama Sloka",
      translation: "I bow to the noble Lord Rama, the husband of Sitadevi and the master of Raghuvansh."
    };
  }
  return {
    shloka: "Sarva Mangala Mangalye Shive Sarvartha Sadhike | Sharanye Tryambake Gauri Narayani Namostute ||",
    title: "Devi Auspicious Shloka",
    translation: "I salute the highly auspicious Goddess Gauri, who bestows blessings and fulfills all pure desires."
  };
}

const TempleServiceDetail = () => {
  const { templeSlug, serviceType } = useParams();
  const type = serviceType as keyof typeof serviceTypes;
  const service = serviceTypes[type] || serviceTypes.puja;

  const baseSlug = templeSlug?.toLowerCase().replace(/-temple$/, "") || "";
  const templeData = templeMetadata[baseSlug as keyof typeof templeMetadata];
  const templeName = templeData?.name || baseSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const mainImage = templeData?.image || `/assets/images/temples/${baseSlug}.jpg`;
  const rawGallery = templeData?.gallery && templeData.gallery.length > 0 ? templeData.gallery : [mainImage];
  const gallery = Array.from(new Set(rawGallery));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [docxPath, setDocxPath] = useState<string>("");

  useEffect(() => {
    // Helper to find file (duplicated logic for simplicity in this component)
    const findFileMatch = (slug: string, fileList: string[]) => {
      const searchTerm = slug.replace(/-/g, " ").toLowerCase();
      let match = fileList.find(f => f.toLowerCase().includes(searchTerm));
      if (!match && searchTerm.length > 3) {
        const prefix = searchTerm.substring(0, 4);
        match = fileList.find(f => f.toLowerCase().includes(prefix));
      }
      return match;
    };

    if (type === 'yatra' || type === 'puja' || type === 'prasad' || type === 'chadhava') {
      const file = findFileMatch(baseSlug, templeFiles);
      if (file) setDocxPath(`/assets/content/temples/${file}`);
    }
  }, [baseSlug, type]);

  useEffect(() => {
    if (gallery.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [gallery.length]);

  const shlokaInfo = getShlokaAndTranslation(templeData?.deity, baseSlug);

  // Floating canvas petals animation
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

    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 4,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.25 + 0.1,
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

  const reviews = [
    {
      name: "Achutam Nair",
      location: "Bangalore",
      feedback: "Great assisted darshan options. Felt deeply connected with the divine space without worrying about any queues or coordination. Strongly recommended!"
    },
    {
      name: "Ramesh Chandra Bhatt",
      location: "Nagpur",
      feedback: "So many options for all the devotees. Great to get the grace of god from our homes. Most authentic and trustworthy service compared to others."
    },
    {
      name: "Shivraj Dobhi",
      location: "Agra",
      feedback: "Liked the fact that we can book online else we have to travel to get everything done. Felt very nice to hear my name and gotra during the sankalp. Prasad was also received in time."
    }
  ];

  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  return (
    <>
      <SEO
        title={`${service.title} at ${templeName} | Vandan Darshan`}
        description={`Book authentic ${service.title} at ${templeName}. Professional assistance, verified priests, and hassle-free spiritual services.`}
      />

      <div className="bg-[#FFF8F0] min-h-screen text-[#2E2520] font-sans selection:bg-[#D85A30] selection:text-white overflow-x-hidden relative">

        {/* Floating Canvas Overlay */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        {/* HERO WITH ROTATING BANNER */}
        <section className="relative min-h-[60vh] flex items-center pt-48 lg:pt-56 pb-20 overflow-hidden bg-[#1A1240] text-white">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1240] via-[#1A1240]/60 to-[#1A1240]/25 z-10" />
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                src={gallery[currentImageIndex]}
                onError={(e) => {
                  e.currentTarget.src = `https://images.unsplash.com/photo-1544013585-446a362cb705?auto=format&fit=crop&q=80&sig=${baseSlug}-${currentImageIndex}`;
                }}
                className="absolute inset-0 h-full w-full object-cover blur-[1px]"
                alt={`${templeName} Service Background`}
              />
            </AnimatePresence>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-20 text-center flex flex-col items-center justify-center gap-10 mt-10 w-full">
            {/* Shloka Mantra */}
            <div className="space-y-4 max-w-3xl">
              <p className="font-serif text-lg md:text-2xl text-[#E6A817] italic leading-relaxed tracking-wide">
                "{shlokaInfo.shloka}"
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#F4A835]/80 font-black tracking-widest">
                {shlokaInfo.title}
              </p>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest text-[#E6A817]">
                <Flame className="h-3.5 w-3.5" />
                Devotional Seva
              </span>
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="font-serif text-5xl md:text-8xl font-bold tracking-tight text-white leading-tight"
              >
                {service.title}
              </motion.h1>
              <p className="font-serif text-xl md:text-3.5xl font-light italic text-[#E6A817]/90">
                at {templeName}
              </p>
              <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed mt-4 font-medium">
                {service.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* EMINENT NAVIGATION BAR */}
        <div className="bg-white border-y border-border/40 py-8 relative z-30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              <Link
                to={`/${templeSlug}`}
                className="group p-6 rounded-3xl border transition-all flex flex-col items-center text-center gap-4 bg-white text-secondary border-border/60 hover:border-primary hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 bg-secondary/10">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Shrine</span>
                  <span className="font-bold text-sm md:text-base">Temple Info</span>
                </div>
              </Link>

              <Link
                to={`/${templeSlug}/darshan`}
                className="group p-6 rounded-3xl border transition-all flex flex-col items-center text-center gap-4 bg-white text-secondary border-border/60 hover:border-primary hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 bg-primary/10">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Priority</span>
                  <span className="font-bold text-sm md:text-base">Special Darshan</span>
                </div>
              </Link>

              <Link
                to={`/${templeSlug}/puja`}
                className={cn(
                  "group p-6 rounded-3xl border transition-all flex flex-col items-center text-center gap-4",
                  type === 'puja'
                    ? "bg-orange-500 text-white border-orange-500 shadow-xl shadow-orange-500/20"
                    : "bg-white text-secondary border-border/60 hover:border-orange-500 hover:shadow-md"
                )}
              >
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                  type === 'puja' ? "bg-white/20" : "bg-orange-500/10"
                )}>
                  <Flame className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Rituals</span>
                  <span className="font-bold text-sm md:text-base">Pooja Sewa</span>
                </div>
              </Link>

              <Link
                to={`/${templeSlug}/prasad`}
                className={cn(
                  "group p-6 rounded-3xl border transition-all flex flex-col items-center text-center gap-4",
                  type === 'prasad'
                    ? "bg-gold text-white border-[#E6A817] shadow-xl shadow-gold/20"
                    : "bg-white text-secondary border-border/60 hover:border-[#E6A817] hover:shadow-md"
                )}
              >
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                  type === 'prasad' ? "bg-white/20" : "bg-[#E6A817]/10"
                )}>
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Prasadam</span>
                  <span className="font-bold text-sm md:text-base">Prasad Delivery</span>
                </div>
              </Link>

              <Link
                to={`/${templeSlug}/chadhava`}
                className={cn(
                  "group p-6 rounded-3xl border transition-all flex flex-col items-center text-center gap-4",
                  type === 'chadhava'
                    ? "bg-pink-500 text-white border-pink-500 shadow-xl shadow-pink-500/20"
                    : "bg-white text-secondary border-border/60 hover:border-pink-500 hover:shadow-md"
                )}
              >
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                  type === 'chadhava' ? "bg-white/20" : "bg-pink-500/10"
                )}>
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Offerings</span>
                  <span className="font-bold text-sm md:text-base">Chadhava</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION: SEWA LEGEND & CARD */}
        <section className="py-24 bg-[#FDF1E3]/95 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16 items-center">

              {/* Left Side picture frame */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#D85A30] to-[#F4A835] rounded-[3rem] rotate-3 opacity-10 scale-95 blur-sm" />
                <div className="relative z-10 border border-[#E6A817]/15 rounded-[3rem] p-2 bg-white shadow-xl overflow-hidden aspect-[4/5] group">
                  <img
                    src={gallery[1] || gallery[0]}
                    alt={`${service.title} Sanctum`}
                    className="w-full h-full object-cover rounded-[2.8rem] group-hover:scale-105 transition-transform duration-1000"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1544013585-446a362cb705?q=80&w=800&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-8 left-8 flex items-center gap-3">
                    <span className="h-10 w-10 bg-[#E6A817] rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">🛕</span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#E6A817] font-bold">Divine Grace</p>
                      <p className="text-white text-sm font-serif italic">Sanctified rituals & sacred authenticity</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Narrative & Booking */}
              <div className="lg:col-span-7 space-y-8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D85A30] font-black">Spiritual Coordination</span>
                <h2 className="font-serif text-4xl md:text-5.5xl font-bold text-[#1A1240] leading-tight">
                  Authentic {service.title} Sewa <br />
                  <span className="text-[#D85A30] italic font-light italic-font">at the Holy Shrine</span>
                </h2>
                <div className="h-0.5 w-20 bg-[#E6A817] rounded-full my-2" />

                <div className="space-y-6 text-[#2E2520]/80 text-sm md:text-base leading-relaxed font-medium">
                  <p>
                    {service.description} We coordinate with verified local priests at {templeName} to ensure your prayers are voiced exactly according to traditional Vedic norms, complete with gotra invocation and authentic sankalp.
                  </p>
                  <div className="border-l-4 border-[#E6A817] pl-6 py-2 italic text-[#1A1240] bg-[#E6A817]/5 rounded-r-xl">
                    Every seva is organized with deep sincerity. Devotees receive digital updates, holy photos, and fast physical delivery of blessed dry-fruit prasadam direct from the shrine.
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="h-14 px-10 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg border-none cursor-pointer flex items-center justify-center font-bold group"
                  >
                    <Sparkles className="mr-3 h-4 w-4 text-[#E6A817] group-hover:scale-125 transition-transform shrink-0" />
                    Start your divine journey
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: SPIRITUAL BENEFITS & SIGNIFICANCE */}
        <section className="py-24 bg-white relative border-y border-border/20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Sacred Power</span>
              <h3 className="font-serif text-3.5xl md:text-4.5xl font-bold text-[#1A1240]">Divine Benefits & Blessings</h3>
              <p className="text-muted-foreground text-sm font-semibold">Participating in these holy rituals releases powerful cosmic alignment and positive aura.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4 p-8 bg-[#FFF8F0]/30 rounded-3xl border border-border/40 hover:border-[#E6A817] hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#D85A30]/10 text-[#D85A30] rounded-full flex items-center justify-center shrink-0">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#1A1240] leading-tight">Peace & Obstacle Removal</h4>
                </div>
                <p className="text-sm text-[#2E2520]/80 leading-relaxed font-medium">Attract positive vibrations to your home, eliminate domestic obstacles, and experience complete spiritual peace.</p>
              </div>

              <div className="flex flex-col gap-4 p-8 bg-[#FFF8F0]/30 rounded-3xl border border-border/40 hover:border-[#E6A817] hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#D85A30]/10 text-[#D85A30] rounded-full flex items-center justify-center shrink-0">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#1A1240] leading-tight">Family Health & Longevity</h4>
                </div>
                <p className="text-sm text-[#2E2520]/80 leading-relaxed font-medium">Invoke supreme health, physical healing, and divine shields to safeguard your loved ones from negative elements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: HOW IT WORKS */}
        <section className="py-24 bg-[#FDF1E3]/60 relative">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Seamless Pilgrimage</span>
              <h3 className="font-serif text-3.5xl md:text-4.5xl font-bold text-[#1A1240]">The Sacred Process</h3>
              <p className="text-muted-foreground text-sm font-semibold">Easy remote booking mapped to authentic physical rituals performed directly at the temple.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-border/30 shadow-sm flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#D85A30] text-white font-bold rounded flex items-center justify-center text-sm shadow-md">1</div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1240]">Select & Share Details</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">Choose your specific seva and share your name, family gotra, and birth nakshatra for authentic invocation.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border/30 shadow-sm flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#6B1A1A] text-white font-bold rounded flex items-center justify-center text-sm shadow-md">2</div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1240]">Sankalp & Ritual</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">Certified temple priests perform the rituals on-ground. Traditional slokas and mantras are chanted in your name.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border/30 shadow-sm flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#E6A817] text-white font-bold rounded flex items-center justify-center text-sm shadow-md">3</div>
                  <h4 className="font-serif text-lg font-bold text-[#1A1240]">Blessed Prasadam</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">Secure, hygienic packaging of physical temple sweets, dry-fruits, and holy sacred thread delivered to your home.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: DEVOTEE TESTIMONIALS */}
        <section className="py-24 bg-[#FDF1E3] border-t border-b border-border/20 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6">

            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-[#D85A30] font-black">Sacred Testimonials</span>
              <h3 className="font-serif text-3xl md:text-4.5xl font-bold text-[#1A1240] mt-2">Devotee Experiences</h3>
              <p className="text-muted-foreground text-sm font-semibold mt-2">Read reviews from pilgrims who ordered services via Vandan Darshan.</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden min-h-[200px] flex items-center justify-center relative bg-white rounded-[2.5rem] border border-[#E6A817]/15 p-8 md:p-12 shadow-soft">

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
                      "{reviews[activeReviewIndex].feedback}"
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D85A30]/10 border border-[#E6A817] flex items-center justify-center font-bold text-[#D85A30] shrink-0">
                        {reviews[activeReviewIndex].name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-[#1A1240] text-sm">{reviews[activeReviewIndex].name}</p>
                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{reviews[activeReviewIndex].location}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>

              {/* Slider arrows */}
              <button
                onClick={() => setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                className="absolute left-[-20px] md:left-[-30px] top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white hover:bg-[#E6A817] hover:text-white text-[#1A1240] border border-border/40 shadow-md flex items-center justify-center cursor-pointer transition-all z-20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveReviewIndex((prev) => (prev + 1) % reviews.length)}
                className="absolute right-[-20px] md:right-[-30px] top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white hover:bg-[#E6A817] hover:text-white text-[#1A1240] border border-border/40 shadow-md flex items-center justify-center cursor-pointer transition-all z-20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>
        </section>

        {/* SECTION: EXPLORE OTHER VERTICALS */}
        <section className="py-24 bg-white relative">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="font-serif text-3xl md:text-4.5xl font-bold text-[#1A1240] mb-12 text-center">Explore More at {templeName}</h3>

            <div className="grid sm:grid-cols-2 gap-8">
              {Object.entries(serviceTypes).filter(([key]) => key !== type).map(([key, s]) => (
                <Link
                  key={key}
                  to={`/${templeSlug}/${key}`}
                  className="group p-8 rounded-3xl bg-[#FFF8F0]/30 border border-border hover:border-[#E6A817] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-[#FFF8F0] border border-border/40 flex items-center justify-center text-[#D85A30] mb-4 group-hover:bg-[#D85A30] group-hover:text-white transition-all shadow-sm">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-[#1A1240] mb-2">{s.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-semibold mb-4">{s.tagline}</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D85A30] flex items-center gap-2 font-bold mt-4">
                    Start your divine journey
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FLOATING BOOKING OVERLAY ROW */}
        <section className="py-12 bg-[#1A1240] text-white">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="font-serif text-2.5xl font-bold text-white mb-2">Ready to seek blessings at {templeName}?</h4>
              <p className="text-white/60 text-xs font-semibold">Let our temple advisors organize priority sevas, gotra sankalps, and physical prasad seamlessly.</p>
            </div>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="h-14 px-10 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg border-none cursor-pointer flex items-center justify-center font-bold"
            >
              Start your divine journey
            </button>
          </div>
        </section>

        {/* SECTION: DOCX CONTENT (Standardized Sections) */}
        {docxPath && (
          <section id="official-details" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
              <DocxRenderer
                filePath={docxPath}
                templeSlug={baseSlug}
                templeName={templeName}
                gallery={gallery}
              />
            </div>
          </section>
        )}

      </div>

      {/* Booking Modal Popup */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultTemple={templeName}
        defaultService={service.title}
      />
    </>
  );
};

export default TempleServiceDetail;
