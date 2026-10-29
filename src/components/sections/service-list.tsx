"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState, type PointerEvent } from "react";
import { projects, services } from "@/data/portfolio";
import { featureIcons } from "@/components/ui/icons";
import { ProjectCover } from "@/components/ui/project-cover";
import { Reveal } from "@/components/ui/reveal";
import { EASE_LUXE, pad } from "@/lib/utils";

const previews = services.map((service) => projects.find((p) => p.slug === service.preview));

/** The services list, with a project preview that floats after the cursor. */
export function ServiceList() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });
  const shown = active !== null && previews[active];

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    x.set(event.clientX);
    y.set(event.clientY);
  }

  return (
    <>
      <ul className="mt-16 border-t border-line sm:mt-24" onPointerMove={onPointerMove} onPointerLeave={() => setActive(null)}>
        {services.map((service, i) => {
          const Icon = featureIcons[service.icon];
          return (
            <li
              key={service.title}
              className="group relative border-b border-line"
              onPointerEnter={(event) => event.pointerType === "mouse" && setActive(i)}
            >
              <Reveal delay={i * 0.05} blur={false}>
                <div className="relative isolate grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-8 md:py-12">
                  <span
                    aria-hidden
                    className="absolute inset-x-[-1.25rem] inset-y-0 -z-10 origin-bottom scale-y-0 rounded-2xl bg-surface transition-transform duration-700 ease-luxe group-hover:scale-y-100 sm:inset-x-[-2rem]"
                  />
                  <div className="flex items-center gap-5 md:col-span-6">
                    <span className="font-mono text-xs text-accent">{pad(i + 1)}</span>
                    <h3 className="font-display font-semibold text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.05] tracking-[-0.045em] transition-transform duration-700 ease-luxe group-hover:translate-x-3">
                      <span className="transition-colors duration-500 group-hover:text-shine">{service.title}</span>
                    </h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="max-w-md text-[0.95rem] leading-relaxed text-muted">{service.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-soft transition-colors duration-500 group-hover:border-accent/30"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden justify-end md:col-span-1 md:flex">
                    <span className="relative grid size-14 place-items-center rounded-full border border-line text-ink-soft transition-all duration-700 ease-luxe group-hover:border-transparent group-hover:bg-shine group-hover:text-on-accent">
                      <Icon className="size-5 transition-all duration-500 group-hover:scale-0 group-hover:opacity-0" strokeWidth={1.4} />
                      <ArrowUpRight className="absolute size-5 scale-0 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" strokeWidth={1.4} />
                    </span>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* Floating preview — mouse only */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="relative -ml-[170px] -mt-[130px] aspect-[4/3] w-[340px] overflow-hidden rounded-2xl border border-line-strong shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
          initial={false}
          animate={{ scale: shown ? 1 : 0, opacity: shown ? 1 : 0, rotate: shown ? -5 : 8 }}
          transition={{ duration: 0.6, ease: EASE_LUXE }}
        >
          <motion.div
            className="absolute inset-x-0 top-0"
            animate={{ y: `${-(active ?? 0) * 100}%` }}
            transition={{ duration: 0.7, ease: EASE_LUXE }}
            style={{ height: "100%" }}
          >
            {previews.map((project, i) =>
              project ? (
                <div key={project.slug} className="absolute inset-x-0 h-full" style={{ top: `${i * 100}%` }}>
                  <ProjectCover project={project} className="size-full" sizes="340px" />
                </div>
              ) : null,
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
