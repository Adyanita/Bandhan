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

  const active = (href) => pathname === href;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-stone-50/98 shadow-sm" : "bg-stone-50/85"} border-b border-amber-200/50 backdrop-blur-sm`}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 no-underline"
        >
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-linear-to-r from-amber-600 to-amber-500 flex items-center justify-center shadow-md">
            <Icon name="heart" size={16} color="#fbf9f4" />
          </div>
          <span className="font-serif font-bold text-base sm:text-lg lg:text-xl text-stone-800 hidden sm:inline">
            Sampark Sutra
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                active(l.href)
                  ? "bg-amber-100 border border-amber-300 text-stone-800"
                  : "bg-transparent border border-transparent text-amber-700 hover:bg-amber-50"
              }`}
            >
              <Icon name={l.icon} size={14} />
              <span className="hidden lg:inline">{l.label}</span>
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <Link
                href="/my-profile"
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-amber-100 border border-amber-300 text-stone-800 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
              >
                <img
                  src={
                    user.photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=c9873a&color=fff`
                  }
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=c9873a&color=fff`;
                  }}
                />
                <span className="hidden lg:inline">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
                title="Logout"
              >
                <Icon name="logout" size={16} color="#a0704a" />
              </button>
            </>
          ) : (
            <Link
              href="/register"
              className="bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md"
            >
              <span className="hidden sm:inline">Join Free</span>
              <span className="sm:hidden text-xs">Join</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 hover:bg-amber-100 rounded-lg transition-colors"
        >
          <Icon name={mobileOpen ? "x" : "menu"} size={20} color="#a0704a" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-amber-200/50 bg-stone-50/95 px-4 py-3 space-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                active(l.href)
                  ? "bg-amber-100 border border-amber-300 text-stone-800"
                  : "bg-transparent text-amber-700 hover:bg-amber-50"
              }`}
            >
              <Icon name={l.icon} size={16} />
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
