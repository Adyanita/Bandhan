"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import RegisterForm from "../../components/RegisterForm";
import ShareModal from "../../components/ShareModal";
import Icon from "../../components/Icon";
import Toast from "../../components/Toast";
import { getSentInterests } from "../../lib/store";
import { getAge } from "../../lib/matching";
import Link from "next/link";

const Section = ({ title, children }) => (
  <div
    style={{
      background: "rgba(201,135,58,0.08)",
      border: "1px solid rgba(201,135,58,0.15)",
      borderRadius: 14,
      padding: "20px 24px",
      marginBottom: 18,
    }}
  >
    <h4
      style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 19,
        color: "#2d1a0a",
        marginBottom: 12,
      }}
    >
      {title}
    </h4>
    {children}
  </div>
);

export default function MyProfilePage() {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [share, setShare] = useState(false);
  const [toast, setToast] = useState(null);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();
        if (cancelled) return;
        if (!data.user) {
          router.replace("/auth/login");
          return;
        }
        if (!data.user.profile) {
          router.replace("/register");
          return;
        }
        setAccount(data.user);
        setInterests(getSentInterests());
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const profile = account?.profile;
  const age = profile ? getAge(profile.dob) : NaN;
  const ageLabel = Number.isFinite(age) ? age : "—";

  const handleUpdate = (updated) => {
    setAccount((a) => (a ? { ...a, profile: updated } : null));
    setEdit(false);
    setToast("Profile updated successfully! ✨");
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ padding: 40, maxWidth: 1100, margin: "0 auto" }}>
          <div className="skeleton" style={{ height: 500, borderRadius: 18 }} />
        </main>
      </>
    );
  }

  if (!profile) return null;

  const photoSrc =
    profile.photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=c9873a&color=fff&size=400`;

  if (edit) {
    return (
      <>
        <Navbar />
        <main style={{ padding: "40px", maxWidth: 1000, margin: "0 auto" }}>
          <button
            type="button"
            onClick={() => setEdit(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              color: "#a0704a",
              fontFamily: "'Lato',sans-serif",
              fontSize: 14,
              marginBottom: 28,
              cursor: "pointer",
            }}
          >
            <Icon name="arrow_left" size={16} /> Back to profile
          </button>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 36,
                color: "#2d1a0a",
                marginBottom: 8,
              }}
            >
              Edit Profile
            </h2>
          </div>
          <RegisterForm editProfile={profile} onSuccess={handleUpdate} />
        </main>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ padding: "36px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 40,
                color: "#2d1a0a",
                marginBottom: 4,
              }}
            >
              My Profile
            </h1>
            <p
              style={{
                color: "#5c3d24",
                fontFamily: "'Lato',sans-serif",
                fontSize: 14,
              }}
            >
              Manage and share your matrimonial profile
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={() => setEdit(true)}
              style={{
                background: "linear-gradient(135deg,#c9873a,#e8a857)",
                color: "#fbf9f4",
                border: "none",
                borderRadius: 10,
                padding: "11px 22px",
                fontFamily: "'Lato',sans-serif",
                fontSize: 14,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon name="edit" size={16} color="#fbf9f4" /> Edit Profile
            </button>
            <button
              type="button"
              onClick={() => setShare(true)}
              style={{
                background: "rgba(201,135,58,0.1)",
                color: "#a0704a",
                border: "1px solid rgba(201,135,58,0.28)",
                borderRadius: 10,
                padding: "11px 18px",
                fontFamily: "'Lato',sans-serif",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <Icon name="share" size={15} /> Share
            </button>
            <button
              type="button"
              onClick={logout}
              style={{
                background: "none",
                color: "#a0704a",
                border: "1px solid rgba(201,135,58,0.2)",
                borderRadius: 10,
                padding: "11px 16px",
                fontFamily: "'Lato',sans-serif",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <Icon name="logout" size={15} /> Logout
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: 30,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "2px solid rgba(201,135,58,0.35)",
                marginBottom: 16,
                position: "relative",
              }}
            >
              <img
                src={photoSrc}
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
                    bottom: 10,
                    right: 10,
                    background: "rgba(76,175,80,0.9)",
                    borderRadius: 20,
                    padding: "4px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    color: "#fff",
                    fontFamily: "'Lato',sans-serif",
                  }}
                >
                  <Icon name="check" size={11} color="#fff" /> Verified
                </div>
              )}
            </div>

            <div
              style={{
                background: "rgba(201,135,58,0.08)",
                border: "1px solid rgba(201,135,58,0.18)",
                borderRadius: 12,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                {[
                  ["Profile Views", "124"],
                  ["Interests Sent", interests.length.toString()],
                  [
                    "Member Since",
                    profile.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "—",
                  ],
                  ["Status", profile.verified ? "Verified ✓" : "Pending"],
                ].map(([l, v]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        color: "#2d1a0a",
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 22,
                        fontWeight: 600,
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        color: "#5c3d24",
                        fontFamily: "'Lato',sans-serif",
                        fontSize: 11,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fade-in">
            <div style={{ marginBottom: 24 }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 38,
                  color: "#2d1a0a",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {profile.name}
              </h2>
              <p
                style={{
                  color: "#5c3d24",
                  fontFamily: "'Lato',sans-serif",
                  fontSize: 15,
                }}
              >
                {ageLabel} years · {profile.profession} · {profile.city}
              </p>
            </div>

            {profile.about && (
              <Section title="About Me">
                <p
                  style={{
                    color: "#5c3d24",
                    fontFamily: "'Lato',sans-serif",
                    fontSize: 14,
                    lineHeight: 1.8,
                  }}
                >
                  {profile.about}
                </p>
              </Section>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <Section title="Basic Details">
                {[
                  ["Age", `${ageLabel} Years`],
                  ["Height", profile.height],
                  ["Marital Status", profile.maritalStatus],
                  ["Diet", profile.diet],
                  ["Complexion", profile.complexion],
                ].map(
                  ([l, v]) =>
                    v && (
                      <div
                        key={l}
                        style={{
                          display: "flex",
                          padding: "8px 0",
                          borderBottom: "1px solid rgba(201,135,58,0.08)",
                        }}
                      >
                        <span
                          style={{
                            color: "#a0704a",
                            fontSize: 12,
                            width: 130,
                            flexShrink: 0,
                            fontFamily: "'Lato',sans-serif",
                          }}
                        >
                          {l}
                        </span>
                        <span
                          style={{
                            color: "#2d1a0a",
                            fontSize: 13,
                            fontFamily: "'Lato',sans-serif",
                          }}
                        >
                          {v}
                        </span>
                      </div>
                    ),
                )}
              </Section>
              <Section title="Education & Career">
                {[
                  ["Education", profile.education],
                  ["Profession", profile.profession],
                  ["Income", profile.income],
                  ["City", profile.city],
                  ["Languages", profile.languages],
                ].map(
                  ([l, v]) =>
                    v && (
                      <div
                        key={l}
                        style={{
                          display: "flex",
                          padding: "8px 0",
                          borderBottom: "1px solid rgba(201,135,58,0.08)",
                        }}
                      >
                        <span
                          style={{
                            color: "#a0704a",
                            fontSize: 12,
                            width: 130,
                            flexShrink: 0,
                            fontFamily: "'Lato',sans-serif",
                          }}
                        >
                          {l}
                        </span>
                        <span
                          style={{
                            color: "#2d1a0a",
                            fontSize: 13,
                            fontFamily: "'Lato',sans-serif",
                          }}
                        >
                          {v}
                        </span>
                      </div>
                    ),
                )}
              </Section>
            </div>

            {profile.hobbies && (
              <Section title="Hobbies & Interests">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {profile.hobbies.split(",").map((h, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(201,135,58,0.14)",
                        border: "1px solid rgba(201,135,58,0.28)",
                        color: "#a0704a",
                        padding: "5px 14px",
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

            <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
              <Link
                href="/matches"
                style={{
                  background: "linear-gradient(135deg,#c9873a,#e8a857)",
                  color: "#fbf9f4",
                  borderRadius: 10,
                  padding: "12px 28px",
                  fontFamily: "'Lato',sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Icon name="heart" size={16} color="#fbf9f4" /> View My Matches
              </Link>
              <Link
                href={`/profile/${profile.id}`}
                style={{
                  background: "rgba(201,135,58,0.1)",
                  color: "#a0704a",
                  border: "1px solid rgba(201,135,58,0.28)",
                  borderRadius: 10,
                  padding: "12px 24px",
                  fontFamily: "'Lato',sans-serif",
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Public View
              </Link>
            </div>
          </div>
        </div>
      </main>

      {share && <ShareModal profile={profile} onClose={() => setShare(false)} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
