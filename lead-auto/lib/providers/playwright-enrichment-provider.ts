import { chromium } from "playwright";
import type { RawLead, WebsiteEnrichment } from "@/types/lead";

const OBVIOUS_PATHS = ["/contact", "/contacts", "/contactos", "/booking", "/marcacoes", "/marcações"];
const PAGE_TIMEOUT_MS = 8000;
const MAX_INTERNAL_PAGES = 3;

// Safety/compliance: Playwright enrichment only visits public websites owned by the lead.
// Do not use this module to scrape Google Maps pages, bypass logins, solve captchas, or crawl private areas.
export async function enrichLeadWebsite(lead: RawLead): Promise<WebsiteEnrichment | null> {
  if (!lead.website) {
    return {
      hasWebsite: false,
      hasContactPage: false,
      hasBookingLink: false,
      hasWhatsApp: false,
      hasEmail: false,
      hasPhone: false,
      hasFacebookPixel: false,
      hasGoogleAnalytics: false,
      hasGoogleTagManager: false,
      hasMetaTags: false,
      hasStructuredData: false,
      hasBrokenWebsite: false,
      isSlowOrTimeout: false,
      hasSSL: false,
      websiteTitle: null,
      metaDescription: null
    };
  }

  const baseUrl = normalizeUrl(lead.website);
  if (!baseUrl) return null;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: false });

  const result: WebsiteEnrichment = {
    hasWebsite: true,
    hasContactPage: false,
    hasBookingLink: false,
    hasWhatsApp: false,
    hasEmail: false,
    hasPhone: false,
    hasFacebookPixel: false,
    hasGoogleAnalytics: false,
    hasGoogleTagManager: false,
    hasMetaTags: false,
    hasStructuredData: false,
    hasBrokenWebsite: false,
    isSlowOrTimeout: false,
    hasSSL: baseUrl.protocol === "https:",
    websiteTitle: null,
    metaDescription: null
  };

  try {
    const urls = buildCandidateUrls(baseUrl);

    for (const url of urls.slice(0, MAX_INTERNAL_PAGES)) {
      const page = await context.newPage();
      page.setDefaultTimeout(PAGE_TIMEOUT_MS);

      try {
        const response = await page.goto(url.toString(), { waitUntil: "domcontentloaded", timeout: PAGE_TIMEOUT_MS });
        if (!response || response.status() >= 400) result.hasBrokenWebsite = true;

        const title = await page.title().catch(() => null);
        const html = await page.content();
        const text = await page.locator("body").innerText({ timeout: 1500 }).catch(() => "");
        const metaDescription = await page.locator('meta[name="description"]').first().getAttribute("content").catch(() => null);
        const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href)).catch(() => []);

        result.websiteTitle ||= title;
        result.metaDescription ||= metaDescription;
        result.hasMetaTags ||= Boolean(metaDescription) || /<meta\s+property=["']og:/i.test(html);
        result.hasStructuredData ||= /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
        result.hasFacebookPixel ||= /fbq\(|connect\.facebook\.net|facebook\.com\/tr/i.test(html);
        result.hasGoogleAnalytics ||= /google-analytics\.com|gtag\(|G-[A-Z0-9]+/i.test(html);
        result.hasGoogleTagManager ||= /googletagmanager\.com|GTM-[A-Z0-9]+/i.test(html);
        result.hasWhatsApp ||= /wa\.me|api\.whatsapp\.com|whatsapp/i.test(html);
        result.hasEmail ||= /mailto:|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(html);
        result.hasPhone ||= /tel:|\+351|\b9\d{8}\b/.test(html);
        result.hasBookingLink ||= /booking|reservar|marcar|marcaç|calendly|tally\.so|typeform|book/i.test(`${html} ${text}`);
        result.hasContactPage ||= url.pathname !== "/" || hrefs.some((href) => /contact|contactos|contacts|marcac|booking|reserv/i.test(href));
      } catch (error) {
        if (String(error).toLowerCase().includes("timeout")) result.isSlowOrTimeout = true;
        else result.hasBrokenWebsite = true;
      } finally {
        await page.close();
      }
    }
  } finally {
    await context.close();
    await browser.close();
  }

  return result;
}

function normalizeUrl(value: string) {
  try {
    return new URL(value.startsWith("http") ? value : `https://${value}`);
  } catch {
    return null;
  }
}

function buildCandidateUrls(baseUrl: URL) {
  const urls = [new URL("/", baseUrl)];
  for (const path of OBVIOUS_PATHS) {
    urls.push(new URL(path, baseUrl));
  }
  return urls;
}
