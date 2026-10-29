import { sections, workProcess } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { pad } from "@/lib/utils";

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-10 border-y border-line bg-bg-elevated py-28 sm:py-40">
      <div className="container-luxe">
        <SectionHeading
          index="06"
          label="Process"
          title={sections.process.title}
          accent={sections.process.accent}
          description={sections.process.description}
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((step, i) => (
            <li
              key={step.title}
              className="group relative bg-bg p-8 transition-colors duration-700 hover:bg-surface sm:p-10"
            >
              <Reveal delay={i * 0.08} blur={false}>
                <span className="block font-display font-semibold text-[5.5rem] leading-none tracking-[-0.06em] text-outline transition-colors duration-700 group-hover:text-accent/90">
                  {pad(i + 1)}
                </span>
                <p className="mt-10 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent">{step.duration}</p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
              </Reveal>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-shine transition-transform duration-700 ease-luxe group-hover:scale-x-100"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
