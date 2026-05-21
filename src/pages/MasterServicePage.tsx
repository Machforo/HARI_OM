import { SEO } from "@/components/SEO";
import { allTemplesFullList } from "@/data/temples";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Sparkles, Flame, Gift, Heart, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface Props {
  type: "darshan" | "puja" | "prasad" | "chadhava";
}

const serviceConfig = {
  darshan: {
    title: "Special Darshan Assistance",
    desc: "Skip the queues and experience the divine presence with our priority darshan assistance across India's sacred shrines.",
    icon: Sparkles,
    color: "text-primary",
    bgColor: "bg-primary/10",
    pathSuffix: "-vipdarsh",
    prefix: "/darshans/",
    bannerImg: "https://discoverindiabyroad.com/wp-content/uploads/2020/06/Somnath-Aarti-Copy.jpg",
    searchTerms: ["Somnath", "Kedarnath", "Kashi Vishwanath", "Tirupati Balaji"]
  },
  puja: {
    title: "Sacred Pooja Bookings",
    desc: "Personalized rituals performed in your name by authentic temple priests. Witness the divine blessings from anywhere.",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    pathSuffix: "",
    prefix: "/puja/puja-at-",
    bannerImg: "https://artofpuja.com/cdn/shop/articles/navratri-puja-samagri-list-durga-puja-items-art-of-puja_jpg.png?v=1772880680",
    searchTerms: ["Maha Mrityunjaya", "Rudrabhishek", "Grah Shanti", "Navgrah Puja"]
  },
  prasad: {
    title: "Holy Prasad Sewa",
    desc: "Get authentic temple prasadam delivered directly to your home with purity and devotion from the most sacred shrines.",
    icon: Gift,
    color: "text-gold",
    bgColor: "bg-gold/10",
    pathSuffix: "",
    prefix: "/prasadam/prasadam-from-",
    bannerImg: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Prasadam2.jpg",
    searchTerms: ["Tirupati Laddu", "Vaishno Devi Prasad", "Banke Bihari Peda", "Jagannath Khaja"]
  },
  chadhava: {
    title: "Online Chadhava Offerings",
    desc: "Offer your devotion through Vastram, Shringar, or flowers to your favorite deity remotely through our secure facilitation.",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    pathSuffix: "",
    prefix: "/chadhava/chadhava-at-",
    bannerImg: "https://vama.app/_next/image?url=https%3A%2F%2Fd1e93yen0ejier.cloudfront.net%2Fuploads%2FCACHE%2Fimages%2Fchadhava%2Fhow%2Flg%2F37afffffcbf03f6bbadeaf1faa1c36f4760dde7e%2Fe4d6e6bdfc870d4de50e8de009baddbc.png&w=3840&q=75",
    searchTerms: ["Vastram", "Floral Shringar", "Mukut Offering", "Deepam"]
  }
};

const MasterServicePage = ({ type }: Props) => {
  const config = serviceConfig[type];
  const Icon = config.icon;
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const [termIndex, setTermIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const allStates = ["All States", ...Array.from(new Set(allTemplesFullList.map(t => t.state).filter(Boolean))).sort()];
  
  // Custom categories based on service type or generic
  const getCategories = () => {
    if (type === 'puja') return ["All Categories", "Special Sankalp", "Maha Archana", "Rudrabhishek", "Navgrah Puja"];
    if (type === 'prasad') return ["All Categories", "Dry Fruits Prasad", "Temple Sweets", "Holy Thread & Sindoor"];
    if (type === 'chadhava') return ["All Categories", "Vastram (Garments)", "Floral Shringar", "Deepam Offering"];
    return ["All Categories", "Jyotirlinga", "Shakti Peeth", "Char Dham", "South India", "North India"];
  };
  const categories = getCategories();

  // Typing effect for search placeholder
  useEffect(() => {
    const currentTerm = config.searchTerms[termIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && placeholderText === currentTerm) {
      typingSpeed = 2000; // Pause at the end of the word
      setIsDeleting(true);
    } else if (isDeleting && placeholderText === "") {
      setIsDeleting(false);
      setTermIndex((prev) => (prev + 1) % config.searchTerms.length);
      typingSpeed = 500; // Pause before typing next word
    }

    const timer = setTimeout(() => {
      setPlaceholderText((prev) => {
        if (isDeleting) return currentTerm.substring(0, prev.length - 1);
        return currentTerm.substring(0, prev.length + 1);
      });
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, termIndex, config.searchTerms]);

  const filteredTemples = allTemplesFullList.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === "All States" || t.state === selectedState;
    
    // For darshan, we can actually filter by the temple category if it matches.
    // For other services, since they are mock categories, we'll just not filter the list strictly
    // or we'll let it pass to show all temples for those pseudo-categories, 
    // unless it's Darshan where we actually have category metadata.
    let matchesCategory = true;
    if (type === 'darshan' && selectedCategory !== "All Categories") {
      matchesCategory = t.category === selectedCategory;
    }

    return matchesSearch && matchesState && matchesCategory;
  });

  return (
    <>
      <SEO 
        title={`${config.title} | Vandan Darshan`} 
        description={config.desc}
      />

      <section className="relative pt-40 pb-32 overflow-hidden bg-secondary min-h-[60vh] flex flex-col justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={config.bannerImg} 
            alt={config.title} 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
        </div>

        <div className="container-prose text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn("inline-flex h-20 w-20 items-center justify-center rounded-[2rem] mb-8 shadow-xl bg-white/10 backdrop-blur-md border border-white/20")}
          >
            <Icon className={cn("h-10 w-10", config.color)} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif-display text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-md"
          >
            {config.title}
          </motion.h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm mb-12">
            {config.desc}
          </p>

          {/* Search Bar & Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto relative group"
          >
            <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-center shadow-2xl gap-2 md:gap-0">
              
              {/* Search Input */}
              <div className="flex w-full items-center pl-2">
                <div className="h-10 w-10 rounded-full bg-secondary/5 flex items-center justify-center shrink-0">
                  <Search className={cn("h-5 w-5", config.color)} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${placeholderText}|`}
                  className="w-full bg-transparent border-none outline-none px-4 text-base md:text-lg text-secondary placeholder:text-secondary/40 font-medium"
                />
              </div>

              {/* Filters */}
              <div className="flex w-full md:w-auto gap-2 px-2 md:px-0 pb-2 md:pb-0 md:pr-2">
                <select 
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full md:w-36 px-4 py-3 rounded-full text-sm font-bold bg-secondary/5 text-secondary border-none outline-none cursor-pointer appearance-none text-center hover:bg-secondary/10 transition-colors"
                >
                  {allStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>

                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-44 px-4 py-3 rounded-full text-sm font-bold bg-secondary/5 text-secondary border-none outline-none cursor-pointer appearance-none text-center hover:bg-secondary/10 transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <button className={cn("px-8 py-3 rounded-full text-white text-sm font-bold whitespace-nowrap shadow-md transition-all hover:scale-105 shrink-0", type === 'darshan' ? 'bg-primary' : type === 'puja' ? 'bg-orange-500' : type === 'prasad' ? 'bg-gold' : 'bg-pink-500')}>
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white min-h-[50vh]">
        <div className="container-prose">
          {filteredTemples.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-6">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-secondary mb-2">No Shrines Found</h3>
              <p className="text-muted-foreground font-medium">Try adjusting your search criteria to find the sacred destination.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredTemples.map((temple, i) => {
                  const routeLink = `${config.prefix}${temple.slug}${config.pathSuffix}`;
                  return (
                    <motion.div
                      layout
                      key={temple.slug}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: Math.min((i % 10) * 0.05, 0.2) }}
                    >
                      <Link 
                        to={routeLink}
                        className="group block p-8 rounded-[3rem] border border-border/40 bg-white hover:border-gold hover:shadow-2xl transition-all duration-500 relative overflow-hidden h-full flex flex-col"
                      >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000 pointer-events-none">
                          <Icon size={120} />
                        </div>
                        
                        <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative shadow-sm border border-border/40 group-hover:shadow-lg transition-all duration-500">
                          <img 
                            src={temple.image} 
                            alt={temple.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            onError={(e) => {
                              e.currentTarget.src = `https://images.unsplash.com/photo-1544011501-a212f2f4c82e?auto=format&fit=crop&q=80&sig=${temple.slug}`;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{temple.location}</span>
                          </div>
                        </div>

                        <h3 className="font-serif-display text-2xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{temple.name}</h3>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 line-clamp-2 italic flex-grow">"{temple.tagline}"</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <span className={cn("text-[10px] font-black uppercase tracking-widest flex items-center gap-3", config.color)}>
                            Book {type.charAt(0).toUpperCase() + type.slice(1)} <ArrowRight className="h-4 w-4" />
                          </span>
                          <div className="h-8 w-8 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 bg-secondary">
        <div className="container-prose text-center text-white">
          <h2 className="font-serif-display text-4xl md:text-6xl font-bold mb-8">Ready to Experience the <br /><span className="text-gold italic">Divine Presence?</span></h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-12 font-medium">Join thousands of devotees who have found spiritual peace through our sacred facilitation.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="px-12 h-16 bg-primary text-white font-black rounded-full flex items-center justify-center uppercase tracking-widest text-sm shadow-gold hover:bg-primary/90 transition-all">
              Connect with us
            </Link>
            <a href="tel:8960965151" className="px-12 h-16 bg-white/10 text-white border border-white/20 font-black rounded-full flex items-center justify-center uppercase tracking-widest text-sm hover:bg-white/20 transition-all">
              Call Support
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default MasterServicePage;
