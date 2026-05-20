import { motion } from "framer-motion";
import { SpiritualAI } from "@/components/SpiritualAI";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SpiritualConsultant = () => {
  return (
    <div className="bg-white min-h-screen pt-12">
      {/* Header Banner */}
      <section className="relative py-20 overflow-hidden bg-gradient-cream">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Sparkles className="h-64 w-64 text-primary" />
        </div>
        
        <div className="container-prose relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-soft mb-8 border border-border"
          >
            <Sparkles className="h-8 w-8 text-gold" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif-display text-4xl md:text-6xl font-bold text-secondary mb-6 leading-tight"
          >
            Your Divine <br />
            <span className="text-primary italic">Spiritual Consultant</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 font-medium"
          >
            Seek guidance for your spiritual journey. Ask questions about daily rituals, temple histories, or share your kundli details for personalized astrological insights based on ancient Vedic wisdom.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 relative -mt-8 z-20">
        <div className="container-prose max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Essential Tools */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 flex flex-col gap-6"
            >
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-border">
                <h3 className="font-serif-display text-2xl font-bold text-secondary mb-6">Essential Services</h3>
                
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="justify-start h-14 px-6 rounded-xl border-border hover:border-primary hover:bg-primary/5 group" asChild>
                    <Link to="/book">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-secondary group-hover:text-primary transition-colors">Book a Darshan</span>
                    </Link>
                  </Button>

                  <Button variant="outline" className="justify-start h-14 px-6 rounded-xl border-border hover:border-gold hover:bg-gold-soft/20 group" asChild>
                    <Link to="/temples">
                      <div className="h-8 w-8 rounded-full bg-gold/10 text-gold flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-secondary group-hover:text-gold transition-colors">Search for a Temple</span>
                    </Link>
                  </Button>

                  <Button variant="outline" className="justify-start h-14 px-6 rounded-xl border-border hover:border-primary hover:bg-primary/5 group" asChild>
                    <Link to="/services">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-secondary group-hover:text-primary transition-colors">Book a Puja</span>
                    </Link>
                  </Button>

                  <Button variant="outline" className="justify-start h-14 px-6 rounded-xl border-border hover:border-gold hover:bg-gold-soft/20 group" asChild>
                    <Link to="/blogs">
                      <div className="h-8 w-8 rounded-full bg-gold/10 text-gold flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-secondary group-hover:text-gold transition-colors">Read Spiritual Blogs</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Chat Area */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-8 h-[500px] md:h-[700px] w-full"
            >
              <SpiritualAI />
            </motion.div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpiritualConsultant;
