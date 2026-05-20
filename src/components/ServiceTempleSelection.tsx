import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Check, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allTemplesFullList } from "@/data/temples";
import { useServiceFlow } from "@/context/ServiceFlowContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  onNext: () => void;
  showHeader?: boolean;
}

export const ServiceTempleSelection: React.FC<Props> = ({ onNext, showHeader = true }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const { state, addTemple, removeTemple } = useServiceFlow();

  const filteredTemples = useMemo(() => {
    return allTemplesFullList.filter(temple => {
      const matchesSearch = temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.state?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = stateFilter ? temple.state === stateFilter : true;
      return matchesSearch && matchesState;
    });
  }, [searchQuery, stateFilter]);

  // Get unique states for filter, filtering out empty or undefined values
  const states = useMemo(() => {
    return Array.from(new Set(allTemplesFullList.map(t => t.state).filter(Boolean))).sort();
  }, []);

  const isTempleSelected = (slug: string) => {
    return state.selectedTemples.includes(slug);
  };

  const handleTempleToggle = (slug: string) => {
    if (isTempleSelected(slug)) {
      removeTemple(slug);
    } else {
      addTemple(slug);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cream relative">
      {/* Floating Prompt Banner */}
      <AnimatePresence>
        {state.selectedTemples.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-24 md:top-36 left-1/2 -translate-x-1/2 z-[90] w-[92%] max-w-lg bg-white/90 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-2xl p-4 md:p-5 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Check className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-secondary">
                  {state.selectedTemples.length} Temple{state.selectedTemples.length !== 1 ? 's' : ''} Selected
                </p>
                <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                  Ready to book your services?
                </p>
              </div>
            </div>
            <Button
              onClick={onNext}
              className="bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider rounded-xl px-4 py-2.5 md:py-3 h-auto shrink-0 shadow-md flex items-center gap-1.5"
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {showHeader && (
        <section className="pt-40 pb-12 bg-gradient-to-b from-gradient-cream to-white text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-gold mb-6 border border-gold/30"
          >
            <MapPin className="h-8 w-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl font-bold text-secondary mb-4"
          >
            Select Your <span className="text-gold italic">Temples</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Choose one or multiple sacred shrines where you'd like to book this service. You can select from over 100+ temples across India.
          </p>
        </section>
      )}

      <section className="py-12 bg-white container-prose">
        {/* Search and Filter Controls */}
        <div className="mb-12 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search temples by name or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* State Filter */}
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1 border border-gold/10 rounded-lg bg-gray-50/50">
            <button
              onClick={() => setStateFilter("")}
              className={cn(
                "px-3 py-1.5 rounded-lg font-medium text-xs transition-all",
                stateFilter === ""
                  ? "bg-primary text-white"
                  : "bg-white border border-gold/20 text-secondary hover:border-primary"
              )}
            >
              All States
            </button>
            {states.map(state => (
              <button
                key={state}
                onClick={() => setStateFilter(state)}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-medium text-xs transition-all",
                  stateFilter === state
                    ? "bg-primary text-white"
                    : "bg-white border border-gold/20 text-secondary hover:border-primary"
                )}
              >
                {state}
              </button>
            ))}
          </div>

          {/* Selection Count */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex justify-between items-center">
            <p className="text-secondary font-medium">
              {state.selectedTemples.length} temple{state.selectedTemples.length !== 1 ? 's' : ''} selected
            </p>
            {state.selectedTemples.length > 0 && (
              <button
                onClick={() => {
                  state.selectedTemples.forEach(slug => removeTemple(slug));
                }}
                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Temples Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTemples.map((temple, idx) => {
            const isSelected = isTempleSelected(temple.slug);
            return (
              <motion.div
                key={temple.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.02, 0.3) }}
                viewport={{ once: true }}
                onClick={() => handleTempleToggle(temple.slug)}
                className={cn(
                  "relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 group",
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 shadow-lg"
                    : "hover:shadow-lg"
                )}
              >
                {/* Temple Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={temple.image}
                    alt={temple.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                  {/* Selection Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-all duration-300 flex items-center justify-center",
                      isSelected
                        ? "bg-black/30 backdrop-blur-sm"
                        : "opacity-0 group-hover:opacity-100"
                    )}
                  >
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full border-2 border-white flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-primary"
                          : "bg-white/20 group-hover:bg-white/40"
                      )}
                    >
                      {isSelected && <Check className="h-5 w-5 text-white" />}
                    </div>
                  </div>

                  {/* Temple Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-white bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                      {temple.state}
                    </span>
                  </div>

                  {/* Selection Badge */}
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-white bg-green-600/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <Check className="h-3 w-3" /> Selected
                      </span>
                    </div>
                  )}
                </div>

                {/* Temple Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-2xl font-bold mb-2 line-clamp-2">{temple.name}</h3>
                  <p className="text-sm text-white/90 line-clamp-2 mb-4">{temple.tagline}</p>

                  {/* Explore Link */}
                  <Link
                    to={`/${temple.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-gold/80 transition-colors"
                  >
                    Explore Temple <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredTemples.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No temples found matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setStateFilter("");
              }}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Continue Button */}
        <div className="flex justify-center mt-16">
          <Button
            onClick={onNext}
            disabled={state.selectedTemples.length === 0}
            className="px-12 py-3 text-lg font-bold"
          >
            Continue to Details Form →
          </Button>
        </div>
      </section>
    </div>
  );
};
