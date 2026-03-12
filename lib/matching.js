import { EDUCATION } from './constants';

export function getAge(dob) {
  if (!dob) return 0;
  return new Date().getFullYear() - new Date(dob).getFullYear();
}

/**
 * Returns a compatibility score (0–99) and reasons array.
 */
export function calcMatchScore(profileA, profileB) {
  let score = 0;
  const reasons = [];

  // Religion (25 pts)
  if (profileA.religion && profileB.religion) {
    if (profileA.religion === profileB.religion) {
      score += 25;
      reasons.push('Same religion');
    } else {
      score += 5;
    }
  }

  // Caste (15 pts)
  if (profileA.caste && profileB.caste && profileA.caste === profileB.caste) {
    score += 15;
    reasons.push('Same community');
  }

  // Diet (10 pts)
  if (profileA.diet && profileB.diet && profileA.diet === profileB.diet) {
    score += 10;
    reasons.push('Similar diet preferences');
  }

  // Marital status (10 pts)
  if (profileA.maritalStatus && profileB.maritalStatus &&
      profileA.maritalStatus === profileB.maritalStatus) {
    score += 10;
    reasons.push('Similar life stage');
  }

  // Age difference (15 pts)
  const ageA = getAge(profileA.dob);
  const ageB = getAge(profileB.dob);
  const ageDiff = Math.abs(ageA - ageB);
  if (ageDiff <= 2) { score += 15; reasons.push('Close in age'); }
  else if (ageDiff <= 5) { score += 8; }
  else if (ageDiff <= 8) { score += 3; }

  // City (10 pts)
  if (profileA.city && profileB.city && profileA.city === profileB.city) {
    score += 10;
    reasons.push('Same city');
  }

  // Education level (15 pts)
  const eduA = EDUCATION.indexOf(profileA.education);
  const eduB = EDUCATION.indexOf(profileB.education);
  if (eduA !== -1 && eduB !== -1) {
    const diff = Math.abs(eduA - eduB);
    if (diff <= 1) { score += 15; reasons.push('Similar education level'); }
    else if (diff <= 2) { score += 7; }
  }

  return { score: Math.min(score, 99), reasons };
}

/**
 * Filter a list of profiles based on filter criteria.
 */
export function applyFilters(profiles, currentUser, filters, searchQuery) {
  return profiles.filter((p) => {
    // Exclude self
    if (currentUser && p.id === currentUser.id) return false;
    // Opposite gender only
    if (currentUser && p.gender === currentUser.gender) return false;

    // Age range
    const age = getAge(p.dob);
    if (age < (filters.minAge || 18) || age > (filters.maxAge || 80)) return false;

    // Dropdown filters
    const fields = ['religion', 'maritalStatus', 'education', 'city', 'diet', 'profession'];
    for (const f of fields) {
      if (filters[f] && filters[f] !== 'Any' && p[f] !== filters[f]) return false;
    }

    // Text search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack = [p.name, p.city, p.profession, p.religion, p.caste, p.education]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}
