import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getLeadProvider } from "@/lib/providers/lead-provider";
import { enrichLeadWebsite } from "@/lib/providers/playwright-enrichment-provider";
import { buildLeadData, findDuplicateWhere } from "@/lib/leads";
import { DEFAULT_COUNTRY } from "@/lib/search";

export async function POST(request: Request) {
  const body = (await request.json()) as { location?: string; businessType?: string; limit?: number; provider?: string; enrich?: boolean; country?: string };
  const location = body.location?.trim() || "Oeiras";
  const businessType = body.businessType?.trim() || "";
  const country = body.country?.trim().toUpperCase() || DEFAULT_COUNTRY;
  const limit = Math.max(1, Math.min(Number(body.limit ?? 20), 60));
  const provider = getLeadProvider(body.provider);
  const shouldEnrich = body.enrich ?? process.env.LEAD_ENRICH_WITH_PLAYWRIGHT === "true";

  const imported = [];
  const errors: string[] = [];
  let skippedDuplicates = 0;

  try {
    const leads = await provider.search({ location, businessType, limit, language: "pt-PT", country });

    for (const lead of leads) {
      try {
        const existing = await prisma.lead.findFirst({ where: findDuplicateWhere(lead) });
        const enrichment = shouldEnrich ? await enrichLeadWebsite(lead).catch((error) => {
          errors.push(`${lead.name}: enrichment failed: ${String(error)}`);
          return null;
        }) : null;
        const data = buildLeadData(lead, location, enrichment);

        if (existing) skippedDuplicates += 1;

        imported.push(
          existing
            ? await prisma.lead.update({ where: { id: existing.id }, data: data as Prisma.LeadUpdateInput })
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
