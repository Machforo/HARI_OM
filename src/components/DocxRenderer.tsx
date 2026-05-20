import React, { useEffect, useState } from "react";
import mammoth from "mammoth";
import { ArrowRight, Sparkles, Flame, Gift, MapPin, Check, Flower, Clock, Info, Compass, Train, Plane, Bus, Hotel, HelpCircle, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DocxRendererProps {
  filePath: string;
  className?: string;
  onMetadata?: (meta: { title?: string; description?: string }) => void;
  templeSlug?: string;
  templeName?: string;
  gallery?: string[];
}

export const DocxRenderer: React.FC<DocxRendererProps> = ({ filePath, className, onMetadata, templeSlug, templeName, gallery = [] }) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocx = async () => {
      try {
        setLoading(true);
        setError(null);

        // Standardize path and strategies
        const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
        const relativePath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;

        const strategies = [
          encodeURI(cleanPath),     // Strategy 1: Standard encodeURI
          cleanPath,               // Strategy 2: Raw absolute path
          relativePath,            // Strategy 3: Relative path (no leading slash)
          encodeURIComponent(cleanPath).replace(/%2F/g, '/') // Strategy 4: Component encoding (except slashes)
        ];

        let response: Response | null = null;
        let finalPath = "";

        for (const path of Array.from(new Set(strategies))) {
          console.log(`[DocxRenderer] Trying fetch strategy: ${path}`);
          const attempt = await fetch(path);
          const contentType = attempt.headers.get("Content-Type");

          if (attempt.ok && contentType && !contentType.includes("text/html")) {
            response = attempt;
            finalPath = path;
            break;
          }
        }

        if (!response || !response.ok) {
          console.error(`[DocxRenderer] All fetch strategies failed for ${filePath}`);
          throw new Error(`Failed to fetch document (404 or Invalid Content)`);
        }

        console.log(`[DocxRenderer] Success! Found file at: ${finalPath}`);
        console.log(`[DocxRenderer] Response Status: ${response.status} ${response.statusText}`);
        console.log(`[DocxRenderer] Content-Type: ${response.headers.get("Content-Type")}`);

        const arrayBuffer = await response.arrayBuffer();
        console.log(`[DocxRenderer] Received ArrayBuffer size: ${arrayBuffer.byteLength} bytes`);

        // Binary signature check (ZIP files start with PK, hex 50 4B)
        const uint8 = new Uint8Array(arrayBuffer.slice(0, 4));
        const signature = String.fromCharCode(uint8[0], uint8[1]);
        console.log(`[DocxRenderer] File Signature: ${signature} (Hex: ${uint8[0].toString(16)} ${uint8[1].toString(16)})`);

        if (signature !== "PK") {
          console.error(`[DocxRenderer] Error: File does not have a ZIP/Docx signature. Header: ${signature}`);
          throw new Error("Invalid file format (not a valid Docx)");
        }

        if (arrayBuffer.byteLength < 100) {
          throw new Error("Received empty or corrupt file (too small)");
        }

        if (onMetadata) {
          const textResult = await mammoth.extractRawText({ arrayBuffer: arrayBuffer.slice(0) });
          const text = textResult.value;
          const meta: { title?: string; description?: string } = {};

          const titleMatch = text.match(/(?:Meta Title|Title|SEO Title):\s*(.*)/i);
          const descMatch = text.match(/(?:Meta Description|Description|SEO Description):\s*(.*)/i);

          if (titleMatch) meta.title = titleMatch[1].trim();
          if (descMatch) meta.description = descMatch[1].trim();

          if (meta.title || meta.description) {
            onMetadata(meta);
          }
        }

        const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer.slice(0) });
        let html = result.value;

        // Programmatic Terminology Replace
        html = html
          .replace(/VIP Darshan/g, "Special Darshan")
          .replace(/VIP darshan/g, "special darshan")
          .replace(/VIP/g, "Special");

        // 1. Completely strip broken images from docx
        html = html.replace(/<img[^>]*>/gi, "");

        // 2. Hide Meta Leakage (Extremely Aggressive)
        html = html
          .replace(/<(p|h[1-6]|div|tr|td)[^>]*>(?:<strong>|<em>)?\s*(?:Meta Title|Meta Description|SEO Title|SEO Description|Target Keywords|Focus Keyword|Slug|Title).+?<\/\1>/gi, "")
          .replace(/<(p|h[1-6]|div|tr|td)[^>]*>\s*(?:Meta Title|Meta Description|SEO Title|SEO Description|Target Keywords|Focus Keyword|Slug|Title)\s*<\/\1>\s*<(p|h[1-6]|div|tr|td)[^>]*>.*?<\/\2>/gi, "")
          .replace(/<table>.*?(?:Meta Title|Meta Description).*?<\/table>/gi, "");

        // A) Divine Prologue / Quick Info Card
        let hasMatchedPrologue = false;
        html = html.replace(/<h1>(.*?)<\/h1>\s*<p>(.*?)<\/p>/i, (match, title, desc) => {
          if (hasMatchedPrologue) return match;
          hasMatchedPrologue = true;
          return `
            <div class="mb-16 p-12 bg-white/5 border border-ivory/10 backdrop-blur-sm relative overflow-hidden" style="border-radius: 2rem;">
              <div class="absolute top-0 right-0 p-8 opacity-5 text-ivory"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.886H3.82l5.06 3.676-1.93 5.938 5.05-3.67 5.05 3.67-1.93-5.938 5.06-3.676h-6.268L12 3Z"/></svg></div>
              <div class="relative z-10">
                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-4 block">Quick Info & Essence</span>
                <h2 class="font-serif-display text-3xl md:text-5xl font-bold text-ivory mb-6 leading-tight">${title}</h2>
                <p class="text-ivory/80 text-lg leading-relaxed font-serif italic max-w-3xl border-l-4 border-gold/30 pl-6 m-0">${desc}</p>
              </div>
            </div>
            
            <div class="flex justify-center my-12 opacity-20">
              <div class="h-px w-32 bg-gold"></div>
              <div class="mx-4 text-gold shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,22C12,22 21,17 21,12C21,7 12,2 12,2C12,2 3,7 3,12C3,17 12,22 12,22Z"/></svg></div>
              <div class="h-px w-32 bg-gold"></div>
            </div>
          `;
        });

        // B) Festivals & Best Time to Visit Card Grid
        const festivalRegex = /<h2>\s*(?:Festivals\s*&amp;\s*)?Best Time to Visit[^<]*<\/h2>\s*<ul>(.*?)<\/ul>/gi;
        html = html.replace(festivalRegex, (match, listItems) => {
          const items = listItems.match(/<li>(.*?)<\/li>/g) || [];
          const cards = items.map((i: string) => {
            const text = i.replace(/<\/?li>/g, "").replace(/<[^>]+>/g, "");
            let title = "Auspicious Timing";
            let desc = text;
            if (text.includes(":")) {
              [title, desc] = text.split(":");
            } else if (text.includes("-")) {
              [title, desc] = text.split("-");
            }
            return `
              <div class="p-6 bg-white rounded-3xl border border-border/40 hover:border-gold hover:shadow-md transition-all flex flex-col gap-2">
                <div class="h-10 w-10 bg-gold-soft/20 rounded-xl flex items-center justify-center text-gold"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
                <h4 class="font-bold text-secondary text-sm mt-2">${title.trim()}</h4>
                <p class="text-xs text-muted-foreground leading-relaxed font-medium">${desc.trim()}</p>
              </div>
            `;
          }).join("");
          return `
            <div class="my-14 p-8 md:p-12 bg-gradient-cream border border-gold/15 relative overflow-hidden" style="border-radius: 3rem;">
              <div class="absolute inset-0 bg-repeat" style="opacity: 0.02; background-image: url('/assets/images/temples/pattern.png');"></div>
              <div class="relative z-10">
                <span class="font-black uppercase tracking-widest text-primary" style="font-size: 10px;">Auspicious Planning</span>
                <h3 class="font-serif-display text-2xl md:text-3xl font-bold text-secondary mt-1 mb-8">Festivals & Best Time to Visit</h3>
                <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  ${cards}
                </div>
                <div class="mt-8 pt-6 border-t border-border/40 flex justify-center">
                  <button onclick="window.triggerDivineBooking?.('special-darshan')" class="px-8 h-12 bg-primary hover:bg-primary/95 text-white font-black rounded-full uppercase tracking-widest shadow-gold cursor-pointer transition-all" style="font-size: 10px;">Start your divine journey</button>
                </div>
              </div>
            </div>
          `;
        });

        // C) How to Reach Route Block (Icon + Text Rows)
        const reachRegex = /<h2>\s*(?:How Reach|How to Reach) (.*?)<\/h2>\s*(?:<p>.*?<\/p>)?\s*<ul>(.*?)<\/ul>/gi;
        html = html.replace(reachRegex, (match, temple, listItems) => {
          const items = listItems.match(/<li>(.*?)<\/li>/g) || [];
          const rows = items.map((i: string) => {
            const rawText = i.replace(/<\/?li>/g, "").replace(/<strong>|<\/strong>/g, "").replace(/<[^>]+>/g, "");
            let type = "Route";
            let desc = rawText;
            let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gold"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;

            const lowerText = rawText.toLowerCase();
            if (lowerText.includes("flight") || lowerText.includes("air")) {
              icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gold"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-1.1-.3-2.1.2-2.3 1.3l-.1.3 11 4.5-4.8 4.8-3.4-1.4c-.5-.2-1-.1-1.3.3l-.2.2 4.4 4.4.2-.2c.4-.3.5-.8.3-1.3l-1.4-3.4 4.8-4.8 4.5 11 .3-.1c1.1-.2 1.6-1.2 1.3-2.3z"/></svg>`;
            } else if (lowerText.includes("train") || lowerText.includes("rail")) {
              icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gold"><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16"/><path d="M12 3v14"/><path d="m8 21 2-4"/><path d="m16 21-2-4"/></svg>`;
            } else if (lowerText.includes("bus") || lowerText.includes("road")) {
              icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gold"><path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2"/><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h.01"/><path d="M18 12h.01"/><path d="M4 18v2"/><path d="M20 18v2"/></svg>`;
            }

            if (rawText.includes(":")) {
              const parts = rawText.split(":");
              type = parts[0];
              desc = parts.slice(1).join(":");
            }
            return `
              <div class="flex items-start gap-6 p-6 border-b border-ivory/5 group hover:bg-white/5 transition-colors">
                <div class="mt-1">${icon}</div>
                <div>
                  <h4 class="font-bold text-ivory text-lg m-0">${type.trim()}</h4>
                  <p class="text-ivory/60 text-sm mt-1 leading-relaxed m-0">${desc.trim()}</p>
                </div>
              </div>
            `;
          }).join("");
          return `
            <div class="my-24" id="reach">
              <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4 block text-center">Travel Logistics</span>
              <h3 class="font-serif-display text-3xl md:text-5xl font-bold text-ivory mb-12 text-center">How to Reach the Divine</h3>
              <div class="max-w-4xl mx-auto bg-black/20 rounded-3xl overflow-hidden border border-ivory/10 shadow-2xl">
                ${rows}
              </div>
              
              <div class="flex justify-center mt-20 opacity-20">
                <div class="h-px w-32 bg-gold"></div>
                <div class="mx-4 text-gold shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,22C12,22 21,17 21,12C21,7 12,2 12,2C12,2 3,7 3,12C3,17 12,22 12,22Z"/></svg></div>
                <div class="h-px w-32 bg-gold"></div>
              </div>
            </div>
          `;
        });

        // D) Hotels & Stays / Nearby Places (Horizontal Pill Tags)
        const hotelsRegex = /<h2>\s*(?:Hotels & Nearby Sacred Places|Hotels & Stays|Hotels & Places to Stay|Accommodation)[^<]*<\/h2>\s*(?:<p>.*?<\/p>)?\s*<ul>(.*?)<\/ul>/gi;
        html = html.replace(hotelsRegex, (match, listItems) => {
          const items = listItems.match(/<li>(.*?)<\/li>/g) || [];
          const pills = items.map((i: string) => {
            const rawText = i.replace(/<\/?li>/g, "").replace(/<strong>|<\/strong>/g, "").replace(/<[^>]+>/g, "");
            let place = rawText.split(":")[0];
            return `
              <div class="px-6 py-3 bg-white/5 border border-ivory/20 rounded-full text-ivory text-sm font-semibold tracking-wide hover:bg-gold hover:text-white hover:border-gold transition-all cursor-default">
                ${place.trim()}
              </div>
            `;
          }).join("");
          return `
            <div class="my-24" id="hotels">
              <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4 block text-center">Divine Vicinity</span>
              <h3 class="font-serif-display text-3xl md:text-5xl font-bold text-ivory mb-12 text-center">Nearby Sacred Places & Stays</h3>
              <div class="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                ${pills}
              </div>
              
              <div class="flex justify-center mt-20 opacity-20">
                <div class="h-px w-32 bg-gold"></div>
                <div class="mx-4 text-gold shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,22C12,22 21,17 21,12C21,7 12,2 12,2C12,2 3,7 3,12C3,17 12,22 12,22Z"/></svg></div>
                <div class="h-px w-32 bg-gold"></div>
              </div>
            </div>
          `;
        });

        // E) Plan Your Darshan / Services Catalog Grid
        const planServicesRegex = /<h2>\s*(?:Plan Your Darshan|Ready for[^<]*?)\s*<\/h2>(?:\s*<p>.*?<\/p>)?\s*<ul>(.*?)<\/ul>/gi;
        html = html.replace(planServicesRegex, (match, listItems) => {
          const items = listItems.match(/<li>(.*?)<\/li>/g) || [];
          const cards = items.map((i: string) => {
            const text = i.replace(/<\/?li>/g, "").replace(/<[^>]+>/g, "");
            let title = "Sacred Assistance";
            let desc = "Book comprehensive assisted packages for details.";
            let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
            let serviceType = "special-darshan";

            if (text.toLowerCase().includes("guide") || text.toLowerCase().includes("trek")) {
              title = "Guide Services for Forest Treks";
              desc = "Authentic local guides who know every sacred cave, trekking route, and safety detail.";
              icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`;
              serviceType = "yatra";
            } else if (text.toLowerCase().includes("pooja") || text.toLowerCase().includes("ritual")) {
              title = "Nava Narasimha Special Pooja";
              desc = "Sankalp puja conducted in your name with live mantra coordination and authentic gotra sankalp.";
              icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
              serviceType = "puja";
            } else if (text.toLowerCase().includes("jeep") || text.toLowerCase().includes("transport") || text.toLowerCase().includes("pavana")) {
              title = "Jeep Bookings for Pavana Narasimha";
              desc = "Safe off-road Jeep transport booking for Pavana & difficult-to-reach hilltop shrines.";
              icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 22v-2"/><path d="M17 22v-2"/><path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5"/><circle cx="6.5" cy="16.5" r="1.5"/><circle cx="17.5" cy="16.5" r="1.5"/></svg>`;
              serviceType = "yatra";
            } else if (text.toLowerCase().includes("stay") || text.toLowerCase().includes("package")) {
              title = "Stay & Transport Packages";
              desc = "Worry-free local pure veg stays, luxury AC/non-AC hotels, and regional round-trip transportation.";
              icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
              serviceType = "yatra";
            } else {
              if (text.includes(":")) {
                [title, desc] = text.split(":");
              } else if (text.includes("-")) {
                [title, desc] = text.split("-");
              }
            }
            return `
              <div class="group bg-white rounded-3xl p-8 border border-border/40 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between min-h-[220px]">
                <div>
                  <div class="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md shrink-0">
                    ${icon}
                  </div>
                  <h4 class="font-bold text-lg text-secondary mt-6 mb-2 tracking-tight">${title.trim()}</h4>
                  <p class="text-xs text-muted-foreground leading-relaxed font-medium">${desc.trim()}</p>
                </div>
                <button onclick="window.triggerDivineBooking?.('${serviceType}')" class="mt-6 w-full h-11 bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/10 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all">Start your divine journey</button>
              </div>
            `;
          }).join("");
          return `
            <div class="my-16 pt-12 border-t border-border/40">
              <span class="text-[10px] font-black uppercase tracking-widest text-primary">Sacred Offerings & Logistical Bookings</span>
              <h3 class="font-serif-display text-2xl md:text-3.5xl font-black text-secondary mt-1 mb-3">Plan Your Darshan</h3>
              <p class="text-muted-foreground text-sm leading-relaxed max-w-xl mb-8 font-medium">Coordinate your entire pilgrimage. Access verified local services at the touch of a button.</p>
              <div class="grid sm:grid-cols-2 gap-6">
                ${cards}
              </div>
            </div>
          `;
        });

        // Detect and Replace CTA Placeholders
        const ctaRegex = /\[([^\]]+)\](?:\s*\(Internal Link Placeholder\))?/gi;
        html = html.replace(ctaRegex, (match, text) => {
          let link = "/book";
          const lowerText = text.toLowerCase();

          if (lowerText.includes("darshan")) link = `/${templeSlug}/darshan`;
          else if (lowerText.includes("pooja") || lowerText.includes("puja")) link = `/${templeSlug}/puja`;
          else if (lowerText.includes("prasad")) link = `/${templeSlug}/prasad`;
          else if (lowerText.includes("chadhava")) link = `/${templeSlug}/chadhava`;
          else if (lowerText.includes("yatra")) link = `/${templeSlug}/yatra`;

          return `
            <div class="my-16 p-10 md:p-14 bg-gradient-divine text-white shadow-gold relative overflow-hidden group" style="border-radius: 3.5rem;">
              <div class="absolute inset-0 opacity-10 bg-repeat" style="background-image: url('/assets/images/temples/pattern.png');"></div>
              <div class="absolute top-0 right-0 p-12 opacity-20 group-hover:scale-125 transition-transform duration-1000">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3a1 1 0 0 1 .707 1.707L20 5.414l-.707-.707A1 1 0 0 1 20 3Z"/><path d="M4 20a1 1 0 0 1 .707 1.707L4 22.414l-.707-.707A1 1 0 0 1 4 20Z"/><path d="M2 3a1 1 0 0 1 .707 1.707L2 5.414l-.707-.707A1 1 0 0 1 2 3Z"/><path d="M22 20a1 1 0 0 1 .707 1.707L22 22.414l-.707-.707A1 1 0 0 1 22 20Z"/></svg>
              </div>
              <div class="relative z-10">
                <h4 class="font-serif-display text-3xl md:text-4xl font-bold mb-6">${text}</h4>
                <p class="mb-10 text-white/80 text-lg leading-relaxed max-w-2xl font-medium">Focus on your divine connection while Vandan Darshan ensures your sacred journey is seamless and priority-focused.</p>
                <div class="flex flex-wrap gap-5">
                  <a href="${link}" class="inline-flex items-center justify-center px-10 h-14 bg-white text-secondary font-black rounded-full shadow-2xl hover:bg-gold hover:text-white transition-all uppercase no-underline" style="letter-spacing: 0.2em; font-size: 10px;">
                    Access Sacred Service <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </div>
          `;
        });

        // F) Standardized History Section
        const storyRegex = /<h2>\s*The Story of (.*?)<\/h2>\s*<p>(.*?)<\/p>(?:\s*<p>(.*?)<\/p>)?(?:\s*<p>(.*?)<\/p>)?/gi;
        html = html.replace(storyRegex, (match, temple, p1, p2, p3) => {
          return `
            <div class="my-24" id="story">
              <div class="text-center mb-12">
                <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-2 block">Sacred Chronicles</span>
                <h2 class="font-serif-display text-3xl md:text-5xl font-bold text-ivory m-0">The Story of ${temple}</h2>
              </div>
              <div class="grid md:grid-cols-2 gap-16 items-start">
                <div class="space-y-8">
                  <p class="text-ivory/90 text-xl font-serif leading-relaxed m-0">${p1}</p>
                  ${p2 ? `<p class="text-ivory/70 text-base leading-relaxed m-0">${p2}</p>` : ""}
                  ${p3 ? `<p class="text-ivory/70 text-base leading-relaxed m-0">${p3}</p>` : ""}
                </div>
                <div class="relative">
                  <div class="absolute -inset-2 border-2 border-gold/20 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
                  <div class="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-black/40">
                    <img src="${gallery[1] || gallery[0]}" alt="${temple}" class="w-full h-full object-cover opacity-90" />
                  </div>
                </div>
              </div>
              
              <div class="flex justify-center mt-20 opacity-20">
                <div class="h-px w-32 bg-gold"></div>
                <div class="mx-4 text-gold shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,22C12,22 21,17 21,12C21,7 12,2 12,2C12,2 3,7 3,12C3,17 12,22 12,22Z"/></svg></div>
                <div class="h-px w-32 bg-gold"></div>
              </div>
            </div>
          `;
        });

        // G) Standardized Timings Section (Alternating Table Rows)
        const timingsRegex = /<h2>\s*(?:Temple\s*)?Darshan Timings and schedule<\/h2>\s*<table>(.*?)<\/table>/gi;
        html = html.replace(timingsRegex, (match, tableContent) => {
          // Add alternating row shading to the inner table cells via class injection
          const shadedTable = tableContent.replace(/<tr>/g, (m, offset, str) => {
            const rowIndex = (str.substring(0, offset).match(/<tr>/g) || []).length;
            return `<tr class="${rowIndex % 2 === 0 ? 'bg-white/5' : 'bg-transparent'} hover:bg-white/10 transition-colors">`;
          });

          return `
            <div class="my-24" id="timings">
              <div class="text-center mb-12">
                <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-2 block">Timeless Devotion</span>
                <h3 class="font-serif-display text-3xl md:text-5xl font-bold text-ivory m-0">Temple Timings & Ritual Schedule</h3>
              </div>
              <div class="max-w-4xl mx-auto overflow-hidden shadow-2xl rounded-3xl border border-ivory/10 bg-black/20">
                <table class="w-full border-collapse m-0">
                  ${shadedTable}
                </table>
              </div>
              <div class="max-w-4xl mx-auto mt-8 flex items-start gap-4 p-6 bg-gold/5 rounded-2xl border border-gold/10">
                <div class="text-gold mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                <p class="text-xs text-ivory/60 font-medium m-0 leading-relaxed italic">Note: Timings are subject to change during Mahotsavs, Eclipse days, and significant solar/lunar transitions. Please verify locally before pilgrimage.</p>
              </div>
              
              <div class="flex justify-center mt-20 opacity-20">
                <div class="h-px w-32 bg-gold"></div>
                <div class="mx-4 text-gold shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,22C12,22 21,17 21,12C21,7 12,2 12,2C12,2 3,7 3,12C3,17 12,22 12,22Z"/></svg></div>
                <div class="h-px w-32 bg-gold"></div>
              </div>
            </div>
          `;
        });

        // H) Must Experience Highlights (Card Style)
        const highlightsRegex = /<h2>\s*Must Experience Highlights<\/h2>\s*(?:<p>.*?<\/p>)?\s*<ul>(.*?)<\/ul>/gi;
        html = html.replace(highlightsRegex, (match, listItems) => {
          const items = listItems.match(/<li>(.*?)<\/li>/g) || [];
          const gridItems = items.map((i: string) => {
            const rawText = i.replace(/<\/?li>/g, "").replace(/<strong>|<\/strong>/g, "");
            let title = "Divine Experience";
            let desc = rawText;
            if (rawText.includes(":")) {
              const parts = rawText.split(":");
              title = parts[0];
              desc = parts.slice(1).join(":");
            }
            return `
              <div class="p-8 bg-white/5 border border-ivory/10 rounded-3xl hover:border-gold/50 transition-all group">
                <div class="h-10 w-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <h4 class="font-bold text-ivory text-xl mb-3 group-hover:text-gold transition-colors">${title.trim()}</h4>
                <p class="text-sm text-ivory/60 leading-relaxed m-0">${desc.trim()}</p>
              </div>
            `;
          }).join("");
          return `
            <div class="my-24" id="highlights">
              <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4 block text-center">Unforgettable Moments</span>
              <h3 class="font-serif-display text-3xl md:text-5xl font-bold text-ivory mb-12 text-center">Must-Experience Highlights</h3>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                ${gridItems}
              </div>
              
              <div class="flex justify-center mt-20 opacity-20">
                <div class="h-px w-32 bg-gold"></div>
                <div class="mx-4 text-gold shrink-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,22C12,22 21,17 21,12C21,7 12,2 12,2C12,2 3,7 3,12C3,17 12,22 12,22Z"/></svg></div>
                <div class="h-px w-32 bg-gold"></div>
              </div>
            </div>
          `;
        });

        // I) FAQ Accordion Section
        const faqRegex = /<h[1-6]>\s*(?:Frequently Asked Questions|FAQ)\s*<\/h[1-6]>\s*<ul>(.*?)<\/ul>/gi;
        html = html.replace(faqRegex, (match, listItems) => {
          const items = listItems.match(/<li>(.*?)<\/li>/g) || [];
          const accordions = items.map((i: string, index: number) => {
            const rawText = i.replace(/<\/?li>/g, "").replace(/<[^>]+>/g, "");
            let question = "Divine Inquiry";
            let answer = rawText;
            if (rawText.includes("?")) {
              const parts = rawText.split("?");
              question = parts[0] + "?";
              answer = parts.slice(1).join("?");
            }
            return `
              <details class="group bg-black/20 border border-ivory/10 rounded-2xl mb-4 overflow-hidden transition-all">
                <summary class="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-white/5">
                  <h4 class="font-bold text-ivory text-lg m-0 pr-6">${question.trim()}</h4>
                  <span class="text-gold group-open:rotate-180 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
                </summary>
                <div class="p-6 pt-0 border-t border-ivory/5">
                  <p class="text-ivory/70 text-base leading-relaxed m-0">${answer.trim()}</p>
                </div>
              </details>
            `;
          }).join("");
          return `
            <div class="my-24" id="faq">
              <span class="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4 block text-center">Seeker's Knowledge</span>
              <h3 class="font-serif-display text-3xl md:text-5xl font-bold text-ivory mb-12 text-center">Frequently Asked Questions</h3>
              <div class="max-w-4xl mx-auto">
                ${accordions}
              </div>
            </div>
          `;
        });

        // J) Final CTA Strip
        const finalCTA = `
          <div class="my-32 p-16 md:p-24 bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 rounded-[4rem] text-center relative overflow-hidden">
            <div class="absolute inset-0 opacity-10 bg-repeat pointer-events-none" style="background-image: url('/assets/images/temples/pattern.png');"></div>
            <div class="relative z-10">
              <h2 class="font-serif-display text-4xl md:text-6xl font-bold text-ivory mb-8 leading-tight">Begin Your Sacred Journey Today</h2>
              <p class="text-ivory/70 text-xl md:text-2xl max-w-3xl mx-auto mb-12 italic font-serif">"Let your soul find the peace it seeks in the presence of the divine."</p>
              <div class="flex flex-wrap justify-center gap-6">
                <button onclick="window.triggerDivineBooking?.('special-darshan')" class="px-12 h-16 bg-gold hover:bg-gold/90 text-white font-black rounded-full uppercase tracking-[0.25em] text-xs shadow-2xl shadow-gold/20 transition-all">Book Guided Darshan</button>
                <button onclick="window.triggerDivineBooking?.('yatra')" class="px-12 h-16 border-2 border-ivory/30 hover:border-gold hover:text-gold text-ivory font-black rounded-full uppercase tracking-[0.25em] text-xs transition-all">Plan Full Yatra</button>
              </div>
            </div>
          </div>
        `;
        html += finalCTA;

        // Apply global styling classes
        html = html
          .replace(/<h1>/g, '<h1 class="font-serif-display text-3xl md:text-5xl font-bold mt-16 mb-8 text-ivory leading-tight scroll-mt-32">')
          .replace(/<h2>/g, '<h2 class="font-serif-display text-2xl md:text-4xl font-bold mt-14 mb-6 text-ivory scroll-mt-32">')
          .replace(/<h3>/g, '<h3 class="font-serif-display text-xl md:text-3xl font-bold mt-12 mb-5 text-gold scroll-mt-32">')
          .replace(/<table>/g, '<div class="overflow-x-auto my-10 border border-ivory/10 rounded-2xl"><table class="w-full border-collapse bg-white/5">')
          .replace(/<\/table>/g, '</table></div>')
          .replace(/<tr>/g, '<tr class="hover:bg-white/5 transition-colors duration-300">')
          .replace(/<thead>/g, '<thead class="bg-black/20 text-ivory">')
          .replace(/<th>/g, '<th class="px-5 py-4 text-left font-black text-xs uppercase tracking-wider text-gold border-b border-ivory/10">')
          .replace(/<td>/g, '<td class="border-b border-ivory/10 px-5 py-4 text-ivory/80 text-xs leading-relaxed font-medium">')
          .replace(/<ul>/g, '<ul class="list-none my-8 space-y-4">')
          .replace(/<li>/g, '<li class="flex items-start gap-4 text-base font-medium text-ivory/70">')
          .replace(/<p>/g, '<p class="my-6 leading-[1.8] text-ivory/80 text-lg font-medium">');

        console.log("Raw HTML from Mammoth:", html.substring(0, 500) + "...");

        // --- PARSING LOGIC ---
        const sections: any = {
          quickInfo: null,
          history: null,
          timings: null,
          festivals: null,
          reach: null,
          nearby: null,
          faq: null,
          cta: null,
          rawHtml: null // Fallback
        };

        // Pre-process: Clean up extra spaces/newlines
        html = html.replace(/\r?\n/g, " ").replace(/\s+/g, " ");

        // 1. Quick Info (First H1/H2 + Paragraph)
        const prologueMatch = html.match(/<(h1|h2)>(.*?)<\/\1>\s*<p>(.*?)<\/p>/i);
        if (prologueMatch) {
          sections.quickInfo = { title: prologueMatch[2], desc: prologueMatch[3] };
          html = html.replace(prologueMatch[0], "");
        } else {
          // Fallback: Just take first paragraph if no header
          const firstPMatch = html.match(/<p>(.*?)<\/p>/i);
          if (firstPMatch) {
            sections.quickInfo = { title: templeName || "Sacred Overview", desc: firstPMatch[1] };
            html = html.replace(firstPMatch[0], "");
          }
        }

        // 2. History
        const storyMatch = html.match(/<(h1|h2|h3)>\s*(?:The Story of|History of|Legend of) (.*?)<\/\1>\s*(<p>.*?<\/p>(?:\s*<p>.*?<\/p>){0,3})/i);
        if (storyMatch) {
          const paragraphs = storyMatch[3].match(/<p>(.*?)<\/p>/gi) || [];
          sections.history = {
            temple: storyMatch[2],
            paragraphs: paragraphs.map(p => p.replace(/<\/?p>/g, "").trim())
          };
          html = html.replace(storyMatch[0], "");
        }

        // 3. Timings
        const timingsMatch = html.match(/<(h2|h3)>\s*(?:Temple\s*)?(?:Darshan|Timings)[^<]*<\/h2>\s*<table>(.*?)<\/table>/i);
        if (timingsMatch) {
          const rows = timingsMatch[2].match(/<tr>(.*?)<\/tr>/gi) || [];
          sections.timings = rows.map(r => {
            const cols = r.match(/<td>(.*?)<\/td>/gi) || [];
            return cols.map(c => c.replace(/<\/?td>/g, "").replace(/<[^>]+>/g, "").trim());
          });
          html = html.replace(timingsMatch[0], "");
        }

        // 4. Festivals & Best Time
        const festivalMatch = html.match(/<(h2|h3)>\s*(?:Festivals|Best Time)[^<]*<\/\1>\s*<ul>(.*?)<\/ul>/i);
        if (festivalMatch) {
          const items = festivalMatch[2].match(/<li>(.*?)<\/li>/gi) || [];
          sections.festivals = items.map(i => {
            const text = i.replace(/<\/?li>/g, "").replace(/<[^>]+>/g, "").trim();
            const parts = text.split(/[:\-]/);
            const name = parts[0].trim();
            const desc = parts.slice(1).join(":").trim();
            return { name, desc: desc || "A period of great spiritual significance." };
          });
          html = html.replace(festivalMatch[0], "");
        }

        // 5. How to Reach
        const reachMatch = html.match(/<(h2|h3)>\s*(?:How|Route)[^<]*<\/\1>\s*(?:<p>.*?<\/p>)?\s*<ul>(.*?)<\/ul>/i);
        if (reachMatch) {
          const items = reachMatch[2].match(/<li>(.*?)<\/li>/gi) || [];
          sections.reach = items.map(i => {
            const text = i.replace(/<\/?li>/g, "").replace(/<[^>]+>/g, "").trim();
            const parts = text.split(/[:\-]/);
            const type = parts[0].trim();
            const desc = parts.slice(1).join(":").trim();
            return { type, desc: desc || text };
          });
          html = html.replace(reachMatch[0], "");
        }

        // 6. Hotels & Nearby
        const hotelsMatch = html.match(/<(h2|h3)>\s*(?:Hotels|Nearby|Accommodation)[^<]*<\/\1>\s*(?:<p>.*?<\/p>)?\s*<ul>(.*?)<\/ul>/i);
        if (hotelsMatch) {
          const items = hotelsMatch[2].match(/<li>(.*?)<\/li>/gi) || [];
          sections.nearby = items.map(i => {
            const text = i.replace(/<\/?li>/g, "").replace(/<[^>]+>/g, "").trim();
            const parts = text.split(/[:\-]/);
            const name = parts[0].trim();
            const desc = parts.slice(1).join(":").trim();
            return { name, desc: desc || "Sacred destination nearby." };
          });
          html = html.replace(hotelsMatch[0], "");
        }

        // 7. FAQ
        const faqMatch = html.match(/<(h1|h2|h3|h4|h5|h6)>\s*(?:Frequently Asked Questions|FAQ)\s*<\/\1>\s*<ul>(.*?)<\/ul>/i);
        if (faqMatch) {
          const items = faqMatch[2].match(/<li>(.*?)<\/li>/gi) || [];
          sections.faq = items.map(i => {
            const text = i.replace(/<\/?li>/g, "").replace(/<[^>]+>/g, "").trim();
            const parts = text.split("?");
            const q = (parts[0] + "?").trim();
            const a = parts.slice(1).join("?").trim();
            return { q, a: a || "Please contact temple administration for details." };
          });
          html = html.replace(faqMatch[0], "");
        }

        // 8. CTA
        const ctaMatch = html.match(/\[([^\]]+)\]/i);
        if (ctaMatch) {
          sections.cta = { text: ctaMatch[1] };
          html = html.replace(ctaMatch[0], "");
        }

        // If after all parsing, there is still significant HTML left, keep it as raw
        if (html.replace(/<[^>]+>/g, "").trim().length > 50) {
          sections.rawHtml = html;
        }

        console.log("Parsed Sections:", sections);
        setContent(sections);
      } catch (err) {
        console.error("Error rendering docx:", err);
        setError("Could not load the sacred content at this moment.");
      } finally {
        setLoading(false);
      }
    };

    if (filePath) {
      fetchDocx();
    }
  }, [filePath, onMetadata, templeName, templeSlug]);

  if (loading) return (
    <div className="animate-pulse space-y-10 py-12 bg-black/20 p-8 rounded-3xl">
      <div className="h-16 bg-white/5 rounded-2xl w-3/4"></div>
      <div className="space-y-6">
        <div className="h-4 bg-white/5 rounded w-full"></div>
        <div className="h-4 bg-white/5 rounded w-full"></div>
        <div className="h-4 bg-white/5 rounded w-4/5"></div>
      </div>
      <div className="h-80 bg-white/5 rounded-3xl w-full"></div>
    </div>
  );

  if (error) return (
    <div className="text-center p-16 bg-destructive/10 rounded-[3rem] border border-destructive/20">
      <p className="text-secondary font-black text-2xl mb-4 text-white">॥ क्षम्यताम् ॥</p>
      <p className="text-ivory/60 font-medium">{error}</p>
    </div>
  );

  const sections = content as any;
  if (!sections) return null;

  // Check if at least one structured section could be parsed
  const hasContent = Object.keys(sections).some(k => k !== 'rawHtml' && sections[k] !== null);

  return (
    <div className="docx-container bg-[#5C1A00] text-[#FFF8F0] overflow-hidden">
      {!hasContent && sections.rawHtml && (
        <div className="container mx-auto px-6 py-20 prose prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: sections.rawHtml }} />
        </div>
      )}
      {/* Component 1: Quick Info Card */}
      {sections.quickInfo && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 md:px-8 py-16"
        >
          <div className="bg-white/5 border border-ivory/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 text-gold/5 group-hover:text-gold/10 transition-colors">
              <Info size={240} />
            </div>
            <div className="relative z-10 grid md:grid-cols-[1fr_auto_1.5fr] gap-12 items-center">
              <div>
                <span className="text-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Introduction</span>
                <h2 className="font-serif-display text-3xl md:text-5xl font-bold text-ivory mb-0 leading-tight">
                  {sections.quickInfo.title}
                </h2>
              </div>
              <div className="hidden md:block w-px h-24 bg-ivory/10"></div>
              <div>
                <p className="text-ivory/80 text-lg md:text-xl font-serif italic border-l-4 border-gold/40 pl-8 m-0 leading-relaxed">
                  {sections.quickInfo.desc}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Component 2: History Block */}
      {sections.history && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-8 py-20"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-gold font-black uppercase tracking-[0.4em] text-[10px] block mb-4"
                >
                  Sacred History
                </motion.span>
                <motion.h2
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-serif-display text-4xl md:text-6xl font-black text-ivory m-0 leading-tight"
                >
                  The Story of {sections.history.temple}
                </motion.h2>
              </div>

              <div className="space-y-8">
                {sections.history.paragraphs.map((p: string, idx: number) => {
                  const isPullQuote = p.includes("Aho Bilam") || p.includes("Aho Balam") || p.includes("meaning");
                  if (isPullQuote) {
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gold/10 border-y-2 border-gold/20 py-8 px-10 my-12"
                      >
                        <p className="text-2xl md:text-3xl font-serif-display font-bold text-gold italic leading-relaxed text-center m-0">
                          “{p}”
                        </p>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={cn(
                        "text-ivory/80 text-lg md:text-xl leading-[1.8] font-medium m-0",
                        idx === 0 && "first-letter:text-6xl first-letter:font-black first-letter:text-gold first-letter:float-left first-letter:mr-4 first-letter:mt-2"
                      )}
                    >
                      {p}
                    </motion.p>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 border-2 border-gold/20 rounded-[3rem] translate-x-8 translate-y-8 pointer-events-none"></div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <img src={gallery[1] || gallery[0]} alt="Temple Heritage" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Component 3: Darshan Timings Table */}
      {sections.timings && (
        <div className="bg-black/20 py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Ritual Schedule</span>
              <h2 className="font-serif-display text-4xl md:text-6xl font-black text-ivory m-0">Temple Timings</h2>
            </div>

            <div className="max-w-4xl mx-auto bg-white/5 border border-ivory/10 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-sm">
              <table className="w-full border-collapse">
                <tbody>
                  {sections.timings.map((row: string[], ridx: number) => (
                    <motion.tr
                      key={ridx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ridx * 0.1 }}
                      className={cn(
                        "group transition-colors",
                        ridx % 2 === 0 ? "bg-white/5" : "bg-transparent",
                        "hover:bg-gold/10"
                      )}
                    >
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="px-8 py-6 border-b border-ivory/5 text-ivory/80 font-semibold md:text-lg">
                          {cidx === row.length - 1 && cell.length > 2 ? (
                            <span className="inline-flex items-center px-3 py-1 bg-gold/20 text-gold text-xs font-black uppercase tracking-tighter rounded-full border border-gold/30">
                              {cell}
                            </span>
                          ) : cell}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mt-10 flex items-start gap-4 p-6 bg-gold/10 rounded-2xl border border-gold/20"
            >
              <Clock className="text-gold shrink-0 mt-1" size={20} />
              <p className="text-sm text-ivory/60 font-medium m-0 leading-relaxed italic">
                Note: Sevas and Darshan timings are subject to change during Mahotsavs, Eclipse days, and solar/lunar transitions. Please verify through our assisted booking.
              </p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Component 4: Festivals & Best Time */}
      {sections.festivals && (
        <div className="container mx-auto px-4 md:px-8 py-32">
          <div className="text-center mb-16">
            <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Auspicious Periods</span>
            <h2 className="font-serif-display text-4xl md:text-6xl font-black text-ivory m-0">Festivals & Visit Timing</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sections.festivals.map((f: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ rotateY: 90, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                style={{ perspective: 1000 }}
                className="group h-full"
              >
                <div className="bg-white/5 border border-ivory/10 rounded-[2rem] p-10 h-full flex flex-col justify-between group-hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10">
                  <div>
                    <div className="h-14 w-14 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:rotate-12 transition-transform">
                      <Sparkles size={24} />
                    </div>
                    <h4 className="font-serif-display text-2xl font-bold text-ivory mb-4 group-hover:text-gold transition-colors">{f.name}</h4>
                    <p className="text-ivory/60 leading-relaxed font-medium m-0">{f.desc}</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-ivory/5">
                    <button onClick={() => (window as any).triggerDivineBooking?.('puja')} className="text-gold font-black uppercase tracking-widest text-[10px] flex items-center gap-2 group/btn">
                      Plan Festival Puja <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Component 5: How to Reach */}
      {sections.reach && (
        <div className="bg-black/40 py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-center">
              <div>
                <span className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">The Journey</span>
                <h2 className="font-serif-display text-4xl md:text-6xl font-black text-ivory mb-6 leading-tight">Accessing the Divine Shrines</h2>
                <p className="text-ivory/60 text-lg leading-relaxed font-medium max-w-md">Navigate the sacred terrains with ease. We provide verified route information for every mode of pilgrimage.</p>
              </div>

              <div className="space-y-6">
                {sections.reach.map((r: any, idx: number) => {
                  let Icon = MapPin;
                  if (r.type.toLowerCase().includes("air") || r.type.toLowerCase().includes("flight")) Icon = Plane;
                  else if (r.type.toLowerCase().includes("rail") || r.type.toLowerCase().includes("train")) Icon = Train;
                  else if (r.type.toLowerCase().includes("road") || r.type.toLowerCase().includes("bus")) Icon = Bus;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.2 }}
                      className="bg-white/5 border border-ivory/10 rounded-2xl p-8 flex items-center gap-8 hover:bg-white/10 transition-colors group"
                    >
                      <div className="h-16 w-16 bg-gold rounded-full flex items-center justify-center text-secondary group-hover:scale-110 transition-transform shadow-lg">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-gold font-black uppercase tracking-widest text-xs mb-1">{r.type}</h4>
                        <p className="text-ivory text-lg font-bold m-0 italic">"{r.desc}"</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Component 6: Hotels & Nearby Places */}
      {sections.nearby && (
        <div className="container mx-auto px-4 md:px-8 py-32">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-ivory/10 rounded-[3rem] p-12"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="h-12 w-12 bg-gold/20 rounded-xl flex items-center justify-center text-gold"><Hotel size={24} /></div>
                <h3 className="font-serif-display text-3xl font-black text-ivory m-0">Stay Options & Logistics</h3>
              </div>
              <div className="space-y-6">
                {sections.nearby.slice(0, 3).map((n: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-black/20 rounded-2xl border border-ivory/5 group hover:border-gold/30 transition-all">
                    <Check className="text-gold mt-1 shrink-0" size={18} />
                    <div>
                      <h4 className="text-ivory font-bold mb-1">{n.name}</h4>
                      <p className="text-ivory/60 text-sm m-0 italic font-medium leading-relaxed">"{n.desc}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="space-y-12">
              <div>
                <span className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Beyond the Shrine</span>
                <h3 className="font-serif-display text-3xl font-black text-ivory mb-6">Nearby Sacred Places</h3>
                <p className="text-ivory/60 font-medium leading-relaxed">Enhance your yatra by visiting these significant sister-shrines and natural spiritual wonders nearby.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {sections.nearby.map((n: any, idx: number) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs font-black uppercase tracking-widest hover:bg-gold hover:text-white transition-all cursor-pointer"
                  >
                    {n.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Component 7: FAQ Accordion */}
      {sections.faq && (
        <div className="bg-black/40 py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Knowledge Repository</span>
              <h2 className="font-serif-display text-4xl md:text-6xl font-black text-ivory m-0">Divine Inquiries</h2>
            </div>

            <div className="space-y-4">
              {sections.faq.map((f: any, idx: number) => (
                <motion.details
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white/5 border border-ivory/10 rounded-2xl overflow-hidden transition-all duration-500 open:bg-white/10"
                >
                  <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                    <h4 className="text-ivory text-xl font-bold m-0 pr-8 leading-tight">
                      <span className="text-gold mr-4 font-serif italic text-2xl">Q.</span>
                      {f.q}
                    </h4>
                    <ChevronDown className="text-gold transition-transform duration-500 group-open:rotate-180 shrink-0" size={24} />
                  </summary>
                  <div className="px-8 pb-8 pt-0 text-ivory/70 text-lg leading-relaxed font-medium">
                    <div className="h-px bg-ivory/10 mb-6"></div>
                    {f.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Component 8: CTA Banner */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full bg-[#1A0A00] py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-repeat pointer-events-none" style={{ backgroundImage: "url('/assets/images/temples/pattern.png')" }}></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h2 className="font-serif-display text-4xl md:text-7xl font-bold text-ivory leading-tight">
              Your Divine Experience <br /> <span className="text-gold italic">Awaits</span>
            </h2>
            <p className="text-ivory/60 text-xl font-serif italic leading-relaxed max-w-3xl mx-auto">
              "Let your soul find the peace it seeks while we handle the earthly details of your sacred pilgrimage."
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {[
                { label: "Book Darshan", type: "special-darshan", icon: Sparkles },
                { label: "Plan Yatra", type: "yatra", icon: Compass },
                { label: "Perform Puja", type: "puja", icon: Flame },
                { label: "Order Prasad", type: "prasad", icon: Gift }
              ].map((btn, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: ["0 0 0px var(--gold)", "0 0 20px var(--gold)", "0 0 0px var(--gold)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                  onClick={() => (window as any).triggerDivineBooking?.(btn.type)}
                  className="flex flex-col items-center gap-4 bg-white/5 border border-gold/30 p-8 rounded-3xl hover:bg-gold hover:text-white transition-all group"
                >
                  <btn.icon size={28} className="text-gold group-hover:text-white transition-colors" />
                  <span className="font-black uppercase tracking-[0.2em] text-[10px]">{btn.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
