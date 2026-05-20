import { OutreachStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const statuses = new Set<string>(Object.values(OutreachStatus));

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json()) as { outreachStatus?: string };

  if (!body.outreachStatus || !statuses.has(body.outreachStatus)) {
    return NextResponse.json({ error: "Invalid outreach status" }, { status: 400 });
  }

  const lead = await prisma.lead.update({
    where: { id },
    data: { outreachStatus: body.outreachStatus as OutreachStatus }
  });

  return NextResponse.json(lead);
}
