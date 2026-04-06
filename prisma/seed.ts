import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SAMPLE_PROFILES } from "../lib/constants.js";

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter, log: ["warn", "error"] });

const DEMO_EMAIL = "demo1@samparksutra.test";

function sampleToProfileData(s: (typeof SAMPLE_PROFILES)[number]) {
  return {
    name: s.name,
    gender: s.gender,
    dob: new Date(s.dob),
    religion: s.religion,
    caste: s.caste,
    education: s.education,
    profession: s.profession,
    city: s.city,
    height: s.height,
    maritalStatus: s.maritalStatus,
    diet: s.diet,
    complexion: s.complexion,
    bodyType: s.bodyType,
    income: s.income,
    about: s.about,
    hobbies: s.hobbies,
    languages: s.languages,
    fatherProfession: s.fatherProfession,
    motherProfession: s.motherProfession,
    siblings: s.siblings,
    partnerReligion: s.partnerReligion,
    partnerCity: s.partnerCity,
    partnerMinAge: s.partnerMinAge
      ? parseInt(String(s.partnerMinAge), 10)
      : null,
    partnerMaxAge: s.partnerMaxAge
      ? parseInt(String(s.partnerMaxAge), 10)
      : null,
    photo: s.photo,
    verified: s.verified,
  };
}

async function main() {
  const already = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });
  if (already) {
    console.log("Demo profiles already present (skip).");
    return;
  }

  for (let i = 0; i < SAMPLE_PROFILES.length; i++) {
    const s = SAMPLE_PROFILES[i];
    const email = `demo${i + 1}@samparksutra.test`;
    const passwordHash = await bcrypt.hash("demo123", 10);
    await prisma.user.create({
      data: {
        email,
        name: s.name,
        passwordHash,
        profile: { create: sampleToProfileData(s) },
      },
    });
  }

  console.log(
    `Added ${SAMPLE_PROFILES.length} demo users (e.g. ${DEMO_EMAIL} / demo123).`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
