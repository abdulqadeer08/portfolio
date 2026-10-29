import { ImageResponse } from "next/og";
import { profile, site } from "@/data/portfolio";
import { accentPresets } from "@/lib/accents";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 16,
          background: `linear-gradient(135deg, ${colors.stops.join(", ")})`,
          color: colors.onAccent,
          fontSize: 30,
          letterSpacing: -1,
        }}
      >
        {profile.initials}
      </div>
    ),
    size,
  );
}
