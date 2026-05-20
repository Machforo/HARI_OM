import { Link } from "react-router-dom";
import { MapPin, Calendar, ArrowUpRight, Sparkles } from "lucide-react";
import { Temple } from "@/data/temples";
import { motion } from "framer-motion";

export const TempleCard = ({ temple }: { temple: Temple }) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
  >
    <Link to={`/${temple.slug}-temple`} className="card-temple group block relative h-full">
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl">
        <img
          src={temple.image}
          onError={(e) => {
            e.currentTarget.src = `https://images.unsplash.com/photo-1544013585-446a362cb705?auto=format&fit=crop&q=80&sig=${temple.slug}`;
          }}
          alt={`${temple.name}, ${temple.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {temple.highlights.slice(0, 1).map((h) => (
            <span key={h} className="text-[9px] uppercase tracking-[0.2em] font-black px-3 py-1.5 rounded-full bg-gold/90 text-white shadow-lg backdrop-blur-sm">
              {h}
            </span>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold mb-2">
            <MapPin className="h-3 w-3" /> {temple.location}, {temple.state}
          </div>
          <h3 className="font-serif-display text-2xl font-bold leading-tight group-hover:text-gold transition-colors">{temple.name}</h3>
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-b-2xl border-x border-b border-border/40 h-[140px] flex flex-col justify-between">
        <p className="text-xs text-muted-foreground line-clamp-2 font-medium leading-relaxed italic">"{temple.tagline}"</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/60">
            <Calendar className="h-3.5 w-3.5 text-gold" /> Best time: <span className="text-secondary">{temple.bestTime}</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      {/* Decorative Ornament */}
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Sparkles className="h-5 w-5 text-gold animate-pulse" />
      </div>
    </Link>
  </motion.div>
);
