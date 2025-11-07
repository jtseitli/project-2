let profiles = [
    { id: 1, name: "Ava Lee", major: "CS", year: 2, gpa: 3.6 },
    { id: 2, name: "Ben Park", major: "CGT", year: 3, gpa: 3.2 },
  ];
  

  export async function GET(request) {
    const { searchParams } = new URL(request.url);
    let results = profiles;
  

    const major = searchParams.get("major");
    const year = searchParams.get("year");
    const q = searchParams.get("q");
  
    if (major) results = results.filter(p => p.major.toLowerCase() === major.toLowerCase());
    if (year) results = results.filter(p => p.year === Number(year));
    if (q) results = results.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  
    return Response.json(results, { status: 200 });
  }
  

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
  
      const newProfile = { id: Date.now(), name, major, year, gpa };
      profiles.push(newProfile);
  
      return Response.json(newProfile, { status: 201 });
    } catch {
      return Response.json({ error: "Invalid JSON format" }, { status: 400 });
    }
  }
  

  export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
  
    if (!id) return Response.json({ error: "Missing id" }, { status: 400 });
  
    const index = profiles.findIndex(p => p.id === id);
    if (index === -1) return Response.json({ error: "Profile not found" }, { status: 404 });
  
    profiles.splice(index, 1);
    return Response.json({ message: `Profile ${id} deleted` }, { status: 200 });
  }
  

  export async function PATCH(request) {
    try {
      const body = await request.json();
      const { id, ...updates } = body;
  
      if (!id) return Response.json({ error: "Missing id" }, { status: 400 });
  
      const profile = profiles.find(p => p.id === id);
      if (!profile) return Response.json({ error: "Profile not found" }, { status: 404 });
  
      Object.assign(profile, updates);
  
      return Response.json(profile, { status: 200 });
    } catch {
      return Response.json({ error: "Invalid JSON format" }, { status: 400 });
    }
  }
  