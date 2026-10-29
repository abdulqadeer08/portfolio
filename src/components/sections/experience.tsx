"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { education, experience, profile, sections } from "@/data/portfolio";
import { ButtonAnchor } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";

export function Experience() {
  const timeline = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 70%", "end 60%"] });

  return (
    <section id="experience" className="relative scroll-mt-10 border-y border-line bg-bg-elevated py-28 sm:py-40">
      <div className="container-luxe grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal className="mb-8 flex items-center gap-4" blur={false}>
              <span className="font-mono text-[0.7rem] text-accent">(04)</span>
              <span className="h-px w-10 bg-line-strong" />
              <span className="eyebrow">Experience</span>
            </Reveal>
            <h2 className="font-display text-[clamp(2.3rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
              <SplitText
                text={[
                  { text: sections.experience.title },
                  { text: sections.experience.accent, className: "text-shine" },
                ]}
              />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-muted">{sections.experience.description}</p>
            </Reveal>

            <Reveal delay={0.15} className="mt-12 border-t border-line pt-8">
              <h3 className="eyebrow mb-6">Education</h3>
              <ul className="space-y-5">
                {education.map((item) => (
                  <li key={item.title}>
                    <p className="font-display text-lg font-semibold tracking-[-0.02em]">{item.title}</p>
                    <p className="mt-1 text-sm text-ink-soft">{item.institution}</p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                      {item.period} · {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <ButtonAnchor href={profile.resumeUrl} variant="ghost" download>
                Download full résumé
              </ButtonAnchor>
            </Reveal>
          </div>
        </div>

        <ol ref={timeline} className="relative lg:col-span-7 lg:col-start-6">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line" />
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-shine"
            style={{ scaleY: scrollYProgress }}
          />
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.period}`} className="relative pb-16 pl-10 last:pb-0 sm:pl-16">
              <motion.span
                aria-hidden
                className="absolute -left-[5px] top-2 size-[11px] rounded-full border border-accent bg-bg-elevated"
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -30% 0px" }}
                transition={{ duration: 0.6 }}
              />
              <Reveal delay={i * 0.04}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">{job.period}</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">{job.location}</span>
                </div>
                <h3 className="mt-4 font-display text-[clamp(1.7rem,2.8vw,2.5rem)] font-semibold leading-tight tracking-[-0.04em]">
                  {job.role}
                </h3>
                <p className="mt-1 text-lg text-ink-soft">{job.company}</p>
                <p className="mt-5 max-w-2xl leading-relaxed text-muted">{job.description}</p>
                {job.highlights.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {job.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-[0.95rem] text-ink-soft">
                        <span className="mt-[0.15em] text-accent">✦</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-6 flex flex-wrap gap-2">
                  {job.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
