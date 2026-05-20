import type { LeadProvider } from "@/types/lead";
import { googlePlacesProvider } from "./google-places-provider";

export type ProviderKind = "google-places";

export function getLeadProvider(kind?: string): LeadProvider {
  const selected = normalizeProviderName(kind ?? process.env.LEAD_PROVIDER ?? "google-places");
  if (selected === "google-places") return googlePlacesProvider;
  return googlePlacesProvider;
}

export function normalizeProviderName(kind: string): ProviderKind {
  if (kind === "google-places") return "google-places";
  return "google-places";
}
