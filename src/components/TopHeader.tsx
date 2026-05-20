import { Mail, Phone, Instagram, Facebook, Youtube, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const TopHeader = ({ transparent }: { transparent?: boolean }) => {
  return (
    <div className={cn(
      "text-white py-0.5 hidden lg:block border-b border-white/5 transition-colors duration-500",
      transparent ? "bg-transparent" : "bg-secondary"
    )}>
      <div className="container-prose flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gold-soft">
            <Globe className="h-3 w-3 text-gold" />
            Vandan Darshan Portal
          </div>
          <a href="mailto:info@vandandarshan.com" className="flex items-center gap-2 text-[10px] hover:text-gold transition-colors font-medium text-white/70">
            <Mail className="h-3 w-3 text-gold" />
            info@vandandarshan.com
          </a>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 border-r border-white/10 pr-8">
             <a href="tel:8960965151" className="flex items-center gap-3 text-sm font-bold hover:text-gold transition-colors">
               <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                 <Phone className="h-3.5 w-3.5 text-gold" />
               </div>
               +91 89609 65151
             </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/vandandarshan?igsh=eHVkdWVuY2RkcGJz" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-white transition-all" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com/share/18AqcgeEm6/" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-white transition-all" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <Button asChild className="h-10 px-8 text-[11px] font-black uppercase tracking-[0.25em] bg-primary hover:bg-white hover:text-primary transition-all shadow-gold border-none rounded-full ml-4">
              <Link to="/book">Book Darshan</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
