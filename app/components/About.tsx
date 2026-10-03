"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MARK_D_PATH, MARK_VIEWBOX } from "./fx/BrndfyMark";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
    "We're Brndfy Media, a finance-first influencer marketing and talent management company, built for both sides of the deal.";
const HIGHLIGHT = new Set(["finance-first", "both", "sides"]);

/**
 * Chapter two. The statement lights up word by word while the two halves of
 * the mark (brands, creators) slide in from opposite sides and lock together.
 */
const About = () => {
    const root = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const mm = gsap.matchMedia();

        mm.add(
            {
                desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
                mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
            },
            (ctx) => {
                const desktop = ctx.conditions?.desktop;
                const tl = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: desktop
                        ? { trigger: el, start: "top top", end: "+=170%", pin: true, scrub: 0.5 }
                        : { trigger: el, start: "top 70%", end: "bottom 60%", scrub: 0.5 },
                });

                tl.fromTo("[data-word]", { opacity: 0.14 }, { opacity: 1, stagger: 0.05, duration: 0.3 }, 0)
                    .fromTo("[data-shape='d']", { x: -1100, rotate: -14 }, { x: 0, rotate: 0, duration: 1 }, 0.25)
                    .fromTo("[data-shape='o']", { x: 1100, rotate: 18 }, { x: 0, rotate: 0, duration: 1 }, 0.25)
                    .fromTo("[data-shape='o']", { fill: "#B0D7F9" }, { fill: "#1744FF", duration: 0.3 }, 0.95)
                    .fromTo("[data-side='brands']", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.55)
                    .fromTo("[data-side='creators']", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.75)
                    .fromTo("[data-lock]", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.25 }, 1.15);
            },
            el,
        );
        return () => mm.revert();
    }, []);

    return (
        <section
            ref={root}
            id="about"
            className="relative flex min-h-[100dvh] items-center overflow-hidden bg-ink px-4 py-24 sm:px-10 lg:px-16"
        >
            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-10">
                <p className="font-display text-[clamp(1.6rem,3.3vw,3.3rem)] font-light leading-[1.18] tracking-[-0.02em] lg:col-span-7">
                    {STATEMENT.split(" ").map((w, i) => (
                        <span
                            key={i}
                            data-word
                            className={`inline-block pr-[0.28em] ${HIGHLIGHT.has(w.replace(/[,.]/g, "")) ? "font-medium text-cobalt-hi" : "text-paper"}`}
                        >
                            {w}
                        </span>
                    ))}
                </p>

                {/* The deal: two shapes, one mark */}
                <div className="relative mx-auto w-full max-w-[460px] lg:col-span-5">
                    <svg viewBox={MARK_VIEWBOX} className="mx-auto h-[300px] w-auto overflow-visible sm:h-[380px] lg:h-[440px]" aria-hidden>
                        <defs>
                            <linearGradient id="mark-sheen" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0" stopColor="#4B6DFF" />
                                <stop offset="1" stopColor="#1744FF" />
                            </linearGradient>
                        </defs>
                        <g data-shape="d" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                            <path d={MARK_D_PATH} fill="url(#mark-sheen)" />
                        </g>
                        <circle data-shape="o" cx="820" cy="1450" r="470" fill="#1744FF" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                    </svg>

                    <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-10">
                        <div data-side="brands">
                            <svg viewBox="0 0 1340 960" className="h-4 w-auto text-primary" aria-hidden>
                                <path d={MARK_D_PATH} fill="currentColor" />
                            </svg>
                            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">For brands</p>
                            <p className="mt-2 text-sm leading-snug text-paper sm:text-base">Measurable ROI on every campaign.</p>
                        </div>
                        <div data-side="creators">
                            <span className="block size-4 rounded-full bg-accent" aria-hidden />
                            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">For creators</p>
                            <p className="mt-2 text-sm leading-snug text-paper sm:text-base">Fair contracts, timely payouts and long-term earning power.</p>
                        </div>
                    </div>

                    <p
                        data-lock
                        className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-paper/15 bg-ink/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper backdrop-blur"
                    >
                        One deal. Both sides.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
