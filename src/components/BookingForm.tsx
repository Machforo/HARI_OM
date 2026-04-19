import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { temples } from "@/data/temples";
import { Sparkles } from "lucide-react";

interface Props {
  defaultTemple?: string;
  compact?: boolean;
}

export const BookingForm = ({ defaultTemple, compact }: Props) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    temple: defaultTemple || "",
    service: "",
    date: "",
    devotees: "1",
    notes: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Frontend-only — store in sessionStorage for the thank-you page
    sessionStorage.setItem("vd_last_booking", JSON.stringify(form));
    setTimeout(() => navigate("/thank-you"), 400);
  };

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
      <div className="md:col-span-2 flex items-center gap-2 text-xs uppercase tracking-wider text-gold font-semibold">
        <Sparkles className="h-3.5 w-3.5" /> Share your details — our team will call you shortly
      </div>
      <div>
        <Label htmlFor="name">Full name *</Label>
        <Input id="name" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
      </div>
      <div>
        <Label htmlFor="phone">Phone (WhatsApp) *</Label>
        <Input id="phone" type="tel" required pattern="[0-9+\s-]{7,}" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
      </div>
      <div>
        <Label>Temple *</Label>
        <Select value={form.temple} onValueChange={(v) => set("temple", v)} required>
          <SelectTrigger><SelectValue placeholder="Choose a temple" /></SelectTrigger>
          <SelectContent>
            {temples.map((t) => (
              <SelectItem key={t.slug} value={t.slug}>{t.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Service *</Label>
        <Select value={form.service} onValueChange={(v) => set("service", v)} required>
          <SelectTrigger><SelectValue placeholder="Choose a service" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="vip-darshan">VIP Darshan</SelectItem>
            <SelectItem value="general-darshan">General Darshan Assistance</SelectItem>
            <SelectItem value="puja">Puja Booking</SelectItem>
            <SelectItem value="prasad">Prasad Delivery</SelectItem>
            <SelectItem value="chadhava">Chadhava / Offering</SelectItem>
            <SelectItem value="full-yatra">Full Yatra Package</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="date">Preferred date</Label>
        <Input id="date" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
      </div>
      <div>
        <Label htmlFor="devotees">No. of devotees</Label>
        <Input id="devotees" type="number" min={1} max={50} value={form.devotees} onChange={(e) => set("devotees", e.target.value)} />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="notes">Notes / special requests</Label>
        <Textarea id="notes" value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Senior citizens, accessibility needs, festival preference, etc." rows={3} />
      </div>
      <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <p className="text-xs text-muted-foreground">By submitting you agree to our <a href="/terms" className="underline hover:text-primary">Terms</a> & <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.</p>
        <Button type="submit" variant="divine" size="lg" disabled={submitting} className="min-w-48">
          {submitting ? "Submitting..." : "Request Callback"}
        </Button>
      </div>
    </form>
  );
};
