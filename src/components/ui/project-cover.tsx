import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { CoverVariant, MockContent, Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type CoverProject = Pick<Project, "title" | "palette" | "cover" | "coverLabel" | "image" | "mock" | "stack">;

type MockProps = { label: string; m: MockContent; stack: string[] };

/**
 * Artwork for a project. Uses `project.image` when provided, otherwise renders
 * a generated mock-up in the project's palette, filled with `project.mock`.
 * Everything inside the mock is sized in `em`, so it scales with the cover.
 */
export function ProjectCover({
  project,
  variant,
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  project: CoverProject;
  variant?: CoverVariant;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [hi, mid, base] = project.palette;
  const kind = variant ?? project.cover;
  const useImage = project.image && !variant;

  return (
    <div
      className={cn("@container relative isolate overflow-hidden", className)}
      style={
        {
          "--hi": hi,
          "--mid": mid,
          "--base": base,
          background: `radial-gradient(120% 90% at 0% 0%, ${mid} 0%, transparent 60%), radial-gradient(90% 80% at 100% 100%, color-mix(in oklab, ${hi} 45%, transparent) 0%, transparent 60%), ${base}`,
        } as CSSProperties
      }
    >
      {useImage ? (
        <Image
          src={project.image!}
          alt={project.title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.04]"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "6cqw 6cqw",
            }}
          />
          <div
            aria-hidden
            className="animate-orb absolute -right-[10%] -top-[20%] size-[60%] rounded-full opacity-50 blur-[8cqw]"
            style={{ background: hi }}
          />
          <div
            role="img"
            aria-label={`${project.title} preview`}
            className="absolute inset-0 flex items-center justify-center p-[7%] font-sans text-[1.3cqw] text-white transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.035]"
          >
            <Mock kind={kind} label={project.coverLabel} m={project.mock ?? {}} stack={project.stack} />
          </div>
        </>
      )}
    </div>
  );
}

function Mock({ kind, ...props }: MockProps & { kind: CoverVariant }) {
  switch (kind) {
    case "dashboard":
      return <DashboardMock {...props} />;
    case "commerce":
      return <CommerceMock {...props} />;
    case "editorial":
      return <EditorialMock {...props} />;
    case "mobile":
      return <MobileMock {...props} />;
    case "brand":
      return <BrandMock {...props} />;
    case "landing":
      return <LandingMock {...props} />;
  }
}

// ─── Shared pieces ──────────────────────────────────────────────────────────

const heading = "font-display font-semibold tracking-[-0.04em]";

function Browser({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex max-h-full w-full flex-col overflow-hidden rounded-[0.9em] border border-white/15 bg-black/35 shadow-[0_3em_6em_-1.5em_rgba(0,0,0,0.65)] backdrop-blur-md",
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-[0.45em] border-b border-white/10 px-[1em] py-[0.75em]">
        <span className="size-[0.6em] rounded-full bg-white/25" />
        <span className="size-[0.6em] rounded-full bg-white/25" />
        <span className="size-[0.6em] rounded-full bg-white/25" />
        <span className="mx-auto h-[1.1em] w-[38%] rounded-full bg-white/[0.08]" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function Bar({ w, className }: { w: string; className?: string }) {
  return <div className={cn("h-[0.55em] rounded-full bg-white/15", className)} style={{ width: w }} />;
}

// ─── Variants ───────────────────────────────────────────────────────────────

function DashboardMock({ label, m }: MockProps) {
  const cards = m.items ?? ["Users", "Activity", "Reports"];
  return (
    <Browser>
      <div className="grid grid-cols-[18%_1fr] gap-[1.4em] p-[1.4em]">
        <div className="space-y-[1.1em] border-r border-white/10 pr-[1em]">
          <div className={cn(heading, "text-[1.5em] leading-none")}>{label}</div>
          <div className="space-y-[0.9em] pt-[0.6em]">
            {["72%", "58%", "84%", "64%", "50%", "76%"].map((w, i) => (
              <div key={i} className="flex items-center gap-[0.5em]">
                <span className={cn("size-[0.7em] rounded-[0.2em]", i === 0 ? "bg-[var(--hi)]" : "bg-white/20")} />
                <Bar w={w} className={i === 0 ? "bg-white/50" : undefined} />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-[1.2em]">
          <div className="flex items-end justify-between gap-[1em]">
            <div>
              <div className="text-[0.75em] uppercase tracking-[0.2em] text-white/50">{m.caption ?? "Overview"}</div>
              <div className={cn(heading, "mt-[0.3em] text-[2.8em] leading-none")}>{m.title ?? label}</div>
            </div>
            <div className="flex items-center gap-[0.4em] rounded-full bg-[var(--hi)] px-[0.9em] py-[0.35em] text-[0.8em] font-medium text-black">
              <span className="size-[0.5em] rounded-full bg-black/60" /> Live
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[0.8em]">
            {cards.slice(0, 3).map((card, i) => (
              <div key={card} className="rounded-[0.6em] border border-white/10 bg-white/[0.04] p-[0.9em]">
                <div className="text-[0.8em] font-medium text-white/80">{card}</div>
                <div className="mt-[0.6em] space-y-[0.4em]">
                  <Bar w={`${70 - i * 12}%`} className="bg-white/20" />
                  <Bar w={`${45 + i * 10}%`} className="bg-white/10" />
                </div>
                <div className="mt-[0.8em] h-[0.3em] overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[var(--hi)]" style={{ width: `${78 - i * 16}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[0.6em] border border-white/10 bg-white/[0.04] p-[1em]">
            <div className="mb-[0.6em] flex justify-between text-[0.7em] text-white/50">
              <span>Activity</span>
              <span>1D 1W 1M</span>
            </div>
            <svg viewBox="0 0 300 90" className="h-[8em] w-full" preserveAspectRatio="none">
              <path
                d="M0 70 C 30 62, 45 75, 70 55 S 115 40, 140 46 S 185 20, 210 28 S 255 12, 300 8 L 300 90 L 0 90 Z"
                fill="var(--hi)"
                fillOpacity="0.16"
              />
              <path
                d="M0 70 C 30 62, 45 75, 70 55 S 115 40, 140 46 S 185 20, 210 28 S 255 12, 300 8"
                fill="none"
                stroke="var(--hi)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function CommerceMock({ label, m }: MockProps) {
  return (
    <Browser>
      <div className="p-[1.4em]">
        <div className="flex items-center justify-between border-b border-white/10 pb-[1em]">
          <div className={cn(heading, "text-[1.6em] leading-none")}>{label}</div>
          <div className="flex gap-[1em]">
            <Bar w="3em" />
            <Bar w="3.5em" />
            <Bar w="2.6em" />
          </div>
          <div className="rounded-full border border-white/25 px-[1em] py-[0.35em] text-[0.7em]">Sign in</div>
        </div>
        <div className="grid grid-cols-[1.1fr_1fr] gap-[1.6em] pt-[1.6em]">
          <div className="flex flex-col justify-center gap-[1em]">
            <div className="text-[0.7em] uppercase tracking-[0.3em] text-white/60">{m.caption ?? "Featured"}</div>
            <div className={cn(heading, "text-[3.2em] leading-[1]")}>
              {m.headline ?? "Discover"}
              <br />
              <span className="text-[var(--hi)]">{m.accent ?? label}</span>
            </div>
            <Bar w="80%" />
            <Bar w="60%" />
            <div className="mt-[0.6em] w-fit rounded-full bg-white px-[1.4em] py-[0.6em] text-[0.75em] font-semibold text-black">
              {m.button ?? "Get started"}
            </div>
          </div>
          <div
            className="aspect-[3/4] rounded-t-full"
            style={{ background: "linear-gradient(160deg, var(--hi), var(--mid) 70%)" }}
          />
        </div>
        <div className="mt-[1.6em] grid grid-cols-4 gap-[0.9em]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-[0.5em] rounded-[0.6em] border border-white/10 bg-white/[0.04] p-[0.6em]">
              <div
                className="mx-auto aspect-square w-[55%] rounded-full"
                style={{
                  background: `linear-gradient(${140 + i * 30}deg, color-mix(in oklab, var(--hi) ${70 - i * 12}%, transparent), var(--mid))`,
                }}
              />
              <Bar w="70%" className="mx-auto" />
              <Bar w="40%" className="mx-auto bg-white/25" />
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

function EditorialMock({ label, m }: MockProps) {
  return (
    <Browser>
      <div className="p-[1.6em]">
        <div className="flex items-center justify-between text-[0.75em] uppercase tracking-[0.3em] text-white/60">
          <span>{label}</span>
          <span>Menu</span>
        </div>
        <div className={cn(heading, "mt-[1.4em] text-[4.4em] leading-[0.95]")}>
          {m.headline ?? label} <span className="text-[var(--hi)]">{m.accent ?? ""}</span>
        </div>
        <div className="mt-[1.6em] grid grid-cols-[2fr_1fr_1fr] gap-[0.9em]">
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-[0.5em]"
            style={{ background: "linear-gradient(180deg, var(--hi), var(--mid))" }}
          >
            <div className="absolute inset-x-[18%] bottom-0 top-[18%] flex items-end gap-[6%]">
              {[60, 85, 100, 75, 90].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-[0.3em] bg-black/25" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-[0.8em]">
            <div className="rounded-[0.5em] bg-white/10" style={{ aspectRatio: "3 / 4" }} />
            <Bar w="90%" />
            <Bar w="60%" />
          </div>
          <div className="flex flex-col gap-[0.8em]">
            <div className="text-[0.7em] uppercase tracking-[0.2em] text-white/50">{m.caption ?? "Featured"}</div>
            <div className={cn(heading, "text-[1.5em] leading-tight")}>{m.items?.[0] ?? label}</div>
            <Bar w="100%" />
            <Bar w="80%" />
            <Bar w="90%" />
          </div>
        </div>
      </div>
    </Browser>
  );
}

function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative w-[30%] shrink-0 overflow-hidden rounded-[2.4em] border border-white/20 bg-black/50 p-[0.6em] shadow-[0_3em_5em_-1em_rgba(0,0,0,0.7)] backdrop-blur-md",
        className,
      )}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.9em] bg-white/[0.04]">
        <div className="absolute left-1/2 top-[0.7em] h-[1.2em] w-[34%] -translate-x-1/2 rounded-full bg-black" />
        <div className="px-[1.1em] pt-[3em]">{children}</div>
      </div>
    </div>
  );
}

function MobileMock({ label, m }: MockProps) {
  const tiles = m.items ?? ["Today", "This week"];
  return (
    <div className="flex w-full items-center justify-center gap-[6%]">
      <Phone className="-rotate-6">
        <div className="text-[0.7em] text-white/50">{m.caption ?? "Welcome back"}</div>
        <div className={cn(heading, "text-[1.7em] leading-tight")}>{m.title ?? label}</div>
        <div className="relative mx-auto my-[1.2em] aspect-square w-[78%]">
          <svg viewBox="0 0 100 100" className="size-full -rotate-90">
            <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="7" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="var(--hi)"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="264"
              strokeDashoffset="58"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className={cn(heading, "text-[2.2em] leading-none")}>{m.stat ?? label.charAt(0)}</div>
              <div className="mt-[0.3em] text-[0.55em] uppercase tracking-[0.2em] text-white/50">
                {m.statLabel ?? "Live"}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[0.6em]">
          {tiles.slice(0, 2).map((t) => (
            <div key={t} className="rounded-[0.8em] bg-white/[0.07] p-[0.7em] text-[0.68em] leading-tight">
              {t}
            </div>
          ))}
        </div>
      </Phone>
      <Phone className="translate-y-[6%] rotate-[5deg]">
        <div className={cn(heading, "text-[1.5em] leading-tight")}>{label}</div>
        <div className="mt-[1em] flex h-[7em] items-end gap-[0.45em]">
          {[45, 70, 55, 90, 65, 80, 60].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-[0.3em]"
              style={{
                height: `${h}%`,
                background: i === 3 ? "var(--hi)" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
        <div className="mt-[1.2em] space-y-[0.6em]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-[0.6em] rounded-[0.8em] bg-white/[0.06] p-[0.6em]">
              <span className="size-[1.6em] shrink-0 rounded-full bg-[var(--mid)] ring-1 ring-white/20" />
              <div className="flex-1 space-y-[0.35em]">
                <Bar w="80%" />
                <Bar w="50%" className="bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </Phone>
    </div>
  );
}

function BrandMock({ label, m }: MockProps) {
  return (
    <div className="grid w-full grid-cols-[1.3fr_1fr] gap-[1.2em]">
      <div className="grid aspect-square place-items-center rounded-[1em] border border-white/15 bg-black/30 backdrop-blur-md">
        <div className="text-center">
          <div
            className={cn(heading, "mx-auto grid size-[7em] place-items-center rounded-full border border-white/40 text-[2em]")}
            style={{ background: "radial-gradient(circle at 30% 30%, var(--hi), var(--mid))" }}
          >
            {label.charAt(0)}
          </div>
          <div className={cn(heading, "mt-[0.8em] text-[3em] leading-none")}>{label}</div>
          <div className="mt-[0.5em] text-[0.7em] uppercase tracking-[0.45em] text-white/60">
            {m.caption ?? "Brand system"}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[1.2em]">
        <div className="grid flex-1 grid-cols-3 overflow-hidden rounded-[1em] border border-white/15">
          {["var(--hi)", "var(--mid)", "#f4eee4"].map((c) => (
            <div key={c} className="flex items-end p-[0.6em]" style={{ background: c }}>
              <span className="text-[0.6em] uppercase tracking-[0.15em] mix-blend-difference">Tone</span>
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-between rounded-[1em] border border-white/15 bg-black/30 px-[1.4em] backdrop-blur-md">
          <span className={cn(heading, "text-[4em] leading-none")}>Aa</span>
          <div className="space-y-[0.5em] text-right text-[0.7em] text-white/60">
            <div>Display</div>
            <div>Text</div>
          </div>
        </div>
        <div
          className="flex flex-1 flex-col justify-between rounded-[1em] p-[1.1em] text-black"
          style={{ background: "#f4eee4" }}
        >
          <span className={cn(heading, "text-[1.5em] leading-none")}>{label}</span>
          <div className="space-y-[0.4em]">
            <div className="h-[0.45em] w-[60%] rounded-full bg-black/20" />
            <div className="h-[0.45em] w-[40%] rounded-full bg-black/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingMock({ label, m, stack }: MockProps) {
  return (
    <Browser>
      <div className="relative p-[1.4em]">
        <div
          className="absolute left-1/2 top-[30%] size-[22em] -translate-x-1/2 rounded-full opacity-60 blur-[4em]"
          style={{ background: "radial-gradient(circle, var(--hi), transparent 70%)" }}
        />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-[0.5em] font-semibold">
            <span className="size-[1.2em] rounded-full bg-[var(--hi)]" />
            <span className="text-[1.1em]">{label}</span>
          </div>
          <div className="flex gap-[1.2em]">
            <Bar w="3em" />
            <Bar w="3em" />
            <Bar w="3em" />
          </div>
          <div className="rounded-full border border-white/25 px-[1em] py-[0.35em] text-[0.7em]">
            {m.button ?? "Get started"}
          </div>
        </div>
        <div className="relative mx-auto mt-[3em] max-w-[78%] text-center">
          <div className="mx-auto w-fit rounded-full border border-white/20 bg-white/5 px-[1em] py-[0.35em] text-[0.7em] text-white/70">
            ✦ {m.caption ?? label}
          </div>
          <div className={cn(heading, "mt-[1em] text-[4em] leading-[1]")}>
            {m.headline ?? "Introducing"}
            <br />
            <span className="text-[var(--hi)]">{m.accent ?? label}</span>
          </div>
          <div className="mx-auto mt-[1.6em] flex w-[85%] items-center gap-[0.8em] rounded-full border border-white/20 bg-black/40 p-[0.45em] pl-[1.2em]">
            <span className="flex-1 text-left text-[0.8em] text-white/45">{m.input ?? "Ask anything…"}</span>
            <span className="grid size-[2.2em] place-items-center rounded-full bg-[var(--hi)] text-[0.9em] text-black">
              ↑
            </span>
          </div>
          {stack.length > 0 && (
            <div className="mt-[2.4em] flex justify-center gap-[2em] text-[0.7em] uppercase tracking-[0.25em] text-white/40">
              {stack.slice(0, 4).map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Browser>
  );
}
