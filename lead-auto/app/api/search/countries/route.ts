import { NextResponse } from "next/server";
import { requireSessionFromRequest } from "@/lib/session";
import { getCountries } from "@/lib/geo";

export async function GET(request: Request) {
  const session = await requireSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";
  const countries = await getCountries(query);

  return NextResponse.json({ countries });
}
