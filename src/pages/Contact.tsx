import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { BookingForm } from "@/components/BookingForm";

const Contact = () => (
  <>
    <SEO
      title="Contact Vandan Darshan — Get in touch with our team"
      description="Reach Vandan Darshan for VIP darshan bookings, puja, prasad and yatra assistance. Call, email or request a callback — we respond within 30 minutes."
    />

    <section className="container-prose py-16 text-center">
      <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Get in touch</p>
      <h1 className="font-serif-display text-5xl md:text-6xl font-semibold mt-3">We are here for you</h1>
      <p className="text-muted-foreground mt-5 max-w-2xl mx-auto">Reach out for darshan bookings, puja arrangements, prasad delivery or any spiritual guidance. Our team responds within 30 minutes.</p>
    </section>

    <section className="container-prose pb-24 grid lg:grid-cols-3 gap-8">
      <div className="space-y-4">
        {[
          { i: Phone, t: "Call us", v: "+91 99999 99999", h: "Mon–Sun, 8am – 9pm IST" },
          { i: MessageCircle, t: "WhatsApp", v: "+91 99999 99999", h: "Quick replies, 24×7" },
          { i: Mail, t: "Email", v: "care@vandandarshan.com", h: "We reply within 4 hours" },
          { i: MapPin, t: "Office", v: "Vandan Darshan Pvt. Ltd.", h: "India" },
        ].map((c) => (
          <div key={c.t} className="p-6 rounded-2xl border border-border bg-card flex items-start gap-4">
            <div className="h-11 w-11 grid place-items-center rounded-xl bg-gold-soft text-gold shrink-0"><c.i className="h-5 w-5" /></div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.t}</div>
              <div className="font-semibold mt-0.5">{c.v}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{c.h}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-2 p-8 rounded-2xl border border-border bg-card shadow-soft">
        <h2 className="font-serif-display text-3xl font-semibold">Request a callback</h2>
        <p className="text-sm text-muted-foreground mt-1">Share your details — our team will reach out shortly.</p>
        <div className="mt-6"><BookingForm /></div>
      </div>
    </section>
  </>
);

export default Contact;
