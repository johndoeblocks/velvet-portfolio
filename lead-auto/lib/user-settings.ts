import { prisma } from "@/lib/prisma";
import { DEFAULT_COUNTRY } from "@/lib/search";

export type LeadSettingsInput = {
  leadProvider?: string;
  googlePlacesApiKey?: string;
  clearGooglePlacesApiKey?: boolean;
  enrichWithPlaywright?: boolean;
  defaultCountry?: string;
  defaultLocation?: string;
  defaultBusinessType?: string;
  defaultLimit?: number;
};

export async function getOrCreateUserLeadSettings(userId: string) {
  return prisma.userLeadSettings.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      leadProvider: "google-places",
      defaultCountry: DEFAULT_COUNTRY,
      defaultLocation: "Oeiras",
      defaultBusinessType: "",
      defaultLimit: 20
    }
  });
}

export async function updateUserLeadSettings(userId: string, input: LeadSettingsInput) {
  const data = {
    ...(input.leadProvider ? { leadProvider: input.leadProvider } : {}),
    ...(input.googlePlacesApiKey?.trim() ? { googlePlacesApiKey: input.googlePlacesApiKey.trim() } : {}),
    ...(input.clearGooglePlacesApiKey ? { googlePlacesApiKey: null } : {}),
    ...(typeof input.enrichWithPlaywright === "boolean" ? { enrichWithPlaywright: input.enrichWithPlaywright } : {}),
    ...(input.defaultCountry ? { defaultCountry: input.defaultCountry.trim().toUpperCase() } : {}),
    ...(typeof input.defaultLocation === "string" ? { defaultLocation: input.defaultLocation.trim() || "Oeiras" } : {}),
    ...(typeof input.defaultBusinessType === "string" ? { defaultBusinessType: input.defaultBusinessType.trim() } : {}),
    ...(typeof input.defaultLimit === "number" && Number.isFinite(input.defaultLimit)
      ? { defaultLimit: Math.max(1, Math.min(Math.trunc(input.defaultLimit), 60)) }
      : {})
  };

  return prisma.userLeadSettings.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      leadProvider: data.leadProvider ?? "google-places",
      googlePlacesApiKey: "googlePlacesApiKey" in data ? data.googlePlacesApiKey : null,
      enrichWithPlaywright: data.enrichWithPlaywright ?? false,
      defaultCountry: data.defaultCountry ?? DEFAULT_COUNTRY,
      defaultLocation: data.defaultLocation ?? "Oeiras",
      defaultBusinessType: data.defaultBusinessType ?? "",
      defaultLimit: data.defaultLimit ?? 20
    }
  });
}
