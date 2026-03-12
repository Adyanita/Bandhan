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
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 text-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-amber-100/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-amber-100/10 to-transparent rounded-full pointer-events-none" />

          <div className="relative z-10">
            <p className="text-xs sm:text-sm lg:text-base font-serif font-medium text-amber-700 tracking-widest uppercase mb-4 sm:mb-6">
              ✦ Find Your Soulmate ✦
            </p>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-stone-800 leading-tight mb-4 sm:mb-6 max-w-5xl mx-auto">
              Where Hearts
              <br />
              <em className="text-amber-700 italic block">Find Their Home</em>
            </h1>
            <p className="text-stone-700 font-sans text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              India's most trusted free matrimonial platform. Match by religion,
              caste, values, education and more across all communities.
              Sponsured by Rajnish Mishra.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="/register"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Create Free Profile
              </Link>
              <Link
                href="/matches"
                className="w-full sm:w-auto border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-all duration-300"
              >
                Browse Profiles →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {STATS.map(([n, l]) => (
              <div
                key={l}
                className="bg-gradient-to-br from-stone-100 to-stone-50 border border-amber-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-800 mb-2">
                  {n}
                </div>
                <div className="text-amber-700 font-sans text-xs sm:text-sm lg:text-base font-medium">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-stone-800 mb-2 sm:mb-4">
                How It Works
              </h2>
              <p className="text-stone-700 font-sans text-sm sm:text-base lg:text-lg">
                Find your life partner in three simple steps
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {HOW.map((h, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-stone-100 to-stone-50 border border-amber-200/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-center relative hover:shadow-lg transition-shadow"
                >
                  <div className="absolute top-4 left-6 font-serif text-6xl sm:text-7xl text-amber-100 font-bold leading-none opacity-50">
                    {i + 1}
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-100 to-stone-100 border border-amber-300 flex items-center justify-center mx-auto mb-4">
                      <Icon name={h.icon} size={24} color="#a0704a" />
                    </div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl lg:text-2xl text-stone-800 mb-2 sm:mb-3">
                      {h.title}
                    </h3>
                    <p className="text-stone-600 font-sans text-xs sm:text-sm lg:text-base leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 bg-stone-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-stone-800 text-center mb-8 sm:mb-12 lg:mb-16">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {WHY.map((w) => (
                <div
                  key={w.title}
                  className="bg-white border border-amber-200/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="mb-3 sm:mb-4 flex justify-center">
                    <Icon name={w.icon} size={32} color="#a0704a" />
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg lg:text-xl text-stone-800 mb-2 sm:mb-3">
                    {w.title}
                  </h4>
                  <p className="text-stone-600 font-sans text-xs sm:text-sm lg:text-base leading-relaxed">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Profiles Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
              <div>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-800 mb-2">
                  Featured Profiles
                </h2>
                <p className="text-stone-600 font-sans text-xs sm:text-sm lg:text-base">
                  Verified profiles from across India and abroad
                </p>
              </div>
              <Link
                href="/matches"
                className="w-full sm:w-auto text-center px-4 sm:px-6 py-2 sm:py-3 bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-700 rounded-lg font-sans text-sm font-medium transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {SAMPLE_PROFILES.slice(0, 4).map((p) => (
                <ProfileCard key={p.id} profile={p} onShare={setShareProfile} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-100 to-stone-50 border-2 border-amber-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial opacity-20 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-stone-800 mb-4 sm:mb-6">
                Your Perfect Match is Waiting
              </h2>
              <p className="text-stone-700 font-sans text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                Join thousands of happy couples who found love on
                BandhanConnect. It's free, always.
              </p>
              <Link
                href="/register"
                className="inline-block bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started — It's Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center text-amber-700/60 font-sans text-xs sm:text-sm">
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
