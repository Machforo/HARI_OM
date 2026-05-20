import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-final.png";
import devotees from "@/assets/devotees.jpg";
import { Heart, Shield, Sparkles, Users, ArrowRight } from "lucide-react";

const About = () => (
  <>
    <SEO
      title="About Vandan Darshan — Devotees serving devotees"
      description="Vandan Darshan is a trusted spiritual concierge spreading devotion through Special Darshan, puja, prasad and chadhava across India's most sacred temples."
    />

    <section className="container-prose py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <img src={logo} alt="Vandan Darshan logo" className="h-20 w-20 object-contain mb-6" />
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">About us</p>
        <h1 className="font-serif-display text-5xl md:text-6xl font-semibold mt-3">Devotees, serving devotees.</h1>
        <p className="font-devanagari text-2xl text-gold mt-3">हर भक्त का दर्शन, हमारा संकल्प</p>
        <p className="text-muted-foreground mt-6 leading-relaxed">
          Vandan Darshan was born from a simple belief — that every devotee deserves a peaceful, dignified darshan. We are a team of pilgrims, organisers and locals who came together to make sacred journeys easier for families across India and abroad.
        </p>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          Today, thousands of devotees trust us each year with their most important journeys — from a senior's first Char Dham yatra to a family's Janmashtami at Dwarka. We treat every booking as a prayer.
        </p>
      </div>
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-divine rounded-3xl opacity-15 blur-2xl" />
        <img src={devotees} alt="Indian devotees at temple" loading="lazy" width={1280} height={896} className="relative rounded-3xl shadow-temple aspect-[4/5] object-cover" />
      </div>
    </section>

    <section className="bg-muted/40 border-y border-border py-20">
      <div className="container-prose">
        <h2 className="font-serif-display text-4xl font-semibold text-center">Our values</h2>
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {[
            { i: Heart, t: "Devotion first", d: "Every booking is treated like our own prayer." },
            { i: Shield, t: "Transparent", d: "Honest pricing, real updates, no hidden surprises." },
            { i: Sparkles, t: "Personal", d: "Tailored to age, time, accessibility and faith." },
            { i: Users, t: "Inclusive", d: "Spiritual access for every devotee — across languages, regions and abilities." },
          ].map((v) => (
            <div key={v.t} className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="h-12 w-12 mx-auto grid place-items-center rounded-2xl bg-gold-soft text-gold"><v.i className="h-6 w-6" /></div>
              <h3 className="font-semibold text-lg mt-4">{v.t}</h3>
              <p className="text-sm text-muted-foreground mt-2">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="container-prose py-20 text-center max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Our mission</p>
      <h2 className="font-serif-display text-4xl md:text-5xl font-semibold mt-3">Spreading spirituality, one devotee at a time.</h2>
      <p className="text-muted-foreground mt-6 leading-relaxed text-lg">
        We aim to make spiritual experiences accessible, organised and meaningful — across India and the world. Whether it's a Special Darshan, a sacred puja in your name, or a packet of prasad arriving at your home, our promise is the same: care, authenticity and the warmth of devotion.
      </p>
    </section>

    <section className="container-prose py-20">
      <div className="rounded-3xl bg-gradient-divine p-10 md:p-16 text-primary-foreground text-center">
        <h2 className="font-serif-display text-4xl md:text-5xl font-semibold">Ready to start your spiritual journey?</h2>
        <p className="opacity-90 mt-4 max-w-2xl mx-auto">
          Explore our complete range of services tailored to every devotee's needs and dreams.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Button asChild variant="gold" size="xl">
            <Link to="/services">Explore Services <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link to="/book">Book Darshan Now</Link>
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default About;
