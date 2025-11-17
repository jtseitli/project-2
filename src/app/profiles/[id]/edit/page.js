"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfile({ params }) {
  const { id } = use(params);

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    major: "",
    year: "",
    gpa: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(`/api/profiles?id=${id}`);
        const data = await res.json();

        const profile = Array.isArray(data) ? data[0] : data;

        setForm({
          name: profile.name,
          major: profile.major,
          year: profile.year,
          gpa: profile.gpa,
        });
      } catch (err) {
        setError("Failed to load profile");
      }
    }

    loadProfile();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const payload = {
      id: Number(id),
      name: form.name,
      major: form.major,
      year: Number(form.year),
      gpa: Number(form.gpa),
    };

    console.log("PATCH BODY →", payload);

    try {
      const res = await fetch("/api/profiles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      router.push(`/profiles/${id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="add-profile-container">
      <h1>Edit Profile</h1>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Major"
          value={form.major}
          onChange={(e) => setForm({ ...form, major: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="GPA"
          step="0.1"
          value={form.gpa}
          onChange={(e) => setForm({ ...form, gpa: e.target.value })}
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </main>
  );
}
