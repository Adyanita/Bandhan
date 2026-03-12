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
    <div className="bg-gradient-to-br from-stone-100 to-stone-50 border border-amber-200/50 rounded-2xl overflow-hidden relative flex flex-col hover:shadow-lg transition-shadow">
      {/* Match badge */}
      {matchScore != null && (
        <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {matchScore}% Match
        </div>
      )}

      {/* Verified badge */}
      {profile.verified && (
        <div className={`absolute ${matchScore != null ? 'top-12' : 'top-3'} right-3 z-20 bg-green-100/50 border border-green-400/50 rounded-full px-2 py-1 flex items-center gap-1`}>
          <Icon name="verified" size={11} color="#4CAF50" />
          <span className="text-xs font-semibold text-green-700">Verified</span>
        </div>
      )}

      {/* Photo */}
      <div className="relative w-full aspect-[3/4] bg-stone-200 overflow-hidden">
        <img
          src={
            profile.photo ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=c9873a&color=fff&size=300`
          }
          alt={profile.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=c9873a&color=fff&size=300`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
            position: "absolute",
            inset: 0,
            background:
  
      {/* Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-800">
            {profile.name}
          </h3>
          <span className="text-xs font-semibold text-stone-700 bg-amber-100/50 px-2 py-1 rounded-full">
            {profile.gender === "Male" ? "♂" : "♀"}
          </span>
        </div>

        <p className="text-stone-700 text-xs sm:text-sm font-sans mb-3">
          {age} yrs · {heightShort} · {profile.maritalStatus}
        </p>

        <div className="flex flex-col gap-2 mb-3">
          {[
            ["user", profile.profession],
            ["location", profile.city],
            ["heart", `${profile.religion} · ${profile.caste}`],
          ].map(([icon, text]) => (
            <span
              key={icon}
              className="text-amber-900 text-xs sm:text-sm font-sans flex items-center gap-2"
            >
              <Icon name={icon} size={12} color="#a0704a" />
              <span className="truncate">{text}</span>
            </span>
          ))}
        </div>

        {/* Match reasons tags */}
        {matchReasons.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {matchReasons.slice(0, 3).map((r, i) => (
              <span
                key={i}
                className="bg-amber-100 border border-amber-300 text-stone-700 text-xs px-2 py-1 rounded-full font-sans truncate"
              >
                {r}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/profile/${profile.id}`}
            className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white rounded-lg py-2 text-xs sm:text-sm font-bold font-sans text-center block transition-all"
          >
            View Profile
          </Link>
          {onShare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(profile);
              }}
              className="bg-amber-100 hover:bg-amber-200 text-amber-700 border border-amber-300 rounded-lg px-3 py-2 transition-colors"
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
