import { ImageResponse } from "next/og";
import { profile, site } from "@/data/portfolio";
import { accentPresets } from "@/lib/accents";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const colors = accentPresets[site.accent];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.bg,
          color: colors.accent,
          fontSize: 84,
          letterSpacing: -3,
        }}
      >
        {profile.initials}
      </div>
    ),
    size,
  );
}
