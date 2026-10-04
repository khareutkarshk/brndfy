"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/** Scroll to an element id or y-offset through Lenis when it is running. */
export function scrollToTarget(target: string | number) {
  const el = typeof target === "string" ? document.getElementById(target.replace(/^#/, "")) : null;
  if (lenis) {
    lenis.scrollTo(el ?? (typeof target === "number" ? target : 0), { duration: 1.4 });
  } else if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}

/**
 * One Lenis instance for the whole app, driven by GSAP's ticker so
 * ScrollTrigger and smooth scroll share a single frame loop.
 * Skipped entirely for users who prefer reduced motion.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.4 });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // New route: start at the top and let triggers re-measure the new layout
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
