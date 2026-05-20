import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { templeList } from "@/data/temples";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  
  const filteredTemples = templeList.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) || 
    t.location.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-xl flex flex-col p-6 md:p-20"
        >
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 p-4 text-white/50 hover:text-white transition-colors"
          >
            <X className="h-10 w-10" />
          </button>

          <div className="max-w-4xl mx-auto w-full pt-20">
            <div className="relative group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-gold" />
              <Input 
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your sacred destination..."
                className="bg-transparent border-0 border-b-2 border-white/10 rounded-none h-20 text-3xl md:text-5xl text-white placeholder:text-white/20 focus-visible:ring-0 focus-visible:border-gold transition-all pl-14"
              />
            </div>

            <div className="mt-20">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-10">
                {query ? "Search Results" : "Popular Shrines"}
              </h3>

              <div className="space-y-6">
                {(query ? filteredTemples : templeList.slice(0, 5)).map((t) => (
                  <motion.div
                    key={t.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group"
                  >
                    <Link 
                      to={`/${t.slug}-temple`} 
                      onClick={onClose}
                      className="flex items-center justify-between p-6 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                    >
                      <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-2xl overflow-hidden bg-white/10 shrink-0">
                          <img src={t.image} alt={t.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-serif-display font-bold text-white group-hover:text-gold transition-colors">{t.name}</h4>
                          <p className="text-white/40 text-sm mt-1 flex items-center gap-2">
                            <MapPin className="h-3 w-3" /> {t.location}, {t.state}
                          </p>
                        </div>
                      </div>
                      <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-gold group-hover:border-gold transition-all">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {!query && (
                <div className="mt-16 flex flex-wrap gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mr-4">Suggested:</span>
                  {["Jyotirlinga", "Char Dham", "Shakti Peeth", "Varanasi"].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-6 py-2 rounded-full bg-white/5 text-white/60 text-xs font-bold hover:bg-gold hover:text-white transition-all border border-white/5"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
