import { NextResponse } from "next/server";
import { DEFAULT_COUNTRY } from "@/lib/search";
import { searchLocations } from "@/lib/geo";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";
  const country = url.searchParams.get("country") ?? DEFAULT_COUNTRY;

  try {
    const locations = await searchLocations(query, country);
    return NextResponse.json({ locations });
  } catch (error) {
    return NextResponse.json({ locations: [], error: String(error) }, { status: 502 });
  }
}
