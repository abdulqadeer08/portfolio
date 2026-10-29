import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Infinitely scrolling row. Content is duplicated so the loop is seamless. */
export function Marquee({
  children,
  reverse,
  duration = 40,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("marquee", className)}
      data-reverse={reverse ? "true" : undefined}
      style={{ "--duration": `${duration}s` } as CSSProperties}
    >
      <div className="marquee-track">{children}</div>
      <div className="marquee-track" aria-hidden>
        {children}
      </div>
    </div>
  );
}
