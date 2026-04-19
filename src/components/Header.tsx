import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/temples", label: "Temples" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="container-prose flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Vandan Darshan" className="h-12 w-12 object-contain" />
          <div className="leading-tight">
            <div className="font-serif-display text-xl font-semibold">
              <span className="text-primary">Vandan</span> <span className="text-secondary">Darshan</span>
            </div>
            <div className="font-devanagari text-xs text-gold">वन्दन दर्शन</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-2",
                pathname === n.to ? "text-primary" : "text-foreground/80"
              )}
            >
              {n.label}
              {pathname === n.to && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-gold rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+919999999999" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary">
            <Phone className="h-4 w-4" />
            +91 99999 99999
          </a>
          <Button asChild variant="divine" size="sm">
            <Link to="/book">Book Darshan</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="container-prose py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 px-3 rounded-lg text-base font-medium",
                  pathname === n.to ? "bg-accent text-primary" : "text-foreground/85"
                )}
              >
                {n.label}
              </Link>
            ))}
            <Button asChild variant="divine" className="mt-3">
              <Link to="/book" onClick={() => setOpen(false)}>Book Darshan</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
