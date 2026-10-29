import type { Accent } from "@/data/portfolio";

/**
 * Colours for the generated favicon, Apple icon, social card and browser
 * theme colour. Keep in sync with the presets in src/app/globals.css.
 */
export const accentPresets: Record<
  Accent,
  { bg: string; lightBg: string; ink: string; muted: string; accent: string; onAccent: string; stops: string[] }
> = {
  aurora: {
    bg: "#07070b",
    lightBg: "#f5f4fa",
    ink: "#f4f2fa",
    muted: "#8b87a1",
    accent: "#b39dff",
    onAccent: "#0c0818",
    stops: ["#7466ff", "#b39dff", "#ff9ec4", "#ffc2a1"],
  },
  emerald: {
    bg: "#060a08",
    lightBg: "#f2f6f3",
    ink: "#eef5f0",
    muted: "#7f9488",
    accent: "#5fe0b0",
    onAccent: "#04130d",
    stops: ["#1f9e74", "#5fe0b0", "#d4f7e6"],
  },
  ember: {
    bg: "#0a0706",
    lightBg: "#f8f3f0",
    ink: "#f8efea",
    muted: "#978780",
    accent: "#ff7a50",
    onAccent: "#150806",
    stops: ["#e0362c", "#ff7a50", "#ffc59e"],
  },
  gold: {
    bg: "#0a0908",
    lightBg: "#f4efe6",
    ink: "#f4eee4",
    muted: "#8e877c",
    accent: "#d5b47a",
    onAccent: "#15110a",
    stops: ["#94703a", "#d5b47a", "#f3e0b2"],
  },
};
