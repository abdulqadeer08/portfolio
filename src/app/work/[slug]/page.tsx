import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/data/portfolio";
import { BrandIcon } from "@/components/ui/icons";
import { ButtonAnchor } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { ProjectCover } from "@/components/ui/project-cover";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { Tilt } from "@/components/ui/tilt";
import { ParallaxCover } from "@/components/work/parallax-cover";
import { cn, pad } from "@/lib/utils";

// Every case study is prerendered, so letting navigation wait for the page is
// near-instant anyway and avoids a loading skeleton.
export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

function ChapterLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[0.7rem] text-accent">({index})</span>
      <span className="h-px w-10 bg-line-strong" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const extraViews = [...new Set(project.gallery)].filter((view) => view !== project.cover && !project.image);

  const meta = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Category", value: project.category },
    { label: "Year", value: project.year },
    { label: "Timeline", value: project.timeline },
    { label: "Status", value: project.status },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  // Chapters are numbered in the order they appear.
  let chapter = 0;
  const nextChapter = () => pad(++chapter);
  const story = [
    project.challenge && { label: "The challenge", body: project.challenge },
    project.approach && { label: "The approach", body: project.approach },
  ].filter((block): block is { label: string; body: string } => Boolean(block));

  return (
    <article className="relative pt-36 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh]"
        style={{
          background: `radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, ${project.palette[0]} 18%, transparent), transparent 70%)`,
        }}
      />

      <header className="container-luxe">
        <Reveal blur={false}>
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-500 group-hover:-translate-x-1" />
            All projects
          </Link>
        </Reveal>

        <Reveal delay={0.05} className="mt-12 flex flex-wrap items-center gap-3" blur={false}>
          <span className="rounded-full border border-accent/40 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
            {project.category}
          </span>
          {project.status && (
            <span className="rounded-full bg-accent/10 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
              {project.status}
            </span>
          )}
        </Reveal>

        <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,7vw,7rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
          <SplitText text={project.title} />
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.15} className="lg:col-span-7">
            <p className="text-[clamp(1.1rem,1.6vw,1.4rem)] leading-relaxed text-ink-soft">{project.summary}</p>
          </Reveal>
          {(project.liveUrl || project.repoUrl) && (
            <Reveal delay={0.2} className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              {project.liveUrl && (
                <ButtonAnchor href={project.liveUrl} target="_blank" rel="noreferrer">
                  Visit live site
                </ButtonAnchor>
              )}
              {project.repoUrl && (
                <ButtonAnchor href={project.repoUrl} target="_blank" rel="noreferrer" variant={project.liveUrl ? "ghost" : "accent"}>
                  <span className="inline-flex items-center gap-2">
                    <BrandIcon platform="github" className="size-4" /> View on GitHub
                  </span>
                </ButtonAnchor>
              )}
            </Reveal>
          )}
        </div>

        <Reveal delay={0.25}>
          <dl
            className={cn(
              "mt-16 grid grid-cols-2 gap-px overflow-hidden border-y border-line bg-line",
              meta.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3",
            )}
          >
            {meta.map((item) => (
              <div key={item.label} className="bg-bg py-7 pr-6 even:pl-5 md:pl-6 md:first:pl-0">
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-3 text-[0.95rem] text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      <Reveal className="container-luxe mt-16" y={60}>
        <ParallaxCover project={project} priority className="aspect-[4/3] sm:aspect-[16/9]" />
      </Reveal>

      <section className="container-luxe grid gap-10 py-28 sm:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4" blur={false}>
          <ChapterLabel index={nextChapter()} label="Overview" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <p className="font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-medium leading-[1.35] tracking-[-0.03em]">
            {project.overview}
          </p>
        </Reveal>
      </section>

      {story.length > 0 && (
        <section className="container-luxe">
          <div
            className={cn(
              "grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line",
              story.length > 1 && "md:grid-cols-2",
            )}
          >
            {story.map((block, i) => (
              <div key={block.label} className="bg-bg p-8 sm:p-12 lg:p-16">
                <Reveal delay={i * 0.1}>
                  <ChapterLabel index={nextChapter()} label={block.label} />
                  <p className="mt-10 text-[1.05rem] leading-[1.8] text-ink-soft">{block.body}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container-luxe grid gap-10 py-28 sm:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-4" blur={false}>
          <ChapterLabel index={nextChapter()} label="What I built" />
        </Reveal>
        <ul className="space-y-4 lg:col-span-8">
          {project.highlights.map((highlight, i) => (
            <li key={highlight}>
              <Reveal delay={i * 0.06} className="flex gap-5 rounded-2xl border border-line bg-surface/50 p-6 sm:p-7">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="size-4" strokeWidth={2} />
                </span>
                <span className="text-[1rem] leading-relaxed text-ink-soft">{highlight}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {project.results && project.results.length > 0 && (
        <section className="container-luxe pb-28 sm:pb-36">
          <Reveal blur={false}>
            <ChapterLabel index={nextChapter()} label="Outcomes" />
          </Reveal>
          <dl
            className={cn(
              "mt-14 grid gap-12 sm:gap-0",
              project.results.length === 1 && "sm:grid-cols-1",
              project.results.length === 2 && "sm:grid-cols-2",
              project.results.length >= 3 && "sm:grid-cols-3",
            )}
          >
            {project.results.map((result, i) => (
              <Reveal
                key={result.label}
                delay={i * 0.1}
                className="flex flex-col-reverse justify-end border-line sm:border-l sm:px-8 sm:first:border-l-0 sm:first:pl-0"
              >
                <dt className="mt-5 max-w-[18rem] text-sm text-muted">{result.label}</dt>
                <dd className="font-display text-[clamp(2.8rem,5vw,4.6rem)] font-semibold leading-none tracking-[-0.05em]">
                  {typeof result.value === "number" ? (
                    <>
                      <Counter value={result.value} prefix={result.prefix} />
                      <span className="text-shine">{result.suffix}</span>
                    </>
                  ) : (
                    <span className="text-shine">{result.value}</span>
                  )}
                </dd>
              </Reveal>
            ))}
          </dl>
        </section>
      )}

      <section className="container-luxe space-y-4 sm:space-y-6">
        {extraViews.length > 0 && (
          <Reveal y={50}>
            <ParallaxCover project={project} variant={extraViews[0]} className="aspect-[4/3] sm:aspect-[21/10]" />
          </Reveal>
        )}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <Reveal y={50}>
            <div className="flex h-full flex-col rounded-[2rem] border border-line bg-surface p-8 sm:p-12">
              <p className="eyebrow">What I did</p>
              <ul className="mt-6 space-y-3">
                {project.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-3 font-display text-xl font-semibold tracking-[-0.03em] sm:text-2xl"
                  >
                    <span className="text-sm text-accent">✦</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal y={50} delay={0.1}>
            <div className="flex h-full flex-col rounded-[2rem] border border-line bg-surface p-8 sm:p-12">
              <p className="eyebrow">Built with</p>
              {project.stack.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-line px-4 py-2 text-[0.85rem] text-ink-soft"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-ink-soft">Technical details are available on request.</p>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-10 text-sm text-accent hover:underline"
                >
                  <BrandIcon platform="github" className="size-4" />
                  Source on GitHub
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mt-28 border-t border-line sm:mt-40">
        <Link
          href={`/work/${next.slug}`}
          className="group container-luxe grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <p className="eyebrow">Next project</p>
            <p className="mt-6 font-display text-[clamp(2.4rem,5.6vw,5.6rem)] font-semibold leading-[1.02] tracking-[-0.05em] transition-colors duration-700 group-hover:text-accent">
              {next.title}
              <ArrowUpRight
                className="ml-3 inline size-[0.6em] align-middle transition-transform duration-700 ease-luxe group-hover:rotate-45"
                strokeWidth={1.25}
              />
            </p>
            <p className="mt-6 text-muted">{next.category}</p>
          </div>
          <Tilt rounded="rounded-[1.75rem]" className="lg:col-span-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-line">
              <ProjectCover project={next} className="aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </Tilt>
        </Link>
      </section>
    </article>
  );
}
