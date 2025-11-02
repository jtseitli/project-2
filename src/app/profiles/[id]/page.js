export default async function ProfilePage({ params }) {
    // If params is a Promise, await it
    const resolvedParams = await params;
  
    const res = await fetch(
      "https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php",
      { cache: "no-store" }
    );
    const profiles = await res.json();
  
    // Debug logs
    console.log("Params ID:", resolvedParams.id);
    console.log("Profile IDs:", profiles.map(p => p.id));
  
    // Find the matching profile
    const profile = profiles.find(
      (p) => String(p.id).trim() === String(resolvedParams.id).trim()
    );
  
    if (!profile) return <p>Profile not found.</p>;
  
    return (
      <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <img
          src={profile.image_url}
          alt={profile.name}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "1rem",
          }}
        />
        <h1>{profile.name}</h1>
        <h2 style={{ color: "#555", marginBottom: "1rem" }}>{profile.title}</h2>
        <p>{profile.bio}</p>
        <a href="/" style={{ display: "inline-block", marginTop: "1rem", color: "blue" }}>
          ← Back to Home
        </a>
      </main>
    );
  }
  