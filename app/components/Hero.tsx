"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import MagneticButton from "./fx/MagneticButton";
import { markModelReady, onIntroDone } from "./fx/intro";
import { scrollToTarget } from "./fx/SmoothScroll";
import type { SceneState } from "./fx/HeroScene";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroScene = dynamic(() => import("./fx/HeroScene"), { ssr: false });

/**
 * Chapter one. The cobalt mark floats beside the promise; scrolling pins the
 * frame, lifts the copy away and turns the mark to face the viewer.
 */
export default function Hero() {
    const root = useRef<HTMLElement>(null);
    const scene = useRef<SceneState>({ progress: 0, intro: 0 });

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const mm = gsap.matchMedia();

        mm.add(
            {
                motion: "(prefers-reduced-motion: no-preference)",
                reduce: "(prefers-reduced-motion: reduce)",
            },
            (ctx) => {
                if (ctx.conditions?.reduce) {
                    scene.current.intro = 1;
                    return;
                }

                const split = SplitText.create("[data-hero-title] [data-line]", {
                    type: "chars",
                    mask: "chars",
                });
                // Give the per-character masks room for descenders (g, j, p)
                gsap.set(split.masks, { paddingBottom: "0.14em", marginBottom: "-0.14em" });
                gsap.set(split.chars, { yPercent: 115 });
                gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });

                // ctx.add runs immediately; deferring it keeps the tweens inside this context for cleanup
                const playIntro = () => ctx.add(() => {
                    const tl = gsap.timeline();
                    tl.to(scene.current, { intro: 1, duration: 2.2, ease: "expo.out" }, 0)
                        .to(split.chars, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.022 }, 0.05)
                        .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.45);
                    });
                const unsubscribe = onIntroDone(playIntro);

                // Scroll chapter: pin, lift the copy, turn the mark to face the viewer
                gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: "top top",
                        end: "+=110%",
                        pin: true,
                        scrub: 0.6,
                        onUpdate: (self) => {
                            scene.current.progress = self.progress;
                        },
                    },
                })
                    .to("[data-hero-copy]", { yPercent: -35, autoAlpha: 0, filter: "blur(10px)", ease: "none", duration: 0.55 }, 0)
                    .to("[data-hero-glow]", { scale: 1.6, autoAlpha: 0.35, ease: "none", duration: 1 }, 0);

                return () => {
                    unsubscribe();
                    split.revert();
                };
            },
            el,
        );

        return () => mm.revert();
    }, []);

    return (
        <section ref={root} id="top" className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-ink">
            {/* Light: a low cobalt horizon and a soft halo behind the mark */}
            <div data-hero-glow className="pointer-events-none absolute inset-0">
                <div className="absolute -bottom-[30%] left-1/2 h-[70%] w-[140%] -translate-x-1/2 rounded-[100%] bg-primary/25 blur-[120px]" />
                <div className="absolute right-[8%] top-[12%] hidden size-[42vw] max-w-[640px] rounded-full bg-primary/20 blur-[140px] lg:block" />
            </div>

            <HeroScene state={scene} onReady={markModelReady} />

            {/* Fade the horizon glow into the next chapter so there is no seam */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink to-transparent" />

            {/* Keeps copy legible where it overlaps the mark on small screens */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ink via-ink/70 to-transparent lg:hidden" />

            <div
                data-hero-copy
                className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-10 sm:px-10 lg:px-16 lg:pb-16"
            >
                <p data-hero-fade className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-accent/80 sm:text-xs">
                    Finance-first influencer marketing agency
                </p>

                <h1
                    data-hero-title
                    className="font-display text-[clamp(2.4rem,6.4vw,6.6rem)] leading-[1.02] tracking-[-0.035em] text-paper"
                >
                    <span data-line className="block font-light">Building culture.</span>
                    <span data-line className="block font-semibold">
                        Not just <span className="text-cobalt-hi">campaigns.</span>
                    </span>
                </h1>

                <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
                    <p data-hero-fade className="max-w-[44ch] text-base leading-relaxed text-mute sm:text-lg">
                        We match brands with creators in Finance and Edutainment, then measure what the content actually moves.
                    </p>
                    <div data-hero-fade className="flex flex-wrap items-center gap-3">
                        <MagneticButton href="/contact">Start a campaign</MagneticButton>
                        <MagneticButton
                            href="/#work"
                            variant="ghost"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToTarget("work");
                            }}
                        >
                            See the work
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
