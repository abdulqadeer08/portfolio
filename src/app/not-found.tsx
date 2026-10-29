import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 50% at 50% 40%, var(--glow), transparent 70%)" }}
      />
      <div className="container-luxe text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 font-display font-semibold text-[clamp(7rem,24vw,18rem)] leading-[0.85] tracking-[-0.07em] text-shine">
          404
        </h1>
        <p className="mx-auto mt-8 max-w-md font-display text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
          This page has drifted somewhere beautiful, but not here.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/work" variant="ghost">
            Browse work
          </ButtonLink>
        </div>
        <p className="mt-16 text-sm text-muted">
          Think something is broken?{" "}
          <Link href="/#contact" className="text-accent underline-offset-4 hover:underline">
            Let me know
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
