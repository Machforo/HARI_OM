import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { temples, allTemplesMerged } from "@/data/temples";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Check, ChevronsUpDown, X, ArrowLeft, ArrowRight, Star, Heart, Flame, Compass, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTemple?: string;
  defaultService?: string;
}

const serviceTypes = {
  "special-darshan": { title: "Special Darshan Assistance", icon: Sparkles },
  "puja": { title: "Pooja & Rituals", icon: Flame },
  "prasad": { title: "Prasad Delivery", icon: Gift },
  "chadhava": { title: "Chadhava & Offerings", icon: Heart },
  "yatra": { title: "Yatra & Pilgrimage Packages", icon: Compass }
};

export const BookingModal = ({ isOpen, onClose, defaultTemple, defaultService }: BookingModalProps) => {
  const auth = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Map defaultTemple to slug if it's a display title
  const getInitialTempleSlug = () => {
    if (!defaultTemple) return "";
    const matched = allTemplesMerged.find(
      t => t.name.toLowerCase().includes(defaultTemple.toLowerCase()) || 
           defaultTemple.toLowerCase().includes(t.name.toLowerCase()) ||
           t.slug === defaultTemple.toLowerCase()
    );
    return matched ? matched.slug : defaultTemple.toLowerCase().replace(/ /g, "-");
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    temple: getInitialTempleSlug(),
    service: defaultService || "",
    date: "",
    devotees: "1",
    gotra: "",
    notes: "",
    tnc: false
  });

  // Sync state if props change when opening the modal
  useEffect(() => {
    if (isOpen) {
      setForm(prev => ({
        ...prev,
        temple: getInitialTempleSlug(),
        service: defaultService || "",
        tnc: false
      }));
      setStep(1);
      setIsSuccess(false);
    }
  }, [isOpen, defaultTemple, defaultService]);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const nextStep = () => {
    if (step === 1) {
      if (!form.name || !form.phone) return;
    }
    if (step === 2) {
      if (!form.temple || !form.service) return;
    }
    setStep(s => s + 1);
  };

  const prevStep = () => {
    setStep(s => s - 1);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tnc) return;
    setSubmitting(true);

    try {
      const templeData = allTemplesMerged.find(t => t.slug === form.temple);
      const serviceDisplay = serviceTypes[form.service as keyof typeof serviceTypes]?.title || form.service;

      if (auth && auth.addLead) {
        auth.addLead({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: serviceDisplay,
          temple: templeData?.name || form.temple,
          date: form.date,
          devotees: parseInt(form.devotees) || 1,
          notes: `${form.gotra ? `Gotra: ${form.gotra} | ` : ""}${form.notes}`,
          status: "new",
          comments: "",
        });
      }

      // Store in session storage for compatibility
      sessionStorage.setItem("vd_last_booking", JSON.stringify(form));
      
      setTimeout(() => {
        setSubmitting(false);
        setIsSuccess(true);
      }, 800);
    } catch (err) {
      console.error("Booking error:", err);
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentTempleDetails = allTemplesMerged.find(t => t.slug === form.temple);
  const selectedServiceObj = serviceTypes[form.service as keyof typeof serviceTypes];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative overflow-hidden border border-border/40 z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 md:p-8 bg-gradient-cream border-b border-border/40 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-serif-display text-xl font-bold text-secondary leading-tight">Sacred Request</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-0.5">॥ श्रद्धावाँल्लभते ज्ञानं ॥</p>
              </div>
            </div>
            
            <button 
              onClick={onClose} 
              className="h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-secondary transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form / Success Container */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1">
            {!isSuccess ? (
              <form onSubmit={onSubmit} className="space-y-6">
                
                {/* Progress Indicators */}
                <div className="flex items-center justify-between px-4 pb-4 border-b border-border/40 shrink-0">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors",
                        step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      )}>
                        {s}
                      </div>
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-wider hidden sm:inline",
                        step >= s ? "text-secondary" : "text-muted-foreground"
                      )}>
                        {s === 1 ? "Devotee" : s === 2 ? "Ritual" : "Sankalp"}
                      </span>
                      {s < 3 && <div className="h-0.5 w-6 sm:w-12 bg-border" />}
                    </div>
                  ))}
                </div>

                {/* STEP 1: Devotee & Contact Information */}
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Step 1 of 3</span>
                      <h4 className="font-serif-display text-2xl font-bold text-secondary mt-1">Devotee Information</h4>
                      <p className="text-xs text-muted-foreground mt-1">Please provide your legal contact details to initiate coordinates.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-name" className="text-xs font-bold uppercase tracking-widest text-secondary block">Full Name *</Label>
                      <Input 
                        id="modal-name" 
                        required 
                        value={form.name} 
                        onChange={(e) => set("name", e.target.value)} 
                        placeholder="E.g., Ramesh Chandra Sharma" 
                        className="h-12 text-sm" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-phone" className="text-xs font-bold uppercase tracking-widest text-secondary block">Phone (WhatsApp) *</Label>
                      <Input 
                        id="modal-phone" 
                        type="tel" 
                        required 
                        pattern="[0-9+\s-]{7,}" 
                        value={form.phone} 
                        onChange={(e) => set("phone", e.target.value)} 
                        placeholder="E.g., +91 98765 43210" 
                        className="h-12 text-sm" 
                      />
                      <p className="text-[9px] text-muted-foreground">All alerts and ritual updates will be shared directly on this number.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-email" className="text-xs font-bold uppercase tracking-widest text-secondary block">Email (Optional)</Label>
                      <Input 
                        id="modal-email" 
                        type="email" 
                        value={form.email} 
                        onChange={(e) => set("email", e.target.value)} 
                        placeholder="you@example.com" 
                        className="h-12 text-sm" 
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Sacred Request Details */}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Step 2 of 3</span>
                      <h4 className="font-serif-display text-2xl font-bold text-secondary mt-1">Ritual & Shrine</h4>
                      <p className="text-xs text-muted-foreground mt-1">Select the shrine and the sacred seva you wish to perform.</p>
                    </div>

                    {/* Temple selection field */}
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-secondary block">Sacred Shrine *</Label>
                      {defaultTemple ? (
                        <div className="h-12 px-4 rounded-xl border border-border/80 bg-gold-soft/20 flex items-center justify-between">
                          <span className="font-bold text-sm text-secondary truncate">{currentTempleDetails?.name || defaultTemple}</span>
                          <span className="text-[9px] font-black uppercase tracking-wider text-gold-soft px-2.5 py-1 bg-white rounded-full shadow-sm border border-gold/10">Prefilled & Locked</span>
                        </div>
                      ) : (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="h-12 w-full justify-between font-normal text-sm"
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
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-secondary block">Sacred Service *</Label>
                      <Select value={form.service} onValueChange={(v) => set("service", v)} required>
                        <SelectTrigger className="h-12 text-sm"><SelectValue placeholder="Choose service" /></SelectTrigger>
                        <SelectContent className="z-[1100]">
                          <SelectItem value="special-darshan">Special Darshan Assistance</SelectItem>
                          <SelectItem value="puja">Pooja & Rituals</SelectItem>
                          <SelectItem value="prasad">Prasad Delivery</SelectItem>
                          <SelectItem value="chadhava">Chadhava & Offerings</SelectItem>
                          <SelectItem value="yatra">Yatra Packages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="modal-date" className="text-xs font-bold uppercase tracking-widest text-secondary block">Preferred Date</Label>
                        <Input 
                          id="modal-date" 
                          type="date" 
                          value={form.date} 
                          onChange={(e) => set("date", e.target.value)} 
                          className="h-12 text-sm" 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-secondary block">No. of Devotees</Label>
                        <Select value={form.devotees} onValueChange={(v) => set("devotees", v)}>
                          <SelectTrigger className="h-12 text-sm"><SelectValue /></SelectTrigger>
                          <SelectContent className="z-[1100]">
                            <SelectItem value="1">1 Person</SelectItem>
                            <SelectItem value="2">2 People</SelectItem>
                            <SelectItem value="3">3 People</SelectItem>
                            <SelectItem value="4">4 People</SelectItem>
                            <SelectItem value="5">5 People</SelectItem>
                            <SelectItem value="5+">5+ People</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Divine Sankalp & Terms */}
                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Step 3 of 3</span>
                      <h4 className="font-serif-display text-2xl font-bold text-secondary mt-1">Divine Sankalp</h4>
                      <p className="text-xs text-muted-foreground mt-1">Customize the spiritual elements for your personal prayer.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-gotra" className="text-xs font-bold uppercase tracking-widest text-secondary block flex items-center justify-between">
                        Gotra (optional)
                        <span className="text-[9px] text-muted-foreground lowercase italic">For customized sanskrit chants</span>
                      </Label>
                      <Input 
                        id="modal-gotra" 
                        value={form.gotra} 
                        onChange={(e) => set("gotra", e.target.value)} 
                        placeholder="E.g., Bhardwaj, Kashyap, Shandilya" 
                        className="h-12 text-sm" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-notes" className="text-xs font-bold uppercase tracking-widest text-secondary block">Special prayer / requests</Label>
                      <Textarea 
                        id="modal-notes" 
                        value={form.notes} 
                        onChange={(e) => set("notes", e.target.value)} 
                        placeholder="Specific names of family members, health prayers, senior citizen assistance requests, etc." 
                        className="text-sm min-h-[100px]" 
                      />
                    </div>

                    {/* Prominent Mandatory Terms Checkbox */}
                    <div className="p-4 bg-gold-soft/10 rounded-2xl border border-gold/10 flex items-start gap-4">
                      <input 
                        type="checkbox" 
                        id="modal-tnc-checkbox" 
                        required 
                        checked={form.tnc}
                        onChange={(e) => set("tnc", e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer shrink-0" 
                      />
                      <label htmlFor="modal-tnc-checkbox" className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider leading-relaxed cursor-pointer select-none">
                        I hereby declare that I authorize Vandan Darshan to coordinate this sacred seva in my name, and I agree to the <Link to="/terms" target="_blank" className="text-primary hover:underline font-black">Terms & Conditions</Link> *
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-4 shrink-0">
                  {step > 1 ? (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="h-12 rounded-full px-6 text-xs uppercase tracking-widest font-black"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      disabled={(step === 1 && (!form.name || !form.phone)) || (step === 2 && (!form.temple || !form.service))}
                      className="h-12 bg-primary hover:bg-primary/90 text-white rounded-full px-8 text-xs uppercase tracking-widest font-black ml-auto shadow-gold"
                    >
                      Continue <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      variant="divine"
                      disabled={submitting || !form.tnc}
                      className="h-12 w-full sm:w-auto rounded-full px-8 text-xs uppercase tracking-[0.2em] font-black ml-auto shadow-gold"
                    >
                      {submitting ? "Initiating Seva..." : "Confirm & Book Seva"}
                    </Button>
                  )}
                </div>

              </form>
            ) : (
              /* Success / Thank You Screen */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 px-4 space-y-8 flex flex-col items-center"
              >
                {/* Spiritual checkmark circle */}
                <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center border-2 border-gold/30 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-10 animate-ping" />
                  <Star className="w-12 h-12 text-gold fill-gold" />
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Request Acknowledged</span>
                  <h3 className="font-serif-display text-4xl font-bold text-secondary">Auspicious Blessings!</h3>
                  <div className="font-devanagari text-2xl text-gold italic font-bold">॥ शुभमस्तु ॥</div>
                </div>

                <div className="max-w-md bg-gold-soft/10 rounded-[2rem] border border-gold/15 p-6 space-y-4 text-left">
                  <p className="text-sm font-medium text-secondary leading-relaxed">
                    Pranam, <span className="text-primary font-black">{form.name}</span>! Your sacred request for <span className="font-black text-secondary">{selectedServiceObj?.title || form.service}</span> at <span className="font-black text-secondary">{currentTempleDetails?.name}</span> has been received with deep reverence.
                  </p>
                  
                  <div className="h-px bg-border/40" />
                  
                  <div className="grid grid-cols-2 gap-y-3 text-xs">
                    <div>
                      <span className="text-muted-foreground block font-bold uppercase tracking-wider text-[9px]">Mobile (WhatsApp)</span>
                      <span className="font-bold text-secondary">{form.phone}</span>
                    </div>
                    {form.gotra && (
                      <div>
                        <span className="text-muted-foreground block font-bold uppercase tracking-wider text-[9px]">Sankalp Gotra</span>
                        <span className="font-bold text-secondary">{form.gotra}</span>
                      </div>
                    )}
                    {form.date && (
                      <div>
                        <span className="text-muted-foreground block font-bold uppercase tracking-wider text-[9px]">Preferred Date</span>
                        <span className="font-bold text-secondary">{form.date}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground block font-bold uppercase tracking-wider text-[9px]">Devotees</span>
                      <span className="font-bold text-secondary">{form.devotees} Devotee(s)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed font-medium">
                  Our regional temple coordinator has been assigned. They will contact you shortly on WhatsApp to finalize your family gotra invocation and guide you through the sacred logistics.
                </p>

                <Button 
                  onClick={onClose} 
                  variant="divine"
                  className="h-12 px-12 rounded-full uppercase tracking-widest text-xs font-black shadow-gold shrink-0"
                >
                  Return to Temple info
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
