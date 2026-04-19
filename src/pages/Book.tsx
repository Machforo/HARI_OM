import { SEO } from "@/components/SEO";
import { BookingForm } from "@/components/BookingForm";

const Book = () => (
  <>
    <SEO
      title="Book Darshan, Puja or Prasad — Vandan Darshan"
      description="Book VIP darshan, puja, prasad delivery or chadhava across India. Share your details — Vandan Darshan team responds within 30 minutes."
    />
    <section className="container-prose py-16 text-center">
      <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Begin your journey</p>
      <h1 className="font-serif-display text-5xl md:text-6xl font-semibold mt-3">Book your darshan</h1>
      <p className="font-devanagari text-xl text-gold mt-2">अपने दर्शन की बुकिंग करें</p>
      <p className="text-muted-foreground mt-5 max-w-2xl mx-auto">Tell us your temple, service and preferred date. Our team will call you within 30 minutes to confirm and guide you.</p>
    </section>

    <section className="container-prose pb-24">
      <div className="max-w-3xl mx-auto p-8 md:p-10 rounded-3xl border border-border bg-card shadow-temple">
        <BookingForm />
      </div>
    </section>
  </>
);

export default Book;
