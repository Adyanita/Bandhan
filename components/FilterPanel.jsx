"use client";
import { useState } from "react";
import Icon from "./Icon";
import {
  RELIGIONS,
  MARITAL_STATUS,
  EDUCATION,
  CITIES,
  DIET,
  PROFESSIONS,
} from "../lib/constants";

const FILTER_FIELDS = [
  ["Religion", "religion", ["Any", ...RELIGIONS]],
  ["Marital Status", "maritalStatus", ["Any", ...MARITAL_STATUS]],
  ["Education", "education", ["Any", ...EDUCATION]],
  ["City", "city", ["Any", ...CITIES]],
  ["Diet", "diet", ["Any", ...DIET]],
  ["Profession", "profession", ["Any", ...PROFESSIONS]],
];

const sel = (val, onChange, opts) => (
  <select
    value={val || "Any"}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: "100%",
      background: "rgba(201,135,58,0.08)",
      border: "1px solid rgba(201,135,58,0.22)",
      borderRadius: 6,
      padding: "9px 11px",
      color: "#2d1a0a",
      fontFamily: "'Lato',sans-serif",
      fontSize: 13,
      outline: "none",
      cursor: "pointer",
    }}
  >
    {opts.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </select>
);

export default function FilterPanel({ filters, setFilters }) {
  const [open, setOpen] = useState(false);
  const set = (k, v) => setFilters((f) => ({ ...f, [k]: v }));
  const reset = () => setFilters({ minAge: 18, maxAge: 65 });
  const activeCount = Object.entries(filters).filter(
    ([k, v]) => k !== "minAge" && k !== "maxAge" && v && v !== "Any",
  ).length;

  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: open
              ? "rgba(201,135,58,0.18)"
              : "rgba(201,135,58,0.08)",
            border: "1px solid rgba(201,135,58,0.28)",
            color: "#a0704a",
            borderRadius: 10,
            padding: "10px 18px",
            fontFamily: "'Lato',sans-serif",
            fontSize: 14,
          }}
        >
          <Icon name="filter" size={15} />
          Filters{" "}
          {activeCount > 0 && (
            <span
              style={{
                background: "linear-gradient(135deg,#c9873a,#e8a857)",
                color: "#fbf9f4",
                borderRadius: 10,
                padding: "1px 7px",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {activeCount}
            </span>
          )}
          <Icon
            name="chevron_down"
            size={14}
            style={{
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        </button>
        {activeCount > 0 && (
          <button
            onClick={reset}
            style={{
              background: "none",
              border: "1px solid rgba(201,135,58,0.2)",
              color: "#a0704a",
              borderRadius: 8,
              padding: "9px 14px",
              fontFamily: "'Lato',sans-serif",
              fontSize: 13,
            }}
          >
            Reset all
          </button>
        )}
      </div>

      {open && (
        <div
          style={{
            marginTop: 14,
            background: "linear-gradient(145deg,#f5f3ed,#ede9e0)",
            border: "1px solid rgba(201,135,58,0.2)",
            borderRadius: 14,
            padding: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
            gap: "16px 18px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {FILTER_FIELDS.map(([label, key, opts]) => (
            <div key={key}>
              <label
                style={{
                  display: "block",
                  color: "#5c3d24",
                  fontSize: 12,
                  fontFamily: "'Lato',sans-serif",
                  marginBottom: 5,
                  letterSpacing: 0.3,
                }}
              >
                {label}
              </label>
              {sel(filters[key], (v) => set(key, v), opts)}
            </div>
          ))}
          <div>
            <label
              style={{
                display: "block",
                color: "#5c3d24",
                fontSize: 12,
                fontFamily: "'Lato',sans-serif",
                marginBottom: 5,
              }}
            >
              Min Age
            </label>
            <input
              type="number"
              value={filters.minAge || 18}
              min={18}
              max={80}
              onChange={(e) => set("minAge", +e.target.value)}
              style={{
                width: "100%",
                background: "rgba(201,135,58,0.08)",
                border: "1px solid rgba(201,135,58,0.22)",
                borderRadius: 6,
                padding: "9px 11px",
                color: "#2d1a0a",
                fontFamily: "'Lato',sans-serif",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                color: "#5c3d24",
                fontSize: 12,
                fontFamily: "'Lato',sans-serif",
                marginBottom: 5,
              }}
            >
              Max Age
            </label>
            <input
              type="number"
              value={filters.maxAge || 65}
              min={18}
              max={80}
              onChange={(e) => set("maxAge", +e.target.value)}
              style={{
                width: "100%",
                background: "rgba(201,135,58,0.08)",
                border: "1px solid rgba(201,135,58,0.22)",
                borderRadius: 6,
                padding: "9px 11px",
                color: "#2d1a0a",
                fontFamily: "'Lato',sans-serif",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
