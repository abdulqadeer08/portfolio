"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const CURTAIN = [0.76, 0, 0.24, 1] as const;

/** A curtain that lifts off every page as it arrives. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] bg-bg"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.9, ease: CURTAIN }}
      >
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-shine" />
      </motion.div>
      {children}
    </>
  );
}
