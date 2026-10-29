"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { projects, sections, type Project } from "@/data/portfolio";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCover } from "@/components/ui/project-cover";
import { Tilt } from "@/components/ui/tilt";
import { SectionHeading } from "@/components/ui/section-heading";
import { useMediaQuery } from "@/lib/hooks";
import { pad } from "@/lib/utils";

const featured = projects.filter((project) => project.featured);

export function Work() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const stacked = useMediaQuery("(min-width: 768px)");

  return (
    <section id="work" className="relative scroll-mt-10 pt-28 sm:pt-40">
      <div className="container-luxe">
        <SectionHeading
          index="03"
          label="Selected work"
          title={sections.work.title}
          accent={sections.work.accent}
          description={sections.work.description}
          aside={
            <ButtonLink href="/work" variant="ghost">
              View all projects
            </ButtonLink>
          }
        />
      </div>

      <div className="container-luxe mt-12 sm:mt-16">
        <ul className="grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project, i) => (
            <li key={project.slug} className="border-line max-sm:border-t max-sm:first:border-t-0 lg:border-l lg:first:border-l-0">
              <Link
                href={`/work/${project.slug}`}
                className="group flex h-full flex-col gap-3 py-6 transition-colors duration-500 sm:px-6 lg:first:pl-0"
              >
                <span className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  <span className="text-accent">{pad(i + 1)}</span>
                  <span>{project.status ?? project.category}</span>
                </span>
                <span className="font-display text-lg font-semibold tracking-[-0.03em] transition-colors duration-500 group-hover:text-accent">
                  {project.title}
                </span>
                <span className="mt-auto text-sm text-muted">{project.stack.slice(0, 3).join(" · ") || project.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div ref={container} className="container-luxe mt-10 pb-28 sm:mt-14 sm:pb-40 md:pb-24">
        {featured.map((project, i) => (
          <StackCard
            key={project.slug}
            project={project}
            index={i}
            total={featured.length}
            progress={scrollYProgress}
            stacked={stacked}
          />
        ))}
      </div>
    </section>
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
  stacked,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  const targetScale = 1 - (total - index - 1) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const href = `/work/${project.slug}`;

  return (
    <div className="mb-6 md:sticky md:top-0 md:mb-0 md:flex md:h-screen md:items-center">
      <motion.article
        className="relative grid w-full origin-top overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_-30px_80px_-40px_rgba(0,0,0,0.6)] md:h-[76vh] md:max-h-[760px] md:grid-cols-12"
        style={stacked ? { scale, top: `${index * 28}px` } : undefined}
      >
        <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 md:col-span-5 lg:p-12">
          <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted">
            <span>
              <span className="text-accent">{pad(index + 1)}</span> / {pad(total)}
            </span>
            {project.status ? (
              <span className="rounded-full border border-accent/40 px-2.5 py-1 text-accent">{project.status}</span>
            ) : (
              <span>{project.year}</span>
            )}
          </div>

          <div>
            <p className="eyebrow text-accent">{project.category}</p>
            <h3 className="mt-5 font-display text-[clamp(2rem,3.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
              <Link href={href} className="transition-colors duration-500 hover:text-accent">
                {project.title}
              </Link>
            </h3>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.services.slice(0, 3).map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-soft"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between gap-4">
            <ButtonLink href={href} variant="solid">
              View case study
            </ButtonLink>
            <span className="hidden text-right text-xs text-muted lg:block">
              {project.client && (
                <>
                  {project.client}
                  <br />
                </>
              )}
              {project.role}
            </span>
          </div>
        </div>

        <Link
          href={href}
          aria-label={`View the ${project.title} case study`}
          className="group relative m-3 block aspect-[4/3] overflow-hidden rounded-[1.5rem] md:col-span-7 md:aspect-auto"
        >
          <Tilt className="absolute inset-0" max={5}>
            <ProjectCover project={project} className="absolute inset-0" sizes="(min-width: 768px) 55vw, 100vw" />
          </Tilt>
        </Link>
      </motion.article>
    </div>
  );
}
