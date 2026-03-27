"use client";
import { useState } from "react";
import Icon from "./Icon";

export default function ShareModal({ profile, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/profile/${profile.id}`
      : `/profile/${profile.id}`;

  const copy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const waUrl = `https://wa.me/?text=${encodeURIComponent(`Check out ${profile.name}'s profile on Sampark Sutra: ${shareUrl}`)}`;
  const mailUrl = `mailto:?subject=Profile on Sampark Sutra&body=I found a great profile: ${profile.name}%0A${shareUrl}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this profile on Sampark Sutra!`)}&url=${encodeURIComponent(shareUrl)}`;

  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.15)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(6px)",
    animation: "fadeIn 0.2s ease",
  };
  const modal = {
    background: "linear-gradient(145deg,#f5f3ed,#ede9e0)",
    border: "1px solid rgba(201,135,58,0.4)",
    borderRadius: 18,
    padding: 36,
    minWidth: 360,
    maxWidth: 460,
    position: "relative",
    boxShadow: "0 32px 80px rgba(0,0,0,0.1)",
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(201,135,58,0.1)",
            border: "1px solid rgba(201,135,58,0.25)",
            color: "#a0704a",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icon name="close" size={16} />
        </button>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 26,
            color: "#2d1a0a",
            marginBottom: 4,
          }}
        >
          Share Profile
        </h3>
        <p
          style={{
            color: "#5c3d24",
            fontSize: 14,
            fontFamily: "'Lato',sans-serif",
            marginBottom: 28,
          }}
        >
          Share {profile.name}'s profile with your family or friends
        </p>

        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <button
            onClick={() => window.open(waUrl, "_blank")}
            style={{
              flex: 1,
              background: "#25D366",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px",
              fontFamily: "'Lato',sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <Icon name="whatsapp" size={18} color="#fff" /> WhatsApp
          </button>
          <button
            onClick={() => window.open(mailUrl)}
            style={{
              flex: 1,
              background: "#EA4335",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px",
              fontFamily: "'Lato',sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <Icon name="mail" size={18} color="#fff" /> Email
          </button>
          <button
            onClick={() => window.open(tweetUrl, "_blank")}
            style={{
              flex: 1,
              background: "#1DA1F2",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px",
              fontFamily: "'Lato',sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            𝕏 Tweet
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            background: "rgba(201,135,58,0.08)",
            border: "1px solid rgba(201,135,58,0.25)",
            borderRadius: 10,
            padding: "10px 14px",
          }}
        >
          <Icon name="link" size={15} color="#c9873a" />
          <input
            value={shareUrl}
            readOnly
            style={{
              flex: 1,
              background: "none",
              border: "none",
              color: "#2d1a0a",
              fontSize: 13,
              fontFamily: "'Lato',sans-serif",
              outline: "none",
            }}
          />
          <button
            onClick={copy}
            style={{
              background: copied ? "#2ea44f" : "rgba(201,135,58,0.2)",
              color: copied ? "#fff" : "#c9873a",
              border: `1px solid ${copied ? "#2ea44f" : "rgba(201,135,58,0.4)"}`,
              borderRadius: 8,
              padding: "6px 14px",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Lato',sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s",
            }}
          >
            <Icon name={copied ? "check" : "copy"} size={14} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
