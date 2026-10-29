import type { Metadata } from "next";
import { projects } from "@/data/portfolio";
import { ProjectGrid } from "@/components/work/project-grid";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects by Abdul Qadeer: production systems, AI products and machine-learning tools.",
};

export default function WorkPage() {
  return (
    <div className="relative pb-28 pt-40 sm:pb-40 sm:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh]"
        style={{ background: "radial-gradient(60% 60% at 50% 0%, var(--glow), transparent 70%)" }}
      />
      <div className="container-luxe">
        <Reveal className="mb-8 flex items-center gap-4" blur={false}>
          <span className="font-mono text-[0.7rem] text-accent">({pad(projects.length)})</span>
          <span className="h-px w-10 bg-line-strong" />
          <span className="eyebrow">Archive</span>
        </Reveal>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="font-display text-[clamp(2.8rem,7.5vw,7.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
            <SplitText text={[{ text: "All" }, { text: "projects.", className: "text-shine" }]} />
          </h1>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted lg:text-right">
              Production systems, AI products and machine-learning tools, from enterprise software in daily use
              to NLP and data projects.
            </p>
          </Reveal>
        </div>

        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
