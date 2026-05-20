import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo-final.png";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-background to-muted/40">
      <div className="container-prose py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Vandan Darshan" className="h-12 w-12 object-contain" />
            <div className="leading-tight">
              <div className="font-serif-display text-lg font-semibold">
                <span className="text-primary">Vandan</span> <span className="text-secondary">Darshan</span>
              </div>
              <div className="font-devanagari text-xs text-gold">वन्दन दर्शन</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Trusted spiritual concierge for darshan, puja, prasad and chadhava across India's most sacred temples.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="https://www.facebook.com/share/1D6e26vwF7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 grid place-items-center rounded-full bg-accent text-foreground/70 hover:text-primary hover:bg-gold-soft transition"><Facebook className="h-4 w-4" /></a>
            <a href="https://www.instagram.com/vandandarshanofficial?igsh=dXJ4eXY0bmQ1ZWZq&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 grid place-items-center rounded-full bg-accent text-foreground/70 hover:text-primary hover:bg-gold-soft transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="h-9 w-9 grid place-items-center rounded-full bg-accent text-foreground/70 hover:text-primary hover:bg-gold-soft transition"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/temples" className="hover:text-primary">All Temples</Link></li>
            <li><Link to="/services" className="hover:text-primary">Our Services</Link></li>
            <li><Link to="/blogs" className="hover:text-primary">Spiritual Blogs</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Compliance</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/cancellation" className="hover:text-primary">Cancellation & Refund</Link></li>
            <li><Link to="/shipping" className="hover:text-primary">Shipping & Delivery</Link></li>
            <li><Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 text-gold" /><span>+91 89609 65151<br />WhatsApp / Calling</span></li>
            <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-gold" /><span>seva@vandandarshan.com</span></li>
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-gold" /><span>Vandan Darshan Pvt. Ltd.<br />India</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-prose py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Vandan Darshan. All rights reserved.</p>
          <p className="font-devanagari text-gold">॥ सर्वे भवन्तु सुखिनः ॥</p>
        </div>
      </div>
    </footer>
  );
};
