"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon from "./Icon";
import { getCurrentUser, setCurrentUser } from "../lib/store";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const logout = () => {
    setCurrentUser(null);
    setUser(null);
    router.push("/");
  };

  const links = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/matches", label: "Find Matches", icon: "heart" },
    { href: "/register", label: "Create Profile", icon: "user" },
  ];

  const nav = {
    position: "sticky",
    top: 0,
    zIndex: 200,
    background: scrolled ? "rgba(251,249,244,0.98)" : "rgba(251,249,244,0.85)",
    borderBottom: "1px solid rgba(201,135,58,0.2)",
    backdropFilter: "blur(14px)",
    transition: "background 0.3s",
    padding: "0 32px",
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const active = (href) => pathname === href;

  return (
    <nav style={nav}>
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#c9873a,#e8a857)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(201,135,58,0.3)",
          }}
        >
          <Icon name="heart" size={18} color="#fbf9f4" />
        </div>
        <span
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#2d1a0a",
            letterSpacing: 0.5,
          }}
        >
          BandhanConnect
        </span>
      </Link>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: active(l.href)
                ? "rgba(201,135,58,0.15)"
                : "transparent",
              color: active(l.href) ? "#2d1a0a" : "#a0704a",
              border: active(l.href)
                ? "1px solid rgba(201,135,58,0.35)"
                : "1px solid transparent",
              borderRadius: 8,
              padding: "8px 16px",
              fontFamily: "'Lato',sans-serif",
              fontSize: 14,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            <Icon name={l.icon} size={15} /> {l.label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {user ? (
          <>
            <Link
              href="/my-profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(201,135,58,0.1)",
                color: "#2d1a0a",
                border: "1px solid rgba(201,135,58,0.3)",
                borderRadius: 8,
                padding: "8px 14px",
                fontFamily: "'Lato',sans-serif",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <img
                src={
                  user.photo ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=c9873a&color=fff`
                }
                alt={user.name}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=c9873a&color=fff`;
                }}
              />
              {user.name.split(" ")[0]}
            </Link>
            <button
              onClick={logout}
              style={{
                background: "none",
                border: "1px solid rgba(201,135,58,0.2)",
                color: "#a0704a",
                borderRadius: 8,
                padding: "8px 12px",
                fontFamily: "'Lato',sans-serif",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              title="Logout"
            >
              <Icon name="logout" size={15} /> Logout
            </button>
          </>
        ) : (
          <Link
            href="/register"
            style={{
              background: "linear-gradient(135deg,#c9873a,#e8a857)",
              color: "#fbf9f4",
              border: "none",
              borderRadius: 8,
              padding: "9px 22px",
              fontFamily: "'Lato',sans-serif",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(201,135,58,0.2)",
            }}
          >
            Join Free
          </Link>
        )}
      </div>
    </nav>
  );
}
