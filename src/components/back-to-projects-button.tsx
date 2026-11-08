"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { markReturnToHome } from "@/components/home-scroll-memory";

/**
 * Returns to the homepage project list with an in-app navigation, so the
 * shared cover/title view transitions play in reverse (the browser's own Back
 * button can't animate them; React renders popstate synchronously).
 */
export function BackToProjectsButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Modified clicks open a new tab; the current page isn't leaving.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    markReturnToHome();
  }

  return (
    <Link
      className="group inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background ps-3 pe-4 text-xs font-bold xl:min-h-12 xl:gap-2.5 xl:ps-4 xl:pe-6 xl:text-sm text-foreground transition-[border-color,color,transform] hover:border-accent hover:text-accent active:scale-[0.96]"
      href={href}
      onClick={handleClick}
      // The homepage restores its own scroll position; don't jump to the top.
      scroll={false}
    >
      <svg
        aria-hidden="true"
        className="size-4 transition-transform xl:size-5 group-hover:-translate-x-0.5 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 12H5M11 6l-6 6 6 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      {label}
    </Link>
  );
}
