"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Pins the footer underneath the page so it is revealed as the content lifts
 * away. Only enabled on large screens where the whole footer fits in view.
 */
export function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setFits(window.innerWidth >= 1024 && el.offsetHeight <= window.innerHeight);
    // ResizeObserver also fires once right after observe(), covering the first check.
    const observer = new ResizeObserver(check);
    observer.observe(el);
    window.addEventListener("resize", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div ref={ref} className={cn("z-0", fits ? "sticky bottom-0" : "relative")}>
      {children}
    </div>
  );
}
