"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

function format(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Counts up from zero the first time it scrolls into view.
 * The final value is server-rendered for crawlers and no-JS visitors,
 * then reset to zero on the client so it can count up.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 2.2,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const decimals = Number.isInteger(value) ? 0 : 1;

  useEffect(() => {
    const node = ref.current;
    if (!node || started.current || prefersReducedMotion()) return;
    node.textContent = format(0, decimals);
  }, [decimals]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || started.current) return;
    started.current = true;
    if (prefersReducedMotion()) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest, decimals);
      },
      onComplete: () => {
        node.textContent = format(value, decimals);
      },
    });
    return () => {
      controls.stop();
      node.textContent = format(value, decimals);
    };
  }, [inView, value, decimals, duration]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref} suppressHydrationWarning>
        {format(value, decimals)}
      </span>
      {suffix}
    </span>
  );
}
