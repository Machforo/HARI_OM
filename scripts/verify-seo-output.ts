import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, "..", "dist");
const DOMAIN = "https://vandandarshan.com";

// Lists of sitemaps to audit
const sitemaps = [
  "sitemap.xml"
];

function extractUrlsFromSitemap(fileName: string): string[] {
  const filePath = path.join(DIST_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`Sitemap not found: ${filePath}`);
    return [];
  }
  const content = fs.readFileSync(filePath, "utf8");
  const locRegex = /<loc>(https:\/\/vandandarshan\.com.*?)<\/loc>/g;
  const urls: string[] = [];
  let match;
  while ((match = locRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function verifyAll() {
  console.log("=== STARTING FULL SEO AUDIT OF ALL SITEMAP PAGES ===\n");
  let totalAudited = 0;
  let totalPassed = 0;
  let failures: string[] = [];

  for (const sitemapName of sitemaps) {
    const urls = extractUrlsFromSitemap(sitemapName);
    console.log(`Auditing sitemap ${sitemapName} (${urls.length} URLs)...`);

    for (const url of urls) {
      totalAudited++;
      const relativePath = url.replace(DOMAIN, "");
      let localPath = "";
      if (relativePath === "/" || relativePath === "") {
        localPath = path.join(DIST_DIR, "index.html");
      } else {
        localPath = path.join(DIST_DIR, relativePath.replace(/^\//, ""), "index.html");
      }

      if (!fs.existsSync(localPath)) {
        failures.push(`[MISSING FILE] URL: ${url} -> Path: ${localPath}`);
        continue;
      }

      const html = fs.readFileSync(localPath, "utf8");
      
      // Check tags
      const hasTitle = /<title>.*?<\/title>/i.test(html);
      const hasDesc = /<meta name="description" content=".*?"\s*\/?>/i.test(html);
      const canonicalMatch = /<link rel="canonical" href="(.*?)"\s*\/?>/i.exec(html);
      const hasSchema = /<script type="application\/ld\+json">/i.test(html);

      const issues: string[] = [];
      if (!hasTitle) issues.push("Missing Title");
      if (!hasDesc) issues.push("Missing Meta Description");
      if (!hasSchema) issues.push("Missing JSON-LD Schema");
      
      if (!canonicalMatch) {
        issues.push("Missing Canonical Tag");
      } else {
        const canonicalUrl = canonicalMatch[1];
        if (canonicalUrl !== url) {
          issues.push(`Canonical mismatch: Found "${canonicalUrl}", expected "${url}"`);
        }
      }

      if (issues.length > 0) {
        failures.push(`[SEO TAGS ISSUE] URL: ${url} -> ${issues.join(", ")}`);
      } else {
        totalPassed++;
      }
    }
  }

  console.log("\n=== AUDIT REPORT SUMMARY ===");
  console.log(`Total URLs Audited: ${totalAudited}`);
  console.log(`Total Passed:        ${totalPassed}`);
  console.log(`Total Failed:        ${failures.length}`);

  if (failures.length > 0) {
    console.error("\n❌ SEO AUDIT FAILED! Details of issues found:");
    failures.forEach(f => console.error(f));
    process.exit(1);
  } else {
    console.log("\n✅ ALL SITEMAP PAGES ARE 100% SEO-COMPLIANT AND PHYSICALLY PRERENDERED!");
  }
}

verifyAll().catch(console.error);
