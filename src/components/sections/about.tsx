import { about, fullName, profile, sections } from "@/data/portfolio";
import { ButtonAnchor, ButtonInner, buttonClasses } from "@/components/ui/button";
import { Portrait, RotatingBadge } from "@/components/ui/portrait";
import { Reveal } from "@/components/ui/reveal";
import { ScrollText } from "@/components/ui/scroll-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionLink } from "@/components/ui/section-link";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-10 py-28 sm:py-40">
      <div className="container-luxe">
        <SectionHeading index="01" label="About" title={sections.about.title} accent={sections.about.accent} />

        <ScrollText
          text={about.statement}
          className="mt-16 max-w-6xl font-display text-[clamp(1.6rem,3.3vw,3.1rem)] font-medium leading-[1.22] tracking-[-0.035em] text-ink sm:mt-24"
        />

        <div className="mt-20 grid gap-16 sm:mt-28 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <Portrait className="aspect-[4/5] w-full" />
            <div className="absolute left-5 top-8 rounded-full border border-line bg-bg/70 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft backdrop-blur-md">
              {profile.location}
            </div>
            <RotatingBadge
              text={about.badgeText}
              className="absolute -bottom-10 -right-2 rounded-full border border-line bg-bg sm:-right-8"
            />
          </Reveal>

          <div className="flex flex-col lg:col-span-7 lg:pt-6">
            <div className="space-y-6">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-[1.08rem] leading-[1.8] text-ink-soft">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <dl className="mt-12 grid grid-cols-2 border-t border-line">
                {about.facts.map((fact, i) => (
                  <div
                    key={fact.label}
                    className={`border-b border-line py-6 ${i % 2 === 0 ? "pr-6" : "border-l pl-6"}`}
                  >
                    <dt className="eyebrow">{fact.label}</dt>
                    <dd className="mt-3 font-display text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2} className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-4xl font-bold leading-none tracking-[-0.04em] text-shine sm:text-5xl">{fullName}</p>
                <p className="eyebrow mt-4">{profile.role}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <SectionLink to="contact" className={buttonClasses("solid")}>
                  <ButtonInner variant="solid">Let&apos;s talk</ButtonInner>
                </SectionLink>
                <ButtonAnchor href={profile.resumeUrl} variant="ghost" download>
                  Résumé
                </ButtonAnchor>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
