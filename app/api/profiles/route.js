export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../lib/prisma";
import { getAuthCookieName, verifySessionJwt } from "../../../lib/auth";

async function getUserIdFromCookie() {
  const token = cookies().get(getAuthCookieName())?.value;
  if (!token) return null;
  try {
    const payload = await verifySessionJwt(token);
    return payload.sub;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const profiles = await prisma.profile.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ profiles });
  } catch (err) {
    console.error("Prisma error:", err); // shows full error in Vercel logs
    return NextResponse.json(
      { error: err.message || "Unexpected error" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  // Convert numeric-like fields
  const partnerMinAge = body.partnerMinAge
    ? parseInt(body.partnerMinAge, 10)
    : null;
  const partnerMaxAge = body.partnerMaxAge
    ? parseInt(body.partnerMaxAge, 10)
    : null;
  const dob = body.dob ? new Date(body.dob) : null;
  if (!dob) {
    return NextResponse.json(
      { error: "Date of birth is required" },
      { status: 400 },
    );
  }
  // Upsert per user
  const profile = await prisma.profile.upsert({
    where: { userId },
    update: {
      name: body.name,
      gender: body.gender,
      dob,
      religion: body.religion,
      caste: body.caste,
      education: body.education,
      profession: body.profession,
      city: body.city,
      height: body.height || null,
      maritalStatus: body.maritalStatus || null,
      diet: body.diet || null,
      complexion: body.complexion || null,
      bodyType: body.bodyType || null,
      income: body.income || null,
      about: body.about || null,
      hobbies: body.hobbies || null,
      languages: body.languages || null,
      fatherProfession: body.fatherProfession || null,
      motherProfession: body.motherProfession || null,
      siblings: body.siblings || null,
      partnerReligion: body.partnerReligion || null,
      partnerCity: body.partnerCity || null,
      partnerMinAge,
      partnerMaxAge,
      photo: body.photo || null,
    },
    create: {
      userId,
      name: body.name,
      gender: body.gender,
      dob,
      religion: body.religion,
      caste: body.caste,
      education: body.education,
      profession: body.profession,
      city: body.city,
      height: body.height || null,
      maritalStatus: body.maritalStatus || null,
      diet: body.diet || null,
      complexion: body.complexion || null,
      bodyType: body.bodyType || null,
      income: body.income || null,
      about: body.about || null,
      hobbies: body.hobbies || null,
      languages: body.languages || null,
      fatherProfession: body.fatherProfession || null,
      motherProfession: body.motherProfession || null,
      siblings: body.siblings || null,
      partnerReligion: body.partnerReligion || null,
      partnerCity: body.partnerCity || null,
      partnerMinAge,
      partnerMaxAge,
      photo: body.photo || null,
    },
  });
  return NextResponse.json({ profile });
}
