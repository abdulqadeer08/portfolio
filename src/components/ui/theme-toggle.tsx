"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { MouseEvent } from "react";
import { useTheme, type Theme } from "@/lib/hooks";
import { cn, EASE_LUXE } from "@/lib/utils";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduce) {
      applyTheme(next);
      return;
    }

    // Reveal the new theme as a circle expanding from the button.
    const x = event.clientX;
    const y = event.clientY;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 800, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "relative grid size-10 place-items-center overflow-hidden rounded-full border border-line text-ink-soft transition-colors duration-500 hover:border-accent/50 hover:text-accent",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -18, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.45, ease: EASE_LUXE }}
        >
          {theme === "dark" ? <Moon className="size-4" strokeWidth={1.5} /> : <Sun className="size-4" strokeWidth={1.5} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
