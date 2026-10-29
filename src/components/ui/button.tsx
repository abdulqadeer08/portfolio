import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "accent" | "ghost" | "solid";

const variants: Record<ButtonVariant, string> = {
  accent: "bg-shine text-on-accent shadow-[0_10px_40px_-14px_var(--accent)] hover:bg-[position:100%_center] hover:shadow-[0_14px_50px_-12px_var(--accent)]",
  ghost:
    "border border-line-strong text-ink hover:border-accent/60 hover:text-accent-bright light:hover:text-accent-deep",
  solid: "bg-ink text-bg hover:bg-accent hover:text-on-accent",
};

/** Class names for anything that should look like a button (links, section links…). */
export function buttonClasses(variant: ButtonVariant = "accent", className?: string) {
  return cn(
    "group/btn relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full pl-6 pr-2 text-[0.82rem] font-medium tracking-wide whitespace-nowrap transition-[background-position,background-color,border-color,color,box-shadow] duration-700 ease-luxe",
    variants[variant],
    className,
  );
}

/** Rolling label plus the circular arrow badge. */
export function ButtonInner({ variant = "accent", children }: { variant?: ButtonVariant; children: ReactNode }) {
  return (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-luxe group-hover/btn:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-luxe group-hover/btn:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span
        className={cn(
          "relative grid size-8 place-items-center overflow-hidden rounded-full",
          variant === "accent" && "bg-on-accent/10",
          variant === "ghost" && "bg-ink/5 group-hover/btn:bg-accent/15",
          variant === "solid" && "bg-bg/10",
        )}
      >
        <ArrowUpRight
          className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:-translate-y-6 group-hover/btn:translate-x-6"
          strokeWidth={1.6}
        />
        <ArrowUpRight
          className="absolute size-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
          strokeWidth={1.6}
        />
      </span>
    </>
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

export function ButtonLink({ variant = "accent", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      <ButtonInner variant={variant}>{children}</ButtonInner>
    </Link>
  );
}

/** For files and external URLs. */
export function ButtonAnchor({
  variant = "accent",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return (
    <a className={buttonClasses(variant, className)} {...props}>
      <ButtonInner variant={variant}>{children}</ButtonInner>
    </a>
  );
}

export function Button({
  variant = "accent",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button className={buttonClasses(variant, cn("disabled:opacity-60", className))} {...props}>
      <ButtonInner variant={variant}>{children}</ButtonInner>
    </button>
  );
}
