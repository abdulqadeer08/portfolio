"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { clients, sections, testimonials } from "@/data/portfolio";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_LUXE, pad } from "@/lib/utils";

const AUTOPLAY_SECONDS = 8;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

/** Hidden until `testimonials` in portfolio.ts has at least one real quote. */
export function Testimonials({ index: sectionIndex = "07" }: { index?: string }) {
  if (testimonials.length === 0) return null;
  return <TestimonialCarousel sectionIndex={sectionIndex} />;
}

function TestimonialCarousel({ sectionIndex }: { sectionIndex: string }) {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const current = testimonials[index];

  function go(step: number) {
    setState(([i]) => [(i + step + testimonials.length) % testimonials.length, step]);
  }

  return (
    <section id="testimonials" className="relative scroll-mt-10 overflow-hidden py-28 sm:py-40">
      <div className="container-luxe">
        <SectionHeading
          index={sectionIndex}
          label="Testimonials"
          title={sections.testimonials.title}
          accent={sections.testimonials.accent}
        />
      </div>

      {clients.length > 0 && (
      <Reveal className="mt-16 border-y border-line py-8 sm:mt-20">
        <Marquee duration={35} className="[--gap:4rem]">
          {clients.map((client) => (
            <span
              key={client}
              className="whitespace-nowrap font-display font-semibold text-2xl tracking-[-0.03em] text-muted transition-colors duration-500 hover:text-ink sm:text-4xl"
            >
              {client}
            </span>
          ))}
        </Marquee>
      </Reveal>
      )}

      <div className="container-luxe mt-16 sm:mt-24">
        <Reveal>
          <div
            className="beam relative overflow-hidden rounded-[2rem] border border-line bg-surface/60 p-8 sm:p-14 lg:p-20"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-accent/10 blur-3xl"
            />
            <Quote className="relative size-12 text-accent" strokeWidth={1} />

            <div className="relative mt-10 min-h-[15rem] sm:min-h-[13rem] lg:min-h-[12rem]" aria-live="polite">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, y: 30 * direction, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30 * direction, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, ease: EASE_LUXE }}
                >
                  <blockquote className="max-w-5xl font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium leading-[1.3] tracking-[-0.03em]">
                    “{current.quote}”
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-4">
                    <span className="grid size-14 place-items-center rounded-full bg-shine font-display font-semibold text-xl text-on-accent">
                      {initials(current.name)}
                    </span>
                    <span>
                      <span className="block text-lg">{current.name}</span>
                      <span className="block text-sm text-muted">
                        {current.role}, {current.company}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="relative mt-12 flex items-center justify-between gap-6 border-t border-line pt-8">
              <div className="flex items-center gap-5">
                <span className="font-mono text-xs tabular-nums text-muted">
                  <span className="text-accent">{pad(index + 1)}</span> / {pad(testimonials.length)}
                </span>
                <div className="flex gap-1.5">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setState([i, i > index ? 1 : -1])}
                      aria-label={`Show testimonial ${i + 1}`}
                      className="relative h-[3px] w-10 overflow-hidden rounded-full bg-line-strong sm:w-14"
                    >
                      {i === index && (
                        <motion.span
                          key={`${index}-${paused}`}
                          className="absolute inset-0 origin-left bg-shine"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: paused ? 0.02 : 1 }}
                          transition={{ duration: paused ? 0.3 : AUTOPLAY_SECONDS, ease: "linear" }}
                          onAnimationComplete={() => {
                            if (!paused) go(1);
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="grid size-12 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-500 hover:border-accent hover:text-accent"
                >
                  <ArrowLeft className="size-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="grid size-12 place-items-center rounded-full bg-ink text-bg transition-colors duration-500 hover:bg-accent hover:text-on-accent"
                >
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
