"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type SmoothScrollLinkProps = ComponentProps<"a"> & {
  href: `#${string}` | `/#${string}`;
};

export function SmoothScrollLink({
  href,
  onClick,
  ...props
}: SmoothScrollLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const isLandingPageLink = href.startsWith("/#");

    if (isLandingPageLink && window.location.pathname !== "/") {
      return;
    }

    const hash = href.slice(href.indexOf("#"));
    const target = document.getElementById(hash.slice(1));

    if (!target) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", isLandingPageLink ? `/${hash}` : hash);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return <Link {...props} href={href} onClick={handleClick} />;
}
