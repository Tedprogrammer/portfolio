"use client";

import { useLayoutEffect } from "react";

// Keyed by path so the English and Vietnamese homepages remember separately.
const storageKey = () => `home-scroll-y:${window.location.pathname}`;

// Set when the browser's back/forward buttons fire, cleared by any click that
// could start a forward navigation. Module scope survives client navigations.
let returningViaHistory = false;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    returningViaHistory = true;
  });
  document.addEventListener(
    "click",
    () => {
      returningViaHistory = false;
    },
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

/**
 * Whether the visitor is returning to the homepage through browser history
 * with a remembered position. The boot sequence uses this to stay out of the
 * way instead of replaying the intro and jumping to the top.
 */
export function isReturningToHome() {
  return (
    (returningViaHistory || isHardBackForwardLoad()) &&
    readSavedScroll() !== null
  );
}

/**
 * Remembers how far down the homepage the visitor was, and puts them back
 * there when they return with the browser's back or forward buttons (for
 * example after opening a project).
 */
export function HomeScrollMemory() {
  useLayoutEffect(() => {
    const savedScroll = readSavedScroll();
    const target = isReturningToHome() ? savedScroll : null;
    returningViaHistory = false;

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
