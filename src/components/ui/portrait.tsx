import Image from "next/image";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** The arched portrait. Falls back to an engraved monogram until `profile.avatar` is set. */
export function Portrait({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-line-strong bg-surface",
        className,
      )}
    >
      {profile.avatar ? (
        <Image
          src={profile.avatar}
          alt={`${profile.firstName} ${profile.lastName}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover grayscale-[35%] transition-[filter,transform] duration-1000 ease-luxe hover:scale-[1.03] hover:grayscale-0"
        />
      ) : (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 60% at 50% 15%, color-mix(in oklab, var(--accent) 35%, transparent), transparent 70%), radial-gradient(70% 50% at 50% 110%, color-mix(in oklab, var(--accent-deep) 40%, transparent), transparent 70%), var(--surface-2)",
            }}
          />
          {[0.9, 0.72, 0.54].map((s) => (
            <div
              key={s}
              className="absolute left-1/2 top-[46%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20"
              style={{ width: `${s * 100}%` }}
            />
          ))}
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display font-semibold text-[clamp(5rem,11vw,9rem)] font-bold leading-none tracking-[-0.06em] text-shine">
              {profile.initials}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-8 text-center">
            <span className="eyebrow">Your portrait here</span>
          </div>
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
      />
    </div>
  );
}

/** Circular text that slowly rotates around a star. */
export function RotatingBadge({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("relative grid size-32 place-items-center", className)}>
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-ink-soft font-mono text-[6.6px] uppercase">
          <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center rounded-full bg-shine text-lg text-on-accent">✦</span>
    </div>
  );
}
