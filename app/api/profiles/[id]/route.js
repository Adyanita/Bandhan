export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(_req, { params }) {
  const { id } = params;
  const profile = await prisma.profile.findUnique({ where: { id } });
  if (!profile) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ profile });
}

