import { Sparkles, Wrench } from "lucide-react";
import { concepts, currentlyBuilding, sections, skillGroups } from "@/data/portfolio";
import { featureIcons } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Toolkit() {
  return (
    <section id="toolkit" className="relative scroll-mt-10 py-28 sm:py-40">
      <div className="container-luxe">
        <SectionHeading
          index="05"
          label="Skills"
          title={sections.toolkit.title}
          accent={sections.toolkit.accent}
          description={sections.toolkit.description}
        />

        <div className="mt-16 grid gap-4 sm:mt-24 md:grid-cols-6">
          {skillGroups.map((group, i) => {
            const Icon = featureIcons[group.icon];
            return (
              <Reveal key={group.title} delay={i * 0.08} className="md:col-span-3 lg:col-span-2">
                <SpotlightCard className="h-full p-8 sm:p-10">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-full border border-accent/30 text-accent">
                      <Icon className="size-5" strokeWidth={1.4} />
                    </span>
                    <span className="font-mono text-[0.65rem] text-muted">{group.items.length} skills</span>
                  </div>
                  <h3 className="mt-10 font-display text-3xl font-semibold tracking-[-0.03em]">{group.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{group.description}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-bg/40 px-3.5 py-2 text-[0.8rem] text-ink-soft transition-colors duration-500 hover:border-accent/50 hover:text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            );
          })}

          <Reveal delay={0.1} className="md:col-span-6 lg:col-span-4">
            <SpotlightCard className="h-full p-8 sm:p-10">
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-full border border-accent/30 text-accent">
                  <Wrench className="size-5" strokeWidth={1.4} />
                </span>
                <span className="font-mono text-[0.65rem] text-muted">{concepts.length} areas</span>
              </div>
              <h3 className="mt-10 font-display text-3xl font-semibold tracking-[-0.03em]">Concepts & tools</h3>
              <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                {concepts.map((concept) => (
                  <li
                    key={concept}
                    className="flex items-center justify-between border-b border-line py-4 text-[0.95rem] text-ink-soft"
                  >
                    {concept}
                    <span className="size-1.5 rounded-full bg-accent" />
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.18} className="md:col-span-6 lg:col-span-2">
            <SpotlightCard className="beam flex h-full flex-col justify-between gap-10 overflow-hidden p-8 sm:p-10">
              <div
                aria-hidden
                className="animate-orb absolute -right-16 -top-16 size-56 rounded-full bg-accent/15 blur-3xl"
              />
              <div className="relative">
                <span className="grid size-12 place-items-center rounded-full bg-shine text-on-accent">
                  <Sparkles className="size-5" strokeWidth={1.4} />
                </span>
                <h3 className="mt-10 font-display text-3xl font-semibold leading-tight tracking-[-0.03em]">
                  Currently <span className="text-shine">building</span>
                </h3>
              </div>
              <ul className="relative space-y-3">
                {currentlyBuilding.map((item) => (
                  <li key={item} className="flex items-center justify-between border-b border-line pb-3 text-ink-soft">
                    {item}
                    <span className="size-1.5 rounded-full bg-accent" />
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
