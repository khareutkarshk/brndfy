"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrndfyMark from "./fx/BrndfyMark";
import MagneticButton from "./fx/MagneticButton";
import SplitReveal from "./fx/SplitReveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * Final chapter: the page's one colour-block moment. A cobalt panel grows
 * from an inset card to full-bleed as it arrives, carrying the closing line.
 */
export default function FinalCTA() {
    const root = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(
                "[data-cta-panel]",
                { clipPath: "inset(12% 6% 12% 6% round 28px)" },
                {
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    ease: "none",
                    scrollTrigger: { trigger: el, start: "top bottom", end: "top top", scrub: true },
                },
            );
            gsap.fromTo(
                "[data-cta-mark]",
                { rotate: -30, yPercent: 20 },
                { rotate: 15, yPercent: -10, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
            );
        }, el);
        return () => mm.revert();
    }, []);

    return (
        <section ref={root} id="start" className="relative bg-ink">
            <div data-cta-panel className="relative flex min-h-[100dvh] items-center overflow-hidden bg-primary px-4 py-28 sm:px-10 lg:px-16">
                <div data-cta-mark className="pointer-events-none absolute -right-[18%] top-1/2 -translate-y-1/2 opacity-30 sm:-right-[8%]">
                    <BrndfyMark className="h-[80vh] w-auto text-secondary" />
                </div>

                <div className="relative mx-auto w-full max-w-[1400px]">
                    <SplitReveal className="max-w-[16ch] font-display text-[clamp(2.6rem,7vw,7rem)] font-light leading-[1] tracking-[-0.045em] text-white">
                        You bring the objective. <span className="font-semibold">We build the campaign.</span>
                    </SplitReveal>
                    <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                        <MagneticButton href="/contact" variant="light">
                            Start a campaign
                        </MagneticButton>
                        <p className="max-w-[36ch] text-white/80">Tell us the goal and budget. We will come back with the creator mix.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
