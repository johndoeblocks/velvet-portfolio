import { leadsToCsv } from "@/lib/csv";
import { requireSessionFromRequest } from "@/lib/session";
import { findLeads } from "@/lib/search";

export async function GET(request: Request) {
  const session = await requireSessionFromRequest(request);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const url = new URL(request.url);
  const location = url.searchParams.get("location") || "Oeiras";
  const businessType = url.searchParams.get("businessType") || "";
  const priority = url.searchParams.get("priority") || "";
  const outreachStatus = url.searchParams.get("outreachStatus") || "";
  const websiteStatus = url.searchParams.get("websiteStatus") || "";

  const leads = await findLeads(session.user.id, {
    location,
    businessType,
    priority,
    outreachStatus,
    websiteStatus
  });

  return new Response(leadsToCsv(leads), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="velvet-neuron-leads.csv"'
    }
  });
}
