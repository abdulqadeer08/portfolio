"use client";

import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/utils";

/** A card with a soft accent-coloured light that follows the pointer. */
export function SpotlightCard({ className, children, ...props }: ComponentProps<"div">) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn(
        "spotlight relative overflow-hidden rounded-[1.75rem] border border-line bg-surface/60 transition-colors duration-700 hover:border-line-strong",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
