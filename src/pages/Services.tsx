import { Link } from "react-router-dom";
import { Sparkles, Flame, Gift, ShieldCheck, Plane, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const services = [
  { icon: Sparkles, title: "VIP Darshan", desc: "Priority entry across major temples — with on-ground coordination, ID assistance, and minimal waiting time. Ideal for families, seniors and tight schedules." },
  { icon: Flame, title: "Puja & Hawan Booking", desc: "Sankalp puja, abhishek, rudrabhishek, hawan and special festival pujas performed in your name with priest coordination and sankalp video." },
  { icon: Gift, title: "Prasad Delivery", desc: "Authentic temple prasadam delivered to your doorstep across India — with packaging that preserves freshness and sanctity." },
  { icon: Heart, title: "Chadhava & Offerings", desc: "Chunni, chadhava, garlands, gold/silver offerings made on your behalf with photo and video proof." },
  { icon: Plane, title: "Yatra Packages", desc: "End-to-end yatra packages — Char Dham, Jyotirlinga, Shakti Peeth — with travel, stay, darshan and local assistance." },
  { icon: ShieldCheck, title: "Special Assistance", desc: "Wheelchair assistance, senior citizen support, multilingual guides, and customised itineraries for special needs." },
];

const Services = () => (
  <>
    <SEO
      title="Our Services — VIP Darshan, Puja, Prasad, Chadhava | Vandan Darshan"
      description="Vandan Darshan offers VIP darshan, puja, prasad delivery, chadhava and complete yatra packages across India's most sacred temples."
    />
    <section className="container-prose py-16 text-center">
      <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Our services</p>
      <h1 className="font-serif-display text-5xl md:text-6xl font-semibold mt-3">A complete spiritual concierge</h1>
      <div className="divider-om"><span>॥ ॐ ॥</span></div>
      <p className="text-muted-foreground max-w-2xl mx-auto">From your first prayer to the final blessing — every service is delivered with reverence, care and full transparency.</p>
    </section>

    <section className="container-prose pb-24 grid md:grid-cols-2 gap-6">
      {services.map((s, i) => (
        <div key={s.title} className="group p-8 rounded-2xl border border-border bg-card hover:border-gold/50 hover:shadow-temple transition-all duration-500 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
          <div className="h-14 w-14 grid place-items-center rounded-2xl bg-gradient-gold text-gold-foreground shadow-gold mb-5 group-hover:scale-110 transition-transform">
            <s.icon className="h-6 w-6" />
          </div>
          <h2 className="font-serif-display text-2xl font-semibold">{s.title}</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </section>

    <section className="container-prose pb-24">
      <div className="rounded-3xl bg-gradient-divine p-10 md:p-16 text-primary-foreground text-center">
        <h2 className="font-serif-display text-4xl md:text-5xl font-semibold">Ready to begin?</h2>
        <p className="opacity-90 mt-4 max-w-2xl mx-auto">Tell us your temple and service of choice — our team will call you within 30 minutes.</p>
        <Button asChild variant="gold" size="xl" className="mt-8"><Link to="/book">Request Callback <ArrowRight className="h-4 w-4" /></Link></Button>
      </div>
    </section>
  </>
);

export default Services;
