import { ImageResponse } from "next/og";
import { fullName, profile, site } from "@/data/portfolio";
import { accentPresets } from "@/lib/accents";

export const alt = `${fullName} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const colors = accentPresets[site.accent];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            `radial-gradient(80% 70% at 50% 0%, ${colors.stops[0]}55, transparent 70%), ${colors.bg}`,
          color: colors.ink,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 76,
              height: 76,
              borderRadius: 999,
              border: `1.5px solid ${colors.accent}99`,
              alignItems: "center",
              justifyContent: "center",
              color: colors.accent,
              fontSize: 32,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: colors.muted, textTransform: "uppercase" }}>
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, color: colors.accent, textTransform: "uppercase" }}>
            {profile.role}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 132, letterSpacing: -5, lineHeight: 1 }}>
            {fullName}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 2,
            width: "100%",
            background: `linear-gradient(90deg, ${colors.stops.join(", ")}, transparent)`,
          }}
        />
      </div>
    ),
    size,
  );
}
