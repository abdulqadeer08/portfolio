"use client";

import { useSyncExternalStore } from "react";

// Read on the client so the prerendered page never shows a stale year.
const BUILD_FALLBACK = "2026";

export function CurrentYear() {
  const year = useSyncExternalStore(
    () => () => {},
    () => String(new Date().getFullYear()),
    () => BUILD_FALLBACK,
  );
  return <span suppressHydrationWarning>{year}</span>;
}
