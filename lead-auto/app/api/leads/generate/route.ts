import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getLeadProvider } from "@/lib/providers/lead-provider";
import { enrichLeadWebsite } from "@/lib/providers/playwright-enrichment-provider";
import { buildLeadData, findDuplicateWhere } from "@/lib/leads";
import { requireSessionFromRequest } from "@/lib/session";
import { DEFAULT_COUNTRY } from "@/lib/search";
import { getOrCreateUserLeadSettings } from "@/lib/user-settings";

export async function POST(request: Request) {
  const session = await requireSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await getOrCreateUserLeadSettings(session.user.id);
  const body = (await request.json()) as { location?: string; businessType?: string; limit?: number; provider?: string; enrich?: boolean; country?: string };
  const location = body.location?.trim() || settings.defaultLocation;
  const businessType = body.businessType?.trim() || settings.defaultBusinessType;
  const country = body.country?.trim().toUpperCase() || settings.defaultCountry || DEFAULT_COUNTRY;
  const limit = Math.max(1, Math.min(Number(body.limit ?? settings.defaultLimit), 60));
  const provider = getLeadProvider(body.provider ?? settings.leadProvider);
  const shouldEnrich = body.enrich ?? settings.enrichWithPlaywright;

  const imported = [];
  const errors: string[] = [];
  let skippedDuplicates = 0;

  try {
    const leads = await provider.search({
      location,
      businessType,
      limit,
      language: "pt-PT",
      country,
      apiKey: provider.name === "google-places" ? settings.googlePlacesApiKey : undefined
    });

    for (const lead of leads) {
      try {
        const existing = await prisma.lead.findFirst({ where: findDuplicateWhere(session.user.id, lead) });
        const enrichment = shouldEnrich ? await enrichLeadWebsite(lead).catch((error) => {
          errors.push(`${lead.name}: enrichment failed: ${String(error)}`);
          return null;
        }) : null;
        const data = buildLeadData(session.user.id, lead, location, enrichment);

        if (existing) skippedDuplicates += 1;

        imported.push(
          existing
            ? await prisma.lead.update({ where: { id: existing.id }, data: data as Prisma.LeadUncheckedUpdateInput })
            : await prisma.lead.create({ data })
        );
      } catch (error) {
        errors.push(`${lead.name}: ${String(error)}`);
      }
    }
  } catch (error) {
    return NextResponse.json({ importedCount: 0, skippedDuplicates, errors: [String(error)], provider: provider.name }, { status: 500 });
  }

  return NextResponse.json({ importedCount: imported.length, skippedDuplicates, errors, provider: provider.name });
}
