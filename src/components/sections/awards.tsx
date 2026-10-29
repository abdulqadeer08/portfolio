import { awards, sections } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Awards({ index = "08" }: { index?: string }) {
  if (awards.length === 0) return null;

  return (
    <section id="recognition" className="relative scroll-mt-10 border-t border-line pb-28 pt-28 sm:pb-40 sm:pt-40">
      <div className="container-luxe">
        <SectionHeading
          index={index}
          label="Recognition"
          title={sections.awards.title}
          accent={sections.awards.accent}
          description={sections.awards.description}
        />

        <ul className="mt-16 border-t border-line sm:mt-24">
          {awards.map((award, i) => (
            <li key={`${award.title}-${award.project}`} className="group border-b border-line">
              <Reveal delay={i * 0.05} blur={false}>
                <div className="grid grid-cols-12 items-center gap-x-4 gap-y-2 py-7 transition-[padding] duration-700 ease-luxe sm:py-9 md:group-hover:px-4">
                  <span className="col-span-12 font-mono text-xs text-accent sm:col-span-2">{award.year}</span>
                  <span className="col-span-12 font-display text-xl font-semibold tracking-[-0.03em] transition-colors duration-500 group-hover:text-accent sm:col-span-5 sm:text-2xl">
                    {award.title}
                  </span>
                  <span className="col-span-12 text-ink-soft sm:col-span-2">{award.organization}</span>
                  <span className="col-span-12 text-sm text-muted sm:col-span-3 sm:text-right">{award.project}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
