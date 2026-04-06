"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";

export default function RegisterUserPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }
      router.push("/register");
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: "40px 20px", maxWidth: 480, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, marginBottom: 10 }}>
          Create Account
        </h1>
        <p style={{ color: "#5c3d24", marginBottom: 24 }}>Join free and find your match</p>
        <form onSubmit={submit} style={{ display: "grid", gap: 14 }}>
          <input
            type="text"
            placeholder="Full name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "11px 14px",
              borderRadius: 8,
              border: "1px solid rgba(201,135,58,0.25)",
              background: "rgba(201,135,58,0.08)",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "11px 14px",
              borderRadius: 8,
              border: "1px solid rgba(201,135,58,0.25)",
              background: "rgba(201,135,58,0.08)",
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "11px 14px",
              borderRadius: 8,
              border: "1px solid rgba(201,135,58,0.25)",
              background: "rgba(201,135,58,0.08)",
            }}
            required
          />
          {error && <p style={{ color: "#e74c3c" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg,#c9873a,#e8a857)",
              color: "#fbf9f4",
              border: "none",
              borderRadius: 10,
              padding: "12px 16px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>
      </main>
    </>
  );
}

