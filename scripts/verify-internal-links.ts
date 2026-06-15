import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, "..", "dist");
const DOMAIN = "https://vandandarshan.com";

// Normalize paths for matching
function urlToFilePath(urlPath: string): string {
  const cleanPath = urlPath.replace(DOMAIN, "").replace(/^\//, "").replace(/\/$/, "");
  if (cleanPath === "") {
    return path.join(DIST_DIR, "index.html");
  }
  return path.join(DIST_DIR, cleanPath, "index.html");
}

function filePathToUrlPath(filePath: string): string {
  const relative = path.relative(DIST_DIR, filePath).replace(/\\/g, "/");
  if (relative === "index.html") {
    return "/";
  }
  return "/" + relative.replace(/\/index\.html$/, "");
}

// Find all HTML files in dist/ recursively
function getAllHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file === "index.html") {
      results.push(fullPath);
    }
  });
  return results;
}

// Extract links from HTML content
function extractLinks(html: string): string[] {
  const hrefRegex = /href="([^"]+)"/g;
  const links: string[] = [];
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const href = match[1];
    // Only care about internal links
    if (href.startsWith("/") && !href.startsWith("//")) {
      links.push(href);
    } else if (href.startsWith(DOMAIN)) {
      links.push(href.replace(DOMAIN, ""));
    }
  }
  return Array.from(new Set(links));
}

// Parse Sitemap
function getSitemapUrls(): string[] {
  const sitemapPath = path.join(DIST_DIR, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    console.error("❌ Sitemap.xml not found in dist!");
    return [];
  }
  const content = fs.readFileSync(sitemapPath, "utf8");
  const locRegex = /<loc>(https:\/\/vandandarshan\.com.*?)<\/loc>/g;
  const urls: string[] = [];
  let match;
  while ((match = locRegex.exec(content)) !== null) {
    urls.push(match[1].replace(DOMAIN, ""));
  }
  return urls;
}

async function runAudit() {
  console.log("=== RUNNING ADVANCED INTERNAL LINKING & SEO AUDIT ===\n");

  const allHtmlFiles = getAllHtmlFiles(DIST_DIR);
  console.log(`Found ${allHtmlFiles.length} physical pre-rendered HTML pages.`);

  const sitemapUrls = getSitemapUrls();
  console.log(`Found ${sitemapUrls.length} URLs in sitemap.xml.`);

  // 1. Crawl all pages from Homepage to find reachable pages
  const visited = new Set<string>();
  const queue: string[] = ["/"];
  const brokenLinks: { source: string; target: string }[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);

    const localFilePath = urlToFilePath(current);
    if (!fs.existsSync(localFilePath)) {
      // Current was added to queue but doesn't exist on disk!
      continue;
    }

    const html = fs.readFileSync(localFilePath, "utf8");
    const extracted = extractLinks(html);

    for (const link of extracted) {
      // Ignore hashes, query params, or static assets
      const cleanLink = link.split("#")[0].split("?")[0].replace(/\/$/, "");
      const normalizedLink = cleanLink === "" ? "/" : cleanLink;

      // Skip non-HTML links (like pdfs, zips, or direct asset routes)
      if (normalizedLink.match(/\.(png|jpg|jpeg|svg|mp4|webm|zip|pdf|js|css|webmanifest|xml|txt|ico)$/)) {
        continue;
      }

      // Check if target exists
      const targetPath = urlToFilePath(normalizedLink);
      if (!fs.existsSync(targetPath)) {
        brokenLinks.push({ source: current, target: normalizedLink });
      } else if (!visited.has(normalizedLink) && !queue.includes(normalizedLink)) {
        queue.push(normalizedLink);
      }
    }
  }

  console.log(`Crawl completed. Reached ${visited.size} pages starting from homepage.`);

  // 2. Identify Orphan Pages
  const orphanPages: string[] = [];
  const expectedExcluded = ["/thank-you"]; // Pages that are intentionally orphan / noindex

  for (const file of allHtmlFiles) {
    const url = filePathToUrlPath(file);
    const normalizedUrl = url === "/" ? "/" : url.replace(/\/$/, "");
    if (!visited.has(normalizedUrl) && !expectedExcluded.includes(normalizedUrl)) {
      orphanPages.push(normalizedUrl);
    }
  }

  // 3. Verify Noindex configurations
  const noindexedPages: string[] = [];
  const sitemapViolations: string[] = [];

  for (const file of allHtmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    const url = filePathToUrlPath(file);
    const normalizedUrl = url === "/" ? "/" : url.replace(/\/$/, "");
    const hasNoindex = /<meta name="robots" content="noindex/i.test(html);

    if (hasNoindex) {
      noindexedPages.push(normalizedUrl);
      if (sitemapUrls.includes(normalizedUrl)) {
        sitemapViolations.push(`[SITEMAP VIOLATION] Page ${normalizedUrl} has a noindex tag but is listed in sitemap.xml!`);
      }
    }
  }

  // 4. Report Results
  let hasErrors = false;

  console.log("\n=== AUDIT RESULTS ===");

  console.log(`\n1. REACHABLE PAGES: ${visited.size}/${allHtmlFiles.length}`);
  if (visited.size === allHtmlFiles.length) {
    console.log("✅ All pre-rendered pages are crawlable and reached starting from the homepage!");
  } else {
    console.log(`⚠️ Note: ${allHtmlFiles.length - visited.size} pages are not reached from homepage.`);
  }

  console.log(`\n2. ORPHAN PAGES (Indexable pages not reachable via links): ${orphanPages.length}`);
  if (orphanPages.length === 0) {
    console.log("✅ There are 0 orphan indexable pages. All pages are correctly internally linked!");
  } else {
    console.error("❌ FOUND ORPHAN PAGES:");
    orphanPages.forEach(p => console.error(`   - ${p}`));
    hasErrors = true;
  }

  console.log(`\n3. BROKEN INTERNAL LINKS: ${brokenLinks.length}`);
  if (brokenLinks.length === 0) {
    console.log("✅ All internal links are valid. No 404s found!");
  } else {
    console.error("❌ FOUND BROKEN LINKS:");
    brokenLinks.forEach(b => console.error(`   - From ${b.source} -> to non-existent ${b.target}`));
    hasErrors = true;
  }

  console.log(`\n4. NOINDEXED PAGES: ${noindexedPages.length}`);
  noindexedPages.forEach(p => console.log(`   - ${p} (Correctly marked as noindex)`));

  console.log(`\n5. SITEMAP COMPLIANCE:`);
  if (sitemapViolations.length === 0) {
    console.log("✅ Sitemap is 100% compliant. No noindex pages are present in sitemap.xml!");
  } else {
    sitemapViolations.forEach(v => console.error(v));
    hasErrors = true;
  }

  // Verify sitemap URLs exist
  const missingSitemapFiles: string[] = [];
  for (const sUrl of sitemapUrls) {
    const sPath = urlToFilePath(sUrl);
    if (!fs.existsSync(sPath)) {
      missingSitemapFiles.push(`[SITEMAP FILE MISSING] Sitemap lists ${sUrl} but no file exists at ${sPath}!`);
    }
  }

  if (missingSitemapFiles.length === 0) {
    console.log("✅ All sitemap URLs exist as physical pre-rendered HTML files!");
  } else {
    missingSitemapFiles.forEach(m => console.error(m));
    hasErrors = true;
  }

  if (hasErrors) {
    console.error("\n❌ SEO AUDIT FAILED! Please fix the errors listed above.");
    process.exit(1);
  } else {
    console.log("\n🎉 CONGRATULATIONS! ALL TECHNICAL SEO AUDIT CHECKS PASSED SUCCESSFULLY!");
  }
}

runAudit().catch(console.error);
