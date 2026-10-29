import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Signature easing used across every animation on the site. */
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
