"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/** Buttery inertia scrolling. Lenis disables itself for reduced-motion users. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true, autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
