"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { hero, profile, stats } from "@/data/portfolio";
import { ButtonAnchor, ButtonInner, buttonClasses } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { LiveClock } from "@/components/ui/live-clock";
import { Magnetic } from "@/components/ui/magnetic";
import { SectionLink } from "@/components/ui/section-link";
import { SplitText } from "@/components/ui/split-text";
import { useIntroDone } from "@/lib/hooks";
import { EASE_LUXE } from "@/lib/utils";

// three.js only loads in the browser, after the page is interactive.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

function FadeUp({
  play,
  delay = 0,
  className,
  children,
}: {
  play: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={play ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 1.1, delay, ease: EASE_LUXE }}
    >
      {children}
    </motion.div>
  );
}

/** The little pill of light that sits inside the headline. */
function Capsule({ play }: { play: boolean }) {
  return (
    <motion.span
      aria-hidden
      className="relative mr-[0.18em] inline-flex h-[0.74em] translate-y-[-0.06em] items-center justify-center overflow-hidden rounded-full align-middle"
      initial={{ width: 0, opacity: 0 }}
      animate={play ? { width: "1.7em", opacity: 1 } : undefined}
      transition={{ duration: 1.3, delay: 0.55, ease: EASE_LUXE }}
    >
      {profile.avatar ? (
        <Image src={profile.avatar} alt="" fill sizes="200px" className="object-cover" priority />
      ) : (
        <>
          <span className="bg-shine absolute inset-0" />
          <span
            className="absolute inset-0 opacity-70 mix-blend-overlay"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), transparent 45%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.5), transparent 55%)",
            }}
          />
          <span className="animate-spin-slow relative text-[0.36em] text-on-accent">✦</span>
        </>
      )}
    </motion.span>
  );
}

/** The highlighted last line of the headline, cycling through `hero.titleAccents`. */
function RotatingAccent({ play }: { play: boolean }) {
  const words = hero.titleAccents;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!play || words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 3400);
    return () => window.clearInterval(id);
  }, [play, words.length]);

  return (
    <span className="-mb-[0.34em] inline-grid overflow-hidden pb-[0.34em] align-bottom">
      <span className="sr-only">{words[0]}</span>
      <motion.span
        aria-hidden
        className="col-start-1 row-start-1 inline-grid"
        initial={{ y: "110%", rotate: 4 }}
        animate={play ? { y: "0%", rotate: 0 } : undefined}
        transition={{ duration: 1.2, delay: 0.45, ease: EASE_LUXE }}
      >
        <AnimatePresence initial={false}>
          <motion.span
            key={words[index]}
            className="col-start-1 row-start-1 whitespace-nowrap text-shine md:justify-self-end"
            initial={{ y: "105%", opacity: 0, filter: "blur(10px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-105%", opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.9, ease: EASE_LUXE }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}

/** The 3D sculpture, fading in once both the preloader and WebGL are ready. */
function Sculpture({ play }: { play: boolean }) {
  const [ready, setReady] = useState(false);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-[24%] top-[6%] -z-[5] h-[26%] w-[74%] opacity-90 sm:-right-[14%] sm:top-[4%] sm:h-[52%] sm:w-[66%] sm:opacity-100 lg:-right-[3%] lg:top-[5%] lg:h-[60%] lg:w-[47%]"
    >
      <motion.div
        className="size-full"
        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
        animate={play && ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 2, ease: EASE_LUXE }}
      >
        <HeroScene onReady={() => setReady(true)} />
      </motion.div>
    </div>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% -5%, var(--glow), transparent 70%), radial-gradient(40% 40% at 90% 85%, color-mix(in oklab, var(--accent) 7%, transparent), transparent 70%)",
        }}
      />
      <div className="animate-orb absolute -right-[15%] top-[15%] size-[45vw] max-h-[700px] max-w-[700px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="container-luxe absolute inset-0 grid grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-l border-line/60 last:border-r" />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}

export function Hero() {
  const play = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const sculptureY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const sculptureOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-8 pt-28 sm:pt-32"
    >
      <HeroBackground />
      <motion.div
        style={{ y: sculptureY, opacity: sculptureOpacity }}
        className="pointer-events-none absolute inset-0 -z-[5] [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]"
      >
        <Sculpture play={play} />
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="container-luxe flex flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <FadeUp play={play} delay={0.05}>
            <span className="beam relative inline-flex items-center gap-3 rounded-full border border-line bg-surface/50 py-2 pl-3 pr-4 text-[0.78rem] text-ink-soft backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
                <span className="relative size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability.label}
              <span className="hidden text-muted sm:inline">· {profile.availability.detail}</span>
            </span>
          </FadeUp>
        </div>

        <div className="mt-10 sm:mt-14">
          <FadeUp play={play} delay={0.15} className="mb-6 hidden items-center gap-4 sm:flex">
            <span className="h-px w-12 bg-accent" />
            <span className="eyebrow text-accent">
              {profile.firstName} {profile.lastName} — {profile.role}
            </span>
          </FadeUp>

          <h1 className="font-display text-[clamp(2.5rem,7.1vw,7.4rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-ink">
            <span className="block">
              <SplitText text={hero.titleTop} play={play} delay={0.15} />
            </span>
            <span className="block sm:pl-[0.9em]">
              <Capsule play={play} />
              <SplitText text={hero.titleMiddle} play={play} delay={0.3} />
            </span>
            <span className="block md:text-right">
              <RotatingAccent play={play} />
            </span>
          </h1>
        </div>

        <div className="mt-auto grid gap-12 pt-14 lg:grid-cols-12 lg:items-end">
          <FadeUp play={play} delay={0.7} className="lg:col-span-5">
            <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">{hero.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <SectionLink to={hero.primaryCta.target} className={buttonClasses("accent")}>
                  <ButtonInner variant="accent">{hero.primaryCta.label}</ButtonInner>
                </SectionLink>
              </Magnetic>
              <Magnetic>
                <ButtonAnchor href={profile.resumeUrl} variant="ghost" download>
                  {hero.secondaryCta.label}
                </ButtonAnchor>
              </Magnetic>
            </div>
          </FadeUp>

          <FadeUp play={play} delay={0.85} className="lg:col-span-6 lg:col-start-7">
            <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="border-line py-6 pr-4 max-sm:odd:border-r max-sm:even:pl-5 max-sm:[&:nth-child(n+3)]:border-t sm:border-r sm:pl-5 sm:first:pl-0 sm:last:border-r-0"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-none tracking-[-0.04em]">
                    <Counter value={stat.value} duration={2 + i * 0.2} />
                    <span className="text-accent">{stat.suffix}</span>
                  </dd>
                  <dd className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </motion.div>

      <FadeUp play={play} delay={1} className="container-luxe mt-10">
        <div className="flex items-center justify-between border-t border-line pt-6 text-[0.7rem] text-muted">
          <SectionLink to="about" className="group flex items-center gap-4 font-mono uppercase tracking-[0.2em]">
            <span className="relative h-10 w-px overflow-hidden bg-line-strong">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-accent"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="transition-colors group-hover:text-accent">Scroll to explore</span>
          </SectionLink>
          <span className="font-mono uppercase tracking-[0.2em]">
            <span className="hidden sm:inline">{profile.location} · </span>
            <LiveClock />
          </span>
        </div>
      </FadeUp>
    </section>
  );
}
