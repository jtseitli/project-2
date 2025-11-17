"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  // Load all profiles
  useEffect(() => {
    fetch("/api/profiles")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.error("Failed to load profiles:", err));
  }, []);

  // Delete profile
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this profile?")) return;

    const res = await fetch(`/api/profiles?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete profile");
    }
  }

  const filteredProfiles = profiles.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="container">
      <h1 className="page-title">Profiles</h1>

      <div className="actions">
        <a href="/add-profile" className="add-btn">
          + Add Profile
        </a>
        <input
          type="text"
          placeholder="Filter by name..."
          className="filter-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {filteredProfiles.length === 0 ? (
        <p className="empty-text">No profiles found.</p>
      ) : (
        <div className="grid">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="card"
              onClick={() => router.push(`/profiles/${profile.id}`)}
            >
              <h2 className="profile-name">{profile.name}</h2>
              <p>Major: {profile.major}</p>
              <p>Year: {profile.year}</p>
              <p>GPA: {profile.gpa}</p>

              <button
                className="delete-btn"
                onClick={(e) => {
                  handleDelete(profile.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
