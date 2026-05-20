import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { temples, allTemplesMerged } from "@/data/temples";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  defaultTemple?: string;
  defaultService?: string;
  compact?: boolean;
}

export const BookingForm = ({ defaultTemple, defaultService, compact }: Props) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    temple: defaultTemple || "",
    service: defaultService || "",
    date: "",
    devotees: "1",
    notes: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save to CRM leads
      const templeData = allTemplesMerged.find(t => t.slug === form.temple);
      
      if (auth && auth.addLead) {
        auth.addLead({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          temple: templeData?.name || form.temple,
          date: form.date,
          devotees: parseInt(form.devotees) || 1,
          notes: form.notes,
          status: "new",
          comments: "",
        });
      }

      // Frontend-only — store in sessionStorage for the thank-you page
      sessionStorage.setItem("vd_last_booking", JSON.stringify(form));
      setTimeout(() => navigate("/thank-you"), 400);
    } catch (err) {
      console.error("Booking submission error:", err);
      setSubmitting(false);
    }
  };

  const labelClasses = cn(compact ? "text-[10px] uppercase tracking-wider mb-1 block" : "text-sm font-semibold mb-2 block");
  const inputClasses = cn(compact ? "h-10 text-sm" : "h-12");

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-y-3 gap-x-4", compact ? "grid-cols-2 gap-y-2" : "md:grid-cols-2")}>
      <div className="col-span-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-gold font-black mb-1">
        <Sparkles className="h-3 w-3" /> Sacred Service Booking
      </div>
      
      <div className={compact ? "col-span-1" : ""}>
        <Label htmlFor="name" className={labelClasses}>Full name *</Label>
        <Input id="name" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" className={inputClasses} />
      </div>
      
      <div className={compact ? "col-span-1" : ""}>
        <Label htmlFor="phone" className={labelClasses}>Phone (WhatsApp) *</Label>
        <Input id="phone" type="tel" required pattern="[0-9+\s-]{7,}" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputClasses} />
      </div>
      
      <div className={compact ? "col-span-1" : ""}>
        <Label htmlFor="email" className={labelClasses}>Email</Label>
        <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" className={inputClasses} />
      </div>
      
      <div className={compact ? "col-span-1" : ""}>
        <Label className={labelClasses}>Temple *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(inputClasses, "w-full justify-between font-normal", !form.temple && "text-muted-foreground")}
            >
              <span className="truncate">
                {form.temple
                  ? allTemplesMerged.find((t) => t.slug === form.temple)?.name
                  : "Choose temple"}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-[1001]" align="start">
            <Command>
              <CommandInput placeholder="Search temple..." />
              <CommandList>
                <CommandEmpty>No temple found.</CommandEmpty>
                <CommandGroup>
                  {allTemplesMerged.map((t) => (
                    <CommandItem
                      key={t.slug}
                      value={t.name}
                      onSelect={() => set("temple", t.slug)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          form.temple === t.slug ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {t.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className={compact ? "col-span-1" : ""}>
        <Label className={labelClasses}>Service *</Label>
        <Select value={form.service} onValueChange={(v) => set("service", v)} required>
          <SelectTrigger className={inputClasses}><SelectValue placeholder="Choose service" /></SelectTrigger>
          <SelectContent className="z-[1001]">
            <SelectItem value="special-darshan">Special Darshan</SelectItem>
            <SelectItem value="general-darshan">General Darshan</SelectItem>
            <SelectItem value="puja">Puja Booking</SelectItem>
            <SelectItem value="prasad">Prasad Delivery</SelectItem>
            <SelectItem value="chadhava">Chadhava / Offering</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className={compact ? "col-span-1" : ""}>
        <Label htmlFor="date" className={labelClasses}>Date</Label>
        <Input id="date" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputClasses} />
      </div>
      
      <div className="col-span-2">
        <Label htmlFor="notes" className={labelClasses}>Special Requests</Label>
        <Textarea 
          id="notes" 
          value={form.notes} 
          onChange={(e) => set("notes", e.target.value)} 
          placeholder="Senior citizens, specific rituals, etc." 
          rows={compact ? 1 : 3} 
          className={cn("text-sm transition-all focus:min-h-[100px]", compact ? "min-h-[45px]" : "")} 
        />
      </div>
      
      <div className="col-span-2 flex items-center gap-3 py-1">
        <input type="checkbox" id="tnc-checkbox" required className="h-3 w-3 rounded border-border text-primary focus:ring-primary cursor-pointer" />
        <label htmlFor="tnc-checkbox" className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold cursor-pointer hover:text-secondary transition-colors">
          I agree to the <Link to="/terms" target="_blank" className="text-primary hover:underline">Terms & Conditions</Link> *
        </label>
      </div>
      
      <div className="col-span-2 pt-1">
        <Button type="submit" variant="divine" size={compact ? "sm" : "lg"} disabled={submitting} className={cn("w-full h-14 text-sm uppercase tracking-[0.2em] font-black shadow-gold", compact && "h-11")}>
          {submitting ? "Submitting..." : "Book Sacred Service"}
        </Button>
        <p className="text-[8px] text-center text-muted-foreground mt-2 uppercase tracking-[0.2em] font-bold">
          Trusted by 10,000+ Devotees • TnC Applied
        </p>
      </div>
    </form>
  );
};
