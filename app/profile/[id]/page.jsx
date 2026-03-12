"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import ShareModal from "../../../components/ShareModal";
import Icon from "../../../components/Icon";
import Toast from "../../../components/Toast";
import {
  getProfileById,
  getCurrentUser,
  getSentInterests,
  toggleInterest,
} from "../../../lib/store";
import { calcMatchScore, getAge } from "../../../lib/matching";

const Section = ({ title, children }) => (
  <div
    style={{
      background: "rgba(201,135,58,0.08)",
      border: "1px solid rgba(201,135,58,0.15)",
      borderRadius: 14,
      padding: "22px 24px",
      marginBottom: 18,
    }}
  >
    <h4
      style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 20,
        color: "#2d1a0a",
        marginBottom: 14,
      }}
    >
      {title}
    </h4>
    {children}
  </div>
);

const Row = ({ label, value }) =>
  value ? (
    <div
      style={{
        display: "flex",
        padding: "9px 0",
        borderBottom: "1px solid rgba(201,135,58,0.08)",
      }}
    >
      <span
        style={{
          color: "#a0704a",
          fontFamily: "'Lato',sans-serif",
          fontSize: 13,
          width: 170,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "#2d1a0a",
          fontFamily: "'Lato',sans-serif",
          fontSize: 13,
        }}
      >
        {value}
      </span>
    </div>
  ) : null;

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState(null);
  const [interest, setInterest] = useState(false);
  const [share, setShare] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = getProfileById(id);
    const u = getCurrentUser();
    if (!p) {
      router.push("/matches");
      return;
    }
    setProfile(p);
    setUser(u);
    if (u && u.id !== p.id) setMatch(calcMatchScore(u, p));
    setInterest(getSentInterests().includes(id));
    setLoading(false);
  }, [id]);

  const handleInterest = () => {
    const now = toggleInterest(id);
    setInterest(now);
    setToast(now ? `Interest sent to ${profile.name} 💌` : "Interest removed");
  };

  if (loading)
    return (
      <>
        <Navbar />
        <main style={{ padding: 40, maxWidth: 1100, margin: "0 auto" }}>
          <div className="skeleton" style={{ height: 500, borderRadius: 18 }} />
        </main>
      </>
    );

  if (!profile) return null;

  const age = getAge(profile.dob);
  const isOwnProfile = user?.id === profile.id;

  return (
    <>
      <Navbar />
      <main style={{ padding: "36px 40px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Back */}
        <Link
          href="/matches"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#a0704a",
            fontFamily: "'Lato',sans-serif",
            fontSize: 14,
            textDecoration: "none",
            marginBottom: 28,
            opacity: 0.85,
          }}
        >
          <Icon name="arrow_left" size={16} /> Back to matches
        </Link>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* ── Sidebar ─────────────────────────────────────── */}
          <div>
            {/* Photo */}
            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                border: "2px solid rgba(201,135,58,0.35)",
                marginBottom: 18,
                position: "relative",
              }}
            >
              <img
                src={profile.photo}
                alt={profile.name}
                style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=c9873a&color=fff&size=400`;
                }}
              />
              {profile.verified && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    background: "rgba(76,175,80,0.9)",
                    borderRadius: 20,
                    padding: "5px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "'Lato',sans-serif",
                    fontSize: 12,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  <Icon name="check" size={12} color="#fff" /> Verified
                </div>
              )}
            </div>

            {/* Match score */}
            {match && (
              <div
                style={{
                  background:
                    "linear-gradient(135deg,rgba(201,135,58,0.12),rgba(232,199,133,0.08))",
                  border: "1px solid rgba(201,135,58,0.28)",
                  borderRadius: 14,
                  padding: "18px 20px",
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 44,
                    fontWeight: 700,
                    color: "#2d1a0a",
                    lineHeight: 1,
                  }}
                >
                  {match.score}%
                </div>
                <div
                  style={{
                    color: "#a0704a",
                    fontSize: 13,
                    fontFamily: "'Lato',sans-serif",
                    marginBottom: 12,
                  }}
                >
                  Compatibility Score
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 5 }}
                >
                  {match.reasons.map((r, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 12,
                        color: "#5c3d24",
                        fontFamily: "'Lato',sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Icon name="check" size={11} color="#4CAF50" /> {r}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {isOwnProfile ? (
                <Link
                  href="/my-profile"
                  style={{
                    background: "linear-gradient(135deg,#c9873a,#e8a857)",
                    color: "#fbf9f4",
                    borderRadius: 10,
                    padding: "13px",
                    textAlign: "center",
                    fontFamily: "'Lato',sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Icon name="edit" size={16} color="#fbf9f4" /> Edit My Profile
                </Link>
              ) : (
                <>
                  {user ? (
                    <button
                      onClick={handleInterest}
                      style={{
                        background: interest
                          ? "rgba(76,175,80,0.15)"
                          : "linear-gradient(135deg,#c9873a,#e8a857)",
                        color: interest ? "#4CAF50" : "#fbf9f4",
                        border: interest
                          ? "1px solid rgba(76,175,80,0.4)"
                          : "none",
                        borderRadius: 10,
                        padding: "13px",
                        fontFamily: "'Lato',sans-serif",
                        fontSize: 15,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "all 0.2s",
                      }}
                    >
                      <Icon
                        name={interest ? "check" : "heart"}
                        size={17}
                        color={interest ? "#4CAF50" : "#fbf9f4"}
                      />
                      {interest ? "Interest Sent ✓" : "Send Interest"}
                    </button>
                  ) : (
                    <Link
                      href="/register"
                      style={{
                        background: "linear-gradient(135deg,#c9873a,#e8a857)",
                        color: "#fbf9f4",
                        borderRadius: 10,
                        padding: "13px",
                        textAlign: "center",
                        fontFamily: "'Lato',sans-serif",
                        fontSize: 15,
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      Create Profile to Connect
                    </Link>
                  )}
                </>
              )}
              <button
                onClick={() => setShare(true)}
                style={{
                  background: "rgba(201,135,58,0.1)",
                  color: "#c9873a",
                  border: "1px solid rgba(201,135,58,0.28)",
                  borderRadius: 10,
                  padding: "13px",
                  fontFamily: "'Lato',sans-serif",
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Icon name="share" size={17} /> Share Profile
              </button>
            </div>
          </div>

          {/* ── Main content ─────────────────────────────────── */}
          <div className="fade-in">
            <div style={{ marginBottom: 26 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 42,
                    color: "#f5c87a",
                    fontWeight: 700,
                  }}
                >
                  {profile.name}
                </h1>
                {profile.verified && (
                  <span
                    style={{
                      background: "rgba(76,175,80,0.12)",
                      border: "1px solid rgba(76,175,80,0.3)",
                      color: "#4CAF50",
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontFamily: "'Lato',sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Icon name="verified" size={12} color="#4CAF50" /> Verified
                  </span>
                )}
              </div>
              <p
                style={{
                  color: "#c9873a",
                  fontSize: 16,
                  fontFamily: "'Lato',sans-serif",
                  marginTop: 4,
                }}
              >
                {age} years · {profile.profession} · {profile.city}
              </p>
            </div>

            {/* About */}
            {profile.about && (
              <Section title="About Me">
                <p
                  style={{
                    color: "#d4956a",
                    fontFamily: "'Lato',sans-serif",
                    fontSize: 14,
                    lineHeight: 1.8,
                  }}
                >
                  {profile.about}
                </p>
              </Section>
            )}

            {/* Two-col grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
              }}
            >
              <Section title="Basic Details">
                <Row label="Age" value={`${age} Years`} />
                <Row label="Height" value={profile.height} />
                <Row label="Marital Status" value={profile.maritalStatus} />
                <Row label="Complexion" value={profile.complexion} />
                <Row label="Body Type" value={profile.bodyType} />
                <Row label="Diet" value={profile.diet} />
              </Section>
              <Section title="Religious Background">
                <Row label="Religion" value={profile.religion} />
                <Row label="Caste / Community" value={profile.caste} />
                <Row label="Languages" value={profile.languages} />
              </Section>
              <Section title="Education & Career">
                <Row label="Education" value={profile.education} />
                <Row label="Profession" value={profile.profession} />
                <Row label="Annual Income" value={profile.income} />
                <Row label="City" value={profile.city} />
              </Section>
              <Section title="Family Details">
                <Row
                  label="Father's Profession"
                  value={profile.fatherProfession}
                />
                <Row
                  label="Mother's Profession"
                  value={profile.motherProfession}
                />
                <Row label="Siblings" value={profile.siblings} />
              </Section>
            </div>

            {/* Hobbies */}
            {profile.hobbies && (
              <Section title="Hobbies & Interests">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {profile.hobbies.split(",").map((h, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(201,135,58,0.14)",
                        border: "1px solid rgba(201,135,58,0.28)",
                        color: "#c9873a",
                        padding: "6px 16px",
                        borderRadius: 20,
                        fontSize: 13,
                        fontFamily: "'Lato',sans-serif",
                      }}
                    >
                      {h.trim()}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Partner Preferences */}
            {(profile.partnerReligion || profile.partnerMinAge) && (
              <Section title="Partner Preferences">
                <Row label="Religion" value={profile.partnerReligion} />
                <Row label="City" value={profile.partnerCity} />
                <Row
                  label="Age Range"
                  value={
                    profile.partnerMinAge && profile.partnerMaxAge
                      ? `${profile.partnerMinAge} – ${profile.partnerMaxAge} years`
                      : null
                  }
                />
              </Section>
            )}
          </div>
        </div>
      </main>

      {share && (
        <ShareModal profile={profile} onClose={() => setShare(false)} />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
