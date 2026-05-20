import type { Priority } from "@prisma/client";
import type { LeadInput, LeadScoringResult } from "@/types/lead";

export function scoreLead(lead: LeadInput): LeadScoringResult {
  let score = 0;
  const reasons: string[] = [];
  const enrichment = lead.enrichment;

  add(!lead.website || lead.websiteStatus === "missing", 40, "No website found");
  add(Boolean(lead.website), 5, "Website found");
  add(Boolean(lead.phone), 5, "Phone found");
  add(Boolean(lead.email) || Boolean(enrichment?.hasEmail), 5, "Email found");
  add(lead.websiteStatus === "weak", 25, "Website appears weak");
  add(enrichment?.hasBrokenWebsite === true, 35, "Website appears broken or unreachable");
  add(enrichment?.isSlowOrTimeout === true, 20, "Website is slow or timed out");
  add(lead.hasClearCta === false, 15, "Website has no clear CTA");
  add(lead.hasVisibleContactForm === false, 15, "Website has no visible form/contact");
  add(enrichment?.hasContactPage === false && Boolean(lead.website), 15, "Website has no booking/contact CTA");
  add(enrichment?.hasBookingLink === true || enrichment?.hasContactPage === true || enrichment?.hasWhatsApp === true, 5, "Website has booking/contact path");
  add(enrichment?.hasStructuredData === true, 5, "Website has structured data");
  add(enrichment?.hasStructuredData === false && Boolean(lead.website), 10, "No structured data detected");
  add(enrichment?.hasMetaTags === false && Boolean(lead.website), 10, "Missing meta tags");
  add(!enrichment?.metaDescription && Boolean(enrichment), 10, "Missing meta description");
  add(enrichment?.websiteTitle !== undefined && isWeakTitle(enrichment.websiteTitle), 10, "Weak website title");
  add(enrichment?.hasGoogleAnalytics === false && enrichment?.hasGoogleTagManager === false && enrichment?.hasFacebookPixel === false, 10, "No analytics/marketing tags detected");
  add(Boolean(lead.hasActiveInstagram && (!lead.website || lead.websiteStatus === "missing")), 20, "Active Instagram but no website");
  add((lead.rating ?? 0) > 4.3, 10, "Google rating above 4.3");
  add((lead.rating ?? 0) > 4.5, 5, "Google rating above 4.5");
  add((lead.reviewCount ?? 0) > 20, 10, "More than 20 reviews");
  add((lead.reviewCount ?? 0) > 100, 5, "High review count");
  add(Boolean(lead.isPremiumLocalService), 15, "Premium local service");

  return {
    score,
    priority: priorityFromScore(score),
    reasons
  };

  function add(condition: boolean, points: number, reason: string) {
    if (!condition) return;
    score += points;
    reasons.push(reason);
  }
}

export function priorityFromScore(score: number): Priority {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

function isWeakTitle(title?: string | null) {
  if (!title) return true;
  const normalized = title.trim().toLowerCase();
  return normalized.length < 12 || normalized === "home" || normalized === "inicio" || normalized === "início";
}
