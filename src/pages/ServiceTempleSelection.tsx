import { SEO } from "@/components/SEO";
import { useParams, useNavigate } from "react-router-dom";
import { templeList } from "@/data/temples";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, X, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceConfig = {
  darshan: {
    title: "Select Temples for Special Darshan",
    subtitle: "Choose multiple temples where you'd like priority darshan assistance",
    desc: "Skip queues and enjoy seamless darshan experiences across your preferred sacred shrines",
    icon: "🛕",
    color: "text-orange-600"
  },
  puja: {
    title: "Select Temples for Puja Services",
    subtitle: "Choose temples for your personalized pooja ceremonies",
    desc: "Book authentic sankalp pujas performed by temple priests in your name",
    icon: "🔥",
    color: "text-orange-600"
  },
  prasad: {
    title: "Select Temples for Prasad Delivery",
    subtitle: "Choose temples from where you'd like blessed prasad",
    desc: "Get authentic temple prasadam delivered fresh to your doorstep",
    icon: "🍲",
    color: "text-gold"
  },
  chadhava: {
    title: "Select Temples for Offerings",
    subtitle: "Choose temples where you'd like to make your sacred offerings",
    desc: "Offer vastram, flowers, or shringar to your favorite deities",
    icon: "🌸",
    color: "text-pink-600"
  }
};

export const ServiceTempleSelection = () => {
  const { serviceType = "darshan" } = useParams<{ serviceType: string }>();
  const navigate = useNavigate();
  const config = serviceConfig[serviceType as keyof typeof serviceConfig] || serviceConfig.darshan;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemples, setSelectedTemples] = useState<string[]>([]);

  const filteredTemples = useMemo(() => {
    if (!searchQuery.trim()) return templeList;
    return templeList.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.deity?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleTemple = (slug: string) => {
    setSelectedTemples(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleProceed = () => {
    if (selectedTemples.length > 0) {
      navigate(`/services/${serviceType}/details?temples=${selectedTemples.join(',')}`);
    }
  };

  return (
    <>
      <SEO 
        title={`${config.title} | Vandan Darshan`}
        description={config.desc}
      />

      {/* HERO */}
      <section className="pt-40 pb-16 bg-gradient-cream">
        <div className="container-prose text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl mb-6"
          >
            {config.icon}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl font-bold text-secondary mb-4"
          >
            {config.title}
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{config.subtitle}</p>
        </div>
      </section>

      {/* SEARCH & SELECTION */}
      <section className="py-24 bg-white">
        <div className="container-prose">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search temples by name, location, or deity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl border border-border/40 bg-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 text-secondary font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {selectedTemples.length > 0 ? `${selectedTemples.length} temple${selectedTemples.length !== 1 ? 's' : ''} selected` : 'Select one or more temples'}
            </p>
          </div>

          {/* Temples Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemples.map((temple, i) => (
              <motion.button
                key={temple.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => toggleTemple(temple.slug)}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all text-left relative group",
                  selectedTemples.includes(temple.slug)
                    ? "border-gold bg-gold/5 shadow-lg"
                    : "border-border/40 bg-white hover:border-gold/50 hover:shadow-md"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  {selectedTemples.includes(temple.slug) && (
                    <CheckCircle2 className="h-6 w-6 text-gold" />
                  )}
                </div>
                <h3 className="font-bold text-secondary text-lg mb-1">{temple.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{temple.state}</p>
                <p className="text-xs text-gold font-semibold">{temple.deity}</p>
              </motion.button>
            ))}
          </div>

          {filteredTemples.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No temples found. Try a different search.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 flex gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate("/services")}
              className="rounded-full px-8"
            >
              Back to Services
            </Button>
            <Button 
              disabled={selectedTemples.length === 0}
              onClick={handleProceed}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
            >
              Continue to Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="py-24 bg-gradient-cream">
        <div className="container-prose">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-secondary mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: "1", title: "Select Temples", desc: "Choose one or multiple temples from our network of 100+ sacred shrines." },
                { num: "2", title: "Fill Details", desc: "Provide your information and service preferences in the next step." },
                { num: "3", title: "Get Confirmed", desc: "Our team confirms your booking and provides all service details." }
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="text-4xl font-bold text-gold mb-4">{step.num}</div>
                  <h3 className="font-bold text-secondary text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceTempleSelection;
