export async function GET() {
  return Response.json({
    dbUrl: process.env.DATABASE_URL ? "Found" : "Missing",
  });
}
