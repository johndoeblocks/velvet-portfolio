import { OutreachStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSessionFromRequest } from "@/lib/session";

const statuses = new Set<string>(Object.values(OutreachStatus));

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = (await request.json()) as { outreachStatus?: string };

  if (!body.outreachStatus || !statuses.has(body.outreachStatus)) {
    return NextResponse.json({ error: "Invalid outreach status" }, { status: 400 });
  }

  const lead = await prisma.lead.findFirst({
    where: { id, userId: session.user.id }
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const updatedLead = await prisma.lead.update({
    where: { id: lead.id },
    data: { outreachStatus: body.outreachStatus as OutreachStatus }
  });

  return NextResponse.json(updatedLead);
}
