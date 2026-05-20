import type { Lead, OutreachStatus, Priority, WebsiteStatus } from "@prisma/client";
import type { JsonValue } from "@prisma/client/runtime/library";

export type LeadRecord = Lead;

export type LeadSearchParams = {
  location: string;
  businessType: string;
  radius?: number;
  limit?: number;
  language?: string;
  country?: string;
  apiKey?: string | null;
};

export type RawLead = {
  name: string;
  address?: string | null;
  phone?: string | null;
  website?: string | null;
  email?: string | null;
  category?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  source: string;
  sourceId?: string | null;
  mapsUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  raw?: JsonValue;
};

export type WebsiteEnrichment = {
  hasWebsite: boolean;
  hasContactPage: boolean;
  hasBookingLink: boolean;
  hasWhatsApp: boolean;
  hasEmail: boolean;
  hasPhone: boolean;
  hasFacebookPixel: boolean;
  hasGoogleAnalytics: boolean;
  hasGoogleTagManager: boolean;
  hasMetaTags: boolean;
  hasStructuredData: boolean;
  hasBrokenWebsite: boolean;
  isSlowOrTimeout: boolean;
  hasSSL: boolean;
  websiteTitle?: string | null;
  metaDescription?: string | null;
};

export type LeadInput = RawLead & {
  websiteStatus?: WebsiteStatus;
  notes?: string | null;
  hasClearCta?: boolean;
  hasVisibleContactForm?: boolean;
  hasActiveInstagram?: boolean;
  isPremiumLocalService?: boolean;
  enrichment?: Partial<WebsiteEnrichment> | null;
};

export type LeadProvider = {
  name: string;
  search(params: LeadSearchParams): Promise<RawLead[]>;
};

export type LeadScoringResult = {
  score: number;
  priority: Priority;
  reasons: string[];
};

export type LeadStatus = OutreachStatus;
