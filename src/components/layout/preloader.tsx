"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { fullName, profile } from "@/data/portfolio";
import { markIntroDone } from "@/lib/hooks";
import { EASE_LUXE } from "@/lib/utils";

const CURTAIN = [0.76, 0, 0.24, 1] as const;

export function Preloader() {
  const [done, setDone] = useState(false);
  const progress = useMotionValue(0);
  const count = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const scaleX = useTransform(progress, [0, 100], [0, 1]);
  const lenis = useLenis();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(progress, 100, {
      duration: reduce ? 0.3 : 2.1,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setDone(true);
        markIntroDone();
      },
    });
    return () => controls.stop();
  }, [progress]);

  useEffect(() => {
    if (!lenis) return;
    if (done) lenis.start();
    else lenis.stop();
  }, [done, lenis]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[90] flex flex-col justify-between overflow-hidden bg-bg p-6 sm:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: CURTAIN }}
        >
          <div className="flex items-start justify-between">
            <span className="eyebrow">{profile.shortRole}</span>
            <span className="eyebrow">{profile.location}</span>
          </div>

          <div className="text-center">
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-none tracking-[-0.05em]"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.15, ease: EASE_LUXE }}
              >
                {profile.firstName} <span className="text-shine">{profile.lastName}</span>
              </motion.h2>
            </div>
            <motion.p
              className="eyebrow mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Crafting the experience
            </motion.p>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <span className="eyebrow max-w-[12rem] leading-relaxed">{fullName} · Portfolio</span>
              <motion.span className="font-display text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums text-ink">
                {count}
              </motion.span>
            </div>
            <div className="h-px w-full bg-line">
              <motion.div className="h-full origin-left bg-shine" style={{ scaleX }} />
            </div>
          </div>
        </motion.div>
      )}
      {/* An accent sheet beneath the curtain, lifting a beat later */}
      {!done && (
        <motion.div
          key="preloader-accent"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[89] bg-shine"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, delay: 0.14, ease: CURTAIN }}
        />
      )}
    </AnimatePresence>
  );
}
