"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav style={{ padding: '1rem', background: '#fff', display: 'flex', gap: '1rem' }}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

      <div style={{ marginLeft: "auto" }}>
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session ? (
          <>
            <span style={{ marginRight: "1rem" }}>{session.user.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{
                padding: "0.3rem 0.6rem",
                cursor: "pointer",
                border: "1px solid #ccc",
                background: "#eee"
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/auth/signin">Sign In</Link>
        )}
      </div>
    </nav>
  );
}
