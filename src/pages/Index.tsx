import { Link } from "react-router-dom";
import { ArrowRight, Check, Flame, Gift, Sparkles, ShieldCheck, Users, Star, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { TempleCard } from "@/components/TempleCard";
import { BookingForm } from "@/components/BookingForm";
import { temples } from "@/data/temples";
import hero from "@/assets/hero-devotee.jpg";
import puja from "@/assets/puja-ritual.jpg";
import devotees from "@/assets/devotees.jpg";

const services = [
  { icon: Sparkles, title: "VIP Darshan", desc: "Skip the queue with priority access for you and your family." },
  { icon: Flame, title: "Puja Booking", desc: "Sankalp pujas, abhishek, hawan & havans performed in your name." },
  { icon: Gift, title: "Prasad Delivery", desc: "Authentic temple prasadam delivered to your doorstep." },
  { icon: ShieldCheck, title: "Chadhava & Offerings", desc: "Chadhava, chunni, garlands offered on your behalf with photos." },
];

const stats = [
  { n: "10,000+", l: "Devotees served" },
  { n: "50+", l: "Temples covered" },
  { n: "4.9 / 5", l: "Devotee rating" },
  { n: "24×7", l: "Support" },
];

const Index = () => {
  const featured = temples.slice(0, 6);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vandan Darshan",
    url: typeof window !== "undefined" ? window.location.origin : "",
    description: "Trusted spiritual concierge for VIP darshan, puja, prasad and chadhava across India's most sacred temples.",
    contactPoint: { "@type": "ContactPoint", telephone: "+91-99999-99999", contactType: "customer service", areaServed: "IN" },
  };

  return (
    <>
      <SEO
        title="Vandan Darshan — VIP Darshan, Puja & Prasad across India"
        description="Trusted concierge for VIP darshan, puja, prasad and chadhava at India's most sacred temples. Skip queues, book with devotee-first care."
        jsonLd={orgJsonLd}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="Devotee praying with diyas at a temple" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        </div>
        <div className="container-prose relative grid lg:grid-cols-12 gap-10 py-20 lg:py-32 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold/30 text-xs font-semibold tracking-wider uppercase text-foreground">
              <span className="font-devanagari text-gold">॥ ॐ ॥</span> Trusted by 10,000+ devotees
            </div>
            <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mt-6">
              Your sacred journey, <br/>
              <span className="text-gradient-divine">guided with grace.</span>
            </h1>
            <p className="font-devanagari text-2xl text-gold mt-3">वन्दन दर्शन — हर भक्त के लिए</p>
            <p className="text-lg text-muted-foreground max-w-xl mt-6 leading-relaxed">
              VIP darshan, puja, prasad and chadhava across India's most revered temples. We handle the logistics — you receive the blessings.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button asChild variant="divine" size="xl"><Link to="/book">Book Darshan <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild variant="outlineGold" size="xl"><Link to="/temples">Explore Temples</Link></Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-foreground/75">
              {["VIP Darshan Assistance", "Same-day Bookings", "On-ground Support"].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-gold" /> {b}</span>
              ))}
            </div>
          </div>

          {/* Quick form card */}
          <div className="lg:col-span-5 relative animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="absolute -inset-2 bg-gradient-divine rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-card border border-border rounded-3xl p-6 shadow-temple">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="h-10 w-10 grid place-items-center rounded-full bg-gradient-gold text-gold-foreground"><Phone className="h-4 w-4" /></div>
                <div>
                  <h3 className="font-serif-display text-xl font-semibold">Request a callback</h3>
                  <p className="text-xs text-muted-foreground">Our team responds within 30 minutes</p>
                </div>
              </div>
              <div className="pt-4">
                <BookingForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-muted/40">
        <div className="container-prose grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-serif-display text-3xl md:text-4xl font-semibold text-gradient-gold">{s.n}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-prose py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">What we offer</p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-semibold mt-3">A complete spiritual concierge</h2>
          <div className="divider-om"><span>॥ ॐ ॥</span></div>
          <p className="text-muted-foreground">From booking to blessings — we walk alongside you at every step of the journey.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((s, i) => (
            <div key={s.title} className="group relative p-7 rounded-2xl border border-border bg-card hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-temple animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="h-14 w-14 grid place-items-center rounded-2xl bg-gradient-gold text-gold-foreground shadow-gold mb-5 group-hover:scale-110 transition-transform">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif-display text-2xl font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMPLES */}
      <section className="container-prose py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Sacred destinations</p>
            <h2 className="font-serif-display text-4xl md:text-5xl font-semibold mt-3">Featured temples</h2>
            <p className="text-muted-foreground mt-3 max-w-xl">Hand-picked shrines we serve with on-ground teams and trusted local partners.</p>
          </div>
          <Button asChild variant="outlineGold"><Link to="/temples">View all temples <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((t) => <TempleCard key={t.slug} temple={t} />)}
        </div>
      </section>

      {/* WHY US */}
      <section className="container-prose py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <div className="absolute -inset-3 bg-gradient-saffron rounded-3xl opacity-15 blur-2xl" />
          <img src={puja} alt="Priest performing puja with diya and marigolds" loading="lazy" width={1280} height={896} className="relative rounded-3xl shadow-temple object-cover aspect-[4/5]" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Why Vandan Darshan</p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-semibold mt-3">A trusted hand on every step of your yatra</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">We were founded by devotees, for devotees. Every booking is a prayer for us — handled with the seriousness it deserves.</p>
          <ul className="mt-8 space-y-5">
            {[
              { i: Users, t: "10,000+ devotees served", d: "Families, seniors and first-time pilgrims trust us across India." },
              { i: ShieldCheck, t: "Verified local partners", d: "Vetted on-ground teams ensure a safe, authentic experience." },
              { i: Sparkles, t: "Personalised coordination", d: "Every itinerary is tailored to your time, age and needs." },
              { i: Star, t: "Devotee-first promise", d: "Transparent pricing, real-time updates, no hidden surprises." },
            ].map((b) => (
              <li key={b.t} className="flex gap-4">
                <div className="shrink-0 h-11 w-11 grid place-items-center rounded-xl bg-gold-soft text-gold"><b.i className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-semibold text-lg">{b.t}</h3>
                  <p className="text-sm text-muted-foreground">{b.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/40 border-y border-border py-20">
        <div className="container-prose">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Devotee blessings</p>
            <h2 className="font-serif-display text-4xl md:text-5xl font-semibold mt-3">Words from our devotees</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { q: "Smooth and hassle-free VIP darshan at Tirupati. The team coordinated everything for my parents.", n: "Anjali Sharma", l: "Bengaluru" },
              { q: "Saved hours of waiting at Mahakaleshwar. Bhasma Aarti was a dream come true.", n: "Ramesh Patel", l: "Ahmedabad" },
              { q: "Truly divine experience. The puja was performed with full sankalp and we received the prasad too.", n: "Suman Iyer", l: "Mumbai" },
            ].map((t) => (
              <figure key={t.n} className="bg-card border border-border rounded-2xl p-7 shadow-soft relative">
                <div className="absolute -top-4 left-7 h-8 w-8 grid place-items-center rounded-full bg-gradient-gold text-gold-foreground text-xl font-serif-display">"</div>
                <blockquote className="text-foreground/85 italic leading-relaxed">{t.q}</blockquote>
                <figcaption className="mt-5 pt-5 border-t border-border">
                  <div className="font-semibold">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.l}</div>
                  <div className="flex gap-0.5 mt-1.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-prose py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">How it works</p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-semibold mt-3">Four steps to your blessings</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 mt-12 relative">
          {[
            { n: "01", t: "Choose a temple", d: "Pick from 50+ sacred temples we serve." },
            { n: "02", t: "Share details", d: "Tell us your dates, devotees and service." },
            { n: "03", t: "We coordinate", d: "Bookings, slots, on-ground support arranged." },
            { n: "04", t: "Receive blessings", d: "A peaceful, divine darshan experience." },
          ].map((p, i) => (
            <div key={p.n} className="relative p-7 rounded-2xl border border-border bg-card hover:shadow-temple transition-all">
              <div className="font-serif-display text-5xl text-gradient-gold font-semibold">{p.n}</div>
              <h3 className="font-semibold text-lg mt-3">{p.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.d}</p>
              {i < 3 && <ArrowRight className="hidden md:block absolute top-9 -right-5 h-5 w-5 text-gold/60" />}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-prose py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-divine p-10 md:p-16 text-primary-foreground">
          <div className="absolute inset-0 opacity-20">
            <img src={devotees} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-devanagari text-3xl text-gold-soft">श्री गणेशाय नमः</p>
              <h2 className="font-serif-display text-4xl md:text-5xl font-semibold mt-3 leading-tight">Begin your sacred journey today</h2>
              <p className="opacity-90 mt-4 text-lg">Limited VIP slots available across major temples. Book now to secure your darshan.</p>
            </div>
            <div className="flex md:justify-end gap-3">
              <Button asChild variant="gold" size="xl"><Link to="/book">Book Darshan Now <ArrowRight className="h-4 w-4" /></Link></Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
