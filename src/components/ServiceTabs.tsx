import { useSearchParams, Link } from "react-router-dom";
import { Eye, Flame, Gift, HandHeart, Check, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/BookingForm";
import type { Temple } from "@/data/temples";
import puja from "@/assets/puja-ritual.jpg";
import prasad from "@/assets/prasad.jpg";
import devotees from "@/assets/devotees.jpg";

type ServiceKey = "darshan" | "puja" | "prasad" | "chadhava";

const services: { key: ServiceKey; label: string; icon: typeof Eye; tagline: string }[] = [
  { key: "darshan", label: "Darshan", icon: Eye, tagline: "VIP & assisted darshan" },
  { key: "puja", label: "Puja", icon: Flame, tagline: "Sankalp puja in your name" },
  { key: "prasad", label: "Prasadam", icon: Gift, tagline: "Temple prasad delivered home" },
  { key: "chadhava", label: "Chadhava", icon: HandHeart, tagline: "Offerings on your behalf" },
];

const isServiceKey = (v: string | null): v is ServiceKey =>
  v === "darshan" || v === "puja" || v === "prasad" || v === "chadhava";

export const ServiceTabs = ({ temple }: { temple: Temple }) => {
  const [params, setParams] = useSearchParams();
  const raw = params.get("service");
  const active: ServiceKey = isServiceKey(raw) ? raw : "darshan";

  const setActive = (k: ServiceKey) => {
    const next = new URLSearchParams(params);
    next.set("service", k);
    setParams(next, { replace: false });
    // smooth scroll to section
    requestAnimationFrame(() => {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section id="services" className="scroll-mt-28">
      <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Services</p>
      <h2 className="font-serif-display text-3xl md:text-4xl font-semibold mt-2">
        Book any service at {temple.name}
      </h2>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        Choose the service you're seeking — Darshan, Puja, Prasadam or Chadhava. Every booking is handled end-to-end by our on-ground team.
      </p>

      {/* Tab nav */}
      <div role="tablist" aria-label="Temple services" className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-2 p-2 bg-muted/60 border border-border rounded-2xl">
        {services.map((s) => {
          const isActive = s.key === active;
          const Icon = s.icon;
          return (
            <button
              key={s.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(s.key)}
              className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all ${isActive
                  ? "bg-card shadow-temple border border-gold/40"
                  : "hover:bg-card/70 border border-transparent"
                }`}
            >
              <div className={`h-10 w-10 shrink-0 grid place-items-center rounded-lg transition-colors ${isActive ? "bg-gradient-gold text-gold-foreground" : "bg-gold-soft text-gold"
                }`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-semibold ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                  {s.label}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">{s.tagline}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      <div role="tabpanel" className="mt-8">
        {active === "darshan" && <DarshanPanel temple={temple} />}
        {active === "puja" && <PujaPanel temple={temple} />}
        {active === "prasad" && <PrasadPanel temple={temple} />}
        {active === "chadhava" && <ChadhavaPanel temple={temple} />}
      </div>
    </section>
  );
};

/* -------- Shared bits -------- */

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2.5 text-sm text-foreground/80">
    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" /> {children}
  </li>
);

const PriceCard = ({
  title,
  price,
  features,
  highlighted,
  badge,
}: {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}) => (
  <div className={`relative p-6 rounded-2xl border ${highlighted ? "border-gold ring-2 ring-gold/30 bg-gold-soft/30" : "border-border bg-card"
    }`}>
    {badge && (
      <span className="absolute -top-3 left-5 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-gradient-gold text-gold-foreground">
        {badge}
      </span>
    )}
    <h4 className="font-serif-display text-xl font-semibold">{title}</h4>
    <div className="mt-2 flex items-baseline gap-1">
      <span className="font-serif-display text-3xl font-semibold">{price}</span>
      <span className="text-xs text-muted-foreground">onwards</span>
    </div>
    <ul className="mt-4 space-y-2">
      {features.map((f) => <Bullet key={f}>{f}</Bullet>)}
    </ul>
  </div>
);

const InlineCTA = ({ temple, service, label }: { temple: Temple; service: string; label: string }) => (
  <div className="mt-8 flex flex-wrap items-center gap-3 p-5 rounded-2xl bg-gradient-divine border border-gold/40">
    <Sparkles className="h-5 w-5 text-gold" />
    <p className="text-sm flex-1 min-w-[200px]">
      Ready to book {label.toLowerCase()} at {temple.name}? Our team will call you within minutes.
    </p>
    <Button asChild variant="divine" size="lg">
      <Link to={`/book?temple=${temple.slug}&service=${service}`}>
        Request Callback <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  </div>
);

/* -------- Panels -------- */

const DarshanPanel = ({ temple }: { temple: Temple }) => (
  <div className="space-y-8">
    <div className="grid lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-3 space-y-5">
        <div>
          <h3 className="font-serif-display text-2xl font-semibold">Darshan at {temple.name}</h3>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Skip long queues and step calmly into the sanctum. Our on-ground team coordinates your entry, guides you through the rituals, and ensures a peaceful darshan of {temple.deity}.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-2">
          <Bullet>Fast-track VIP entry assistance</Bullet>
          <Bullet>Same-day & advance bookings</Bullet>
          <Bullet>Senior citizen & family support</Bullet>
          <Bullet>Aarti pass coordination</Bullet>
          <Bullet>Local pickup & guidance</Bullet>
          <Bullet>End-to-end on-ground help</Bullet>
        </ul>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-gold" /> Average darshan time with us: 15–30 minutes
        </div>
      </div>
      <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border">
        <img src={devotees} alt={`Devotees at ${temple.name}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-5">
      <PriceCard
        title="General Darshan"
        price="₹501"
        features={["Queue guidance", "Slot booking", "Local support"]}
      />
      <PriceCard
        title="Special Darshan"
        price="₹1,851"
        features={["Fast-track entry", "Dedicated assistant", "Aarti pass coordination", "Family-friendly"]}
        highlighted
        badge="Most Popular"
      />
      <PriceCard
        title="Festival Darshan"
        price="₹3,100"
        features={["Festival-day priority", "Advance reservation", "Special pooja access"]}
      />
    </div>

    <InlineCTA temple={temple} service="vip-darshan" label="Darshan" />
  </div>
);

const PujaPanel = ({ temple }: { temple: Temple }) => (
  <div className="space-y-8">
    <div className="grid lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border order-2 lg:order-1">
        <img src={puja} alt={`Puja ritual at ${temple.name}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      </div>
      <div className="lg:col-span-3 space-y-5 order-1 lg:order-2">
        <div>
          <h3 className="font-serif-display text-2xl font-semibold">Puja at {temple.name}</h3>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Sankalp puja, abhishek and hawan performed by temple priests in your name and gotra — even if you cannot travel. We share the sankalp video, photos and prasad after the ritual.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-2">
          <Bullet>Performed by temple-affiliated priests</Bullet>
          <Bullet>Sankalp in your name & gotra</Bullet>
          <Bullet>Live video / recorded sankalp</Bullet>
          <Bullet>Prasad & tirth jal couriered home</Bullet>
          <Bullet>Hindi / English coordination</Bullet>
          <Bullet>Family pujas welcome</Bullet>
        </ul>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-5">
      <PriceCard
        title="Sankalp Puja"
        price="₹1,100"
        features={["Sankalp in your name", "Priest dakshina", "Prasad delivery"]}
      />
      <PriceCard
        title="Abhishek & Archana"
        price="₹2,500"
        features={["Full abhishek ritual", "Sankalp video", "Prasad + tirth jal"]}
        highlighted
        badge="Recommended"
      />
      <PriceCard
        title="Hawan / Special Puja"
        price="₹5,100"
        features={["Hawan with samagri", "Multiple priests", "Photo & video proof", "Prasad hamper"]}
      />
    </div>

    <InlineCTA temple={temple} service="puja" label="Puja" />
  </div>
);

const PrasadPanel = ({ temple }: { temple: Temple }) => (
  <div className="space-y-8">
    <div className="grid lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-3 space-y-5">
        <div>
          <h3 className="font-serif-display text-2xl font-semibold">Prasadam from {temple.name}</h3>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Authentic, blessed prasad packed straight from the temple and delivered to your doorstep — anywhere in India. A sacred touch of {temple.deity} in your home.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-2">
          <Bullet>Sourced directly from temple</Bullet>
          <Bullet>Hygienically packed & sealed</Bullet>
          <Bullet>Pan-India courier delivery</Bullet>
          <Bullet>Tirth jal & sindoor included</Bullet>
          <Bullet>Festival special prasad available</Bullet>
          <Bullet>Gift-ready hampers</Bullet>
        </ul>
      </div>
      <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border">
        <img src={prasad} alt={`Prasadam from ${temple.name}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-5">
      <PriceCard
        title="Standard Prasad"
        price="₹351"
        features={["Sealed prasad pack", "Tirth jal", "Courier in 5–7 days"]}
      />
      <PriceCard
        title="Family Hamper"
        price="₹751"
        features={["Larger prasad portion", "Sindoor & roli", "Priority courier"]}
        highlighted
        badge="Best Value"
      />
      <PriceCard
        title="Festival Special"
        price="₹1,251"
        features={["Festival-day prasad", "Special sweets", "Gift packaging", "Greeting card"]}
      />
    </div>

    <InlineCTA temple={temple} service="prasad" label="Prasad" />
  </div>
);

const ChadhavaPanel = ({ temple }: { temple: Temple }) => (
  <div className="space-y-8">
    <div className="grid lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border order-2 lg:order-1">
        <img src={puja} alt={`Chadhava offering at ${temple.name}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      </div>
      <div className="lg:col-span-3 space-y-5 order-1 lg:order-2">
        <div>
          <h3 className="font-serif-display text-2xl font-semibold">Chadhava at {temple.name}</h3>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Offer chadhava — chunari, flowers, sweets, shringar or vastra — to {temple.deity} in your name. Our team performs the offering at the sanctum and shares photo + video proof.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-2">
          <Bullet>Chunari, flowers, sweets, shringar</Bullet>
          <Bullet>Sankalp taken in your name</Bullet>
          <Bullet>Photo & video proof shared</Bullet>
          <Bullet>Prasad returned to your home</Bullet>
          <Bullet>Festival & special-day slots</Bullet>
          <Bullet>Custom offerings on request</Bullet>
        </ul>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-5">
      <PriceCard
        title="Flower & Sweets"
        price="₹551"
        features={["Fresh flower mala", "Sweets offering", "Photo proof"]}
      />
      <PriceCard
        title="Chunari & Shringar"
        price="₹1,251"
        features={["Chunari / vastra", "Shringar samagri", "Photo + video proof", "Prasad return"]}
        highlighted
        badge="Devotee Favourite"
      />
      <PriceCard
        title="Grand Offering"
        price="₹2,500"
        features={["Premium shringar set", "Full chadhava ritual", "Video sankalp", "Prasad hamper"]}
      />
    </div>

    <InlineCTA temple={temple} service="chadhava" label="Chadhava" />
  </div>
);
