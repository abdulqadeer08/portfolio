"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Tilts its content in 3D towards the pointer, with a soft glare. */
export function Tilt({
  children,
  className,
  rounded,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  /** Border radius class for the tilting surface, so the glare follows the card's corners. */
  rounded?: string;
  /** Maximum tilt in degrees. */
  max?: number;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(600px circle at ${glareX} ${glareY}, rgba(255,255,255,0.14), transparent 45%)`;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className={cn("[perspective:1200px]", className)} onPointerMove={onPointerMove} onPointerLeave={reset}>
      <motion.div
        className={cn("group/tilt relative size-full [transform-style:preserve-3d]", rounded)}
        style={{ rotateX, rotateY }}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
}
