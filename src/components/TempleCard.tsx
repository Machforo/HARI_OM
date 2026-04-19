import { Link } from "react-router-dom";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { Temple } from "@/data/temples";

export const TempleCard = ({ temple }: { temple: Temple }) => (
  <Link to={`/temples/${temple.slug}`} className="card-temple group block">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={temple.image}
        alt={`${temple.name}, ${temple.location}`}
        loading="lazy"
        width={1280}
        height={896}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
        {temple.highlights.slice(0, 1).map((h) => (
          <span key={h} className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-gold text-gold-foreground shadow-gold">
            {h}
          </span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-background">
        <div className="flex items-center gap-1.5 text-xs opacity-90">
          <MapPin className="h-3 w-3" /> {temple.location}, {temple.state}
        </div>
        <h3 className="font-serif-display text-2xl font-semibold mt-1">{temple.name}</h3>
      </div>
    </div>
    <div className="p-5 flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">{temple.tagline}</p>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-foreground/70">
          <Calendar className="h-3 w-3 text-gold" /> Best time: <span className="font-medium">{temple.bestTime}</span>
        </div>
      </div>
      <div className="h-9 w-9 grid place-items-center rounded-full bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </div>
  </Link>
);
