import { NextResponse } from "next/server";
import { requireSessionFromRequest } from "@/lib/session";
import { getCategorySuggestions } from "@/lib/search";

export async function GET(request: Request) {
  const session = await requireSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";
  const categories = await getCategorySuggestions(session.user.id, query);

  return NextResponse.json({ categories });
}
