import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { fullName, navigation, profile, sections } from "@/data/portfolio";
import { BrandIcon } from "@/components/ui/icons";
import { LiveClock } from "@/components/ui/live-clock";
import { Reveal } from "@/components/ui/reveal";
import { SectionLink } from "@/components/ui/section-link";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-elevated">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 100%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="container-luxe relative pt-20 sm:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-md font-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
              {sections.footer.tagline} <span className="text-shine">{sections.footer.accent}</span>
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-block border-b border-accent/40 pb-1 text-lg text-accent transition-colors hover:border-accent"
            >
              {profile.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <div>
              <h3 className="eyebrow mb-6">Navigate</h3>
              <ul className="space-y-3 text-sm">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <SectionLink to={item.id} className="text-ink-soft transition-colors hover:text-accent">
                      {item.label}
                    </SectionLink>
                  </li>
                ))}
                <li>
                  <Link href="/work" className="text-ink-soft transition-colors hover:text-accent">
                    Archive
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-6">Social</h3>
              <ul className="space-y-3 text-sm">
                {profile.socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-accent"
                    >
                      <BrandIcon platform={social.platform} className="size-3.5 opacity-60 group-hover:opacity-100" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="eyebrow mb-6">Contact</h3>
              <ul className="space-y-3 text-sm text-ink-soft">
                <li>{profile.location}</li>
                <li>
                  <LiveClock className="tabular-nums" /> · Local time
                </li>
                <li>
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-accent">
                    {profile.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2 pt-2">
                  <span className="relative flex size-2">
                    <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent" />
                    <span className="relative size-2 rounded-full bg-accent" />
                  </span>
                  {profile.availability.label}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Reveal y={60} className="mt-20 select-none sm:mt-28">
          <p
            aria-hidden
            className="whitespace-nowrap text-center font-display text-[clamp(3rem,13.5vw,13rem)] font-bold leading-[0.85] tracking-[-0.06em] text-shine"
          >
            {fullName}
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-line py-8 text-xs text-muted sm:flex-row">
          <p>
            © <CurrentYear /> {fullName}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.2em]">Designed &amp; engineered with care</p>
          <SectionLink
            to="top"
            className="group inline-flex items-center gap-3 uppercase tracking-[0.2em] transition-colors hover:text-accent"
          >
            Back to top
            <span className="grid size-9 place-items-center rounded-full border border-line transition-colors group-hover:border-accent">
              <ArrowUp className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" />
            </span>
          </SectionLink>
        </div>
      </div>
    </footer>
  );
}
