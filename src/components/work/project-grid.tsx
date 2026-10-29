"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/data/portfolio";
import { ProjectCover } from "@/components/ui/project-cover";
import { Tilt } from "@/components/ui/tilt";
import { cn, EASE_LUXE } from "@/lib/utils";

const ALL = "All";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const categories = [ALL, ...Array.from(new Set(projects.map((project) => project.category)))];
  const [filter, setFilter] = useState(ALL);
  const visible = filter === ALL ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      <LayoutGroup>
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-16 flex flex-wrap gap-2 border-y border-line py-6 sm:mt-24"
        >
          {categories.map((category) => {
            const active = filter === category;
            const count =
              category === ALL ? projects.length : projects.filter((p) => p.category === category).length;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(category)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-[0.82rem] transition-colors duration-500",
                  active ? "text-on-accent" : "text-ink-soft hover:text-ink",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-active"
                    className="absolute inset-0 rounded-full bg-shine"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {category}
                  <sup className="ml-1 font-mono text-[0.6rem] opacity-70">{count}</sup>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <motion.ul layout className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: EASE_LUXE }}
              className={cn(i % 2 === 1 && "md:mt-24")}
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <Tilt rounded="rounded-[1.75rem]">
                  <div className="relative overflow-hidden rounded-[1.75rem] border border-line">
                    <ProjectCover
                      project={project}
                      className="aspect-[4/3.2]"
                      sizes="(min-width: 768px) 45vw, 100vw"
                    />
                    <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </Tilt>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] transition-colors duration-500 group-hover:text-accent sm:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{project.summary}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-4">
                    <span className="font-mono text-xs text-muted">{project.status ?? project.year}</span>
                    <span className="grid size-11 place-items-center rounded-full border border-line transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
