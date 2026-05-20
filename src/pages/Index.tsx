import { ArrowRight, Calendar, Check, Sparkles, MapPin, Star, PlayCircle, Heart, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import { BookingForm } from "@/components/BookingForm";
import { templeList } from "@/data/temples";
import { motion } from "framer-motion";
import { FAQSection } from "@/components/FAQSection";
import { BlogPreview } from "@/components/BlogPreview";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { Counter } from "@/components/Counter";
import { VideoBanner } from "@/components/VideoBanner";
import { CredibilityScroller } from "@/components/CredibilityScroller";
import { AnimatedCollage } from "@/components/AnimatedCollage";

const Index = () => {
  return (
    <div className="scroll-smooth">
      <SEO
        title="Vandan Darshan | Your Gateway to Divine Grace & Sacred Experiences"
        description="Experience a seamless spiritual journey with Vandan Darshan. Specialized assistance for Special Darshan, Puja, and Prasad at India's holiest temples."
      />

      {/* HERO SECTION */}
      <section className="relative min-h-screen lg:h-screen flex items-center pt-32 pb-16 lg:pt-40 lg:pb-0 overflow-hidden">
        {/* Dynamic Video/Banner Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-hero-overlay z-10" />
          <VideoBanner />
        </div>

        <div className="container-prose relative z-20 pt-10 pb-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
              >
                <Sparkles className="h-3 w-3 text-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest">10,000+ Blessed Journeys Facilitated</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-serif-display text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              >
                Connect with the <br />
                <span className="text-gold italic font-light italic-font relative inline-block drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  Divine
                  <motion.span
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 blur-xl bg-gold/30 -z-10"
                  ></motion.span>
                </span> Grace.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-6 text-lg md:text-xl text-white max-w-md leading-relaxed font-semibold drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
              >
                We bridge the gap between devotion and logistics. Focus on your prayer while we handle the path to sacred shrines.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full h-14 text-base font-black shadow-gold border-none" asChild>
                  <Link to="/temples">Explore Shrines <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="h-12 w-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <PlayCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold tracking-widest text-[10px] uppercase text-white/90">Watch Journey</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-[3rem] shadow-2xl border border-white/20 relative preserve-3d max-w-[420px] ml-auto w-full"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 h-16 w-16 bg-gold rounded-full flex items-center justify-center text-white shadow-gold z-10 rotate-12"
              >
                <Star className="h-6 w-6 fill-current" />
              </motion.div>
              <h2 className="font-serif-display text-2xl font-bold text-secondary mb-1 text-center tracking-tight">Sacred Booking</h2>
              <p className="text-center text-muted-foreground mb-6 text-[10px] font-medium italic uppercase tracking-wider">Start your divine pilgrimage today</p>
              <BookingForm compact />
            </motion.div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Scroll To Explore</span>
        </motion.div>
      </section>

      <CredibilityScroller />

      {/* WATCH OUR JOURNEY SECTION */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container-prose">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">Divine Legacy</h2>
              <h3 className="font-serif-display text-4xl md:text-6xl font-bold text-secondary mb-8 leading-tight">Watch Our <span className="text-primary italic">Journey</span> of Faith</h3>
              <p className="text-lg text-muted-foreground mb-10 font-medium leading-relaxed">
                From the peaks of the Himalayas to the shores of the Arabian Sea, witness how we facilitate the sacred connection between devotees and the divine. Our journey is paved with faith, dedication, and thousands of blessed smiles.
              </p>
              <div className="flex flex-col gap-6">
                {[
                  { title: "Verified Logistics", desc: "Safe and secure travel arrangements for all age groups.", icon: Shield, color: "gold" },
                  { title: "Elderly Care", desc: "Specialized assistance for senior citizens and differently-abled devotees.", icon: Users, color: "primary" }
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.2) }}
                    className={cn(
                      "flex items-center gap-6 p-6 rounded-[2.5rem] border",
                      item.color === "gold" ? "bg-gold-soft/20 border-gold/10" : "bg-primary/5 border-primary/10"
                    )}
                  >
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center text-white",
                      item.color === "gold" ? "bg-gold shadow-gold" : "bg-primary shadow-primary"
                    )}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">{item.title}</h4>
                      <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-video rounded-[3.5rem] overflow-hidden shadow-2xl relative">
                <video
                  src="/assets/videos/mp4.mp4"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[3rem] shadow-2xl border border-border/40 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground">Certified</span>
                    <span className="font-bold text-secondary">Divine Excellence</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/assets/images/temples/pattern.png')] bg-repeat" />
        <div className="container-prose relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Sacred Shrines", value: "100+", icon: MapPin },
              { label: "Happy Devotees", value: "10k+", icon: Users },
              { label: "Authenticity", value: "100%", icon: Shield },
              { label: "Daily Rituals", value: "50+", icon: Heart },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <stat.icon className="h-8 w-8 text-gold mx-auto mb-4" />
                <div className="text-5xl font-serif-display font-bold text-white mb-2">
                  <Counter value={stat.value} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TEMPLES */}
      <section className="py-32 bg-white relative">
        <div className="container-prose">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">Sacred Destinations</h2>
              <h3 className="font-serif-display text-4xl md:text-6xl font-bold text-secondary">Discover India's <span className="text-primary italic">Holiest</span> Shrines</h3>
            </motion.div>
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white rounded-full px-8 h-12">
              <Link to="/temples">View All Shrines <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {templeList.slice(0, 3).map((temple, i) => (
              <motion.div
                key={temple.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Link to={`/${temple.slug}-temple`} className="group block">
                  <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-soft group-hover:shadow-2xl transition-all duration-700">
                    <img src={temple.image} alt={temple.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/20 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold mb-3">
                        <MapPin className="h-3 w-3" /> {temple.location}
                      </div>
                      <h4 className="font-serif-display text-3xl font-bold text-white mb-6 leading-tight">{temple.name}</h4>
                      <div className="h-px w-full bg-white/20 mb-8" />
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Explore Journey</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary transition-colors"
                        >
                          <ArrowRight className="h-6 w-6" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-background">
        <TestimonialSlider />
      </section>

      {/* AI PLANNER CTA BANNER */}
      <section className="py-12 bg-white">
        <div className="container-prose">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full rounded-[2.5rem] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden border border-gold/20 bg-secondary"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] grayscale bg-[url('/assets/images/temples/pattern.png')] bg-repeat pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-1.5 rounded-full text-gold text-[10px] font-black tracking-widest uppercase mb-6 backdrop-blur-md border border-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                Divine Guidance
              </div>
              <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-white mb-4 leading-tight">
                Consult the <span className="text-gold italic">Divine AI Guru</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                Chat with our wise spiritual assistant to seek guidance on daily rituals, find the right temple for your prayers, or share your kundli for astrological insights.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0 w-full lg:w-auto">
              <Button size="xl" className="w-full lg:w-auto bg-primary text-white hover:bg-primary/90 h-16 px-10 rounded-full font-black text-lg shadow-gold hover:scale-105 transition-all duration-300 border border-white/10" asChild>
                <Link to="/consultant">
                  Seek Guidance <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="bg-white">
        <BlogPreview />
      </section>

      {/* DEVOTIONAL MOMENTS COLLAGE */}
      <section className="py-32 bg-gold-soft/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="container-prose">
          <div className="text-center mb-20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">Divine Connections</h2>
            <h3 className="font-serif-display text-4xl md:text-6xl font-bold text-secondary mb-6">Experience the <span className="text-primary italic">Soul</span> of India</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              Join thousands of devotees who have found peace and spiritual fulfillment through our sacred assistance.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="relative rounded-[5rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            <div className="relative h-full min-h-[500px]">
              <AnimatedCollage />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between text-white">
              <div className="flex items-center gap-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20"
                >
                  <Heart className="h-8 w-8 text-gold fill-current" />
                </motion.div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest opacity-60">Tradition</span>
                  <span className="text-2xl font-bold font-serif-display">100% Authentic Indian Experience</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <FAQSection />
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden bg-secondary">
        <div className="absolute inset-0 opacity-[0.03] grayscale bg-[url('/assets/images/temples/pattern.png')] bg-repeat" />
        <div className="container-prose relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/10"
          >
            <Sparkles className="h-12 w-12 text-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif-display text-4xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            Ready for your <br />
            <span className="text-gold italic">Sacred</span> Darshan?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Let Vandan Darshan handle the logistics so you can focus on the divine connection. Your sacred journey starts with a single step.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Button size="xl" className="bg-primary hover:bg-primary/90 text-white px-12 h-20 rounded-full text-xl font-black shadow-gold" asChild>
              <Link to="/book">Reserve Your Sacred Journey</Link>
            </Button>
            <Button size="xl" variant="secondary" className="bg-white/10 text-white hover:bg-white/20 px-12 h-20 rounded-full text-xl font-black backdrop-blur-md border border-white/20" asChild>
              <a href="tel:8960965151">Call Support</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
