"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import type { ComponentProps, MouseEvent } from "react";

type SectionLinkProps = Omit<ComponentProps<"a">, "href"> & {
  /** Section id on the home page, without the `#`. */
  to: string;
};

/**
 * Links to a section of the home page. On the home page it glides there with
 * Lenis; from any other page it navigates to `/#section`.
 */
export function SectionLink({ to, onClick, children, ...props }: SectionLinkProps) {
  const pathname = usePathname();
  const lenis = useLenis();

  if (pathname !== "/") {
    return (
      <Link href={`/#${to}`} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    const target = document.getElementById(to);
    if (!target) return;
    event.preventDefault();
    if (lenis) {
      // `force` so it still works while Lenis is paused (e.g. the mobile menu is open).
      lenis.scrollTo(target, { offset: to === "top" ? 0 : -24, duration: 1.6, force: true });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
    history.replaceState(null, "", to === "top" ? "/" : `#${to}`);
  }

  return (
    <a href={`#${to}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
