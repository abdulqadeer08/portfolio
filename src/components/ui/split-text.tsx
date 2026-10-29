"use client";

import { motion } from "motion/react";
import { cn, EASE_LUXE } from "@/lib/utils";

type Segment = { text: string; className?: string };

type SplitTextProps = {
  /** Plain text, or segments when some words need their own styling. */
  text: string | Segment[];
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate when `true`. When omitted, animates on scroll into view. */
  play?: boolean;
};

/** Reveals text word by word from behind a mask. */
export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  play,
}: SplitTextProps) {
  const segments = typeof text === "string" ? [{ text }] : text;
  const words = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className })),
  );

  const trigger =
    play === undefined
      ? { whileInView: "visible", viewport: { once: true, margin: "0px 0px -10% 0px" } }
      : { animate: play ? "visible" : "hidden" };

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      <span className="sr-only">{words.map((w) => w.word).join(" ")}</span>
      {words.map(({ word, className: segmentClass }, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="-mb-[0.34em] inline-flex overflow-hidden pb-[0.34em] align-bottom"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName, segmentClass)}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              visible: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE_LUXE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
