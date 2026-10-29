"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** `true` once rendering on the client, `false` during SSR and prerender. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

// ─── Intro (preloader) state ────────────────────────────────────────────────
// The hero waits for the preloader curtain before it animates in.

let introDone = false;
const introListeners = new Set<() => void>();

export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  introListeners.forEach((listener) => listener());
}

export function useIntroDone() {
  return useSyncExternalStore(
    (onChange) => {
      introListeners.add(onChange);
      return () => introListeners.delete(onChange);
    },
    () => introDone,
    () => false,
  );
}

// ─── Theme ──────────────────────────────────────────────────────────────────

export type Theme = "dark" | "light";

export function useTheme(): Theme {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => observer.disconnect();
    },
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    () => "dark",
  );
}
