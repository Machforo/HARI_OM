import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Sparkles, MapPin, Search, ArrowRight } from "lucide-react";
import logo from "@/assets/logo-final.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BackgroundAudio } from "./BackgroundAudio";
import { TopHeader } from "./TopHeader";
import { templeList } from "@/data/temples";
import { SearchOverlay } from "./SearchOverlay";
import { motion, AnimatePresence } from "framer-motion";

const popularTemples = [
  { slug: "somnath", name: "Somnath Temple" },
  { slug: "mahakaleshwar", name: "Mahakaleshwar" },
  { slug: "kashi-vishwanath", name: "Kashi Vishwanath" },
  { slug: "kedarnath", name: "Kedarnath" },
  { slug: "tirupati-balaji", name: "Tirupati Balaji" },
  { slug: "dwarkadhish", name: "Dwarkadhish" }
];

const getDynamicLink = (type: string | undefined, slug: string) => {
  if (type === "darshan") return `/darshans/${slug}-vipdarsh`;
  if (type === "puja") return `/puja/puja-at-${slug}`;
  if (type === "prasad") return `/prasadam/prasadam-from-${slug}`;
  if (type === "chadhava") return `/chadhava/chadhava-at-${slug}`;
  return `/temples/${slug}`;
};

const nav = [
  { 
    to: "/temples", 
    label: "Temples", 
    isMegamenu: true, 
    type: "temples",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/10/Somanath_mandir_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    title: "Discover Sacred Shrines",
    popularCol: "Top Destinations",
    sacredCol: "Jyotirlingas & Char Dham",
    popTemples: popularTemples.slice(0, 3),
    sacredTemples: popularTemples.slice(3, 6)
  },
  { 
    to: "/darshan", 
    label: "Sugam Darshan", 
    isMegamenu: true, 
    type: "darshan",
    image: "https://discoverindiabyroad.com/wp-content/uploads/2020/06/Somnath-Aarti-Copy.jpg",
    title: "Skip the Wait, See the Divine",
    popularCol: "Quick Access",
    sacredCol: "VIP Routing",
    popTemples: [popularTemples[0], popularTemples[2], popularTemples[4]],
    sacredTemples: [popularTemples[1], popularTemples[3], popularTemples[5]]
  },
  { 
    to: "/prasad", 
    label: "Sacred Prasadam", 
    isMegamenu: true, 
    type: "prasad",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Prasadam2.jpg",
    title: "Holy Offerings Delivered",
    popularCol: "Most Ordered",
    sacredCol: "Dry Fruits & Sweets",
    popTemples: [popularTemples[5], popularTemples[2], popularTemples[1]],
    sacredTemples: [popularTemples[3], popularTemples[4], popularTemples[0]]
  },
  { 
    to: "/puja", 
    label: "Puja", 
    isMegamenu: true, 
    type: "puja",
    image: "https://artofpuja.com/cdn/shop/articles/navratri-puja-samagri-list-durga-puja-items-art-of-puja_jpg.png?v=1772880680",
    title: "Authentic Rituals",
    popularCol: "Sankalp Pujas",
    sacredCol: "Maha Archanas",
    popTemples: [popularTemples[1], popularTemples[0], popularTemples[3]],
    sacredTemples: [popularTemples[4], popularTemples[2], popularTemples[5]]
  },
  { 
    to: "/chadhava", 
    label: "Sanatan Offerings", 
    isMegamenu: true, 
    type: "chadhava",
    image: "https://vama.app/_next/image?url=https%3A%2F%2Fd1e93yen0ejier.cloudfront.net%2Fuploads%2FCACHE%2Fimages%2Fchadhava%2Fhow%2Flg%2F37afffffcbf03f6bbadeaf1faa1c36f4760dde7e%2Fe4d6e6bdfc870d4de50e8de009baddbc.png&w=3840&q=75",
    title: "Express Your Devotion",
    popularCol: "Vastram Offerings",
    sacredCol: "Floral Shringar",
    popTemples: [popularTemples[4], popularTemples[1], popularTemples[2]],
    sacredTemples: [popularTemples[5], popularTemples[0], popularTemples[3]]
  },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const isHomepage = pathname === "/";
  const shouldBeSolid = isScrolled || !isHomepage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 flex flex-col",
        shouldBeSolid ? "bg-white/95 backdrop-blur-xl shadow-xl" : "bg-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
      )}>
        {/* Top Header Section - Always visible, ultra-compact */}
        <div className={cn(
          "transition-all duration-700 w-full shrink-0 border-b border-white/5",
          shouldBeSolid ? "bg-secondary/90 py-0" : "py-0"
        )}>
          <TopHeader transparent={!shouldBeSolid} />
        </div>

        {/* Main Header Section - Minimized height, Maximized impact */}
        <div className={cn(
          "transition-all duration-700 w-full shrink-0",
          shouldBeSolid ? "py-1" : "py-2 md:py-3"
        )}>
          <div className="container-prose flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4 group shrink-0" onClick={() => setOpen(false)}>
              <div className="relative h-20 w-20 md:h-28 md:w-28 -my-2 md:-my-4 flex items-center justify-center z-10">
                <img 
                  src={logo} 
                  alt="Vandan Darshan" 
                  className="h-full w-full object-contain transition-transform group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4">
                  <Sparkles className="h-4 w-4 text-gold animate-pulse" />
                </div>
              </div>
              <div className="leading-tight hidden sm:block">
                <div className={cn(
                  "font-serif-display text-xl md:text-2xl font-bold tracking-tight transition-all duration-500",
                  shouldBeSolid ? "text-secondary" : "text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]"
                )}>
                  <span className="text-primary">Vandan</span> Darshan
                </div>
                <div className="flex flex-col">
                  <div className="font-devanagari text-[9px] text-gold font-bold uppercase tracking-widest leading-none">वन्दन दर्शन</div>
                  <div className={cn(
                    "text-[8px] font-black uppercase tracking-[0.25em] mt-0.5 transition-all duration-500",
                    shouldBeSolid ? "text-primary/80" : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  )}>
                    ॥ श्रद्धावाँल्लभते ज्ञानं ॥
                  </div>
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {nav.map((n) => (
                <div 
                  key={n.to} 
                  className="relative group flex items-center"
                >
                  <Link
                    to={n.to}
                    className={cn(
                      "text-[14px] font-bold transition-all hover:text-primary flex items-center gap-1 py-4",
                      pathname.startsWith(n.to) 
                        ? "text-primary" 
                        : (shouldBeSolid ? "text-foreground/90" : "text-white hover:text-gold")
                    )}
                  >
                    {n.label}
                    {n.isMegamenu && <ChevronDown className={cn("h-4 w-4", shouldBeSolid ? "opacity-70" : "opacity-90")} />}
                  </Link>
                  {pathname.startsWith(n.to) && (
                    <motion.span 
                      layoutId="headerNav"
                      className="absolute bottom-1 left-0 right-0 h-0.5 bg-gradient-gold rounded-full" 
                    />
                  )}

                  {/* MEGAMENU: Full Width */}
                  {n.isMegamenu && (
                    <div className="fixed top-[calc(100%+0px)] left-0 right-0 w-screen bg-white border-b border-border shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-2 group-hover:translate-y-0 flex z-[1000] min-h-[400px]">
                      <div className="w-[30%] relative overflow-hidden group/img bg-secondary hidden lg:block">
                        <img src={n.image} className="h-full w-full object-cover transition-transform duration-1000 group-hover/img:scale-110 opacity-60" alt={n.label} />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent" />
                        <div className="absolute bottom-12 left-10 right-10">
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4 block">{n.label}</span>
                           <h4 className="font-serif-display text-3xl font-bold text-white mb-4 leading-tight">{n.title}</h4>
                           <Button className="bg-primary hover:bg-white hover:text-secondary border-none text-white rounded-full px-8 h-12 font-black uppercase tracking-widest text-[10px]" asChild>
                             <Link to={n.to}>View All <ArrowRight className="h-4 w-4 ml-2" /></Link>
                           </Button>
                        </div>
                      </div>
                      
                      <div className="w-full lg:w-[70%] p-10 lg:p-16 bg-white">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                          <div>
                            <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-4">
                              <MapPin className="h-4 w-4 text-gold" />
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">{n.popularCol}</h4>
                            </div>
                            <ul className="space-y-4">
                              {n.popTemples?.map(t => (
                                <li key={t.slug}>
                                  <Link to={getDynamicLink(n.type, t.slug)} className="text-sm font-bold text-muted-foreground hover:text-primary transition-all flex items-center justify-between group/link">
                                    {t.name} <ArrowRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                                  </Link>
                                </li>
                              ))}
                              <li><Link to={n.to} className="text-sm font-bold text-primary hover:underline transition-all">View All 97+ Temples</Link></li>
                            </ul>
                          </div>

                          <div>
                            <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-4">
                              <Sparkles className="h-4 w-4 text-gold" />
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">{n.sacredCol}</h4>
                            </div>
                            <ul className="space-y-4">
                              {n.sacredTemples?.map(t => (
                                <li key={t.slug}>
                                  <Link to={getDynamicLink(n.type, t.slug)} className="text-sm font-bold text-muted-foreground hover:text-primary transition-all flex items-center justify-between group/link">
                                    {t.name} <ArrowRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-4">
                              <Search className="h-4 w-4 text-gold" />
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Spiritual Resources</h4>
                            </div>
                            <ul className="space-y-4">
                              <li><Link to="/media/blogs" className="text-sm font-bold text-muted-foreground hover:text-primary transition-all flex items-center justify-between group/link">Spiritual Blogs <ArrowRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" /></Link></li>
                              <li><Link to="/about" className="text-sm font-bold text-muted-foreground hover:text-primary transition-all flex items-center justify-between group/link">Our Mission <ArrowRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" /></Link></li>
                              <li><Link to="/contact" className="text-sm font-bold text-muted-foreground hover:text-primary transition-all flex items-center justify-between group/link">Contact Support <ArrowRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" /></Link></li>
                              <li><Link to="/book" className="text-sm font-black text-gold uppercase tracking-widest mt-4 block hover:underline transition-all">Book Your Yatra ॥</Link></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-4 px-6 border-r border-border/40 mr-2">
                <div className="font-devanagari text-gold font-bold text-lg select-none">॥ ॐ ॥</div>
                <div className={cn("h-10 w-10 rounded-full bg-white/5 flex items-center justify-center transition-colors", shouldBeSolid ? "text-secondary hover:bg-secondary/5" : "text-white hover:bg-white/10")}>
                  <BackgroundAudio />
                </div>
              </div>
              
              <button 
                onClick={() => setSearchOpen(true)}
                className={cn("h-10 w-10 rounded-full flex items-center justify-center transition-colors", shouldBeSolid ? "bg-secondary/5 text-secondary hover:bg-secondary/10" : "bg-white/10 text-white hover:bg-white/20")}
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            <button
              className={cn("lg:hidden h-10 w-10 rounded-full flex items-center justify-center transition-colors", shouldBeSolid ? "bg-secondary/5 text-secondary hover:bg-secondary/10" : "bg-white/10 text-white hover:bg-white/20")}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "calc(100vh - 6rem)", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden border-t border-border bg-background overflow-y-auto"
              >
                <div className="container-prose py-10 flex flex-col gap-2">
                  {nav.map((n) => (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "py-5 px-6 rounded-2xl text-xl font-bold transition-colors flex items-center justify-between",
                        pathname === n.to ? "bg-accent text-primary" : "text-foreground/85 active:bg-accent/50"
                      )}
                    >
                      {n.label}
                      {(n.isMegamenu || n.isDropdown) && <ChevronDown className="h-5 w-5 opacity-40" />}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
