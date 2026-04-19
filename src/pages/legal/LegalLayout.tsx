import { ReactNode } from "react";
import { SEO } from "@/components/SEO";

interface Props { title: string; updated?: string; description: string; children: ReactNode; }

export const LegalLayout = ({ title, updated = "April 2026", description, children }: Props) => (
  <>
    <SEO title={`${title} — Vandan Darshan`} description={description} />
    <section className="container-prose py-16 max-w-4xl">
      <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Compliance</p>
      <h1 className="font-serif-display text-5xl font-semibold mt-3">{title}</h1>
      <p className="text-sm text-muted-foreground mt-3">Last updated: {updated}</p>
      <div className="divider-om"><span>॥ ॐ ॥</span></div>
      <article className="prose prose-neutral max-w-none [&>h2]:font-serif-display [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-10 [&>h2]:mb-3 [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-2 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>ul]:text-muted-foreground [&>ul]:my-3 [&>ul]:pl-6 [&>ul]:list-disc [&>ul]:space-y-1.5">
        {children}
      </article>
    </section>
  </>
);
