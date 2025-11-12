"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProfile() {
  const [form, setForm] = useState({ name: "", major: "", year: "", gpa: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          major: form.major,
          year: Number(form.year),
          gpa: Number(form.gpa),
        }),
      });

      if (!res.ok) throw new Error("Failed to create profile");

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="add-profile-container">
      <h1>Add New Profile</h1>
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
          placeholder="Year (1-4)"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="GPA (0.0 - 4.0)"
          step="0.1"
          value={form.gpa}
          onChange={(e) => setForm({ ...form, gpa: e.target.value })}
          required
        />

        <button type="submit">Add Profile</button>
      </form>
      {error && <p className="error-text">{error}</p>}
    </main>
  );
}
