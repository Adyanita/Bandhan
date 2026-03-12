"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import RegisterForm from "../../components/RegisterForm";
import ShareModal from "../../components/ShareModal";
import Icon from "../../components/Icon";
import Toast from "../../components/Toast";
import {
  getCurrentUser,
  setCurrentUser,
  saveProfile,
  getSentInterests,
} from "../../lib/store";
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
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [share, setShare] = useState(false);
  const [toast, setToast] = useState(null);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.push("/register");
      return;
    }
    setUser(u);
    setInterests(getSentInterests());
  }, []);

  const handleUpdate = (updated) => {
    saveProfile(updated);
    setCurrentUser(updated);
    setUser(updated);
    setEdit(false);
    setToast("Profile updated successfully! ✨");
  };

  const logout = () => {
    setCurrentUser(null);
    router.push("/");
  };

  if (!user) return null;

  const age = getAge(user.dob);

  if (edit) {
    return (
      <>
        <Navbar />
        <main style={{ padding: "40px", maxWidth: 1000, margin: "0 auto" }}>
          <button
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
          <RegisterForm editProfile={user} onSuccess={handleUpdate} />
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
          {/* Sidebar */}
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
                src={user.photo}
                alt={user.name}
                style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=c9873a&color=fff&size=400`;
                }}
              />
              {user.verified && (
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

            {/* Stats */}
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
                    new Date(user.createdAt).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    }),
                  ],
                  ["Status", user.verified ? "Verified ✓" : "Pending"],
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

          {/* Profile info */}
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
                {user.name}
              </h2>
              <p
                style={{
                  color: "#5c3d24",
                  fontFamily: "'Lato',sans-serif",
                  fontSize: 15,
                }}
              >
                {age} years · {user.profession} · {user.city}
              </p>
            </div>

            {user.about && (
              <Section title="About Me">
                <p
                  style={{
                    color: "#5c3d24",
                    fontFamily: "'Lato',sans-serif",
                    fontSize: 14,
                    lineHeight: 1.8,
                  }}
                >
                  {user.about}
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
                  ["Age", `${age} Years`],
                  ["Height", user.height],
                  ["Marital Status", user.maritalStatus],
                  ["Diet", user.diet],
                  ["Complexion", user.complexion],
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
                  ["Education", user.education],
                  ["Profession", user.profession],
                  ["Income", user.income],
                  ["City", user.city],
                  ["Languages", user.languages],
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

            {user.hobbies && (
              <Section title="Hobbies & Interests">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {user.hobbies.split(",").map((h, i) => (
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
                href={`/profile/${user.id}`}
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

      {share && <ShareModal profile={user} onClose={() => setShare(false)} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
