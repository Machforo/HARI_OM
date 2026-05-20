import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What exactly does Vandan Darshan provide?",
    answer: "We provide comprehensive spiritual assistance including Special Darshan bookings, personalized Puja arrangements, Prasad delivery, and full travel logistics to ensure a peaceful and focused pilgrimage."
  },
  {
    question: "How do I book a Special Darshan?",
    answer: "You can book through our website form, WhatsApp, or by calling our team. We handle all the coordination with temple authorities to ensure priority access."
  },
  {
    question: "Is Vandan Darshan affiliated with the temples?",
    answer: "We are an independent spiritual service provider that works with verified local guides and priests to facilitate authentic and hassle-free experiences for devotees."
  },
  {
    question: "Can I customize my spiritual yatra?",
    answer: "Absolutely. We specialize in bespoke spiritual journeys. Whether you need assistance for seniors, specific ritual timings, or multi-temple itineraries, we handle everything."
  },
  {
    question: "How is the Prasad sourced and delivered?",
    answer: "We source authentic Prasad directly from the temple shrines immediately after the main Bhog. It is hygienically packed and shipped via priority courier to reach you fresh."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none">
        <Sparkles className="h-64 w-64 text-primary" />
      </div>
      
      <div className="container-prose relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4">Common Inquiries</h2>
          <h3 className="font-serif-display text-4xl md:text-5xl font-bold text-secondary">Seek and You Shall <span className="text-primary italic">Find</span></h3>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto font-medium">Clear your doubts and prepare for a divine experience with our most frequently asked questions.</p>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-5"
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className={cn(
                "border border-border/60 rounded-3xl overflow-hidden transition-all duration-500",
                openIndex === index ? "bg-white shadow-2xl scale-[1.02]" : "bg-white/40 hover:bg-white"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left group"
              >
                <span className="font-bold text-secondary text-xl transition-colors group-hover:text-primary">{faq.question}</span>
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500",
                  openIndex === index ? "bg-primary text-white rotate-180" : "bg-gold-soft/20 text-gold group-hover:bg-gold group-hover:text-white"
                )}>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="p-8 pt-0 text-muted-foreground text-lg leading-relaxed font-medium border-t border-border/40 bg-gold-soft/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
