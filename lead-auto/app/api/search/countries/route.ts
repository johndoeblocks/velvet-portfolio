import { NextResponse } from "next/server";
import { getCountries } from "@/lib/geo";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";
  const countries = await getCountries(query);

  return NextResponse.json({ countries });
}
