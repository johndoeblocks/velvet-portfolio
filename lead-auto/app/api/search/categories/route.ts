import { NextResponse } from "next/server";
import { getCategorySuggestions } from "@/lib/search";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";
  const categories = await getCategorySuggestions(query);

  return NextResponse.json({ categories });
}
