"use client";

import { useLayoutEffect, useRef } from "react";

const bootSequenceDuration = 2682;

export function HomeBootController() {
  const ownsBootSequence = useRef(false);

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (root.dataset.bootComplete === "true") {
      return;
    }

    if (root.dataset.bootStarted === "true" && !ownsBootSequence.current) {
      root.dataset.bootComplete = "true";
      return;
    }

    root.dataset.bootStarted = "true";
    ownsBootSequence.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.dataset.bootComplete = "true";
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    const completionTimer = window.setTimeout(() => {
      root.dataset.bootComplete = "true";
    }, bootSequenceDuration);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(completionTimer);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return null;
}
