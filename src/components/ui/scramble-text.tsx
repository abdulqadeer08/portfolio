"use client";

import { useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=<>/";

/** Text that briefly scrambles, then resolves letter by letter, on hover. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number | null>(null);

  function scramble() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    const start = performance.now();
    const duration = 420;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const settled = Math.floor(progress * text.length);
      setDisplay(
        text
          .split("")
          .map((char, i) =>
            i < settled || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      frame.current = progress < 1 ? requestAnimationFrame(tick) : null;
    };
    frame.current = requestAnimationFrame(tick);
  }

  return (
    <span className={className} onPointerEnter={scramble}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{display}</span>
    </span>
  );
}
