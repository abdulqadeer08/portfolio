"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { fullName, navigation, profile } from "@/data/portfolio";
import { BrandIcon } from "@/components/ui/icons";
import { LiveClock } from "@/components/ui/live-clock";
import { SectionLink } from "@/components/ui/section-link";
import { ScrambleText } from "@/components/ui/scramble-text";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn, EASE_LUXE, pad } from "@/lib/utils";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    // "top" (the hero) is observed too, so nothing is highlighted back at the top.
    const sections = ["top", ...navigation.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? null : entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const active = isHome ? activeSection : pathname.startsWith("/work") ? "work" : null;

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > previous && y > 240);
    setScrolled(y > 32);
  });

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-shine"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-50 pt-4"
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE_LUXE }}
      >
        <div className="container-luxe">
          <nav
            aria-label="Primary"
            className={cn(
              "flex items-center justify-between gap-4 rounded-full border py-2 pl-2 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-luxe",
              scrolled || open
                ? "border-line bg-bg/70 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
          >
            <SectionLink to="top" className="group flex items-center gap-3 pl-1" onClick={() => setOpen(false)}>
              <span className="grid size-10 place-items-center rounded-full border border-accent/40 bg-surface font-display text-[0.85rem] font-bold tracking-[-0.02em] text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-on-accent">
                {profile.initials}
              </span>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-base font-semibold tracking-[-0.02em]">{fullName}</span>
                <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                  {profile.shortRole}
                </span>
              </span>
            </SectionLink>

            <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface/40 p-1 lg:flex">
              {navigation.map((item) => (
                <li key={item.id}>
                  <SectionLink
                    to={item.id}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-[0.8rem] tracking-wide transition-colors duration-500",
                      active === item.id ? "text-on-accent" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-shine"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <ScrambleText className="relative" text={item.label} />
                  </SectionLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-2 pr-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted xl:flex">
                <span className="size-1.5 rounded-full bg-accent" />
                <LiveClock />
              </span>
              <ThemeToggle />
              <SectionLink
                to="contact"
                className="hidden h-10 items-center rounded-full bg-ink px-5 text-[0.8rem] font-medium text-bg transition-colors duration-500 hover:bg-accent hover:text-on-accent sm:inline-flex"
              >
                Let&apos;s talk
              </SectionLink>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative grid size-10 place-items-center rounded-full border border-line lg:hidden"
              >
                <span
                  className={cn(
                    "absolute h-px w-4 bg-ink transition-transform duration-500 ease-luxe",
                    open ? "rotate-45" : "-translate-y-[3px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-4 bg-ink transition-transform duration-500 ease-luxe",
                    open ? "-rotate-45" : "translate-y-[3px]",
                  )}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: string | null;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-bg-elevated pt-28 lg:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          data-lenis-prevent
        >
          <div className="container-luxe flex flex-1 flex-col justify-between overflow-y-auto pb-10">
            <ul className="space-y-1">
              {[{ label: "Home", id: "top" }, ...navigation].map((item, i) => (
                <li key={item.id} className="overflow-hidden border-b border-line">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: EASE_LUXE }}
                  >
                    <SectionLink
                      to={item.id}
                      onClick={onClose}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span
                        className={cn(
                          "font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl",
                          active === item.id && "text-shine",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-muted">{pad(i + 1)}</span>
                    </SectionLink>
                  </motion.div>
                </li>
              ))}
              <li className="overflow-hidden border-b border-line">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.8, delay: 0.15 + (navigation.length + 1) * 0.06, ease: EASE_LUXE }}
                >
                  <Link href="/work" onClick={onClose} className="flex items-baseline justify-between py-4">
                    <span className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Archive</span>
                    <span className="font-mono text-xs text-muted">{pad(navigation.length + 2)}</span>
                  </Link>
                </motion.div>
              </li>
            </ul>

            <motion.div
              className="mt-12 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE_LUXE }}
            >
              <a href={`mailto:${profile.email}`} className="block break-all font-display text-lg font-semibold text-accent sm:text-xl">
                {profile.email}
              </a>
              <div className="flex flex-wrap gap-3">
                {profile.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid size-11 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent"
                  >
                    <BrandIcon platform={social.platform} className="size-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
