import { SEO } from "@/components/SEO";
import { Sparkles, Flame, Gift, Heart, ArrowRight, MapPin, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { allTemplesFullList } from "@/data/temples";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useServiceFlow, ServiceFlowProvider } from "@/context/ServiceFlowContext";
import { ServiceTempleSelection } from "@/components/ServiceTempleSelection";
import { ServiceForm } from "@/components/ServiceForm";
import { ServiceReview } from "@/components/ServiceReview";
import { useAuth } from "@/context/AuthContext";

const services = [
  {
    title: "Special Darshan",
    slug: "darshan",
    icon: Sparkles,
    desc: "Skip the long queues and focus on your prayer. Our on-ground team ensures a seamless, divine experience at India's holiest shrines.",
    features: ["Priority Access", "Verified Local Guides", "Elderly Assistance"],
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    seoDesc: "Experience hassle-free temple darshan with priority queue access, professional guides, and assistance for elderly pilgrims across India's sacred shrines."
  },
  {
    title: "Pooja Services",
    slug: "puja",
    icon: Flame,
    desc: "Personalized Sankalp Pujas performed by authentic temple priests in your name. Experience the rituals from anywhere in the world.",
    features: ["Live Sankalp", "Authentic Priests", "Digital Recording"],
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    seoDesc: "Book authentic temple pujas performed by learned priests with live streaming, digital recordings, and traditional Sankalp ceremonies."
  },
  {
    title: "Prasad Delivery",
    slug: "prasad",
    icon: Gift,
    desc: "Authentic temple prasadam sourced directly from the shrine and delivered to your doorstep with purity and devotion.",
    features: ["Hygienic Packing", "Global Shipping", "Freshly Sourced"],
    color: "bg-gold-soft/30",
    iconColor: "text-gold",
    seoDesc: "Receive blessed temple prasad directly delivered to your home with authentic sourcing, hygienic packaging, and global shipping options."
  },
  {
    title: "Chadhava Offerings",
    slug: "chadhava",
    icon: Heart,
    desc: "Offer Vastram, Flowers, or Shringar to your favorite deity. We facilitate your offerings with traditional rituals.",
    features: ["Traditional Rituals", "Video Confirmation", "Sacred Offerings"],
    color: "bg-pink-50",
    iconColor: "text-pink-600",
    seoDesc: "Make online offerings of vastram, flowers, and shringar with traditional rituals, video confirmation, and complete transparency."
  }
];

// Service name mapping for display
const serviceNames: Record<string, string> = {
  darshan: "Special Darshan",
  puja: "Pooja Services",
  prasad: "Prasad Delivery",
  chadhava: "Chadhava Offerings"
};

const ServicesContent = () => {
  const auth = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStep, setCurrentStep] = useState<'selection' | 'temples' | 'form' | 'review' | 'success'>('selection');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state, setSelectedService, resetFlow } = useServiceFlow();
  
  const filteredTemples = useMemo(() => {
    if (!searchQuery.trim()) return allTemplesFullList;
    return allTemplesFullList.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.state?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleServiceSelect = (serviceSlug: string) => {
    setSelectedService(serviceSlug);
    setCurrentStep('temples');
  };

  const handleTempleSelectionComplete = () => {
    setCurrentStep('form');
  };

  const handleFormComplete = () => {
    setCurrentStep('review');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedTempleNames = state.selectedTemples
        .map(slug => allTemplesFullList.find(t => t.slug === slug)?.name || slug)
        .join(", ");

      // Log the data being submitted
      console.log("Service Inquiry Submitted:", {
        service: state.selectedService,
        temples: state.selectedTemples,
        details: state.formData,
      });

      // Save to CRM leads database
      if (auth && auth.addLead) {
        auth.addLead({
          name: state.formData.fullName || "",
          phone: state.formData.phone || "",
          email: state.formData.email || "",
          service: serviceNames[state.selectedService || ""] || state.selectedService || "",
          temple: selectedTempleNames || "Not Specified",
          date: state.formData.dateOfVisit || "",
          devotees: parseInt(state.formData.numberOfPeople || "1") || 1,
          notes: state.formData.specialRequirements || "",
          status: "new",
          comments: "",
        });
      }

      setCurrentStep('success');
      
      // Reset after 3 seconds
      setTimeout(() => {
        resetFlow();
        setCurrentStep('selection');
      }, 3000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 1: Service Selection
  if (currentStep === 'selection') {
    return (
      <>
        <SEO 
          title="Spiritual Services — Special Darshan, Puja & Prasad | Vandan Darshan" 
          description="Comprehensive spiritual services including priority darshan assistance, authentic puja bookings, and global prasad delivery from India's sacred shrines. Book across 100+ sacred destinations."
        />

        {/* BANNER HERO */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://www.shutterstock.com/image-photo/varanasi-india-november-15th-2024-260nw-2592605795.jpg"
              alt="Sacred Temple Offerings - Varanasi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1240]/90 via-[#1A1240]/50 to-transparent" />
          </div>
          
          <div className="container-prose relative z-10 h-full flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/20 text-gold mb-8 border border-gold/30"
            >
              <Sparkles className="h-10 w-10" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-8xl font-bold text-white mb-6 leading-tight"
            >
              Sacred <span className="text-gold italic">Offerings</span>
            </motion.h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
              Bridging the gap between your heart's devotion and the temple's rituals. Explore our range of specialized spiritual services available across India's holiest shrines.
            </p>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="py-24 bg-white">
          <div className="container-prose">
            <div className="text-center mb-16">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">Choose Your Service</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-secondary">Select a Spiritual Service</h3>
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto font-medium">Each service comes with comprehensive support, authentic rituals, and personalized guidance from our spiritual team.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {services.map((s, i) => (
                <motion.div 
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleServiceSelect(s.slug)}
                  className={cn("p-10 md:p-14 rounded-[3.5rem] relative overflow-hidden group shadow-soft hover:shadow-2xl transition-all duration-500 cursor-pointer", s.color)}
                >
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <s.icon size={120} />
                  </div>
                  <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm">
                    <s.icon className={cn("h-8 w-8", s.iconColor)} />
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-3">{s.title}</h2>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10 font-medium">{s.seoDesc}</p>
                  <ul className="space-y-3 mb-10">
                    {s.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-secondary font-bold text-xs">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-secondary hover:bg-primary text-white rounded-full px-8 h-12 font-black uppercase tracking-widest text-xs w-full">
                    Book This Service <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEMPLES LIST WITH SEARCH & FILTER */}
        <section className="py-24 bg-muted/30">
          <div className="container-prose">
            <div className="text-center mb-12">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">Service Availability</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-secondary">Available at Over <span className="text-gold italic">100+ Shrines</span></h3>
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto font-medium">Our spiritual services are accessible across India's most sacred and divine destinations. Search to find your preferred temple and explore their unique offerings.</p>
            </div>

            {/* Search & Filter */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Search temples by name, state, or deity..."
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
            </div>

            {/* Temples Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {filteredTemples.length > 0 ? (
                filteredTemples.map((temple) => (
                  <motion.div 
                    key={temple.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link 
                      to={`/${temple.slug || temple.id}`}
                      className="p-4 bg-white rounded-2xl border border-border/60 hover:border-gold hover:shadow-xl transition-all flex flex-col h-full"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="h-8 w-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors flex-shrink-0">
                          <MapPin className="h-4 w-4" />
                        </div>
                      </div>
                      <h4 className="font-bold text-secondary text-sm leading-tight mb-1">{temple.name}</h4>
                      <p className="text-xs text-muted-foreground">{temple.state}</p>
                      <p className="text-xs text-gold font-semibold mt-2">{temple.deity}</p>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No temples found matching your search. Try different keywords.</p>
                </div>
              )}
            </div>
            
            <div className="text-center">
               <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white rounded-full px-10">
                 <Link to="/temples">Explore Complete Shrine Directory <ArrowRight className="ml-2 h-4 w-4" /></Link>
               </Button>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="py-24 bg-white">
          <div className="container-prose">
            <div className="text-center mb-16">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">Why Choose Vandan Darshan</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-secondary">Seamless Spiritual Services</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "🛕", title: "Authentic Experience", desc: "Connected with verified temple authorities and authentic priests for genuine spiritual experiences." },
                { icon: "🤝", title: "Expert Coordination", desc: "Our on-ground team handles all logistics while you focus on your devotion and prayer." },
                { icon: "🌍", title: "Global Access", desc: "Participate in sacred rituals from anywhere in the world with live updates and video recordings." },
                { icon: "⏰", title: "Hassle-Free Process", desc: "Simple booking, quick confirmations, and dedicated support throughout your spiritual journey." },
                { icon: "✨", title: "Premium Service", desc: "Priority access, professional guidance, and personalized attention for every pilgrim." },
                { icon: "📱", title: "Digital Transparency", desc: "Track your offerings, view live updates, and receive documentation of all services." }
              ].map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-gradient-cream rounded-3xl border border-border/20 text-center hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h4 className="font-serif font-bold text-secondary text-lg mb-3">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-divine">
          <div className="container-prose">
            <div className="bg-white rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-gold">
              <h2 className="font-serif text-4xl md:text-6xl font-bold text-secondary mb-6">Ready to Begin Your Sacred Journey?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Select your preferred service above and our team will guide you through the entire process with care and devotion.
              </p>
              <Button onClick={() => document.querySelector('[class*="grid"]')?.scrollIntoView({ behavior: 'smooth' })} size="xl" className="bg-primary hover:bg-primary/90 text-white rounded-full px-12 h-16 font-black uppercase tracking-widest">
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Step 2: Temple Selection
  if (currentStep === 'temples' && state.selectedService) {
    return (
      <ServiceTempleSelection
        onNext={handleTempleSelectionComplete}
        showHeader={true}
      />
    );
  }

  // Step 3: Form Filling
  if (currentStep === 'form' && state.selectedService) {
    return (
      <ServiceForm
        onNext={handleFormComplete}
        onBack={() => setCurrentStep('temples')}
        serviceName={serviceNames[state.selectedService] || state.selectedService}
      />
    );
  }

  // Step 4: Review & Submit
  if (currentStep === 'review' && state.selectedService) {
    return (
      <ServiceReview
        onBack={() => setCurrentStep('form')}
        onSubmit={handleSubmit}
        serviceName={serviceNames[state.selectedService] || state.selectedService}
        isSubmitting={isSubmitting}
      />
    );
  }

  // Step 5: Success
  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-cream flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-white rounded-3xl p-12 md:p-24 text-center shadow-2xl border-2 border-green-500">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 text-green-600 mb-8 border-2 border-green-500"
            >
              <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-4"
            >
              Thank You!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-6 leading-relaxed"
            >
              Your spiritual service inquiry has been received successfully. 
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8 text-left space-y-3"
            >
              <p className="font-bold text-secondary flex items-center gap-2">
                ✓ Confirmation email sent to {state.formData.email}
              </p>
              <p className="font-bold text-secondary flex items-center gap-2">
                ✓ Our team will contact you within 24 hours
              </p>
              <p className="font-bold text-secondary flex items-center gap-2">
                ✓ Personalized guidance for your {serviceNames[state.selectedService] || state.selectedService} journey
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-muted-foreground italic"
            >
              Redirecting you to home page in a few seconds...
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

const Services = () => {
  return (
    <ServiceFlowProvider>
      <ServicesContent />
    </ServiceFlowProvider>
  );
};

export default Services;
