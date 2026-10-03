"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TONES = { ink: "#05061a", deep: "#0d1350" } as const;

/**
 * Hand-offs between home page chapters. Sections are transparent, so the
 * page colour itself eases into deep navy for the people chapters
 * ([data-tone="deep"]) and back to ink. Content marked [data-recede] lifts,
 * shrinks a touch and dims as its section scrolls away, so the next chapter
 * rises over it instead of butting against it.
 */
export default function ChapterFlow() {
    useEffect(() => {
        const main = document.querySelector<HTMLElement>("main");
        if (!main) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>("[data-tone]").forEach((section) => {
                const tone = TONES[section.dataset.tone as keyof typeof TONES] ?? TONES.ink;
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 55%",
                    end: "bottom 45%",
                    onToggle: (self) =>
                        gsap.to(main, {
                            backgroundColor: self.isActive ? tone : TONES.ink,
                            duration: reduce ? 0.2 : 0.9,
                            ease: "power2.out",
                            overwrite: "auto",
                        }),
                });
            });

            if (reduce) return;
            gsap.utils.toArray<HTMLElement>("[data-recede]").forEach((inner) => {
                const section = inner.closest("section") ?? inner;
                gsap.to(inner, {
                    // Fixed lift: a percentage would scale with tall chapters like Work
                    y: -48,
                    scale: 0.965,
                    autoAlpha: 0.25,
                    transformOrigin: "50% 100%",
                    ease: "none",
                    scrollTrigger: { trigger: section, start: "bottom 55%", end: "bottom top", scrub: true },
                });
            });
        });

        // Pinned chapters above add height after mount; measure again once they settle
        const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
        return () => {
            window.clearTimeout(id);
            ctx.revert();
        };
    }, []);

    return null;
}
