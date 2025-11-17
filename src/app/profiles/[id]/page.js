"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

export default function ProfileDetails({ params }) {
  const { id } = use(params);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`/api/profiles?id=${id}`)
      .then((res) => res.json())
      .then((data) =>
        setProfile(Array.isArray(data) ? data[0] : data)
      );
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <main className="profile-details">
      <h1>{profile.name}</h1>

      <p><strong>Major:</strong> {profile.major}</p>
      <p><strong>Year:</strong> {profile.year}</p>
      <p><strong>GPA:</strong> {profile.gpa}</p>

      <Link href={`/profiles/${id}/edit`} className="edit-btn">
        Edit Profile
      </Link>
    </main>
  );
}
