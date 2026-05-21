import { Link, useParams, useLocation } from "react-router-dom";
import { ArrowRight, Calendar, Check, Clock, MapPin, Star, Volume2, Sparkles, Flame, Gift, Compass, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { BookingModal } from "@/components/BookingModal";
import { DocxRenderer } from "@/components/DocxRenderer";
import { templeFiles, darshanFiles } from "@/data/templeList";
import { templeMetadata } from "@/data/templeMetadata";
import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { AhobilamCustomDetail } from "@/components/AhobilamCustomDetail";
import { AhobilamCustomDarshan } from "@/components/AhobilamCustomDarshan";

export const getShlokaAndTranslation = (deity?: string, baseSlug?: string) => {
  const d = (deity || "").toLowerCase();
  const s = (baseSlug || "").toLowerCase();

  if (d.includes("krishna") || d.includes("radha") || s.includes("dwarka") || s.includes("banke") || s.includes("govind")) {
    return {
      shloka: "वसुदेवसुतं देवं कंसचाणूरमर्दनम् । देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम् ॥",
      title: "The Sacred Krishna Maha Mantra",
      translation: "I bow to Lord Krishna, the son of Vasudeva, the killer of Kansa and Chanura, the supreme joy of Devaki, and the spiritual master of the universe."
    };
  }
  if (d.includes("shiva") || d.includes("mahadev") || d.includes("linga") || s.includes("somnath") || s.includes("mallikarjuna") || s.includes("kedarnath") || s.includes("kashi") || s.includes("neelkanth") || s.includes("bhojeshwar") || s.includes("vaikom")) {
    return {
      shloka: "कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् । सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥",
      title: "The Sacred Shiva Yajur Mantra",
      translation: "White as camphor, the incarnation of compassion, the essence of the world, adorned with a snake king garland, always residing in the lotus of my heart, I bow to Shiva and Shakti together."
    };
  }
  if (d.includes("hanuman") || d.includes("anjaneyar") || s.includes("balaji") || s.includes("sankat") || s.includes("salasar") || s.includes("mehandipur")) {
    return {
      shloka: "मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् । वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये ॥",
      title: "The Sacred Hanuman Mantra",
      translation: "I take refuge in the messenger of Lord Rama, who is swift as thought, fast as wind, master of senses, foremost among the wise, son of the wind god, and leader of the monkey forces."
    };
  }
  if (d.includes("rama") || d.includes("ram") || s.includes("ayodhya") || s.includes("kanak") || s.includes("kalaram") || s.includes("bhadrachalam")) {
    return {
      shloka: "रामाय रामभद्राय रामचन्द्राय वेधसे । रघुनाथाय नाथाय सीतायाः पतये नमः ॥",
      title: "The Sacred Rama Mantra",
      translation: "Salutations to Lord Rama, the protector of the righteous, the moon-like lord, the descendant of Raghu, the supreme master and the beloved husband of Sita."
    };
  }
  if (d.includes("ganesha") || d.includes("ganapati") || s.includes("chintaman") || s.includes("dagadusheth") || s.includes("trinetra")) {
    return {
      shloka: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
      title: "The Sacred Ganesha Maha Mantra",
      translation: "O Lord Ganesha of the curved trunk and massive body, shining with the brilliance of a million suns, please make all my works free of obstacles always."
    };
  }
  if (d.includes("durga") || d.includes("devi") || d.includes("shakti") || d.includes("mata") || d.includes("ambadevi") || d.includes("mariamman") || s.includes("mansa") || s.includes("chandi") || s.includes("naina") || s.includes("chintpurni") || s.includes("bhadrakali") || s.includes("tripura")) {
    return {
      shloka: "सर्वमङ्गलमङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥",
      title: "The Sacred Devi Mantra",
      translation: "Auspiciousness of all auspiciousness, the consort of Shiva, the fulfiller of all desires, the protector, the three-eyed one, the golden one, O Narayani, salutations to you."
    };
  }
  return {
    shloka: "ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥",
    title: "The Universal Upanishad Shloka",
    translation: "Lead us from the unreal to the real, from darkness to light, and from death to immortality."
  };
};

const getNearbyTemples = (currentBaseSlug: string) => {
  const currentMetadata = templeMetadata[currentBaseSlug as keyof typeof templeMetadata];
  const currentState = currentMetadata?.state || "";
  const allKeys = Object.keys(templeMetadata).filter(k => k !== currentBaseSlug);
  let matches = allKeys.filter(k => templeMetadata[k as keyof typeof templeMetadata]?.state === currentState);

  if (matches.length < 3) {
    const popularFallback = ["ahobilam", "somnath", "dwarkadhish", "kedarnath", "shankaracharya-temple-kashmir"];
    for (const key of popularFallback) {
      if (key !== currentBaseSlug && !matches.includes(key)) {
        matches.push(key);
      }
      if (matches.length >= 3) break;
    }
  }

  return matches.slice(0, 3).map(key => {
    const data = templeMetadata[key as keyof typeof templeMetadata];
    const name = key.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") + " Temple";
    return {
      slug: key,
      name: data?.name || name,
      state: data?.state || "",
      image: data?.image || `https://images.unsplash.com/photo-1544013585-446a362cb705?q=80&w=800&fit=crop`,
      deity: data?.deity || "",
      category: data?.category || "Pilgrimage Site"
    };
  });
};

const TempleDetail = () => {
  const { templeSlug, darshanSlug } = useParams();
  const { pathname } = useLocation();
  const [fileToRender, setFileToRender] = useState<string>("");
  const isDarshanPage = pathname.includes("/darshan");
  const [dynamicMeta, setDynamicMeta] = useState<{ title?: string; description?: string }>({});
  const [activeSection, setActiveSection] = useState("introduction");
  const [isBookingOpen, setIsBookingOpen] = useState(isDarshanPage);
  const [bookingService, setBookingService] = useState<string | undefined>(isDarshanPage ? "Special Darshan" : undefined);
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

  const rawSlug = templeSlug || darshanSlug || "";
  const baseSlug = rawSlug.toLowerCase().replace(/-temple$/, "").replace(/-vipdarsh$/, "");
  const templeData = templeMetadata[baseSlug as keyof typeof templeMetadata];
  const mainImage = templeData?.image || `/assets/images/temples/${baseSlug}.jpg`;

  // Create a deduped gallery array (fallback to main image if none)
  const rawGallery = templeData?.gallery && templeData.gallery.length > 0 ? templeData.gallery : [mainImage];
  const gallery = Array.from(new Set(rawGallery)); // Remove duplicates

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [templeCount, setTempleCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [pilgrimsCount, setPilgrimsCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  // Lotus Petals canvas particle animation
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedStats) {
          setHasAnimatedStats(true);

          let startT = 0;
          const intervalT = setInterval(() => {
            startT += 1;
            setTempleCount(startT);
            if (startT >= 3) clearInterval(intervalT);
          }, 300);

          let startY = 0;
          const intervalY = setInterval(() => {
            startY += 50;
            setYearsCount(startY);
            if (startY >= 1000) clearInterval(intervalY);
          }, 60);

          let startP = 0;
          const intervalP = setInterval(() => {
            startP += 2;
            setPilgrimsCount(startP);
            if (startP >= 50) clearInterval(intervalP);
          }, 40);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimatedStats]);

  // Helper to find file by slug
  const findFile = useCallback((slug: string, fileList: string[]) => {
    if (!slug) return undefined;
    const searchTerm = slug.toLowerCase().replace(/-temple$/, "").replace(/-specialdarshan$/, "").replace(/-/g, " ").trim();
    const searchWords = searchTerm.split(" ").filter(w => w.length > 2);
    let match = fileList.find(f => {
      const fileName = f.toLowerCase();
      return searchWords.length > 0 ? fileName.includes(searchWords[0]) : fileName.includes(searchTerm);
    });
    if (!match && searchTerm.length > 3) {
      const prefix = searchTerm.substring(0, 4);
      match = fileList.find(f => f.toLowerCase().includes(prefix));
    }
    return match;
  }, []);

  useEffect(() => {
    setDynamicMeta({});
    if (isDarshanPage) {
      const file = findFile(baseSlug, darshanFiles);
      console.log(`[TempleDetail] Searching for Darshan file for ${baseSlug}: ${file || "Not Found"}`);
      if (file) {
        setFileToRender(`/assets/content/darshan/${file}`);
      }
    } else {
      const file = findFile(baseSlug, templeFiles);
      console.log(`[TempleDetail] Searching for Temple file for ${baseSlug}: ${file || "Not Found"}`);
      if (file) {
        setFileToRender(`/assets/content/temples/${file}`);
      }
    }
  }, [baseSlug, isDarshanPage, findFile]);

  useEffect(() => {
    if (isDarshanPage) {
      setIsBookingOpen(true);
      setBookingService("Special Darshan");
    }
  }, [isDarshanPage]);

  const displayTitle = baseSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px 0px -50% 0px" }
    );

    const sections = ["introduction", "history", "timings", "services"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // We can add logic here if needed
          }
        });
      },
      { threshold: 0.5 }
    );
    const sections = ["introduction", "history", "timings", "services"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [fileToRender]);

  const reviews = [
    {
      type: "video",
      videoUrl: `https://images.unsplash.com/photo-1544013585-446a362cb705?auto=format&fit=crop&q=80&sig=${baseSlug}-review`,
      name: "Achutam Nair",
      location: "Bangalore",
      avatar: "https://i.pravatar.cc/100?img=11",
      feedback: "Great assisted darshan options. Felt deeply connected with the divine space without worrying about any queues or coordination. Strongly recommended!"
    },
    {
      type: "text",
      name: "Ramesh Chandra Bhatt",
      location: "Nagpur",
      avatar: "https://i.pravatar.cc/100?img=33",
      feedback: "So many options for all the devotees. Great to get the grace of god from our homes. Most authentic and trustworthy service compared to others."
    },
    {
      type: "text",
      name: "Shivraj Dobhi",
      location: "Agra",
      avatar: "https://i.pravatar.cc/100?img=12",
      feedback: "Liked the fact that we can book online else we have to travel to get everything done. Felt very nice to hear my name and gotra during the sankalp. Prasad was also received in time."
    }
  ];

  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Auto-play reviews slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const onMetadata = useCallback((meta: { title?: string; description?: string }) => {
    setDynamicMeta(meta);
  }, []);

  useEffect(() => {
    (window as any).triggerDivineBooking = (service?: string) => {
      setBookingService(service || "special-darshan");
      setIsBookingOpen(true);
    };
    return () => {
      delete (window as any).triggerDivineBooking;
    };
  }, []);

  useEffect(() => {
    if (gallery.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [gallery.length]);

  // Sticky subheader links
  const sublinks = [
    { id: "overview", label: "Temple Info", path: `/${baseSlug}-temple` },
    { id: "darshan", label: "Special Darshan", path: `/${baseSlug}-temple/darshan` },
    { id: "puja", label: "Pooja Sewa", path: `/${baseSlug}-temple/puja` },
    { id: "prasad", label: "Prasad Delivery", path: `/${baseSlug}-temple/prasad` },
    { id: "chadhava", label: "Chadhava", path: `/${baseSlug}-temple/chadhava` }
  ];

  if (!fileToRender) {
    return (
      <div className="container-prose py-40 text-center">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 border-2 border-orange-100 mb-10">
          <MapPin className="h-12 w-12 text-gold" />
        </div>
        <h1 className="font-serif text-5xl font-bold text-secondary mb-6">{displayTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-medium">
          We are currently preparing the divine details for <span className="text-primary font-bold">{displayTitle}</span>.
        </p>
        <Button asChild size="xl" className="bg-primary hover:bg-primary/90 text-white rounded-full px-12 shadow-gold"><Link to="/temples">Explore All Shrines</Link></Button>
      </div>
    );
  }

  const seoTitle = dynamicMeta.title || `${displayTitle} ${isDarshanPage ? "Special Darshan Booking" : "Temple Info"} | Vandan Darshan`;
  const seoDesc = dynamicMeta.description || `Explore ${displayTitle} ${isDarshanPage ? "Special Darshan assistance, timings, and hassle-free booking" : "timings, history, and sacred information"}. Plan your spiritual journey today.`;

  const finalTitle = isDarshanPage
    ? `${displayTitle} Temple Darshan Booking | VIP Assistance & Guided Tour`
    : seoTitle;
  const finalDesc = isDarshanPage
    ? `Plan your ${displayTitle} Temple darshan with expert guidance. Explore timings, history, and queue management info. Book hassle-free VIP darshan and poojas today.`
    : seoDesc;

  const h1Override = rawSlug.replace(/-vipdarsh$/, "");

  return (
    <>
      <SEO title={finalTitle} description={finalDesc} />
      {isDarshanPage ? (
        <AhobilamCustomDarshan
          templeSlug={baseSlug}
          docxPath={fileToRender}
          h1Override={h1Override}
          onOpenBooking={(service) => {
            setBookingService(service);
            setIsBookingOpen(true);
          }}
        />
      ) : (
        <AhobilamCustomDetail
          templeSlug={baseSlug}
          docxPath={fileToRender}
          h1Override={h1Override}
          onOpenBooking={(service) => {
            setBookingService(service);
            setIsBookingOpen(true);
          }}
        />
      )}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultTemple={displayTitle}
        defaultService={bookingService}
      />
    </>
  );
};

export default TempleDetail;
