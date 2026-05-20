import { SEO } from "@/components/SEO";
import { templeList } from "@/data/temples";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Sparkles, Flame, Gift, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

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
    pathSuffix: "/darshan"
  },
  puja: {
    title: "Sacred Pooja Bookings",
    desc: "Personalized rituals performed in your name by authentic temple priests. Witness the divine blessings from anywhere.",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    pathSuffix: "/puja"
  },
  prasad: {
    title: "Holy Prasad Sewa",
    desc: "Get authentic temple prasadam delivered directly to your home with purity and devotion from the most sacred shrines.",
    icon: Gift,
    color: "text-gold",
    bgColor: "bg-gold/10",
    pathSuffix: "/prasad"
  },
  chadhava: {
    title: "Online Chadhava Offerings",
    desc: "Offer your devotion through Vastram, Shringar, or flowers to your favorite deity remotely through our secure facilitation.",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    pathSuffix: "/chadhava"
  }
};

const MasterServicePage = ({ type }: Props) => {
  const config = serviceConfig[type];
  const Icon = config.icon;

  return (
    <>
      <SEO 
        title={`${config.title} | Vandan Darshan`} 
        description={config.desc}
      />

      <section className="pt-40 pb-24 bg-gradient-cream overflow-hidden">
        <div className="container-prose text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn("inline-flex h-20 w-20 items-center justify-center rounded-[2rem] mb-8 shadow-xl", config.bgColor)}
          >
            <Icon className={cn("h-10 w-10", config.color)} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif-display text-5xl md:text-7xl font-bold text-secondary mb-8"
          >
            {config.title}
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            {config.desc}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-prose">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templeList.map((temple, i) => (
              <motion.div
                key={temple.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/${temple.slug}-temple${config.pathSuffix}`}
                  className="group block p-8 rounded-[3rem] border border-border/40 bg-white hover:border-gold hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
                    <Icon size={120} />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{temple.location}, {temple.state}</span>
                  </div>

                  <h3 className="font-serif-display text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">{temple.name}</h3>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 line-clamp-2 italic">"{temple.tagline}"</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={cn("text-[10px] font-black uppercase tracking-widest flex items-center gap-3", config.color)}>
                      Book {type.charAt(0).toUpperCase() + type.slice(1)} <ArrowRight className="h-4 w-4" />
                    </span>
                    <div className="h-8 w-8 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
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
