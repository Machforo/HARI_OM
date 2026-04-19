import { useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import { TempleCard } from "@/components/TempleCard";
import { Input } from "@/components/ui/input";
import { temples } from "@/data/temples";
import { Search } from "lucide-react";

const Temples = () => {
  const [q, setQ] = useState("");
  const [state, setState] = useState<string>("All");

  const states = useMemo(() => ["All", ...Array.from(new Set(temples.map((t) => t.state)))], []);
  const filtered = useMemo(
    () => temples.filter((t) =>
      (state === "All" || t.state === state) &&
      (t.name.toLowerCase().includes(q.toLowerCase()) ||
        t.location.toLowerCase().includes(q.toLowerCase()) ||
        t.deity.toLowerCase().includes(q.toLowerCase()))
    ),
    [q, state]
  );

  return (
    <>
      <SEO
        title="All Temples — Book Darshan, Puja & Prasad | Vandan Darshan"
        description="Browse 50+ sacred Indian temples we serve. VIP darshan, puja booking, prasad and chadhava — choose your temple and request a callback."
      />
      <section className="container-prose py-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Sacred destinations</p>
        <h1 className="font-serif-display text-5xl md:text-6xl font-semibold mt-3">Find your temple</h1>
        <p className="font-devanagari text-xl text-gold mt-2">अपना मंदिर चुनें</p>
        <p className="text-muted-foreground mt-5 max-w-2xl mx-auto">Search across India's most revered shrines. Pick a temple to view details and book VIP darshan, puja, or prasad.</p>

        <div className="mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by temple, deity or city..." className="pl-10 h-12" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {states.map((s) => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={`px-4 h-12 rounded-lg whitespace-nowrap text-sm font-medium border transition ${
                  state === s ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground/80 border-border hover:border-gold"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose pb-24">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No temples match your search.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => <TempleCard key={t.slug} temple={t} />)}
          </div>
        )}
      </section>
    </>
  );
};

export default Temples;
