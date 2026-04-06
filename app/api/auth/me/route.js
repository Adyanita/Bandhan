export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/prisma";
import { getAuthCookieName, verifySessionJwt } from "../../../../lib/auth";

export async function GET() {
  try {
    const token = cookies().get(getAuthCookieName())?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    const payload = await verifySessionJwt(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        profile: true,
      },
    });
    return NextResponse.json({ user: user || null }, { status: 200 });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

