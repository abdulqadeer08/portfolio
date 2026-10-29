import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SplitText } from "./split-text";

/** Editorial section header: an indexed eyebrow, a serif title and an optional aside. */
export function SectionHeading({
  index,
  label,
  title,
  accent,
  description,
  aside,
  className,
}: {
  index: string;
  label: string;
  title: string;
  /** The gradient part of the title. */
  accent?: string;
  description?: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-10 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-8">
        <Reveal className="mb-8 flex items-center gap-4" blur={false}>
          <span className="font-mono text-[0.7rem] text-accent">({index})</span>
          <span className="h-px w-10 bg-line-strong" />
          <span className="eyebrow">{label}</span>
        </Reveal>
        <h2 className="font-display text-[clamp(2.4rem,5.4vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
          <SplitText
            text={[
              { text: title },
              ...(accent ? [{ text: accent, className: "text-shine" }] : []),
            ]}
          />
        </h2>
      </div>
      {(description || aside) && (
        <Reveal delay={0.15} className="flex flex-col items-start gap-8 lg:col-span-4 lg:items-end lg:text-right">
          {description && (
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">{description}</p>
          )}
          {aside}
        </Reveal>
      )}
    </div>
  );
}
