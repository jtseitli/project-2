

export const metadata = {
  title: "Home | Profile Directory",
  description: "Browse and explore user profiles.",
};


export default async function Home() {
  const res = await fetch(
    "https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php",
    { cache: "no-store" }
  );
  const profiles = await res.json();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Profiles</h1>
      <div style={{ margin: "1rem 0" }}>
        <label htmlFor="filter">Filter by name:</label>
        <input
          id="filter"
          type="text"
          placeholder="Start typing..."
          style={{ marginLeft: "0.5rem", padding: "0.25rem" }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {profiles.map((profile) => (
          <a
            key={profile.id}
            href={`/profiles/${profile.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "1rem",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
          >
            <img
              src={profile.image_url}
              alt={profile.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "0.5rem",
              }}
            />
            <h2 style={{ fontSize: "1.1rem", margin: "0.25rem 0" }}>
              {profile.name}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>{profile.title}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
