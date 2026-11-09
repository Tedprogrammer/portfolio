"use client";

import { useLayoutEffect } from "react";

// Keyed by path so the English and Vietnamese homepages remember separately.
const storageKey = () => `home-scroll-y:${window.location.pathname}`;

// Module scope survives client navigations, so these describe how the visitor
// is arriving at the homepage the next time it mounts.
//
// returningViaHistory: the browser's back/forward buttons fired. Cleared by any
// click, since clicks start forward navigations.
let returningViaHistory = false;
// returningViaBackButton: the project page's "Back to projects" button was used.
let returningViaBackButton = false;
// Whether the homepage has been shown in this page load, i.e. whether a saved
// position belongs to where the visitor actually just was.
let homeVisitedThisLoad = false;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    returningViaHistory = true;
  });
  document.addEventListener(
    "click",
    () => {
      returningViaHistory = false;
      returningViaBackButton = false;
    },
    // Capture runs before the back button's own click handler sets its flag.
    { capture: true },
  );
}

function readSavedScroll() {
  try {
    const value = window.sessionStorage.getItem(storageKey());
    return value === null ? null : Number(value);
  } catch {
    return null;
  }
}

function isHardBackForwardLoad() {
  const [entry] = performance.getEntriesByType(
    "navigation",
  ) as PerformanceNavigationTiming[];
  return entry?.type === "back_forward";
}

/** Called by the "Back to projects" button just before it navigates home. */
export function markReturnToHome() {
  returningViaBackButton = true;
}

/**
 * Whether the visitor is returning to the homepage rather than arriving fresh.
 * The boot sequence uses this to stay out of the way instead of replaying the
 * intro and jumping to the top.
 */
export function isReturningToHome() {
  return (
    returningViaBackButton ||
    ((returningViaHistory || isHardBackForwardLoad()) &&
      readSavedScroll() !== null)
  );
}

/**
 * Remembers how far down the homepage the visitor was, and puts them back
 * there when they return, either with the "Back to projects" button or with
 * the browser's back/forward buttons. Someone who opened a project directly
 * (no homepage visit yet) is taken to the Projects section instead.
 */
export function HomeScrollMemory() {
  useLayoutEffect(() => {
    const savedScroll = readSavedScroll();
    let target: number | null = null;

    if (returningViaBackButton) {
      if (homeVisitedThisLoad && savedScroll !== null) {
        target = savedScroll;
      } else {
        // scrollIntoView honours the section's scroll-margin under the header.
        document.getElementById("projects")?.scrollIntoView({ block: "start" });
      }
    } else if (isReturningToHome()) {
      target = savedScroll;
    }

    returningViaHistory = false;
    returningViaBackButton = false;
    homeVisitedThisLoad = true;

    let restoreFrame = 0;

    if (target !== null) {
      const y = target;
      // Layout can still be settling (fonts, images), so retry briefly until
      // the page is tall enough to reach the saved position.
      let attempts = 0;
      const restore = () => {
        window.scrollTo(0, y);
        attempts += 1;
        if (Math.abs(window.scrollY - y) > 1 && attempts < 30) {
          restoreFrame = window.requestAnimationFrame(restore);
        }
      };
      restore();
    }

    const save = () => {
      try {
        window.sessionStorage.setItem(storageKey(), String(window.scrollY));
      } catch {
        // Storage can be unavailable (private mode); restoring just won't happen.
      }
    };

    window.addEventListener("scroll", save, { passive: true });

    return () => {
      window.removeEventListener("scroll", save);
      window.cancelAnimationFrame(restoreFrame);
    };
  }, []);

  return null;
}
