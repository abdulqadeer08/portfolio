"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { EASE_LUXE } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
};

/** Fades and lifts its children into place when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = true,
  once = true,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, delay, ease: EASE_LUXE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Draws a hairline from left to right when it enters the viewport. */
export function RevealLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease: EASE_LUXE }}
      style={{ transformOrigin: "left" }}
    />
  );
}
