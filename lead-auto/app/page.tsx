import { LeadDashboard } from "@/components/lead-dashboard";
import { findLeads } from "@/lib/search";

type PageProps = {
  searchParams?: Promise<{
    location?: string;
    businessType?: string;
    priority?: string;
    outreachStatus?: string;
    websiteStatus?: string;
    provider?: string;
    limit?: string;
    country?: string;
    countryName?: string;
  }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const location = params.location ?? "Oeiras";
  const businessType = params.businessType ?? "";
  const leads = await findLeads({
    location,
    businessType,
    priority: params.priority,
    outreachStatus: params.outreachStatus,
    websiteStatus: params.websiteStatus
  });
  const outreachBaseLeads = await findLeads({
    location,
    businessType,
    priority: params.priority,
    websiteStatus: params.websiteStatus
  });
  const outreachSummary = {
    all: outreachBaseLeads.length,
    not_contacted: outreachBaseLeads.filter((lead) => lead.outreachStatus === "not_contacted").length,
    contacted: outreachBaseLeads.filter((lead) => lead.outreachStatus === "contacted").length,
    meeting_booked: outreachBaseLeads.filter((lead) => lead.outreachStatus === "meeting_booked").length,
    not_interested: outreachBaseLeads.filter((lead) => lead.outreachStatus === "not_interested").length
  };

  return (
    <LeadDashboard
      leads={leads}
      outreachSummary={outreachSummary}
      filters={{
        location,
        businessType,
        priority: params.priority ?? "",
        outreachStatus: params.outreachStatus ?? "",
        websiteStatus: params.websiteStatus ?? "",
        provider: params.provider ?? process.env.LEAD_PROVIDER ?? "google-places",
        limit: params.limit ?? "20",
        country: params.country ?? "PT",
        countryName: params.countryName ?? countryDisplayName(params.country ?? "PT")
      }}
    />
  );
}

function countryDisplayName(countryCode: string) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode) ?? countryCode;
  } catch {
    return countryCode;
  }
}
