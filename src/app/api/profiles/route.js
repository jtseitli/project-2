import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// GET: Retrieve profiles from Neon
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {};
    const major = searchParams.get("major");
    const year = searchParams.get("year");
    const q = searchParams.get("q");

    if (major) filters.major = { equals: major, mode: "insensitive" };
    if (year) filters.year = Number(year);
    if (q) filters.name = { contains: q, mode: "insensitive" };

    const results = await prisma.profile.findMany({
      where: filters,
      orderBy: { id: "asc" },
    });

    return Response.json(results, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to retrieve profiles" }, { status: 500 });
  }
}

// POST: Add a new profile
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, major, year, gpa } = body;

    if (
      typeof name !== "string" ||
      typeof major !== "string" ||
      typeof year !== "number" || year < 1 || year > 4 ||
      typeof gpa !== "number" || gpa < 0 || gpa > 4
    ) {
      return Response.json({ error: "Invalid input fields" }, { status: 400 });
    }

    const newProfile = await prisma.profile.create({
      data: { name, major, year, gpa },
    });

    return Response.json(newProfile, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create profile" }, { status: 500 });
  }
}

// DELETE: Remove a profile by id
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

    await prisma.profile.delete({ where: { id } });

    return Response.json({ message: `Profile ${id} deleted` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Profile not found or delete failed" }, { status: 404 });
  }
}

// PATCH: Update an existing profile
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

    const updated = await prisma.profile.update({
      where: { id },
      data: updates,
    });

    return Response.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}
