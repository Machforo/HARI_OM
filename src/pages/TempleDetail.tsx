import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calendar, Check, Clock, MapPin, Plane, Train, Car, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { BookingForm } from "@/components/BookingForm";
import { ServiceTabs } from "@/components/ServiceTabs";
import { getTemple, temples } from "@/data/temples";

const TempleDetail = () => {
  const { slug } = useParams();
  const temple = getTemple(slug || "");

  if (!temple) {
    return (
      <div className="container-prose py-32 text-center">
        <h1 className="font-serif-display text-4xl">Temple not found</h1>
        <Button asChild className="mt-6"><Link to="/temples">View all temples</Link></Button>
      </div>
    );
  }

  const aartiSchedule = [
    { name: "Mangla Aarti", time: "6:30 AM" },
    { name: "Morning Darshan", time: "7:00 AM – 1:00 PM" },
    { name: "Temple Closed", time: "1:00 PM – 5:00 PM" },
    { name: "Evening Darshan", time: "5:00 PM – 9:30 PM" },
    { name: "Shayan Aarti", time: "9:00 PM" },
  ];

  const faqs = [
    { q: `How can I book VIP darshan at ${temple.name}?`, a: "You can book VIP darshan through Vandan Darshan by selecting your preferred date and time. Advance booking is recommended, especially during festivals and weekends." },
    { q: "Is same-day darshan possible?", a: "Yes, same-day darshan may be available depending on slot availability. Call our team for live availability." },
    { q: "How much time does darshan take?", a: "General darshan typically takes 1–3 hours during normal days. VIP darshan with our assistance is usually 15–30 minutes." },
    { q: "What is the best time for darshan?", a: "Early morning (after Mangla Aarti) or late evening offers a peaceful, less crowded experience." },
    { q: `क्या ${temple.name} में VIP दर्शन संभव है?`, a: "हाँ, VIP दर्शन उपलब्ध है। हमारी टीम आपकी मदद करेगी ताकि आप लंबी कतारों से बच सकें।" },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: temple.name,
      description: temple.tagline,
      address: { "@type": "PostalAddress", addressLocality: temple.location, addressRegion: temple.state, addressCountry: "IN" },
      image: temple.image,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Temples", item: "/temples" },
        { "@type": "ListItem", position: 3, name: temple.name },
      ],
    },
  ];

  return (
    <>
      <SEO
        title={`${temple.name} Darshan – VIP Booking, Timings & Guide (2026)`}
        description={`Book ${temple.name} VIP darshan, puja & prasad with Vandan Darshan. Timings, aarti schedule, complete guide. Skip queues — trusted devotee assistance.`}
        image={temple.image}
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={temple.image} alt={`${temple.name}, ${temple.location}`} width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/55 to-foreground/30" />
        </div>
        <div className="container-prose relative pt-24 pb-32 text-background">
          <nav className="text-xs opacity-80 mb-6">
            <Link to="/" className="hover:underline">Home</Link> / <Link to="/temples" className="hover:underline">Temples</Link> / <span>{temple.name}</span>
          </nav>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" /> {temple.location}, {temple.state}
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl font-semibold mt-3 max-w-3xl leading-tight">
            {temple.name} Darshan — VIP Booking, Timings & Complete Guide (2026)
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mt-5">
            Experience divine blessings at the sacred {temple.name}, dedicated to {temple.deity}. Whether you're planning a VIP Darshan, seeking quick entry, or a hassle-free spiritual journey — this guide covers it all.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild variant="divine" size="xl"><a href="#book">Book Now <ArrowRight className="h-4 w-4" /></a></Button>
            <Button asChild variant="outline" size="xl" className="bg-background/10 border-background/40 text-background hover:bg-background hover:text-foreground"><a href="#timings">View Timings</a></Button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 text-sm">
            {["VIP Darshan Available", "Same-day Booking", "Trusted Across India"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-gold" /> {b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="container-prose -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 bg-card border border-border rounded-2xl p-6 shadow-temple">
          {[
            { l: "Location", v: `${temple.location}, ${temple.state}`, i: MapPin },
            { l: "Deity", v: temple.deity, i: Star },
            { l: "VIP Darshan", v: "Available", i: Check },
            { l: "Best Time", v: temple.bestTime, i: Calendar },
            { l: "Timings", v: "Morning & Evening", i: Clock },
            { l: "Peak Days", v: "Festivals", i: Star },
            { l: "Support", v: "24×7 Help", i: Check },
          ].map((q) => (
            <div key={q.l} className="flex items-start gap-2.5">
              <div className="h-9 w-9 shrink-0 grid place-items-center rounded-lg bg-gold-soft text-gold"><q.i className="h-4 w-4" /></div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{q.l}</div>
                <div className="text-sm font-medium truncate">{q.v}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN GRID */}
      <div className="container-prose grid lg:grid-cols-3 gap-12 py-20">
        <article className="lg:col-span-2 space-y-16">
          {/* About */}
          <section>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">About</p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-semibold mt-2">About {temple.name}</h2>
            <div className="divider-om"><span>॥ ॐ ॥</span></div>
            <p className="text-muted-foreground leading-relaxed">
              The {temple.name} is one of the most sacred pilgrimage destinations in India, dedicated to {temple.deity}. Every year, lakhs of pilgrims visit to seek blessings, experience divine energy, and immerse themselves in the spiritual legacy of this revered shrine.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              ✨ A visit to {temple.name} is not just a journey — it's a deeply spiritual experience that connects you with centuries of devotion.
            </p>
          </section>

          {/* Timings */}
          <section id="timings">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Schedule</p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-semibold mt-2">Darshan Timings & Aarti Schedule</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-left">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-5 py-3 text-sm font-semibold">Darshan / Aarti</th>
                    <th className="px-5 py-3 text-sm font-semibold">Timing</th>
                  </tr>
                </thead>
                <tbody>
                  {aartiSchedule.map((row, i) => (
                    <tr key={row.name} className={i % 2 ? "bg-card" : "bg-background"}>
                      <td className="px-5 py-4 font-medium">{row.name}</td>
                      <td className="px-5 py-4 text-muted-foreground">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">👉 Best time for darshan: early morning or late evening to avoid heavy crowds.</p>
          </section>

          {/* Darshan types */}
          <section>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Choose your darshan</p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-semibold mt-2">Darshan Types & Options</h2>
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              {[
                { t: "General Darshan", d: "Open for all devotees. Waiting time: 1–3 hours (longer on peak days).", c: "border-border" },
                { t: "VIP Darshan", d: "Faster entry, minimal waiting, dedicated assistance. Ideal for families and seniors.", c: "border-gold ring-2 ring-gold/30 bg-gold-soft/30", badge: "Recommended" },
                { t: "Festival Darshan", d: "Available during major festivals. Requires advance booking.", c: "border-border" },
              ].map((d) => (
                <div key={d.t} className={`p-6 rounded-2xl border ${d.c} relative`}>
                  {d.badge && <span className="absolute -top-3 left-5 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-gradient-gold text-gold-foreground">{d.badge}</span>}
                  <h3 className="font-serif-display text-xl font-semibold">{d.t}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{d.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Puja & Prasad */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-border bg-card">
              <img src={puja} alt="Puja ritual at temple" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <h3 className="font-serif-display text-2xl font-semibold">Puja at {temple.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">Sankalp puja, abhishek, hawan and special pujas can be arranged in your name — with priest coordination, sankalp video and prasad.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border bg-card">
              <img src={prasad} alt="Temple prasadam" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <h3 className="font-serif-display text-2xl font-semibold">Prasadam delivered</h3>
                <p className="text-sm text-muted-foreground mt-2">Authentic temple prasad delivered to your home with care, anywhere in India. A sacred touch of {temple.name} at your doorstep.</p>
              </div>
            </div>
          </section>

          {/* Why us comparison */}
          <section>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">The Vandan way</p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-semibold mt-2">Direct visit vs assisted darshan</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-left">
                <thead className="bg-muted text-sm">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Factor</th>
                    <th className="px-5 py-3 font-semibold">Direct Visit</th>
                    <th className="px-5 py-3 font-semibold text-primary">With Vandan Darshan</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ["Waiting Time", "Long", "Minimal"],
                    ["Guidance", "None", "Complete Support"],
                    ["Convenience", "Low", "High"],
                    ["Experience", "Uncertain", "Smooth & Peaceful"],
                  ].map((r, i) => (
                    <tr key={r[0]} className={i % 2 ? "bg-card" : "bg-background"}>
                      <td className="px-5 py-3.5 font-medium">{r[0]}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{r[1]}</td>
                      <td className="px-5 py-3.5 text-primary font-medium">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* How to reach */}
          <section>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Travel</p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-semibold mt-2">How to reach {temple.name}</h2>
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              {[
                { i: Plane, t: "By Air", d: `Nearest airport with regular connectivity to ${temple.location}.` },
                { i: Train, t: "By Train", d: `${temple.location} is well-connected to major cities by rail.` },
                { i: Car, t: "By Road", d: `Good road network. Cabs and buses available from nearby hubs.` },
              ].map((x) => (
                <div key={x.t} className="p-6 rounded-2xl border border-border bg-card">
                  <div className="h-10 w-10 grid place-items-center rounded-xl bg-gold-soft text-gold mb-3"><x.i className="h-5 w-5" /></div>
                  <h3 className="font-semibold">{x.t}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Guidelines */}
          <section>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Important</p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-semibold mt-2">Guidelines for devotees</h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                "Wear modest, traditional attire",
                "Follow temple rules & priest instructions",
                "Mobile phones may be restricted inside",
                "Arrive early during peak days",
                "Carry a valid ID for bookings",
                "Respect the sanctity of the shrine",
              ].map((g) => (
                <li key={g} className="flex items-start gap-2.5 text-sm text-foreground/80"><Check className="h-4 w-4 text-gold mt-0.5 shrink-0" /> {g}</li>
              ))}
            </ul>
          </section>

          {/* FAQs */}
          <section>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">FAQs</p>
            <h2 className="font-serif-display text-3xl md:text-4xl font-semibold mt-2">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-6">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`} className="border-border">
                  <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 self-start" id="book">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-temple">
            <h3 className="font-serif-display text-2xl font-semibold">Book {temple.name} darshan</h3>
            <p className="text-sm text-muted-foreground mt-1">Limited VIP slots — request a callback now.</p>
            <div className="mt-5"><BookingForm defaultTemple={temple.slug} compact /></div>
          </div>

          <div className="mt-6 p-6 rounded-2xl border border-gold/40 bg-gold-soft/40">
            <p className="font-devanagari text-2xl text-gold leading-tight">"दर्शन से जीवन धन्य होता है"</p>
            <p className="text-sm text-foreground/75 mt-3 italic">"From entering this sacred place to standing before the deity — it's a moment that stays with you forever. With our assistance, the journey becomes peaceful and divine."</p>
            <p className="text-xs text-muted-foreground mt-3">— A real devotee</p>
          </div>
        </aside>
      </div>

      {/* Other temples */}
      <section className="container-prose pb-24">
        <h2 className="font-serif-display text-3xl font-semibold mb-8">Other sacred temples</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {temples.filter((t) => t.slug !== temple.slug).slice(0, 3).map((t) => (
            <Link key={t.slug} to={`/temples/${t.slug}`} className="card-temple group block">
              <div className="aspect-video overflow-hidden">
                <img src={t.image} alt={t.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <h3 className="font-serif-display text-xl font-semibold">{t.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t.location}, {t.state}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default TempleDetail;
