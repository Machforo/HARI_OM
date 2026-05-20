import { Link } from "react-router-dom";
import { Check, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import logo from "@/assets/logo-final.png";

const ThankYou = () => (
  <>
    <SEO title="Thank you — We will call you shortly | Vandan Darshan" description="Your booking request is received. Vandan Darshan team will call you shortly." />
    <section className="container-prose py-24 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="relative mx-auto h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-gradient-gold animate-float-slow opacity-30 blur-xl" />
          <div className="relative h-24 w-24 mx-auto grid place-items-center rounded-full bg-gradient-gold shadow-gold">
            <Check className="h-12 w-12 text-gold-foreground" strokeWidth={3} />
          </div>
        </div>
        <p className="font-devanagari text-3xl text-gold mt-8">॥ धन्यवाद ॥</p>
        <h1 className="font-serif-display text-5xl md:text-6xl font-semibold mt-3">Thank you for your blessing.</h1>
        <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
          Your request has been received. Our team will call you within <b>30 minutes</b> to confirm the details and guide you through the next steps.
        </p>
        <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gold-soft border border-gold/30">
          <Phone className="h-4 w-4 text-gold" />
          <span className="text-sm font-medium">Expect a call from <span className="text-primary">+91 89609 65151</span> within 30 minutes</span>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 text-sm">
          {[
            { n: "1", t: "We review", d: "Our coordinator reviews your request." },
            { n: "2", t: "We call", d: "You receive a call within 30 minutes." },
            { n: "3", t: "We confirm", d: "Slot, payment and travel arranged." },
          ].map((s) => (
            <div key={s.n} className="p-5 rounded-2xl border border-border bg-card text-left">
              <div className="font-serif-display text-3xl text-gradient-gold font-semibold">{s.n}</div>
              <div className="font-semibold mt-1">{s.t}</div>
              <p className="text-muted-foreground text-xs mt-1">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="divine" size="lg" className="px-10 h-14 rounded-full font-black uppercase tracking-widest text-[10px]">
            <Link to="/book">Add Another Service <ArrowRight className="h-4 w-4 ml-2" /></Link>
          </Button>
          <Button asChild variant="outlineGold" size="lg" className="px-10 h-14 rounded-full font-black uppercase tracking-widest text-[10px]">
            <Link to="/temples">Explore Temples</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-10 h-14 rounded-full font-black uppercase tracking-widest text-[10px]">
            <Link to="/">Home</Link>
          </Button>
        </div>

        <img src={logo} alt="" className="mx-auto h-14 w-14 object-contain mt-16 opacity-60" />
        <p className="font-devanagari text-gold mt-2">॥ सर्वे भवन्तु सुखिनः ॥</p>
      </div>
    </section>
  </>
);

export default ThankYou;
