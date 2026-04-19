import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO title="Page not found — Vandan Darshan" description="The page you are looking for does not exist." />
      <section className="container-prose py-32 text-center">
        <p className="font-devanagari text-3xl text-gold">॥ क्षमा करें ॥</p>
        <h1 className="font-serif-display text-7xl md:text-8xl font-semibold text-gradient-gold mt-4">404</h1>
        <p className="text-xl text-muted-foreground mt-3">This sacred path leads nowhere.</p>
        <Button asChild variant="divine" size="lg" className="mt-8"><Link to="/">Return home</Link></Button>
      </section>
    </>
  );
};

export default NotFound;
