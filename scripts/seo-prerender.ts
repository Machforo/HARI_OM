import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mammoth from "mammoth";
import { templeMetadata } from "../src/data/templeMetadata";
import { blogs } from "../src/data/blogs";
import { templeFiles, darshanFiles } from "../src/data/templeList";
import { allTemplesMerged } from "../src/data/temples";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, "..", "dist");
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");
const DOMAIN = "https://vandandarshan.com";
const TODAY = new Date().toISOString().split("T")[0];

// Dynamic shloka resolution matching TempleDetail
function getShlokaAndTranslation(deity?: string, baseSlug?: string) {
  const d = (deity || "").toLowerCase();
  const s = (baseSlug || "").toLowerCase();

  if (d.includes("krishna") || d.includes("radha") || s.includes("dwarka") || s.includes("banke") || s.includes("govind")) {
    return {
      shloka: "वसुदेवसुतं देवं कंसचाणूरमर्दनम् । देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम् ॥",
      title: "The Sacred Krishna Maha Mantra",
      translation: "I bow to Lord Krishna, the son of Vasudeva, the killer of Kansa and Chanura, the supreme joy of Devaki, and the spiritual master of the universe."
    };
  }
  if (d.includes("shiva") || d.includes("mahadev") || d.includes("linga") || s.includes("somnath") || s.includes("mallikarjuna") || s.includes("kedarnath") || s.includes("kashi") || s.includes("neelkanth") || s.includes("bhojeshwar") || s.includes("vaikom")) {
    return {
      shloka: "कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् । सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥",
      title: "The Sacred Shiva Yajur Mantra",
      translation: "White as camphor, the incarnation of compassion, the essence of the world, adorned with a snake king garland, always residing in the lotus of my heart, I bow to Shiva and Shakti together."
    };
  }
  if (d.includes("hanuman") || d.includes("anjaneyar") || s.includes("balaji") || s.includes("sankat") || s.includes("salasar") || s.includes("mehandipur")) {
    return {
      shloka: "मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् । वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये ॥",
      title: "The Sacred Hanuman Mantra",
      translation: "I take refuge in the messenger of Lord Rama, who is swift as thought, fast as wind, master of senses, foremost among the wise, son of the wind god, and leader of the monkey forces."
    };
  }
  if (d.includes("rama") || d.includes("ram") || s.includes("ayodhya") || s.includes("kanak") || s.includes("kalaram") || s.includes("bhadrachalam")) {
    return {
      shloka: "रामाय रामभद्राय रामचन्द्राय वेधसे । रघुनाथाय नाथाय सीतायाः पतये नमः ॥",
      title: "The Sacred Rama Mantra",
      translation: "Salutations to Lord Rama, the protector of the righteous, the moon-like lord, the descendant of Raghu, the supreme master and the beloved husband of Sita."
    };
  }
  if (d.includes("ganesha") || d.includes("ganapati") || s.includes("chintaman") || s.includes("dagadusheth") || s.includes("trinetra")) {
    return {
      shloka: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
      title: "The Sacred Ganesha Maha Mantra",
      translation: "O Lord Ganesha of the curved trunk and massive body, shining with the brilliance of a million suns, please make all my works free of obstacles always."
    };
  }
  if (d.includes("durga") || d.includes("devi") || d.includes("shakti") || d.includes("mata") || d.includes("ambadevi") || d.includes("mariamman") || s.includes("mansa") || s.includes("chandi") || s.includes("naina") || s.includes("chintpurni") || s.includes("bhadrakali") || s.includes("tripura")) {
    return {
      shloka: "सर्वमङ्गलमङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥",
      title: "The Sacred Devi Mantra",
      translation: "Auspiciousness of all auspiciousness, the consort of Shiva, the fulfiller of all desires, the protector, the three-eyed one, the golden one, O Narayani, salutations to you."
    };
  }
  return {
    shloka: "ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥",
    title: "The Universal Upanishad Shloka",
    translation: "Lead us from the unreal to the real, from darkness to light, and from death to immortality."
  };
}

// Find docx file by slug matching
function findFile(slug: string, fileList: string[]) {
  if (!slug) return undefined;
  const searchTerm = slug.toLowerCase().replace(/-temple$/, "").replace(/-specialdarshan$/, "").replace(/-/g, " ").trim();
  const searchWords = searchTerm.split(" ").filter(w => w.length > 2);
  let match = fileList.find(f => {
    const fileName = f.toLowerCase();
    return searchWords.length > 0 ? fileName.includes(searchWords[0]) : fileName.includes(searchTerm);
  });
  if (!match && searchTerm.length > 3) {
    const prefix = searchTerm.substring(0, 4);
    match = fileList.find(f => f.toLowerCase().includes(prefix));
  }
  return match;
}

// Clean and Parse Mammoth HTML
function parseMammothHtml(rawHtml: string) {
  let html = rawHtml
    .replace(/Sugam Darshan/g, "Sugam Darshan")
    .replace(/VIP/g, "Special")
    .replace(/<img[^>]*>/gi, ""); // strip images

  // Remove meta leakages
  html = html
    .replace(/<(p|h[1-6]|div|tr|td)[^>]*>(?:<strong>|<em>)?\s*(?:Meta Title|Meta Description|SEO Title|SEO Description|Target Keywords|Focus Keyword|Slug|Title).+?<\/\1>/gi, "")
    .replace(/<(p|h[1-6]|div|tr|td)[^>]*>\s*(?:Meta Title|Meta Description|SEO Title|SEO Description|Target Keywords|Focus Keyword|Slug|Title)\s*<\/\1>\s*<(p|h[1-6]|div|tr|td)[^>]*>.*?<\/\2>/gi, "")
    .replace(/<table>.*?(?:Meta Title|Meta Description).*?<\/table>/gi, "");

  // Apply default classes
  html = html
    .replace(/<h1>/g, '<h2 class="font-serif text-3xl md:text-4xl font-bold mt-12 mb-6 text-secondary leading-tight scroll-mt-24">')
    .replace(/<\/h1>/g, '</h2>')
    .replace(/<h2>/g, '<h3 class="font-serif text-2xl md:text-3xl font-bold mt-10 mb-4 text-secondary scroll-mt-24">')
    .replace(/<\/h2>/g, '</h3>')
    .replace(/<h3>/g, '<h4 class="font-serif text-xl md:text-2xl font-bold mt-8 mb-3 text-gold scroll-mt-24">')
    .replace(/<\/h3>/g, '</h4>')
    .replace(/<table>/g, '<div class="overflow-x-auto my-8 border border-border/40 rounded-2xl"><table class="w-full border-collapse bg-[#FFF8F0]/30 m-0">')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<tr>/g, '<tr class="hover:bg-[#E6A817]/5 transition-colors duration-200">')
    .replace(/<th>/g, '<th class="px-5 py-4 text-left font-black text-xs uppercase tracking-wider text-secondary border-b border-border/25">')
    .replace(/<td>/g, '<td class="border-b border-border/20 px-5 py-4 text-muted-foreground text-sm leading-relaxed font-semibold">')
    .replace(/<ul>/g, '<ul class="list-none my-6 space-y-3 pl-4">')
    .replace(/<li>/g, '<li class="flex items-start gap-3 text-sm font-semibold text-muted-foreground"><span class="text-gold mt-0.5">✦</span><span class="flex-1">')
    .replace(/<\/li>/g, '</span></li>')
    .replace(/<p>/g, '<p class="my-4 leading-[1.8] text-muted-foreground text-sm font-semibold">');

  return html;
}

// Convert docx file to HTML body
async function getDocxBodyHtml(docxPath: string) {
  try {
    const fullPath = path.join(__dirname, "..", "public", docxPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`[PRERENDER] Warning: DOCX file not found at ${fullPath}`);
      return null;
    }
    const result = await mammoth.convertToHtml({ path: fullPath });
    return parseMammothHtml(result.value);
  } catch (error) {
    console.error(`[PRERENDER] Error parsing DOCX ${docxPath}:`, error);
    return null;
  }
}

// Renders the main header
function renderHeader(isHomepage: boolean) {
  return `
  <header class="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl shadow-xl py-1">
    <div class="container mx-auto px-6 py-2 flex items-center justify-between">
      <a href="/" class="flex items-center gap-4 group">
        <div class="relative h-16 w-16">
          <img src="/assets/logo-final.png" alt="Vandan Darshan" class="h-full w-full object-contain" />
        </div>
        <div class="leading-tight">
          <div class="font-serif text-lg font-bold text-secondary">
            <span class="text-primary">Vandan</span> Darshan
          </div>
          <div class="font-devanagari text-[9px] text-gold font-bold uppercase tracking-widest">वन्दन दर्शन</div>
        </div>
      </a>
      <nav class="hidden lg:flex items-center gap-8 text-sm font-bold text-secondary">
        <a href="/temples" class="hover:text-primary">Temples</a>
        <a href="/darshan" class="hover:text-primary">Sugam Darshan</a>
        <a href="/services" class="hover:text-primary">Services</a>
        <a href="/media/blogs" class="hover:text-primary">Spiritual Media</a>
        <a href="/about" class="hover:text-primary">About Us</a>
      </nav>
      <div class="flex gap-4">
        <a href="/book" class="h-10 px-6 rounded-full bg-[#D85A30] hover:bg-[#B04320] text-white flex items-center justify-center text-xs font-black uppercase tracking-wider shadow-md">Book Yatra</a>
      </div>
    </div>
  </header>
  `;
}

// Renders the footer
function renderFooter() {
  return `
  <footer class="mt-24 border-t border-border bg-gradient-to-b from-background to-muted/40 py-16">
    <div class="container mx-auto px-6 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <img src="/assets/logo-final.png" alt="Vandan Darshan" class="h-10 w-10 object-contain" />
          <div class="leading-tight">
            <div class="font-serif text-md font-semibold text-secondary">Vandan Darshan</div>
            <div class="font-devanagari text-xs text-gold">वन्दन दर्शन</div>
          </div>
        </div>
        <p class="text-xs text-muted-foreground leading-relaxed">
          Trusted spiritual concierge for darshan, puja, prasad and chadhava across India's most sacred temples.
        </p>
      </div>
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-secondary mb-4">Explore</h4>
        <ul class="space-y-2 text-xs text-muted-foreground">
          <li><a href="/temples" class="hover:text-primary">All Temples</a></li>
          <li><a href="/services" class="hover:text-primary">Our Services</a></li>
          <li><a href="/media/blogs" class="hover:text-primary">Spiritual Blogs</a></li>
          <li><a href="/about" class="hover:text-primary">About Us</a></li>
          <li><a href="/contact" class="hover:text-primary">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-secondary mb-4">Compliance</h4>
        <ul class="space-y-2 text-xs text-muted-foreground">
          <li><a href="/terms" class="hover:text-primary">Terms & Conditions</a></li>
          <li><a href="/privacy" class="hover:text-primary">Privacy Policy</a></li>
          <li><a href="/cancellation" class="hover:text-primary">Cancellation & Refund</a></li>
          <li><a href="/shipping" class="hover:text-primary">Shipping & Delivery</a></li>
          <li><a href="/disclaimer" class="hover:text-primary">Disclaimer</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-secondary mb-4">Reach Us</h4>
        <ul class="space-y-3 text-xs text-muted-foreground">
          <li><strong>Phone:</strong> +91 89609 65151</li>
          <li><strong>Email:</strong> seva@vandandarshan.com</li>
          <li><strong>Office:</strong> Vandan Darshan Pvt. Ltd., India</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-border mt-12 pt-6">
      <div class="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>© ${new Date().getFullYear()} Vandan Darshan. All rights reserved.</p>
        <p class="font-devanagari text-gold">॥ सर्वे भवन्तु सुखिनः ॥</p>
      </div>
    </div>
  </footer>
  `;
}

// Renders the temple specific layout
function renderTempleLayout(slug: string, name: string, state: string, deity: string, image: string, type: string, parsedBody: string | null) {
  const shloka = getShlokaAndTranslation(deity, slug);
  const isDarshan = type === "darshan";
  const displayType = type === "main" ? "Temple Details" : type.toUpperCase();

  const ctaLinks = `
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 w-full max-w-4xl mx-auto">
    <a href="/${slug}-temple/darshan" class="flex items-center justify-center bg-[#D85A30] hover:bg-[#B04320] text-white rounded-2xl h-14 text-xs font-bold uppercase tracking-wider shadow-md">Book Darshan</a>
    <a href="/${slug}-temple/puja" class="flex items-center justify-center bg-[#6B1A1A] hover:bg-[#521313] text-white rounded-2xl h-14 text-xs font-bold uppercase tracking-wider shadow-md">Book Puja</a>
    <a href="/${slug}-temple/prasad" class="flex items-center justify-center bg-white hover:bg-[#FFF8F0] text-[#1A1240] border border-border rounded-2xl h-14 text-xs font-bold uppercase tracking-wider shadow-md">Order Prasad</a>
    <a href="/${slug}-temple/chadhava" class="flex items-center justify-center bg-white hover:bg-[#FFF8F0] text-[#1A1240] border border-border rounded-2xl h-14 text-xs font-bold uppercase tracking-wider shadow-md">Offer Chadhava</a>
  </div>
  `;

  const bodyContent = parsedBody || `
  <div class="text-center py-20">
    <h2 class="font-serif text-3xl font-bold text-secondary mb-4">Preparation in Progress</h2>
    <p class="text-muted-foreground max-w-md mx-auto mb-8 font-semibold">We are currently preparing the divine details, timings, and custom puja/prasad packages for ${name}.</p>
    <a href="/temples" class="inline-flex h-12 px-8 bg-[#D85A30] hover:bg-[#B04320] text-white items-center rounded-full font-bold uppercase tracking-wider text-xs">Explore Other Shrines</a>
  </div>
  `;

  return `
  <div class="bg-[#FFF8F0] min-h-screen text-[#2E2520] overflow-x-hidden pt-[130px] lg:pt-[150px]">
    <!-- Hero Banner -->
    <section class="relative bg-[#1A1240] text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-40">
        <img src="${image}" alt="${name}" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#1A1240] via-[#1A1240]/70 to-transparent" />
      </div>
      <div class="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
        <div class="space-y-3">
          <p class="font-serif text-lg md:text-xl text-[#E6A817] italic">"${shloka.shloka}"</p>
          <p class="text-[9px] uppercase tracking-widest text-gold/80 font-bold">${shloka.title}</p>
        </div>
        <div class="space-y-2">
          <span class="inline-block text-[10px] font-black uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full text-gold">${state} | Deity: ${deity}</span>
          <h1 class="font-serif text-4xl md:text-6xl font-bold leading-tight">${name}</h1>
          <p class="text-sm text-white/70 max-w-xl mx-auto font-medium">${displayType} & Devotional Services — Assisted Yatra Coordination by Vandan Darshan.</p>
        </div>
        ${ctaLinks}
      </div>
    </section>

    <!-- Eminent Navigation Tabs -->
    <div class="bg-white border-b border-border/40 py-4 sticky top-[80px] lg:top-[110px] z-30">
      <div class="max-w-4xl mx-auto px-6 flex justify-around text-xs font-bold uppercase tracking-wider text-secondary">
        <a href="/${slug}-temple" class="py-2 hover:text-[#D85A30] ${type === 'main' ? 'text-[#D85A30] border-b-2 border-[#D85A30]' : ''}">Temple Info</a>
        <a href="/${slug}-temple/darshan" class="py-2 hover:text-[#D85A30] ${type === 'darshan' ? 'text-[#D85A30] border-b-2 border-[#D85A30]' : ''}">Sugam Darshan</a>
        <a href="/${slug}-temple/puja" class="py-2 hover:text-[#D85A30] ${type === 'puja' ? 'text-[#D85A30] border-b-2 border-[#D85A30]' : ''}">Pooja Sewa</a>
        <a href="/${slug}-temple/prasad" class="py-2 hover:text-[#D85A30] ${type === 'prasad' ? 'text-[#D85A30] border-b-2 border-[#D85A30]' : ''}">Prasad Delivery</a>
        <a href="/${slug}-temple/chadhava" class="py-2 hover:text-[#D85A30] ${type === 'chadhava' ? 'text-[#D85A30] border-b-2 border-[#D85A30]' : ''}">Chadhava</a>
      </div>
    </div>

    <!-- Main Content Body -->
    <div class="container mx-auto px-6 py-16 max-w-4xl">
      <div class="bg-white rounded-3xl p-8 md:p-12 border border-border/40 shadow-sm leading-relaxed prose prose-slate">
        ${bodyContent}
      </div>
    </div>
  </div>
  `;
}

// Renders the static pages (e.g. About, Contact, Services, Home)
function renderStaticPage(pageName: string) {
  if (pageName === "home") {
    return `
    <div class="bg-[#FFF8F0] min-h-screen text-[#2E2520] pt-[130px] lg:pt-[150px]">
      <section class="bg-[#1A1240] text-white py-32 text-center relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <span class="text-[10px] font-black uppercase tracking-widest text-gold bg-white/10 px-4 py-1.5 rounded-full">10,000+ Blessed Journeys</span>
          <h1 class="font-serif text-5xl md:text-7xl font-bold leading-tight">Connect with the Divine Grace</h1>
          <p class="text-lg text-white/70 max-w-xl mx-auto font-medium">We bridge the gap between devotion and logistics. Guided temple darshan, online puja services, and prasad delivery at 100+ holy shrines.</p>
          <div class="flex justify-center gap-4">
            <a href="/temples" class="h-14 px-8 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-full flex items-center justify-center font-bold uppercase tracking-wider text-xs">Explore Shrines</a>
            <a href="/book" class="h-14 px-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center font-bold uppercase tracking-wider text-xs">Book Yatra</a>
          </div>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="py-24 container mx-auto px-6 max-w-5xl">
        <div class="text-center mb-16 space-y-2">
          <span class="text-[10px] uppercase font-black text-gold tracking-widest">Spiritual Offerings</span>
          <h2 class="font-serif text-4xl font-bold text-secondary">Our Sacred Services</h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-8 bg-white border border-border/40 rounded-3xl text-center space-y-4">
            <div class="text-4xl">🛕</div>
            <h3 class="font-serif text-xl font-bold text-secondary">Sugam Darshan</h3>
            <p class="text-xs text-muted-foreground font-semibold">Priority access and guided temple visits for hassle-free worship.</p>
          </div>
          <div class="p-8 bg-white border border-border/40 rounded-3xl text-center space-y-4">
            <div class="text-4xl">🔥</div>
            <h3 class="font-serif text-xl font-bold text-secondary">Pooja Services</h3>
            <p class="text-xs text-muted-foreground font-semibold">Authentic Sankalp Pujas performed by priests in your name.</p>
          </div>
          <div class="p-8 bg-white border border-border/40 rounded-3xl text-center space-y-4">
            <div class="text-4xl">🎁</div>
            <h3 class="font-serif text-xl font-bold text-secondary">Prasad Delivery</h3>
            <p class="text-xs text-muted-foreground font-semibold">Blessed temple prasadam delivered directly to your doorstep.</p>
          </div>
          <div class="p-8 bg-white border border-border/40 rounded-3xl text-center space-y-4">
            <div class="text-4xl">❤️</div>
            <h3 class="font-serif text-xl font-bold text-secondary">Chadhava</h3>
            <p class="text-xs text-muted-foreground font-semibold">Offer vastram, flowers, or shringar to your deity remotely.</p>
          </div>
        </div>
      </section>
    </div>
    `;
  }

  if (pageName === "about") {
    return `
    <div class="bg-white min-h-screen text-secondary pt-[130px] lg:pt-[150px] py-16">
      <div class="container mx-auto px-6 max-w-4xl space-y-12">
        <div class="text-center space-y-4">
          <span class="text-xs uppercase tracking-widest text-gold font-bold">About Us</span>
          <h1 class="font-serif text-4xl md:text-5xl font-bold text-secondary">Devotees, serving devotees.</h1>
          <p class="font-devanagari text-xl text-gold">हर भक्त का दर्शन, हमारा संकल्प</p>
        </div>
        <div class="prose max-w-none text-muted-foreground font-semibold leading-relaxed space-y-6">
          <p>Vandan Darshan was born from a simple belief — that every devotee deserves a peaceful, dignified darshan. We are a team of pilgrims, organisers and locals who came together to make sacred journeys easier for families across India and abroad.</p>
          <p>Today, thousands of devotees trust us each year with their most important journeys — from a senior's first Char Dham yatra to a family's Janmashtami at Dwarka. We treat every booking as a prayer.</p>
        </div>
      </div>
    </div>
    `;
  }

  if (pageName === "contact") {
    return `
    <div class="bg-white min-h-screen text-secondary pt-[130px] lg:pt-[150px] py-16">
      <div class="container mx-auto px-6 max-w-4xl space-y-12">
        <div class="text-center space-y-4">
          <span class="text-xs uppercase tracking-widest text-gold font-bold">Get In Touch</span>
          <h1 class="font-serif text-4xl md:text-5xl font-bold text-secondary">We are here for you</h1>
          <p class="text-muted-foreground max-w-xl mx-auto font-medium">Reach out for darshan bookings, puja arrangements, prasad delivery or any spiritual guidance.</p>
        </div>
        <div class="grid md:grid-cols-2 gap-8 pt-8">
          <div class="p-8 border border-border/40 rounded-3xl bg-card space-y-6">
            <h3 class="font-serif text-xl font-bold">Contact Details</h3>
            <ul class="space-y-4 text-xs font-semibold text-muted-foreground">
              <li><strong>Call us:</strong> +91 89609 65151 (Mon–Sun, 8am – 9pm IST)</li>
              <li><strong>WhatsApp:</strong> +91 89609 65151 (Quick replies, 24×7)</li>
              <li><strong>Email:</strong> seva@vandandarshan.com</li>
              <li><strong>Office:</strong> Vandan Darshan Pvt. Ltd., India</li>
            </ul>
          </div>
          <div class="p-8 border border-border/40 rounded-3xl bg-card">
            <h3 class="font-serif text-xl font-bold mb-4">Request a Callback</h3>
            <p class="text-xs text-muted-foreground mb-6 font-semibold">Share your contact info and our team will get in touch with you shortly.</p>
            <div class="bg-muted/10 p-4 text-center rounded-xl border border-border/20 text-xs font-bold uppercase text-gold">Callback Form Placeholder</div>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  if (pageName === "services") {
    return `
    <div class="bg-[#FFF8F0] min-h-screen text-secondary pt-[130px] lg:pt-[150px] py-16">
      <div class="container mx-auto px-6 max-w-5xl space-y-16">
        <div class="text-center space-y-4">
          <span class="text-xs uppercase tracking-widest text-gold font-bold">Spiritual Offerings</span>
          <h1 class="font-serif text-4xl md:text-5xl font-bold text-secondary">Select a Spiritual Service</h1>
          <p class="text-muted-foreground max-w-xl mx-auto font-medium">Each service comes with comprehensive support, authentic rituals, and personalized guidance from our spiritual team.</p>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="p-10 bg-white border border-border/30 rounded-[3rem] space-y-6">
            <div class="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xl">🛕</div>
            <h2 class="font-serif text-2xl font-bold">Sugam Darshan</h2>
            <p class="text-sm text-muted-foreground font-semibold">Skip the long queues and focus on your prayer. Our on-ground team ensures a seamless, divine experience at India's holiest shrines.</p>
            <ul class="text-xs font-bold space-y-2 text-secondary">
              <li>• Priority Access</li>
              <li>• Verified Local Guides</li>
              <li>• Elderly Assistance</li>
            </ul>
          </div>
          <div class="p-10 bg-white border border-border/30 rounded-[3rem] space-y-6">
            <div class="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">🔥</div>
            <h2 class="font-serif text-2xl font-bold">Pooja Services</h2>
            <p class="text-sm text-muted-foreground font-semibold">Personalized Sankalp Pujas performed by authentic temple priests in your name. Experience the rituals from anywhere in the world.</p>
            <ul class="text-xs font-bold space-y-2 text-secondary">
              <li>• Live Sankalp</li>
              <li>• Authentic Priests</li>
              <li>• Digital Recording</li>
            </ul>
          </div>
          <div class="p-10 bg-white border border-border/30 rounded-[3rem] space-y-6">
            <div class="h-12 w-12 rounded-xl bg-yellow-50 text-[#E6A817] flex items-center justify-center font-bold text-xl">🎁</div>
            <h2 class="font-serif text-2xl font-bold">Prasad Delivery</h2>
            <p class="text-sm text-muted-foreground font-semibold">Authentic temple prasadam sourced directly from the shrine and delivered to your doorstep with purity and devotion.</p>
            <ul class="text-xs font-bold space-y-2 text-secondary">
              <li>• Hygienic Packing</li>
              <li>• Global Shipping</li>
              <li>• Freshly Sourced</li>
            </ul>
          </div>
          <div class="p-10 bg-white border border-border/30 rounded-[3rem] space-y-6">
            <div class="h-12 w-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-xl">❤️</div>
            <h2 class="font-serif text-2xl font-bold">Chadhava Offerings</h2>
            <p class="text-sm text-muted-foreground font-semibold">Offer Vastram, Flowers, or Shringar to your favorite deity. We facilitate your offerings with traditional rituals.</p>
            <ul class="text-xs font-bold space-y-2 text-secondary">
              <li>• Traditional Rituals</li>
              <li>• Video Confirmation</li>
              <li>• Sacred Offerings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  if (["terms", "privacy", "cancellation", "shipping", "disclaimer"].includes(pageName)) {
    let legalTitle = "";
    let legalBody = "";
    if (pageName === "terms") {
      legalTitle = "Terms & Conditions";
      legalBody = `
        <p>Welcome to Vandan Darshan ("we", "us", "our"). By accessing or using our website and services, you ("user", "devotee") agree to these Terms & Conditions. Please read them carefully.</p>
        <h2>1. Nature of services</h2>
        <p>Vandan Darshan is a spiritual concierge that assists devotees with Sugam Darshan coordination, puja booking, prasad delivery, chadhava and yatra arrangements at various temples in India and abroad. We act as a facilitator and are not affiliated with any temple trust unless expressly stated.</p>
        <h2>2. Bookings</h2>
        <ul>
          <li>All bookings are subject to availability of temple slots, festival schedules and trust regulations.</li>
          <li>We reserve the right to accept or decline any booking at our discretion.</li>
          <li>Confirmation is provided only after our team has spoken to you and the booking is paid for in full.</li>
        </ul>
        <h2>3. Pricing</h2>
        <p>Prices vary by temple, service and date. All quoted prices include service charges; temple-specific donations or government taxes may be additional and will be communicated upfront.</p>
        <h2>4. User responsibilities</h2>
        <ul>
          <li>You must provide accurate personal details (name, age, ID) for darshan registrations.</li>
          <li>You must follow temple rules, dress code and instructions of on-ground staff.</li>
          <li>Any misuse of VIP passes, falsification of identity or breach of temple regulations is solely your responsibility.</li>
        </ul>
        <h2>5. Limitation of liability</h2>
        <p>While we make every effort to ensure a smooth experience, we are not liable for delays, cancellations or restrictions imposed by temple authorities, weather, force majeure events, or government orders. Our total liability is limited to the amount paid for the specific service.</p>
        <h2>6. Intellectual property</h2>
        <p>All content on this website — text, images, logos and design — is the property of Vandan Darshan and may not be reproduced without written permission.</p>
        <h2>7. Governing law</h2>
        <p>These Terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of courts in our registered office location.</p>
        <h2>8. Changes</h2>
        <p>We may update these Terms from time to time. The latest version will always be available on this page.</p>
        <h2>9. Contact</h2>
        <p>For any queries, write to <a href="mailto:seva@vandandarshan.com" class="text-primary hover:underline">seva@vandandarshan.com</a> or call +91 89609 65151.</p>
      `;
    } else if (pageName === "privacy") {
      legalTitle = "Privacy Policy";
      legalBody = `
        <p>Vandan Darshan respects your privacy. This policy explains what we collect, how we use it, and your rights.</p>
        <h2>1. Information we collect</h2>
        <ul>
          <li><b>Personal details:</b> name, phone, email, address, age, ID for temple bookings.</li>
          <li><b>Booking details:</b> temple, service, date, number of devotees and special requests.</li>
          <li><b>Payment details:</b> processed by secure third-party gateways; we do not store full card information.</li>
          <li><b>Technical data:</b> device, browser, IP, anonymised analytics.</li>
        </ul>
        <h2>2. How we use it</h2>
        <ul>
          <li>To process your booking and coordinate with temple authorities.</li>
          <li>To contact you regarding your request, updates or related services.</li>
          <li>To improve our website, services and customer support.</li>
          <li>To meet legal and regulatory obligations.</li>
        </ul>
        <h2>3. Sharing</h2>
        <p>We share information only with: temple authorities (where required for darshan/puja), verified on-ground partners, payment processors, and government bodies when legally required. We do not sell your data to third parties.</p>
        <h2>4. Data retention</h2>
        <p>We retain personal data only as long as necessary to fulfil the booking and meet legal requirements.</p>
        <h2>5. Security</h2>
        <p>We use industry-standard encryption and access controls. However, no method of transmission over the internet is 100% secure.</p>
        <h2>6. Your rights</h2>
        <ul>
          <li>Access, correct or delete your personal data.</li>
          <li>Opt out of marketing communications at any time.</li>
          <li>Lodge a complaint with the relevant data protection authority.</li>
        </ul>
        <h2>7. Cookies</h2>
        <p>Our site uses essential cookies for functionality and analytics cookies to improve user experience. You may disable cookies in your browser.</p>
        <h2>8. Contact</h2>
        <p>For privacy queries, write to <a href="mailto:seva@vandandarshan.com" class="text-primary hover:underline">seva@vandandarshan.com</a>.</p>
      `;
    } else if (pageName === "cancellation") {
      legalTitle = "Cancellation & Refund Policy";
      legalBody = `
        <p>We understand that plans can change. Below are our cancellation and refund terms — designed to be fair to both devotees and our on-ground partners.</p>
        <h2>1. Cancellation by devotee</h2>
        <ul>
          <li><b>72+ hours before service:</b> 90% refund (10% processing fee).</li>
          <li><b>48–72 hours before service:</b> 50% refund.</li>
          <li><b>24–48 hours before service:</b> 25% refund.</li>
          <li><b>Less than 24 hours / no-show:</b> No refund.</li>
        </ul>
        <h2>2. Special service exceptions</h2>
        <ul>
          <li>Festival darshan, helicopter yatra, and special pujas are <b>non-refundable</b> once confirmed, due to advance bookings with temple trusts and operators.</li>
          <li>Prasad delivery is non-refundable once dispatched.</li>
          <li>Chadhava / offerings made on your behalf are non-refundable once performed.</li>
        </ul>
        <h2>3. Cancellation by Vandan Darshan</h2>
        <p>If we are unable to provide a confirmed service (other than due to force majeure), you will receive a 100% refund or an option to reschedule.</p>
        <h2>4. Force majeure</h2>
        <p>Cancellations due to weather, natural disasters, government orders, temple closures, or any event beyond our control are non-refundable. We will, however, do our best to reschedule the service.</p>
        <h2>5. Refund process</h2>
        <ul>
          <li>Approved refunds are initiated within 3 business days.</li>
          <li>Refunds reach the original payment source in 5–10 business days, depending on your bank.</li>
          <li>Bank/gateway charges (if any) may be deducted.</li>
        </ul>
        <h2>6. How to request</h2>
        <p>Email <a href="mailto:seva@vandandarshan.com" class="text-primary hover:underline">seva@vandandarshan.com</a> with your booking reference and reason. Our team will respond within 24 hours.</p>
      `;
    } else if (pageName === "shipping") {
      legalTitle = "Shipping & Delivery Policy";
      legalBody = `
        <p>This policy covers the delivery of prasad, sankalp photos/videos, certificates and any other physical items dispatched by Vandan Darshan.</p>
        <h2>1. Prasad delivery</h2>
        <ul>
          <li>Prasad is dispatched within 3–7 working days after the service is performed at the temple.</li>
          <li>Standard delivery within India: 4–10 business days from dispatch.</li>
          <li>International delivery: 10–25 business days, subject to customs.</li>
          <li>Tracking details are shared via SMS/email/WhatsApp once dispatched.</li>
        </ul>
        <h2>2. Digital deliverables</h2>
        <p>Sankalp video, photos and digital certificates are shared via WhatsApp and email within 24–72 hours of the service.</p>
        <h2>3. Charges</h2>
        <p>Standard shipping within India is included for most prasad packages. Express, international or oversized shipments may carry additional charges, communicated upfront.</p>
        <h2>4. Delays</h2>
        <p>Delays may occur due to courier issues, weather, festivals or customs. We are not liable for delays caused by third-party logistics partners.</p>
        <h2>5. Damage / non-receipt</h2>
        <p>Report any damage or non-delivery within 7 days of expected delivery to <a href="mailto:seva@vandandarshan.com" class="text-primary hover:underline">seva@vandandarshan.com</a>. We will investigate and re-ship at no cost where applicable.</p>
        <h2>6. Address accuracy</h2>
        <p>Please ensure your shipping address and contact number are accurate. Re-shipping due to incorrect address may incur additional charges.</p>
      `;
    } else if (pageName === "disclaimer") {
      legalTitle = "Disclaimer";
      legalBody = `
        <p>The information and services provided by Vandan Darshan are for general informational and facilitation purposes only.</p>
        <h2>1. Independent service provider</h2>
        <p>Vandan Darshan is an independent service provider and is not affiliated, endorsed by, or associated with any temple trust, religious body or government authority unless expressly stated. All temple names, logos and references are used only for identification and information purposes.</p>
        <h2>2. Information accuracy</h2>
        <p>We make every effort to ensure timings, festival dates, aarti schedules and travel information are accurate. However, these are subject to change by temple authorities. Please confirm critical details before travel.</p>
        <h2>3. Religious sentiments</h2>
        <p>Vandan Darshan respects all faiths and religious sentiments. Information published is meant to assist devotees and should not be interpreted as a religious authority.</p>
        <h2>4. Third-party links</h2>
        <p>Our website may contain links to third-party websites for travel, payment or partner services. We are not responsible for the content or practices of those websites.</p>
        <h2>5. Reviews & testimonials</h2>
        <p>Devotee testimonials shown on this website are real but individual experiences and outcomes may vary.</p>
        <h2>6. No medical or legal advice</h2>
        <p>Content on this website is not medical, legal or financial advice. Pilgrims with health conditions should consult their physician before undertaking strenuous yatras.</p>
        <h2>7. Contact</h2>
        <p>Questions? Write to <a href="mailto:seva@vandandarshan.com" class="text-primary hover:underline">seva@vandandarshan.com</a>.</p>
      `;
    }

    return `
    <div class="bg-white min-h-screen text-secondary pt-[130px] lg:pt-[150px] py-16">
      <div class="container mx-auto px-6 max-w-4xl">
        <p class="text-xs uppercase tracking-[0.3em] font-semibold text-gold">Compliance</p>
        <h1 class="font-serif text-5xl font-semibold mt-3">${legalTitle}</h1>
        <p class="text-xs text-muted-foreground mt-3">Last updated: April 2026</p>
        <div class="text-center font-devanagari text-gold my-8 text-xl">॥ ॐ ॥</div>
        <article class="prose max-w-none text-muted-foreground font-semibold leading-relaxed space-y-6">
          ${legalBody}
        </article>
      </div>
    </div>
    `;
  }

  if (pageName === "thank-you") {
    return `
    <div class="bg-white min-h-screen text-secondary pt-[130px] lg:pt-[150px] py-16 text-center">
      <div class="container mx-auto px-6 max-w-2xl space-y-8">
        <div class="h-20 w-20 mx-auto rounded-full bg-[#E6A817]/10 text-gold flex items-center justify-center font-bold text-3xl">✓</div>
        <p class="font-devanagari text-2xl text-gold">॥ धन्यवाद ॥</p>
        <h1 class="font-serif text-5xl font-bold text-secondary">Thank you for your blessing.</h1>
        <p class="text-muted-foreground font-semibold leading-relaxed">Your request has been received. Our team will call you within <b>30 minutes</b> to confirm the details and guide you through the next steps.</p>
        <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#E6A817]/10 border border-[#E6A817]/30 text-xs font-semibold text-secondary">
          <span>Expect a call from <span class="text-primary font-bold">+91 89609 65151</span> within 30 minutes</span>
        </div>
        <div class="flex gap-4 justify-center pt-8">
          <a href="/book" class="h-12 px-8 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-full flex items-center justify-center text-xs font-bold uppercase tracking-wider">Book Another Service</a>
          <a href="/temples" class="h-12 px-8 bg-white hover:bg-[#FFF8F0] text-[#1A1240] border border-border rounded-full flex items-center justify-center text-xs font-bold uppercase tracking-wider">Explore Temples</a>
        </div>
      </div>
    </div>
    `;
  }

  if (pageName === "consultant") {
    return `
    <div class="bg-white min-h-screen text-secondary pt-[130px] lg:pt-[150px] py-16">
      <div class="container mx-auto px-6 max-w-4xl space-y-12 text-center">
        <div class="h-16 w-16 mx-auto rounded-full bg-[#E6A817]/10 text-gold flex items-center justify-center font-bold text-2xl">✦</div>
        <h1 class="font-serif text-5xl font-bold text-secondary">Your Divine Spiritual Consultant</h1>
        <p class="text-muted-foreground font-semibold max-w-2xl mx-auto leading-relaxed">Seek guidance for your spiritual journey. Ask questions about daily rituals, temple histories, or share your kundli details for personalized astrological insights based on ancient Vedic wisdom.</p>
        <div class="bg-[#FFF8F0] p-12 rounded-[2rem] border border-border/40 text-left space-y-6">
          <h3 class="font-serif text-2xl font-bold text-secondary">Chat with our Vedic Assistant</h3>
          <p class="text-xs text-muted-foreground font-semibold">Our Vedic AI assistant and experienced coordinators are ready to help you plan your pilgrimage or assist with astrological queries.</p>
          <div class="bg-white p-6 rounded-2xl border border-border/20 text-center font-bold text-gold text-sm">Spiritual AI Chat Box (Hydrates dynamically on mount)</div>
        </div>
      </div>
    </div>
    `;
  }

  if (pageName === "temples") {
    return `
    <div class="bg-[#FFF8F0] min-h-screen text-secondary pt-[130px] lg:pt-[150px] py-16">
      <div class="container mx-auto px-6 max-w-5xl space-y-12">
        <div class="text-center space-y-4">
          <span class="text-xs uppercase tracking-widest text-gold font-bold">Divine Shrines</span>
          <h1 class="font-serif text-5xl font-bold text-secondary">Holy Temples of India</h1>
          <p class="text-muted-foreground font-semibold max-w-xl mx-auto leading-relaxed">Explore and plan your assisted yatra, booking for Sugam Darshan, and online puja coordination across 90+ sacred places of worship in India.</p>
        </div>
        <div class="bg-white rounded-[2rem] p-12 border border-border/40 shadow-sm text-center">
          <p class="text-muted-foreground font-semibold mb-8">All holy temples are listed here with detailed timings, travel routes, and booking facilities.</p>
          <a href="/book" class="h-12 px-8 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-full inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider">Book Yatra Services</a>
        </div>
      </div>
    </div>
    `;
  }

  if (["darshan", "puja", "prasad", "chadhava"].includes(pageName)) {
    const titles = {
      darshan: "Sugam Darshan",
      puja: "Pooja Services",
      prasad: "Prasad Delivery",
      chadhava: "Chadhava Offerings"
    };
    const details = {
      darshan: "Priority access, elderly-friendly logistics, and on-ground assistant yatra coordination at India's most visited holy shrines.",
      puja: "Authentic, priest-guided pujas performed in your name with gotra-based Sankalps, live video confirmations, and blessed prasad delivery.",
      prasad: "Sourced fresh directly from the respective temple trust, packaged hygienically and shipped globally to your doorstep with ultimate devotion.",
      chadhava: "Offer silk vastram, fresh floral garlands, or traditional shringar ornaments to the deities remotely, with video confirmation of the ceremony."
    };
    const displayTitle = titles[pageName as keyof typeof titles];
    const displayDetail = details[pageName as keyof typeof details];

    return `
    <div class="bg-[#FFF8F0] min-h-screen text-secondary pt-[130px] lg:pt-[150px] py-16">
      <div class="container mx-auto px-6 max-w-5xl space-y-12 text-center">
        <span class="text-xs uppercase tracking-widest text-gold font-bold">Spiritual Offerings</span>
        <h1 class="font-serif text-5xl font-bold text-secondary">${displayTitle} Coordination</h1>
        <p class="text-muted-foreground font-semibold max-w-2xl mx-auto leading-relaxed">${displayDetail}</p>
        <div class="bg-white rounded-[2.5rem] p-12 border border-border/40 text-left grid md:grid-cols-2 gap-8 items-center">
          <div class="space-y-6">
            <h3 class="font-serif text-2xl font-bold text-secondary">Why choose Vandan Darshan?</h3>
            <ul class="space-y-4 text-xs font-bold text-muted-foreground pl-4 list-disc">
              <li>Assisted queuing & local Pandit support</li>
              <li>Gotra-based Sankalp & authentic rituals</li>
              <li>Hygienic vacuum-sealed packaging</li>
              <li>Timely shipping with live tracking</li>
            </ul>
            <a href="/book" class="h-12 px-8 bg-[#D85A30] hover:bg-[#B04320] text-white rounded-full inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider">Book Assisted Yatra</a>
          </div>
          <div class="bg-[#FFF8F0] rounded-[2rem] p-8 border border-border/20 text-center font-bold text-gold text-sm">
            Temple Booking Form (Hydrates dynamically on mount)
          </div>
        </div>
      </div>
    </div>
    `;
  }

  // Fallback default
  return `
  <div class="bg-[#FFF8F0] min-h-screen text-secondary pt-[130px] lg:pt-[150px] py-16 text-center">
    <div class="container mx-auto px-6 max-w-2xl">
      <h1 class="font-serif text-4xl font-bold mb-4">${pageName.toUpperCase()}</h1>
      <p class="text-muted-foreground font-semibold mb-8">This page is pre-rendered and fully optimized for search engines.</p>
      <a href="/" class="h-12 px-8 bg-primary text-white rounded-full inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider">Back to Home</a>
    </div>
  </div>
  `;
}

// Generate JSON-LD Schema Script
function generateSchema(pageName: string, data?: any) {
  let schema: any = null;

  if (pageName === "home") {
    schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ReligiousOrganization",
          "@id": `${DOMAIN}/#organization`,
          "name": "Vandan Darshan",
          "url": DOMAIN,
          "logo": {
            "@type": "ImageObject",
            "url": `${DOMAIN}/assets/logo-final.png`
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8960965151",
            "contactType": "customer service",
            "email": "seva@vandandarshan.com",
            "areaServed": "IN",
            "availableLanguage": ["Hindi", "English"]
          },
          "sameAs": [
            "https://www.facebook.com/share/1D6e26vwF7/?mibextid=wwXIfr",
            "https://www.instagram.com/vandandarshanofficial?igsh=dXJ4eXY0bmQ1ZWZq&utm_source=qr"
          ]
        },
        {
          "@type": "WebSite",
          "@id": `${DOMAIN}/#website`,
          "url": DOMAIN,
          "name": "Vandan Darshan",
          "description": "Trusted spiritual concierge for Sugam Darshan, puja, prasad and chadhava across India's most sacred temples.",
          "publisher": {
            "@id": `${DOMAIN}/#organization`
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${DOMAIN}/temples?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }
      ]
    };
  } else if (pageName === "temple") {
    const { name, state, deity, image, slug, desc } = data;
    schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TouristAttraction",
          "name": name,
          "description": desc || `${name} is a sacred temple in ${state}, dedicated to ${deity}.`,
          "image": image,
          "address": {
            "@type": "PostalAddress",
            "addressRegion": state,
            "addressCountry": "IN"
          },
          "touristType": "Pilgrim",
          "isAccessibleForFree": "true"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
            { "@type": "ListItem", "position": 2, "name": "Temples", "item": `${DOMAIN}/temples` },
            { "@type": "ListItem", "position": 3, "name": name, "item": `${DOMAIN}/${slug}-temple` }
          ]
        }
      ]
    };
  } else if (pageName === "temple-service") {
    const { name, state, deity, slug, serviceTitle, type } = data;
    schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": `${serviceTitle} at ${name}`,
          "description": `Book authentic ${serviceTitle} at ${name}. Professional assistance, verified priests, and hassle-free spiritual services.`,
          "provider": {
            "@type": "Organization",
            "name": "Vandan Darshan",
            "url": DOMAIN
          },
          "areaServed": {
            "@type": "State",
            "name": state
          },
          "serviceType": serviceTitle
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
            { "@type": "ListItem", "position": 2, "name": "Temples", "item": `${DOMAIN}/temples` },
            { "@type": "ListItem", "position": 3, "name": name, "item": `${DOMAIN}/${slug}-temple` },
            { "@type": "ListItem", "position": 4, "name": serviceTitle, "item": `${DOMAIN}/${slug}-temple/${type}` }
          ]
        }
      ]
    };
  } else if (pageName === "blog") {
    const { blog } = data;
    schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "headline": blog.title,
          "description": blog.excerpt,
          "image": blog.image,
          "datePublished": blog.date,
          "author": {
            "@type": "Person",
            "name": blog.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Vandan Darshan",
            "logo": {
              "@type": "ImageObject",
              "url": `${DOMAIN}/assets/logo-final.png`
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${DOMAIN}/media/blogs/${blog.slug}`
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
            { "@type": "ListItem", "position": 2, "name": "Blogs", "item": `${DOMAIN}/media/blogs` },
            { "@type": "ListItem", "position": 3, "name": blog.title, "item": `${DOMAIN}/media/blogs/${blog.slug}` }
          ]
        }
      ]
    };
  } else {
    // Default breadcrumb for simple pages
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
        { "@type": "ListItem", "position": 2, "name": pageName.toUpperCase(), "item": `${DOMAIN}/${pageName}` }
      ]
    };
  }

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// Writes a single consolidated sitemap.xml directly to /public and /dist
function writeSitemaps() {
  console.log("\n[SITEMAP] Generating a single sitemap.xml...");

  const makeEntry = (url: string, priority = "0.7", changefreq = "weekly") => `  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

  const entries: string[] = [];

  // 1. Pages entries
  const staticPages = [
    "/", "/temples", "/services", "/about", "/contact", "/book", 
    "/media/blogs", "/darshan", "/puja", "/prasad", "/chadhava", 
    "/consultant", "/thank-you", "/terms", "/privacy", "/cancellation", 
    "/shipping", "/disclaimer"
  ];
  for (const p of staticPages) {
    entries.push(makeEntry(p, p === "/" ? "1.0" : "0.9", "daily"));
  }

  // 2. Temple and Service entries
  for (const t of allTemplesMerged) {
    entries.push(makeEntry(`/${t.slug}-temple`, "0.9"));
    entries.push(makeEntry(`/${t.slug}-temple/darshan`, "0.95"));
    for (const svc of ["puja", "prasad", "chadhava"]) {
      entries.push(makeEntry(`/${t.slug}-temple/${svc}`, "0.8"));
    }
  }

  // 3. Blog entries
  for (const b of blogs) {
    entries.push(makeEntry(`/media/blogs/${b.slug}`, "0.8", "weekly"));
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  const publicPath = path.join(PUBLIC_DIR, "sitemap.xml");
  const distPath = path.join(DIST_DIR, "sitemap.xml");
  
  fs.writeFileSync(publicPath, sitemapXml, "utf8");
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(distPath, sitemapXml, "utf8");
  }

  // Clean up any old split files to avoid search engine confusion
  const filesToDelete = [
    "sitemap-pages.xml",
    "sitemap-temples.xml",
    "sitemap-services.xml",
    "sitemap-blog.xml"
  ];
  for (const filename of filesToDelete) {
    const pubFile = path.join(PUBLIC_DIR, filename);
    const distFile = path.join(DIST_DIR, filename);
    if (fs.existsSync(pubFile)) fs.unlinkSync(pubFile);
    if (fs.existsSync(distFile)) fs.unlinkSync(distFile);
  }

  console.log("✅ Consolidated sitemap.xml generated successfully. Old split files removed.");
}

// Main prerendering orchestration function
async function prerenderAll() {
  console.log("\n[PRERENDER] Initiating static prerendering process...");

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`[PRERENDER] Error: Production template not found at ${TEMPLATE_PATH}. Did you run 'vite build'?`);
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");

  // Dynamically read actual docx files from disk to prevent mismatches
  const templesDir = path.join(__dirname, "..", "public", "assets", "content", "temples");
  const darshanDir = path.join(__dirname, "..", "public", "assets", "content", "darshan");
  const actualTempleFiles = fs.existsSync(templesDir) ? fs.readdirSync(templesDir) : [];
  const actualDarshanFiles = fs.existsSync(darshanDir) ? fs.readdirSync(darshanDir) : [];

  // Helper to replace tags in head
  const compilePage = (bodyHtml: string, meta: { title: string; description: string; canonical: string; image?: string }, schemaHtml: string) => {
    let pageHtml = template;

    // Inject fully rendered HTML into root
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

    const finalTitle = meta.title.length > 60 ? meta.title.slice(0, 57) + "..." : meta.title;
    const finalDesc = meta.description.length > 160 ? meta.description.slice(0, 157) + "..." : meta.description;
    const finalImage = meta.image || `${DOMAIN}/assets/logo-final.png`;

    // Replace headers
    pageHtml = pageHtml
      .replace(/<title>.*?<\/title>/i, `<title>${finalTitle}</title>`)
      .replace(/<meta name="description" content=".*?"\s*\/?>/i, `<meta name="description" content="${finalDesc}" />`)
      .replace(/<link rel="canonical" href=".*?"\s*\/?>/i, `<link rel="canonical" href="${meta.canonical}" />`)
      // Open Graph
      .replace(/<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${finalTitle}" />`)
      .replace(/<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${finalDesc}" />`)
      .replace(/<meta property="og:url" content=".*?"\s*\/?>/i, `<meta property="og:url" content="${meta.canonical}" />`)
      .replace(/<meta property="og:image" content=".*?"\s*\/?>/i, `<meta property="og:image" content="${finalImage}" />`)
      // Twitter Card
      .replace(/<meta name="twitter:title" content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${finalTitle}" />`)
      .replace(/<meta name="twitter:description" content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${finalDesc}" />`);

    // Inject Twitter image if not already there, otherwise replace
    if (pageHtml.includes('name="twitter:image"')) {
      pageHtml = pageHtml.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${finalImage}" />`);
    } else {
      pageHtml = pageHtml.replace('</head>', `<meta name="twitter:image" content="${finalImage}" />\n</head>`);
    }

    // Inject schema inside head
    pageHtml = pageHtml.replace('</head>', `${schemaHtml}\n</head>`);

    return pageHtml;
  };

  const writePage = (routePath: string, htmlContent: string) => {
    const cleanPath = routePath.replace(/^\//, "");
    const pageDir = path.join(DIST_DIR, cleanPath);
    fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(path.join(pageDir, "index.html"), htmlContent, "utf8");
  };

  // 1. Prerender Static Pages
  const staticPagesList = [
    { path: "/about", name: "about", title: "About Vandan Darshan — Devotees serving devotees", desc: "Vandan Darshan is a trusted spiritual concierge spreading devotion through Sugam Darshan, puja, prasad and chadhava across India's most sacred temples." },
    { path: "/contact", name: "contact", title: "Contact Vandan Darshan — Get in touch with our team", desc: "Reach Vandan Darshan for Sugam Darshan bookings, puja, prasad and yatra assistance. Call, email or request a callback — we respond within 30 minutes." },
    { path: "/services", name: "services", title: "Spiritual Services — Sugam Darshan, Puja & Prasad | Vandan Darshan", desc: "Comprehensive spiritual services including sugam darshan assistance, authentic puja bookings, and global prasad delivery from India's sacred shrines." },
    { path: "/book", name: "book", title: "Get Sugam Darshan, Puja or Prasad — Vandan Darshan", desc: "Book Sugam Darshan, puja, prasad delivery or chadhava across India. Share your details — Vandan Darshan team responds within 30 minutes." },
    { path: "/media/blogs", name: "blogs", title: "Spiritual Media, Blogs & Aarti Ceremonies | Vandan Darshan", desc: "Read insightful spiritual blogs, watch mesmerizing live aarti ceremonies, and discover news about major temple festivals in India." },
    { path: "/temples", name: "temples", title: "Explore Holy Temples in India — Timings, History & Travel | Vandan Darshan", desc: "Browse 90+ sacred temples in India. View darshan timings, detailed travel guides, spiritual significance, and book guided pujas and prasads." },
    { path: "/darshan", name: "darshan", title: "Sugam Darshan Booking & Assisted Temple Yatras | Vandan Darshan", desc: "Book assisted Sugam Darshan at India's top holy shrines. Get queue-free entries, elderly support, gotra sankalps, and hassle-free spiritual travels." },
    { path: "/puja", name: "puja", title: "Online Puja Booking & Gotra-Based Sankalps | Vandan Darshan", desc: "Book authentic online pujas at India's sacred temples. Get personalized Gotra sankalps performed by certified priests with live video confirmation." },
    { path: "/prasad", name: "prasad", title: "Online Prasad Delivery from Sacred Temples | Vandan Darshan", desc: "Order authentic temple prasadam online. Sourced fresh from holy shrines like Somnath, Kedarnath, and Mahakaleshwar, delivered worldwide." },
    { path: "/chadhava", name: "chadhava", title: "Offer Chadhava, Vastram & Shringar Remotely | Vandan Darshan", desc: "Offer vastram, flowers, shringar, or chadhava to your beloved deity from anywhere. Verified offerings with traditional rituals and video proof." },
    { path: "/consultant", name: "consultant", title: "Talk to a Spiritual Consultant — Yatra Planning | Vandan Darshan", desc: "Speak with our expert spiritual coordinators. Get custom itineraries, senior-friendly yatra routes, and customized booking assistance." },
    { path: "/thank-you", name: "thank-you", title: "Thank You for Your Booking Request | Vandan Darshan", desc: "Thank you for choosing Vandan Darshan. Our spiritual yatra coordinators will contact you within 30 minutes to finalize your booking." },
    { path: "/terms", name: "terms", title: "Terms and Conditions — Vandan Darshan", desc: "Read the Terms and Conditions of Vandan Darshan. Understand our booking policies, devotee codes of conduct, and yatra service terms." },
    { path: "/privacy", name: "privacy", title: "Privacy Policy — Vandan Darshan", desc: "Review the privacy policy of Vandan Darshan. Learn how we collect, store, protect, and handle your personal booking details securely." },
    { path: "/cancellation", name: "cancellation", title: "Cancellation and Refund Policy — Vandan Darshan", desc: "Learn about our cancellation and refund rules. Flexible refund options for pujas, prasads, and guided darshan booking cancellations." },
    { path: "/shipping", name: "shipping", title: "Shipping and Delivery Policy — Vandan Darshan", desc: "Read shipping and delivery rules for prasad and chadhava items. Standard transit timelines, packaging, and international shipping options." },
    { path: "/disclaimer", name: "disclaimer", title: "Disclaimer — Vandan Darshan", desc: "View the Vandan Darshan disclaimer. We are a spiritual concierge service and operate independently of official temple boards." }
  ];

  for (const page of staticPagesList) {
    const bodyHtml = renderHeader(false) + renderStaticPage(page.name) + renderFooter();
    const meta = { title: page.title, description: page.desc, canonical: `${DOMAIN}${page.path}` };
    const schema = generateSchema(page.name);
    const html = compilePage(bodyHtml, meta, schema);
    writePage(page.path, html);
  }

  // Prerender Homepage directly over dist/index.html
  const homeBody = renderHeader(true) + renderStaticPage("home") + renderFooter();
  const homeMeta = {
    title: "Vandan Darshan — Sugam Darshan, Puja & Prasad across India",
    description: "Trusted spiritual concierge for Sugam Darshan, puja, prasad and chadhava across India's most sacred temples.",
    canonical: `${DOMAIN}/`
  };
  const homeSchema = generateSchema("home");
  const homeHtml = compilePage(homeBody, homeMeta, homeSchema);
  fs.writeFileSync(TEMPLATE_PATH, homeHtml, "utf8");

  // 2. Prerender Blogs
  for (const b of blogs) {
    const blogBody = renderHeader(false) + `
    <div class="bg-white pt-[130px] lg:pt-[150px] py-16">
      <article class="container mx-auto px-6 max-w-3xl space-y-8">
        <span class="inline-block px-4 py-1.5 bg-primary/15 text-primary rounded-full text-xs font-bold uppercase tracking-wider">${b.category}</span>
        <h1 class="font-serif text-4xl md:text-6xl font-bold text-secondary leading-tight">${b.title}</h1>
        <div class="flex items-center gap-6 text-xs text-muted-foreground font-semibold pb-6 border-b">
          <span>By ${b.author}</span>
          <span>•</span>
          <span>${b.date}</span>
        </div>
        <p class="font-serif text-xl text-secondary italic font-bold leading-relaxed border-l-4 border-primary pl-6">${b.excerpt}</p>
        <div class="prose max-w-none text-muted-foreground font-semibold leading-relaxed space-y-6">${b.content}</div>
      </article>
    </div>
    ` + renderFooter();

    const blogMeta = {
      title: `${b.title} | Vandan Darshan`,
      description: b.excerpt,
      canonical: `${DOMAIN}/media/blogs/${b.slug}`,
      image: b.image
    };
    const blogSchema = generateSchema("blog", { blog: b });
    const blogHtml = compilePage(blogBody, blogMeta, blogSchema);
    writePage(`/media/blogs/${b.slug}`, blogHtml);
  }

  // 3. Prerender Temples & Temple Services
  let generatedCount = 0;
  for (const t of allTemplesMerged) {
    const baseSlug = t.slug;
    const metadata = templeMetadata[baseSlug] || {};
    const name = metadata.name || t.name;
    const state = metadata.state || "India";
    const deity = metadata.deity || "Deity";
    const image = metadata.image || `${DOMAIN}/assets/images/og-image.jpg`;

    // A. Main Temple Page
    const mainDocx = findFile(baseSlug, actualTempleFiles);
    const mainBodyParsed = mainDocx ? await getDocxBodyHtml(`assets/content/temples/${mainDocx}`) : null;
    const mainBody = renderHeader(false) + renderTempleLayout(baseSlug, name, state, deity, image, "main", mainBodyParsed) + renderFooter();
    const mainMeta = {
      title: `${name} Darshan, Timings, History & Info | Vandan Darshan`,
      description: `Explore ${name} in ${state}. Discover darshan timings, sacred history, significance, rituals, and plan your guided pilgrimage with Vandan Darshan.`,
      canonical: `${DOMAIN}/${baseSlug}-temple`,
      image: image
    };
    const mainSchema = generateSchema("temple", { name, state, deity, image, slug: baseSlug, desc: mainMeta.description });
    const mainHtml = compilePage(mainBody, mainMeta, mainSchema);
    writePage(`/${baseSlug}-temple`, mainHtml);

    // B. Darshan (Sugam Darshan) Page
    const darshanDocx = findFile(baseSlug, actualDarshanFiles);
    const darshanBodyParsed = darshanDocx ? await getDocxBodyHtml(`assets/content/darshan/${darshanDocx}`) : null;
    const darshanBody = renderHeader(false) + renderTempleLayout(baseSlug, name, state, deity, image, "darshan", darshanBodyParsed) + renderFooter();
    const darshanMeta = {
      title: `${name} Sugam Darshan & VIP Booking | Vandan Darshan`,
      description: `Book guided Sugam Darshan at ${name}, ${state} with an expert Pandit Ji. Seamless queue assistance, gotra sankalp and yatra support.`,
      canonical: `${DOMAIN}/${baseSlug}-temple/darshan`,
      image: image
    };
    const darshanSchema = generateSchema("temple-service", { name, state, deity, slug: baseSlug, serviceTitle: "Sugam Darshan", type: "darshan" });
    const darshanHtml = compilePage(darshanBody, darshanMeta, darshanSchema);
    writePage(`/${baseSlug}-temple/darshan`, darshanHtml);

    // C. Service Pages: Puja, Prasad, Chadhava
    const serviceTitles = {
      puja: "Pooja Services",
      prasad: "Prasad Delivery",
      chadhava: "Chadhava Offerings"
    };

    for (const [svcType, svcTitle] of Object.entries(serviceTitles)) {
      // In service pages, we use the main temple docx as official detail fallback
      const svcBody = renderHeader(false) + renderTempleLayout(baseSlug, name, state, deity, image, svcType, mainBodyParsed) + renderFooter();
      const svcMeta = {
        title: `${name} ${svcTitle} Booking & Online Puja | Vandan Darshan`,
        description: `Book authentic ${svcTitle} at ${name}, ${state}. Gotra-based Sankalps, hygienic packaging and global shipping by Vandan Darshan concierge.`,
        canonical: `${DOMAIN}/${baseSlug}-temple/${svcType}`,
        image: image
      };
      const svcSchema = generateSchema("temple-service", { name, state, deity, slug: baseSlug, serviceTitle: svcTitle, type: svcType });
      const svcHtml = compilePage(svcBody, svcMeta, svcSchema);
      writePage(`/${baseSlug}-temple/${svcType}`, svcHtml);
    }

    generatedCount++;
    if (generatedCount % 20 === 0) {
      console.log(`[PRERENDER] Progress: Pre-rendered ${generatedCount}/${allTemplesMerged.length} temples...`);
    }
  }

  console.log(`\n✅ Prerendering completed. Generated ${allTemplesMerged.length * 5 + staticPagesList.length + 1 + blogs.length} total files.`);
}

// Execution block
async function run() {
  await prerenderAll();
  writeSitemaps();
  console.log("\n🚀 COMPLETE TECHNICAL SEO OVERHAUL SUCCESSFULLY COMPILED!");
}

run().catch(console.error);
