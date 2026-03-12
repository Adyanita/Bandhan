"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import Toast from "./Toast";
import {
  RELIGIONS,
  CASTES_BY_RELIGION,
  GENDERS,
  MARITAL_STATUS,
  HEIGHTS,
  COMPLEXIONS,
  BODY_TYPES,
  DIET,
  EDUCATION,
  PROFESSIONS,
  INCOME_RANGES,
  CITIES,
} from "../lib/constants";
import { saveProfile, setCurrentUser, getCurrentUser } from "../lib/store";

const STEPS = [
  { title: "Personal", subtitle: "Basic details about you" },
  { title: "Background", subtitle: "Religion & lifestyle" },
  { title: "Career", subtitle: "Education & profession" },
  { title: "Family", subtitle: "Family & partner prefs" },
];

function FormField({ label, error, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          color: "#5c3d24",
          fontFamily: "'Lato',sans-serif",
          fontSize: 12,
          marginBottom: 6,
          letterSpacing: 0.4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          style={{
            color: "#e74c3c",
            fontSize: 12,
            marginTop: 4,
            fontFamily: "'Lato',sans-serif",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = (err) => ({
  width: "100%",
  background: "rgba(201,135,58,0.08)",
  border: `1px solid ${err ? "#e74c3c" : "rgba(201,135,58,0.25)"}`,
  borderRadius: 8,
  padding: "11px 14px",
  color: "#2d1a0a",
  fontFamily: "'Lato',sans-serif",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
});

export default function RegisterForm({ editProfile = null, onSuccess }) {
  const router = useRouter();
  const isEdit = Boolean(editProfile);

  const [step, setStep] = useState(1);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState(
    editProfile || {
      name: "",
      gender: "Male",
      dob: "",
      religion: "Hindu",
      caste: "",
      education: "",
      profession: "",
      city: "",
      height: HEIGHTS[8],
      maritalStatus: "Never Married",
      diet: "Vegetarian",
      complexion: "Fair",
      bodyType: "Average",
      income: "₹5L–₹10L",
      about: "",
      hobbies: "",
      languages: "Hindi, English",
      fatherProfession: "",
      motherProfession: "",
      siblings: "",
      partnerReligion: "Any",
      partnerMinAge: "22",
      partnerMaxAge: "35",
      partnerCity: "Any",
      photo: "",
    },
  );
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.religion) e.religion = "Religion is required";
    if (!form.caste) e.caste = "Caste/Community is required";
    if (!form.education) e.education = "Education is required";
    if (!form.profession) e.profession = "Profession is required";
    if (!form.city) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) {
      setStep(1);
      return;
    }
    const id = editProfile ? editProfile.id : `user_${Date.now()}`;
    const profile = {
      ...form,
      id,
      verified: editProfile ? editProfile.verified : false,
      createdAt: editProfile ? editProfile.createdAt : Date.now(),
      photo:
        form.photo ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=c9873a&color=fff&size=300`,
    };
    saveProfile(profile);
    setCurrentUser(profile);
    if (onSuccess) {
      onSuccess(profile);
      return;
    }
    setToast(
      isEdit
        ? "Profile updated! ✨"
        : "Profile created! Welcome to BandhanConnect 🎉",
    );
    setTimeout(() => router.push("/matches"), 1600);
  };

  const sel = (key, opts, err) => (
    <select
      value={form[key] || ""}
      onChange={(e) => set(key, e.target.value)}
      style={inputStyle(err)}
    >
      <option value="">Select…</option>
      {opts.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );

  const inp = (key, type = "text", placeholder = "", err) => (
    <input
      type={type}
      value={form[key] || ""}
      onChange={(e) => set(key, e.target.value)}
      placeholder={placeholder}
      style={inputStyle(err)}
    />
  );

  const grid = (children) => (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 22px" }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      {!isEdit && (
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 40,
              color: "#2d1a0a",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Create Your Profile
          </h1>
          <p
            style={{
              color: "#5c3d24",
              fontFamily: "'Lato',sans-serif",
              fontSize: 15,
            }}
          >
            Join thousands finding their perfect match — free forever
          </p>
        </div>
      )}

      {/* Step bar */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 32,
          background: "rgba(201,135,58,0.08)",
          borderRadius: 12,
          padding: 5,
        }}
      >
        {STEPS.map((s, i) => {
          const active = step === i + 1;
          const done = step > i + 1;
          return (
            <button
              key={i}
              onClick={() => setStep(i + 1)}
              style={{
                flex: 1,
                background: active
                  ? "linear-gradient(135deg,#c9873a,#e8a857)"
                  : "none",
                color: active
                  ? "#fbf9f4"
                  : done
                    ? "#c9873a"
                    : "rgba(201,135,58,0.45)",
                border: "none",
                borderRadius: 8,
                padding: "10px 6px",
                cursor: "pointer",
                fontFamily: "'Lato',sans-serif",
                fontSize: 13,
                fontWeight: active ? 700 : 400,
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                {done && <Icon name="check" size={12} color="#c9873a" />}
                {!done && (
                  <span style={{ opacity: active ? 1 : 0.6 }}>{i + 1}.</span>
                )}
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Form panel */}
      <div
        style={{
          background: "linear-gradient(145deg,#f5f3ed,#ede9e0)",
          border: "1px solid rgba(201,135,58,0.22)",
          borderRadius: 18,
          padding: "32px 36px",
        }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 22,
            color: "#2d1a0a",
            marginBottom: 4,
          }}
        >
          {STEPS[step - 1].title}
        </h3>
        <p
          style={{
            color: "#5c3d24",
            fontSize: 13,
            fontFamily: "'Lato',sans-serif",
            marginBottom: 26,
          }}
        >
          {STEPS[step - 1].subtitle}
        </p>

        {step === 1 &&
          grid(
            <>
              <FormField label="Full Name *" error={errors.name}>
                {inp("name", "text", "Your full name", errors.name)}
              </FormField>
              <FormField label="Gender">{sel("gender", GENDERS)}</FormField>
              <FormField label="Date of Birth *" error={errors.dob}>
                {inp("dob", "date", "", errors.dob)}
              </FormField>
              <FormField label="Marital Status">
                {sel("maritalStatus", MARITAL_STATUS)}
              </FormField>
              <FormField label="Height">{sel("height", HEIGHTS)}</FormField>
              <FormField label="Complexion">
                {sel("complexion", COMPLEXIONS)}
              </FormField>
              <FormField label="Body Type">
                {sel("bodyType", BODY_TYPES)}
              </FormField>
              <FormField label="Diet">{sel("diet", DIET)}</FormField>
              <div style={{ gridColumn: "span 2" }}>
                <FormField label="Profile Photo URL (optional)">
                  <input
                    type="url"
                    value={form.photo || ""}
                    onChange={(e) => set("photo", e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    style={inputStyle(false)}
                  />
                  <p
                    style={{
                      color: "rgba(201,135,58,0.7)",
                      fontSize: 11,
                      marginTop: 4,
                      fontFamily: "'Lato',sans-serif",
                    }}
                  >
                    Paste a direct image URL (from Imgur, Google Drive, etc.)
                  </p>
                </FormField>
              </div>
            </>,
          )}

        {step === 2 && (
          <>
            {grid(
              <>
                <FormField label="Religion *" error={errors.religion}>
                  {sel("religion", RELIGIONS, errors.religion)}
                </FormField>
                <FormField label="Caste / Community *" error={errors.caste}>
                  {sel(
                    "caste",
                    CASTES_BY_RELIGION[form.religion] || ["Other"],
                    errors.caste,
                  )}
                </FormField>
                <FormField label="City / Location *" error={errors.city}>
                  {sel("city", CITIES, errors.city)}
                </FormField>
                <FormField label="Languages Known">
                  {inp("languages", "text", "Hindi, English, Telugu")}
                </FormField>
              </>,
            )}
            <FormField label="About Me">
              <textarea
                value={form.about || ""}
                onChange={(e) => set("about", e.target.value)}
                rows={4}
                placeholder="Tell potential matches about yourself, your values, what you're looking for…"
                style={{
                  ...inputStyle(false),
                  resize: "vertical",
                  lineHeight: 1.6,
                }}
              />
            </FormField>
            <FormField label="Hobbies & Interests">
              {inp("hobbies", "text", "Reading, Cooking, Travel, Cricket…")}
            </FormField>
          </>
        )}

        {step === 3 &&
          grid(
            <>
              <FormField label="Highest Education *" error={errors.education}>
                {sel("education", EDUCATION, errors.education)}
              </FormField>
              <FormField label="Profession *" error={errors.profession}>
                {sel("profession", PROFESSIONS, errors.profession)}
              </FormField>
              <div style={{ gridColumn: "span 2" }}>
                <FormField label="Annual Income">
                  {sel("income", INCOME_RANGES)}
                </FormField>
              </div>
            </>,
          )}

        {step === 4 && (
          <>
            <h4
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 18,
                color: "#2d1a0a",
                marginBottom: 16,
              }}
            >
              Family Background
            </h4>
            {grid(
              <>
                <FormField label="Father's Profession">
                  {sel("fatherProfession", ["", ...PROFESSIONS])}
                </FormField>
                <FormField label="Mother's Profession">
                  {sel("motherProfession", ["", "Homemaker", ...PROFESSIONS])}
                </FormField>
                <FormField label="Siblings">
                  {inp("siblings", "text", "e.g. 1 Brother, 2 Sisters")}
                </FormField>
              </>,
            )}
            <div
              style={{
                height: 1,
                background: "rgba(201,135,58,0.15)",
                margin: "20px 0",
              }}
            />
            <h4
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 18,
                color: "#2d1a0a",
                marginBottom: 16,
              }}
            >
              Partner Preferences
            </h4>
            {grid(
              <>
                <FormField label="Preferred Religion">
                  {sel("partnerReligion", ["Any", ...RELIGIONS])}
                </FormField>
                <FormField label="Preferred City">
                  {sel("partnerCity", ["Any", ...CITIES])}
                </FormField>
                <FormField label="Min Age (years)">
                  {inp("partnerMinAge", "number", "22")}
                </FormField>
                <FormField label="Max Age (years)">
                  {inp("partnerMaxAge", "number", "35")}
                </FormField>
              </>,
            )}
          </>
        )}

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 28,
          }}
        >
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{
                background: "rgba(201,135,58,0.12)",
                color: "#a0704a",
                border: "1px solid rgba(201,135,58,0.28)",
                borderRadius: 10,
                padding: "12px 28px",
                fontFamily: "'Lato',sans-serif",
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon name="arrow_left" size={16} /> Previous
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              style={{
                background: "linear-gradient(135deg,#c9873a,#e8a857)",
                color: "#fbf9f4",
                border: "none",
                borderRadius: 10,
                padding: "12px 32px",
                fontFamily: "'Lato',sans-serif",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={submit}
              style={{
                background: "linear-gradient(135deg,#c9873a,#e8a857)",
                color: "#fbf9f4",
                border: "none",
                borderRadius: 10,
                padding: "12px 36px",
                fontFamily: "'Lato',sans-serif",
                fontSize: 16,
                fontWeight: 700,
                boxShadow: "0 6px 24px rgba(201,135,58,0.2)",
              }}
            >
              {isEdit ? "✓ Save Changes" : "🎉 Create Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
