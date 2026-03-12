"use client";
import Link from "next/link";
import Icon from "./Icon";
import { getAge } from "../lib/matching";

export default function ProfileCard({
  profile,
  matchScore,
  matchReasons = [],
  onShare,
}) {
  const age = getAge(profile.dob);
  const heightShort = profile.height ? profile.height.split(" ")[0] : "";

  return (
    <div
      className="profile-card"
      style={{
        background: "linear-gradient(145deg,#f5f3ed,#ede9e0)",
        border: "1px solid rgba(201,135,58,0.22)",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Match badge */}
      {matchScore != null && (
        <div
          className="match-badge"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            background: "linear-gradient(135deg,#c9873a,#e8a857)",
            color: "#fbf9f4",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 20,
            fontFamily: "'Lato',sans-serif",
          }}
        >
          {matchScore}% Match
        </div>
      )}

      {/* Verified badge */}
      {profile.verified && (
        <div
          style={{
            position: "absolute",
            top: matchScore != null ? 44 : 12,
            right: 12,
            zIndex: 2,
            background: "rgba(76,175,80,0.15)",
            border: "1px solid rgba(76,175,80,0.4)",
            borderRadius: 20,
            padding: "3px 8px",
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontFamily: "'Lato',sans-serif",
            fontSize: 11,
            color: "#4CAF50",
          }}
        >
          <Icon name="verified" size={11} color="#4CAF50" /> Verified
        </div>
      )}

      {/* Photo */}
      <div
        style={{
          position: "relative",
          paddingTop: "75%",
          background: "#ede9e0",
        }}
      >
        <img
          src={
            profile.photo ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=c9873a&color=fff&size=300`
          }
          alt={profile.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=c9873a&color=fff&size=300`;
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Info */}
      <div
        style={{
          padding: "16px 18px 18px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 4,
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 20,
              color: "#2d1a0a",
              fontWeight: 600,
            }}
          >
            {profile.name}
          </h3>
          <span
            style={{
              fontSize: 12,
              color: "#5c3d24",
              fontFamily: "'Lato',sans-serif",
              background: "rgba(201,135,58,0.1)",
              padding: "2px 8px",
              borderRadius: 10,
            }}
          >
            {profile.gender === "Male" ? "♂" : "♀"}
          </span>
        </div>

        <p
          style={{
            color: "#5c3d24",
            fontSize: 13,
            fontFamily: "'Lato',sans-serif",
            marginBottom: 10,
          }}
        >
          {age} yrs · {heightShort} · {profile.maritalStatus}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginBottom: 12,
          }}
        >
          {[
            ["user", profile.profession],
            ["location", profile.city],
            ["heart", `${profile.religion} · ${profile.caste}`],
          ].map(([icon, text]) => (
            <span
              key={icon}
              style={{
                color: "#8b6f47",
                fontSize: 13,
                fontFamily: "'Lato',sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon name={icon} size={12} color="#a0704a" /> {text}
            </span>
          ))}
        </div>

        {/* Match reasons tags */}
        {matchReasons.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              marginBottom: 12,
            }}
          >
            {matchReasons.slice(0, 3).map((r, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(201,135,58,0.1)",
                  border: "1px solid rgba(201,135,58,0.2)",
                  color: "#5c3d24",
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 10,
                  fontFamily: "'Lato',sans-serif",
                }}
              >
                {r}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
          <Link
            href={`/profile/${profile.id}`}
            style={{
              flex: 1,
              background: "linear-gradient(135deg,#c9873a,#e8a857)",
              color: "#fbf9f4",
              borderRadius: 8,
              padding: "9px",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "'Lato',sans-serif",
              textDecoration: "none",
              textAlign: "center",
              display: "block",
              transition: "opacity 0.2s",
            }}
          >
            View Profile
          </Link>
          {onShare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(profile);
              }}
              style={{
                background: "rgba(201,135,58,0.12)",
                color: "#a0704a",
                border: "1px solid rgba(201,135,58,0.28)",
                borderRadius: 8,
                padding: "9px 13px",
                display: "flex",
                alignItems: "center",
              }}
              title="Share profile"
            >
              <Icon name="share" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
