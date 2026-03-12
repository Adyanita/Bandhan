'use client';
import { SAMPLE_PROFILES } from './constants';

const PROFILES_KEY = 'bc_profiles';
const USER_KEY     = 'bc_current_user';

// ─── Profile Store (localStorage) ────────────────────────────────────────────
export function getAllProfiles() {
  if (typeof window === 'undefined') return SAMPLE_PROFILES;
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(SAMPLE_PROFILES));
      return SAMPLE_PROFILES;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_PROFILES;
  }
}

export function getProfileById(id) {
  return getAllProfiles().find((p) => p.id === id) || null;
}

export function saveProfile(profile) {
  const all = getAllProfiles();
  const idx = all.findIndex((p) => p.id === profile.id);
  if (idx >= 0) {
    all[idx] = profile;
  } else {
    all.unshift(profile);
  }
  localStorage.setItem(PROFILES_KEY, JSON.stringify(all));
  return profile;
}

export function deleteProfile(id) {
  const all = getAllProfiles().filter((p) => p.id !== id);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(all));
}

// ─── Current User ─────────────────────────────────────────────────────────────
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(profile) {
  if (profile) {
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

// ─── Interests ────────────────────────────────────────────────────────────────
const INTERESTS_KEY = 'bc_interests';

export function getSentInterests() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(INTERESTS_KEY) || '[]');
  } catch { return []; }
}

export function toggleInterest(profileId) {
  const list = getSentInterests();
  const idx  = list.indexOf(profileId);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(profileId);
  localStorage.setItem(INTERESTS_KEY, JSON.stringify(list));
  return list.includes(profileId);
}
