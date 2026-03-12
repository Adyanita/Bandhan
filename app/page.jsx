"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import ShareModal from "../components/ShareModal";
import Icon from "../components/Icon";
import { SAMPLE_PROFILES } from "../lib/constants";

const STATS = [
  ["10,000+", "Active Profiles"],
  ["100%", "Free Forever"],
  ["4.8 ★", "User Rating"],
  ["500+", "Matches Daily"],
];

const HOW = [
  {
    icon: "user",
    title: "Create Profile",
    desc: "Fill in your religion, caste, education, and personal details in our guided 4-step form.",
  },
  {
    icon: "search",
    title: "Discover Matches",
    desc: "Our smart algorithm scores compatibility and shows you the best matches first.",
  },
  {
    icon: "heart",
    title: "Connect & Celebrate",
    desc: "Share profiles, send interest, and find your perfect life partner — completely free.",
  },
];

const WHY = [
  {
    icon: "verified",
    title: "100% Free",
    desc: "No hidden charges. Create profile, browse, and connect for free.",
  },
  {
    icon: "sparkles",
    title: "Smart Matching",
    desc: "Algorithm considers religion, caste, diet, age, city, and education.",
  },
  {
    icon: "share",
    title: "Easy Sharing",
    desc: "Share profiles via WhatsApp, Email, or link with one tap.",
  },
  {
    icon: "users",
    title: "All Communities",
    desc: "Hindu, Muslim, Christian, Sikh, Jain, Buddhist and more.",
  },
];

export default function HomePage() {
  const [shareProfile, setShareProfile] = useState(null);

  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          style={{
            textAlign: "center",
            padding: "80px 40px 90px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,135,58,0.13) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -120,
              left: -100,
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(201,135,58,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <p
            style={{
              color: "#a0704a",
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 17,
              letterSpacing: 5,
              marginBottom: 18,
              textTransform: "uppercase",
            }}
          >
            ✦ Find Your Soulmate ✦
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 700,
              color: "#2d1a0a",
              lineHeight: 1.1,
              marginBottom: 22,
              maxWidth: 720,
              margin: "0 auto 22px",
            }}
          >
            Where Hearts
            <br />
            <em style={{ color: "#a0704a", fontStyle: "italic" }}>
              Find Their Home
            </em>
          </h1>
          <p
            style={{
              color: "#5c3d24",
              fontFamily: "'Lato',sans-serif",
              fontSize: 17,
              maxWidth: 540,
              margin: "0 auto 44px",
              lineHeight: 1.75,
            }}
          >
            India's most trusted free matrimonial platform. Match by religion,
            caste, values, education and more across all communities.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/register"
              style={{
                background: "linear-gradient(135deg,#c9873a,#e8a857)",
                color: "#fbf9f4",
                borderRadius: 14,
                padding: "17px 44px",
                textDecoration: "none",
                fontFamily: "'Lato',sans-serif",
                fontSize: 17,
                fontWeight: 700,
                boxShadow: "0 8px 32px rgba(201,135,58,0.2)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              Create Free Profile
            </Link>
            <Link
              href="/matches"
              style={{
                background: "rgba(201,135,58,0.1)",
                color: "#2d1a0a",
                border: "1px solid rgba(201,135,58,0.35)",
                borderRadius: 14,
                padding: "17px 44px",
                textDecoration: "none",
                fontFamily: "'Lato',sans-serif",
                fontSize: 17,
              }}
            >
              Browse Profiles →
            </Link>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section style={{ padding: "0 40px 70px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 18,
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {STATS.map(([n, l]) => (
              <div
                key={l}
                style={{
                  background: "linear-gradient(145deg,#f5f3ed,#ede9e0)",
                  border: "1px solid rgba(201,135,58,0.18)",
                  borderRadius: 14,
                  padding: "28px 20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 38,
                    fontWeight: 700,
                    color: "#2d1a0a",
                    marginBottom: 6,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    color: "#a0704a",
                    fontFamily: "'Lato',sans-serif",
                    fontSize: 13,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────── */}
        <section
          style={{ padding: "0 40px 80px", maxWidth: 1100, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 46,
                color: "#2d1a0a",
                marginBottom: 12,
              }}
            >
              How It Works
            </h2>
            <p
              style={{
                color: "#5c3d24",
                fontFamily: "'Lato',sans-serif",
                fontSize: 15,
              }}
            >
              Find your life partner in three simple steps
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {HOW.map((h, i) => (
              <div
                key={i}
                style={{
                  background: "linear-gradient(145deg,#f5f3ed,#ede9e0)",
                  border: "1px solid rgba(201,135,58,0.18)",
                  borderRadius: 16,
                  padding: "36px 28px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 24,
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 56,
                    color: "rgba(201,135,58,0.08)",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg,rgba(201,135,58,0.12),rgba(232,199,133,0.08))",
                    border: "1px solid rgba(201,135,58,0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 22px",
                  }}
                >
                  <Icon name={h.icon} size={26} color="#a0704a" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 24,
                    color: "#2d1a0a",
                    marginBottom: 12,
                  }}
                >
                  {h.title}
                </h3>
                <p
                  style={{
                    color: "#5c3d24",
                    fontFamily: "'Lato',sans-serif",
                    fontSize: 14,
                    lineHeight: 1.75,
                  }}
                >
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why BandhanConnect ───────────────────────────────── */}
        <section
          style={{ padding: "0 40px 80px", maxWidth: 1100, margin: "0 auto" }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 42,
              color: "#2d1a0a",
              textAlign: "center",
              marginBottom: 44,
            }}
          >
            Why Choose Us?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 20,
            }}
          >
            {WHY.map((w) => (
              <div
                key={w.title}
                style={{
                  background: "rgba(201,135,58,0.08)",
                  border: "1px solid rgba(201,135,58,0.15)",
                  borderRadius: 14,
                  padding: "26px 22px",
                  textAlign: "center",
                }}
              >
                <div style={{ marginBottom: 14 }}>
                  <Icon name={w.icon} size={28} color="#a0704a" />
                </div>
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 19,
                    color: "#2d1a0a",
                    marginBottom: 10,
                  }}
                >
                  {w.title}
                </h4>
                <p
                  style={{
                    color: "#5c3d24",
                    fontFamily: "'Lato',sans-serif",
                    fontSize: 13,
                    lineHeight: 1.65,
                  }}
                >
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured profiles ────────────────────────────────── */}
        <section
          style={{ padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 40,
                  color: "#2d1a0a",
                  marginBottom: 6,
                }}
              >
                Featured Profiles
              </h2>
              <p
                style={{
                  color: "#5c3d24",
                  fontFamily: "'Lato',sans-serif",
                  fontSize: 14,
                }}
              >
                Verified profiles from across India and abroad
              </p>
            </div>
            <Link
              href="/matches"
              style={{
                background: "rgba(201,135,58,0.1)",
                border: "1px solid rgba(201,135,58,0.28)",
                color: "#a0704a",
                borderRadius: 8,
                padding: "10px 20px",
                textDecoration: "none",
                fontFamily: "'Lato',sans-serif",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              View All →
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 22,
            }}
          >
            {SAMPLE_PROFILES.slice(0, 4).map((p) => (
              <ProfileCard key={p.id} profile={p} onShare={setShareProfile} />
            ))}
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────── */}
        <section
          style={{ padding: "0 40px 80px", maxWidth: 1100, margin: "0 auto" }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg,rgba(201,135,58,0.12),rgba(232,199,133,0.08))",
              border: "1px solid rgba(201,135,58,0.3)",
              borderRadius: 20,
              padding: "60px 48px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 0%, rgba(201,135,58,0.08) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 44,
                color: "#2d1a0a",
                marginBottom: 16,
              }}
            >
              Your Perfect Match is Waiting
            </h2>
            <p
              style={{
                color: "#5c3d24",
                fontFamily: "'Lato',sans-serif",
                fontSize: 16,
                marginBottom: 36,
                maxWidth: 480,
                margin: "0 auto 36px",
              }}
            >
              Join thousands of happy couples who found love on BandhanConnect.
              It's free, always.
            </p>
            <Link
              href="/register"
              style={{
                background: "linear-gradient(135deg,#c9873a,#e8a857)",
                color: "#fbf9f4",
                borderRadius: 12,
                padding: "16px 48px",
                textDecoration: "none",
                fontFamily: "'Lato',sans-serif",
                fontSize: 17,
                fontWeight: 700,
                boxShadow: "0 8px 32px rgba(201,135,58,0.2)",
                display: "inline-block",
              }}
            >
              Get Started — It's Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(201,135,58,0.15)",
          padding: "32px 40px",
          textAlign: "center",
          color: "rgba(201,135,58,0.6)",
          fontFamily: "'Lato',sans-serif",
          fontSize: 13,
        }}
      >
        © {new Date().getFullYear()} BandhanConnect · Free matrimonial platform
        · Made with ♥ in India
      </footer>

      {shareProfile && (
        <ShareModal
          profile={shareProfile}
          onClose={() => setShareProfile(null)}
        />
      )}
    </>
  );
}
