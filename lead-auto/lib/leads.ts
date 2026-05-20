import type { Prisma, WebsiteStatus } from "@prisma/client";
import type { LeadInput, RawLead, WebsiteEnrichment } from "@/types/lead";
import { scoreLead } from "./scoring";

export function buildLeadData(userId: string, rawLead: RawLead, fallbackLocation: string, enrichment?: WebsiteEnrichment | null): Prisma.LeadUncheckedCreateInput {
  const websiteStatus = getWebsiteStatus(rawLead, enrichment);
  const scoring = scoreLead({
    ...rawLead,
    websiteStatus,
    enrichment
  } satisfies LeadInput);

  return {
    userId,
    businessName: rawLead.name,
    category: rawLead.category ?? "unknown",
    location: rawLead.address ?? fallbackLocation,
    phone: rawLead.phone,
    email: rawLead.email,
    website: rawLead.website,
    googleMapsUrl: rawLead.mapsUrl,
    mapsUrl: rawLead.mapsUrl,
    source: rawLead.source,
    sourceId: rawLead.sourceId,
    rating: rawLead.rating,
    reviewCount: rawLead.reviewCount,
    latitude: rawLead.latitude,
    longitude: rawLead.longitude,
    notes: null,
    enrichmentJson: enrichment ? (enrichment as Prisma.InputJsonValue) : undefined,
    scoringReasons: scoring.reasons,
    websiteStatus,
    score: scoring.score,
    priority: scoring.priority,
    lastImportedAt: new Date(),
    lastEnrichedAt: enrichment ? new Date() : undefined
  };
}

export function findDuplicateWhere(userId: string, rawLead: RawLead): Prisma.LeadWhereInput {
  const normalizedPhone = normalizePhone(rawLead.phone);
  const website = normalizeWebsite(rawLead.website);
  const sourceId = rawLead.sourceId?.trim();
  const OR: Prisma.LeadWhereInput[] = [];

  if (sourceId) OR.push({ source: rawLead.source, sourceId });
  if (website) OR.push({ website: { equals: website, mode: "insensitive" } });
  if (rawLead.website && rawLead.website !== website) OR.push({ website: { equals: rawLead.website, mode: "insensitive" } });
  if (normalizedPhone) {
    OR.push({ phone: { contains: normalizedPhone } });
    if (rawLead.phone) OR.push({ phone: rawLead.phone });
  }

  if (OR.length === 0) {
    return {
      userId,
      businessName: { equals: rawLead.name, mode: "insensitive" },
      location: { contains: rawLead.address ?? "", mode: "insensitive" }
    };
  }

  return { userId, OR };
}

export function normalizePhone(phone?: string | null) {
  return phone?.replace(/\D/g, "") ?? "";
}

export function normalizeWebsite(website?: string | null) {
  if (!website) return null;
  try {
    const url = new URL(website);
    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return website.trim().replace(/\/$/, "");
  }
}

function getWebsiteStatus(rawLead: RawLead, enrichment?: WebsiteEnrichment | null): WebsiteStatus {
  if (!rawLead.website) return "missing";
  if (enrichment?.hasBrokenWebsite || enrichment?.isSlowOrTimeout) return "weak";
  if (enrichment && (!enrichment.hasContactPage || !enrichment.hasMetaTags || !enrichment.metaDescription)) return "weak";
  return "unknown";
}
