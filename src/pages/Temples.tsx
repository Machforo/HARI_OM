import { useMemo, useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { TempleCard } from "@/components/TempleCard";
import { Input } from "@/components/ui/input";
import { temples, allTemplesList, Temple } from "@/data/temples";
import { templeMetadata } from "@/data/templeMetadata";
import { Search, Filter, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = ["All", "Jyotirlinga", "Char Dham", "Shakti Peeth", "South India", "North India"];

const Temples = () => {
  const [q, setQ] = useState("");
  const [state, setState] = useState<string>("All");
  const [deity, setDeity] = useState<string>("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const fullList = useMemo(() => {
    const featuredSlugs = temples.map(t => t.slug);
    const others = allTemplesList
      .map(name => {
        const slug = name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and").replace(/,/g, "");
        if (featuredSlugs.includes(slug)) return null;
        
        const metadata = templeMetadata[slug] || {};
        
        return {
          slug,
          name: `${name} Temple`,
          deity: metadata.deity || "Lord",
          location: "India",
          state: metadata.state || "Various",
          image: metadata.image || "https://images.unsplash.com/photo-1544011501-a212f2f4c82e?auto=format&fit=crop&q=80",
          category: metadata.category,
          tagline: `Experience the divine presence at ${name} Temple.`,
          bestTime: "Year-round",
          highlights: ["Special Darshan", "Puja Booking", "Prasad Delivery"],
        } as Temple;
      })
      .filter(Boolean) as Temple[];
    
    return [...temples, ...others];
  }, []);

  const states = useMemo(() => ["All", ...Array.from(new Set(fullList.map((t) => t.state))).sort()], [fullList]);
  const deities = useMemo(() => ["All", ...Array.from(new Set(fullList.map((t) => t.deity))).sort()], [fullList]);
  
  const filtered = useMemo(
    () => fullList.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(q.toLowerCase()) ||
                          t.location.toLowerCase().includes(q.toLowerCase()) ||
                          t.state.toLowerCase().includes(q.toLowerCase());
      const matchesState = state === "All" || t.state === state;
      const matchesDeity = deity === "All" || t.deity === deity;
      const matchesCategory = activeCategory === "All" || 
                              t.category === activeCategory ||
                              (activeCategory === "Jyotirlinga" && t.name.includes("Jyotirlinga")) ||
                              (activeCategory === "Char Dham" && ["Badrinath", "Kedarnath", "Gangotri", "Yamunotri"].some(n => t.name.includes(n)));
      
      return matchesSearch && matchesState && matchesDeity && matchesCategory;
    }),
    [q, state, deity, activeCategory, fullList]
  );

  return (
    <>
      <SEO
        title="Explore All Sacred Shrines — Book Darshan, Puja & Prasad | Vandan Darshan"
        description="Search through 100+ sacred Indian temples. Specialized assistance for Special Darshan, Puja, and Prasad delivery at every shrine."
      />

      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-cream">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Sparkles className="h-64 w-64 text-primary" />
        </div>
        
        <div className="container-prose relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4"
          >
            Divine Destinations
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif-display text-5xl md:text-8xl font-bold text-secondary tracking-tight"
          >
            Discover Your <span className="text-primary italic">Sanctuary</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-devanagari text-2xl text-gold mt-6 italic"
          >
            ॥ सर्वे भवन्तु सुखिनः ॥
          </motion.div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gold transition-transform group-focus-within:scale-110" />
              <Input 
                value={q} 
                onChange={(e) => setQ(e.target.value)} 
                placeholder="Search by temple name, deity, or state..." 
                className="pl-16 h-20 rounded-[2.5rem] text-xl shadow-2xl border-border/40 focus:ring-primary/20 bg-white" 
              />
              {q && (
                <button onClick={() => setQ("")} className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-full transition-colors">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 mr-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
                <Filter className="h-4 w-4" /> Filters:
              </div>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={cn(
                    "px-6 h-10 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                    activeCategory === c ? "bg-secondary text-white shadow-lg" : "bg-white text-muted-foreground border border-border/60 hover:border-gold hover:text-gold"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
               <select 
                 value={state} 
                 onChange={(e) => setState(e.target.value)}
                 className="h-10 px-6 rounded-full border border-border/60 bg-white text-[10px] font-black uppercase tracking-widest text-muted-foreground focus:ring-primary/20 outline-none cursor-pointer hover:border-gold transition-colors"
               >
                 <option value="All">All States</option>
                 {states.filter(s => s !== "All").map(s => (
                   <option key={s} value={s}>{s}</option>
                 ))}
               </select>

               <select 
                 value={deity} 
                 onChange={(e) => setDeity(e.target.value)}
                 className="h-10 px-6 rounded-full border border-border/60 bg-white text-[10px] font-black uppercase tracking-widest text-muted-foreground focus:ring-primary/20 outline-none cursor-pointer hover:border-gold transition-colors"
               >
                 <option value="All">All Deities</option>
                 {deities.filter(d => d !== "All").map(d => (
                   <option key={d} value={d}>{d}</option>
                 ))}
               </select>
            </div>
          </div>
        </div>
      </section>

      <section className="container-prose pb-40">
        <div className="flex items-center justify-between mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Showing <span className="text-secondary">{filtered.length}</span> Sacred Shrines
          </p>
          <div className="h-px flex-1 mx-8 bg-border/40" />
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="no-results"
              className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-border/60"
            >
              <div className="h-20 w-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-2xl font-serif-display font-bold text-secondary">No shrines found matching your heart's search.</p>
              <p className="text-muted-foreground mt-4 font-medium">Try different keywords or clear your filters.</p>
              <Button variant="link" onClick={() => {setQ(""); setState("All"); setDeity("All"); setActiveCategory("All");}} className="mt-8 text-primary font-bold">Clear all filters</Button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              key="results-grid"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filtered.map((t, index) => (
                <motion.div
                  key={t.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                >
                  <TempleCard temple={t} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Temples;
