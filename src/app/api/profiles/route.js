import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();


// GET
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (idParam) {
      const id = Number(idParam);
      const profile = await prisma.profile.findUnique({ where: { id } });
      return Response.json(profile ? [profile] : [], { status: 200 });
    }

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


// POST
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, major, year, gpa } = body;

    const newProfile = await prisma.profile.create({
      data: { name, major, year, gpa },
    });

    return Response.json(newProfile, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create profile" }, { status: 500 });
  }
}


// DELETE
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    await prisma.profile.delete({ where: { id } });

    return Response.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}


// PATCH
export async function PATCH(request) {
  try {
    const body = await request.json();
    console.log("PATCH RECEIVED BODY:", body);

    const { id, ...updates } = body;
    const updated = await prisma.profile.update({
      where: { id },
      data: updates,
    });

    console.log("UPDATED RESULT:", updated);
    return Response.json(updated, { status: 200 });
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}
