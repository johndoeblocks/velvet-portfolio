import { LeadDashboard } from "@/components/lead-dashboard";
import { requireCurrentSession } from "@/lib/session";
import { findLeads } from "@/lib/search";
import { getOrCreateUserLeadSettings } from "@/lib/user-settings";

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
  const session = await requireCurrentSession();
  const settings = await getOrCreateUserLeadSettings(session.user.id);
  const params = (await searchParams) ?? {};
  const location = params.location ?? settings.defaultLocation;
  const businessType = params.businessType ?? settings.defaultBusinessType;
  const leads = await findLeads(session.user.id, {
    location,
    businessType,
    priority: params.priority,
    outreachStatus: params.outreachStatus,
    websiteStatus: params.websiteStatus
  });
  const outreachBaseLeads = await findLeads(session.user.id, {
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
      user={{
        name: session.user.name,
        email: session.user.email
      }}
      leads={leads}
      outreachSummary={outreachSummary}
      settings={{
        leadProvider: settings.leadProvider,
        googlePlacesApiKeyConfigured: Boolean(settings.googlePlacesApiKey),
        enrichWithPlaywright: settings.enrichWithPlaywright,
        defaultCountry: settings.defaultCountry,
        defaultLocation: settings.defaultLocation,
        defaultBusinessType: settings.defaultBusinessType,
        defaultLimit: String(settings.defaultLimit)
      }}
      filters={{
        location,
        businessType,
        priority: params.priority ?? "",
        outreachStatus: params.outreachStatus ?? "",
        websiteStatus: params.websiteStatus ?? "",
        provider: params.provider ?? settings.leadProvider,
        limit: params.limit ?? String(settings.defaultLimit),
        country: params.country ?? settings.defaultCountry,
        countryName: params.countryName ?? countryDisplayName(params.country ?? settings.defaultCountry)
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
