"use client";
import { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/Navbar";
import ProfileCard from "../../components/ProfileCard";
import FilterPanel from "../../components/FilterPanel";
import ShareModal from "../../components/ShareModal";
import Icon from "../../components/Icon";
import { getAllProfiles, getCurrentUser } from "../../lib/store";
import { calcMatchScore, applyFilters, getAge } from "../../lib/matching";
import Link from "next/link";

export default function MatchesPage() {
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("match");
  const [filters, setFilters] = useState({ minAge: 18, maxAge: 65 });
  const [shareProfile, setShare] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setProfiles(getAllProfiles());
    setLoading(false);
  }, []);

  const scored = useMemo(() => {
    const filtered = applyFilters(profiles, user, filters, search);
    const withScore = filtered.map((p) => {
      if (!user) return { ...p, score: null, reasons: [] };
      const { score, reasons } = calcMatchScore(user, p);
      return { ...p, score, reasons };
    });
    if (sortBy === "match")
      return withScore.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    if (sortBy === "recent")
      return withScore.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    if (sortBy === "age")
      return withScore.sort((a, b) => getAge(a.dob) - getAge(b.dob));
    return withScore;
  }, [profiles, user, filters, search, sortBy]);

  return (
    <>
      <Navbar />
      <main style={{ padding: "36px 40px", maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 30 }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 42,
              color: "#2d1a0a",
              marginBottom: 6,
            }}
          >
            {user
              ? `Matches for ${user.name.split(" ")[0]}`
              : "Browse Profiles"}
          </h1>
          <p
            style={{
              color: "#5c3d24",
              fontFamily: "'Lato',sans-serif",
              fontSize: 15,
            }}
          >
            {user
              ? "Profiles sorted by compatibility score — highest match first"
              : "Create your profile to see personalised compatibility scores"}
          </p>
        </div>

        {/* Search + Sort */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 280, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <Icon name="search" size={17} color="#a0704a" />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city, profession, religion, caste…"
              style={{
                width: "100%",
                background: "rgba(201,135,58,0.08)",
                border: "1px solid rgba(201,135,58,0.25)",
                borderRadius: 10,
                padding: "12px 14px 12px 44px",
                color: "#2d1a0a",
                fontFamily: "'Lato',sans-serif",
                fontSize: 15,
                outline: "none",
              }}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: "rgba(201,135,58,0.08)",
              border: "1px solid rgba(201,135,58,0.25)",
              borderRadius: 10,
              padding: "12px 18px",
              color: "#2d1a0a",
              fontFamily: "'Lato',sans-serif",
              fontSize: 14,
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="match">Best Match</option>
            <option value="recent">Most Recent</option>
            <option value="age">By Age</option>
          </select>
        </div>

        <FilterPanel filters={filters} setFilters={setFilters} />

        {/* Results count */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <span
            style={{
              color: "#5c3d24",
              fontFamily: "'Lato',sans-serif",
              fontSize: 14,
            }}
          >
            {loading ? "Loading…" : `${scored.length} profiles found`}
            {user && " · sorted by compatibility"}
          </span>
          {!user && (
            <Link
              href="/register"
              style={{
                background: "rgba(201,135,58,0.1)",
                border: "1px solid rgba(201,135,58,0.28)",
                color: "#c9873a",
                borderRadius: 8,
                padding: "8px 16px",
                textDecoration: "none",
                fontFamily: "'Lato',sans-serif",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <Icon name="sparkles" size={14} /> Create profile for smart
              matches
            </Link>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 22,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="skeleton"
                style={{ height: 380, borderRadius: 16 }}
              />
            ))}
          </div>
        ) : scored.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ marginBottom: 16 }}>
              <Icon name="search" size={48} color="rgba(201,135,58,0.3)" />
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 28,
                color: "#f5c87a",
                marginBottom: 10,
              }}
            >
              No profiles found
            </h3>
            <p
              style={{
                color: "#c9873a",
                fontFamily: "'Lato',sans-serif",
                fontSize: 15,
                marginBottom: 24,
              }}
            >
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearch("");
                setFilters({ minAge: 18, maxAge: 65 });
              }}
              style={{
                background: "rgba(201,135,58,0.12)",
                border: "1px solid rgba(201,135,58,0.3)",
                color: "#c9873a",
                borderRadius: 10,
                padding: "11px 28px",
                fontFamily: "'Lato',sans-serif",
                fontSize: 14,
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 22,
            }}
          >
            {scored.map((p) => (
              <ProfileCard
                key={p.id}
                profile={p}
                matchScore={user ? p.score : null}
                matchReasons={p.reasons || []}
                onShare={setShare}
              />
            ))}
          </div>
        )}
      </main>

      {shareProfile && (
        <ShareModal profile={shareProfile} onClose={() => setShare(null)} />
      )}
    </>
  );
}
