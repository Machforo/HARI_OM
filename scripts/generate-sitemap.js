/**
 * generate-sitemap.js
 * Vandan Darshan — Dynamic Sitemap Generator
 * Run: node scripts/generate-sitemap.js
 * Output: public/sitemap.xml
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = "https://vandandarshan.com";
const TODAY = new Date().toISOString().split("T")[0];

// ── Temple slugs ── (kept in sync with templeMetadata.ts)
const templeMetadataKeys = [
  "ahobilam","akshardham","amaralingeswara-swamy","amarnath-cave","ambaji",
  "arasavalli-sun","arunachaleswarar","attukal-bhagavathy","badrinath","bageshwar-dham",
  "baidyanath-jyotirlinga","banke-bihari","belur-math","bhimashankar","birla-mandir-hyderabad",
  "brahma-temple-pushkar","brihadeeswarar","chamundeshwari","chhatarpur","chottanikkara",
  "dakshineswar-kali","dilwara","draksharamam","dwarkadhish","ekambareswarar","gangotri",
  "gnana-saraswati","gokarna-mahabaleshwar","grishneshwar","guruvayur","hanuman-garhi",
  "iskcon-bangalore","jagannath","jwala-ji","kal-bhairav","kalighat-kali","kamakhya",
  "kamakshi-amman","kanaka-durga","karni-mata","kashi-vishwanath","kedarnath","khajuraho",
  "khatu-shyam-ji","konark-sun","kukke-subramanya","lepakshi-veerabhadra","lingaraj","lotus",
  "mahabodhi","mahakaleshwar","mahalakshmi-kolhapur","maihar-devi","mallikarjuna-swamy",
  "meenakshi","mumbadevi","murudeshwar","nageshwar-jyotirlinga","nathdwara-shrinathji",
  "omkareshwar","padmanabhaswamy","palani-murugan","penchalakona","prem-mandir","ram-mandir",
  "rameswaram","ranganathaswamy","sabarimala","salasar-balaji","shikharji","shirdi-sai-baba",
  "shree-krishna-janmabhoomi","shreemant-dagdusheth","shri-kshetra-dharmasthala",
  "siddhivinayak","simhachalam","somnath","sri-malyadri-lakshmi-narasimha","sri-panakala-narasimha",
  "sri-varasiddhi-vinayaka","srikalahasti","sringeri-sharada-peetham","sripuram-golden",
  "swaminarayan-akshardham-gandhinagar","the-golden","trimbakeshwar","tulja-bhavani",
  "udupi-sri-krishna-matha","umananda","vadakkunnathan","vaishno-devi","vindhyachal",
  "virupaksha","vontimitta-kodanda-rama-swamy","yadadri-lakshmi-narasimha","yaganti-uma-maheswara",
  "yamunotri"
];

const serviceTypes = ["darshan", "puja", "prasad", "chadhava"];

// ── Static pages ──
const staticPages = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/temples", priority: "0.9", changefreq: "daily" },
  { url: "/services", priority: "0.9", changefreq: "weekly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/contact", priority: "0.7", changefreq: "monthly" },
  { url: "/book", priority: "0.9", changefreq: "daily" },
  { url: "/blogs", priority: "0.8", changefreq: "weekly" },
  { url: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { url: "/terms", priority: "0.3", changefreq: "yearly" },
];

function makeEntry({ url, priority = "0.7", changefreq = "weekly", lastmod = TODAY }) {
  return `  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const entries = [];

// Static pages
for (const page of staticPages) {
  entries.push(makeEntry(page));
}

// Temple pages
for (const slug of templeMetadataKeys) {
  entries.push(makeEntry({ url: `/${slug}-temple`, priority: "0.9", changefreq: "weekly" }));
  // Darshan page
  entries.push(makeEntry({ url: `/${slug}-temple/darshan`, priority: "0.95", changefreq: "weekly" }));
  // Puja, Prasad, Chadhava service pages
  for (const svc of ["puja", "prasad", "chadhava"]) {
    entries.push(makeEntry({ url: `/${slug}-temple/${svc}`, priority: "0.8", changefreq: "weekly" }));
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${entries.join("\n")}

</urlset>
`;

const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(outPath, xml, "utf8");
console.log(`\n✅ sitemap.xml generated → ${outPath}`);
console.log(`   Total URLs: ${entries.length}`);
