"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, LoaderCircle, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contact, profile } from "@/data/portfolio";
import { BrandIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn, EASE_LUXE } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2.5 text-[0.82rem] transition-all duration-500 ease-luxe",
        selected
          ? "border-accent bg-accent text-on-accent"
          : "border-line-strong text-ink-soft hover:border-accent/60 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const className =
    "peer w-full border-b border-line-strong bg-transparent pb-3 pt-2 text-lg text-ink outline-none transition-colors duration-500 placeholder:text-muted/60 focus:border-accent";
  return (
    <label className="block">
      <span className="eyebrow block">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={cn(className, "resize-none")} placeholder="Tell me about the role, project or idea…" />
      ) : (
        <input name={name} type={type} required={required} autoComplete={autoComplete} className={className} />
      )}
    </label>
  );
}

export function Contact({ index = "09" }: { index?: string }) {
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setDraft(`mailto:${profile.email}?subject=${encodeURIComponent(`Message from ${data.name ?? ""}`)}&body=${encodeURIComponent(`${data.message ?? ""}

${data.name ?? ""}
${data.email ?? ""}`)}`);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interests, budget }),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error ?? "Something went wrong.");
      setStatus("sent");
      form.reset();
      setInterests([]);
      setBudget(null);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-10 overflow-hidden border-t border-line py-28 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 40% at 15% 0%, var(--glow), transparent 70%), radial-gradient(40% 40% at 100% 60%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="container-luxe">
        <Reveal className="mb-8 flex items-center gap-4" blur={false}>
          <span className="font-mono text-[0.7rem] text-accent">({index})</span>
          <span className="h-px w-10 bg-line-strong" />
          <span className="eyebrow">Contact</span>
        </Reveal>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(2.5rem,6.2vw,6.2rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
            <SplitText text={contact.headingTop} />
            <br />
            <SplitText text={contact.headingAccent} wordClassName="text-shine" delay={0.15} />
          </h2>

          <Reveal delay={0.2} className="shrink-0">
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${profile.email}`}
                className="group relative grid size-40 place-items-center overflow-hidden rounded-full bg-shine text-on-accent shadow-[0_20px_60px_-20px_var(--accent)] sm:size-48"
              >
                <span className="flex flex-col items-center gap-2 text-center text-sm font-medium uppercase tracking-[0.16em]">
                  <ArrowUpRight className="size-7 transition-transform duration-700 ease-luxe group-hover:rotate-45" strokeWidth={1.2} />
                  Say hello
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[1.05rem] leading-relaxed text-ink-soft">{contact.intro}</p>

            <div className="mt-12 border-t border-line pt-8">
              <p className="eyebrow">Email</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all font-display text-[clamp(1.3rem,2.2vw,2rem)] font-semibold leading-tight tracking-[-0.03em] transition-colors hover:text-accent"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="grid size-10 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "copied" : "copy"}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" strokeWidth={1.5} />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="eyebrow flex items-center gap-2">
                  <Phone className="size-3" /> Phone
                </dt>
                <dd className="mt-3">
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="text-ink-soft transition-colors hover:text-accent">
                    {profile.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow flex items-center gap-2">
                  <MapPin className="size-3" /> Location
                </dt>
                <dd className="mt-3 text-ink-soft">{profile.location}</dd>
              </div>
            </dl>

            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-line bg-surface/50 p-5">
              <span className="relative flex size-2.5 shrink-0">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
                <span className="relative size-2.5 rounded-full bg-emerald-400" />
              </span>
              <p className="text-sm text-ink-soft">
                {profile.availability.label}. <span className="text-muted">{profile.availability.detail}.</span>
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid size-12 place-items-center rounded-full border border-line text-ink-soft transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:text-accent"
                >
                  <BrandIcon platform={social.platform} className="size-4" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <SpotlightCard className="beam p-7 sm:p-12">
              <AnimatePresence mode="wait" initial={false}>
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, ease: EASE_LUXE }}
                    className="flex min-h-[32rem] flex-col items-center justify-center text-center"
                  >
                    <span className="grid size-20 place-items-center rounded-full bg-shine text-on-accent">
                      <Check className="size-8" strokeWidth={1.4} />
                    </span>
                    <h3 className="mt-8 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                      Thank <span className="text-shine">you.</span>
                    </h3>
                    <p className="mt-4 max-w-sm text-muted">
                      Your message is on its way. I&apos;ll get back to you as soon as I can.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-10 text-sm text-accent underline-offset-4 hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, ease: EASE_LUXE }}
                    className="space-y-10"
                  >
                    {/* Honeypot: hidden from people, irresistible to bots */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                    <div className="grid gap-10 sm:grid-cols-2">
                      <Field label="Your name" name="name" required autoComplete="name" />
                      <Field label="Email address" name="email" type="email" required autoComplete="email" />
                    </div>
                    <Field label="Company" name="company" autoComplete="organization" />

                    <fieldset>
                      <legend className="eyebrow">This is about</legend>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {contact.interests.map((interest) => (
                          <Chip
                            key={interest}
                            selected={interests.includes(interest)}
                            onClick={() =>
                              setInterests((current) =>
                                current.includes(interest)
                                  ? current.filter((item) => item !== interest)
                                  : [...current, interest],
                              )
                            }
                          >
                            {interest}
                          </Chip>
                        ))}
                      </div>
                    </fieldset>

                    {contact.budgets.length > 0 && (
                      <fieldset>
                        <legend className="eyebrow">Project budget</legend>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {contact.budgets.map((option) => (
                            <Chip key={option} selected={budget === option} onClick={() => setBudget(budget === option ? null : option)}>
                              {option}
                            </Chip>
                          ))}
                        </div>
                      </fieldset>
                    )}

                    <Field label="Message" name="message" required textarea />

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-muted" aria-live="polite">
                        {status === "error" ? (
                          <span className="text-red-400">
                            {error}{" "}
                            <a href={draft} className="text-accent underline underline-offset-4">Open in your email app</a>
                          </span>
                        ) : (
                          "Your message goes straight to my inbox."
                        )}
                      </p>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group/btn inline-flex h-14 items-center justify-center gap-3 rounded-full bg-shine px-8 text-sm font-medium text-on-accent shadow-[0_10px_40px_-14px_var(--accent)] transition-[background-position,box-shadow] duration-700 ease-luxe hover:bg-[position:100%_center] disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <>
                            <LoaderCircle className="size-4 animate-spin" /> Sending…
                          </>
                        ) : (
                          <>
                            Send message
                            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/btn:rotate-45" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
