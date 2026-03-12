"use client";
import { useEffect } from "react";
import Icon from "./Icon";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: {
      bg: "#f5f3ed",
      border: "#c9873a",
      icon: "#4CAF50",
      iconName: "check",
    },
    error: { bg: "#f5f3ed", border: "#e74c3c", icon: "#e74c3c", iconName: "x" },
    info: {
      bg: "#f5f3ed",
      border: "#c9873a",
      icon: "#c9873a",
      iconName: "sparkles",
    },
  };
  const c = colors[type] || colors.success;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        background: c.bg,
        color: "#2d1a0a",
        padding: "13px 28px",
        borderRadius: 50,
        fontFamily: "'Lato',sans-serif",
        fontSize: 15,
        zIndex: 9999,
        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        border: `1px solid ${c.border}`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "fadeIn 0.3s ease",
        whiteSpace: "nowrap",
      }}
    >
      <Icon name={c.iconName} size={16} color={c.icon} />
      {message}
    </div>
  );
}
