"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Chapter marker above every section title: the number, a rule that draws
 * in, then the label. It lands just before the title rises.
 */
export default function Eyebrow({ index, label, className = "" }: { index: string; label: string; className?: string }) {
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } })
                .from(el.querySelector("[data-eb-index]"), { yPercent: 110, duration: 0.7, ease: "expo.out" })
                .from(el.querySelector("[data-eb-rule]"), { scaleX: 0, duration: 0.9, ease: "expo.inOut" }, 0.05)
                .from(el.querySelector("[data-eb-label]"), { yPercent: 110, duration: 0.7, ease: "expo.out" }, 0.35);
        });
        return () => mm.revert();
    }, []);

    return (
        <p ref={ref} className={`mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] sm:text-xs ${className}`}>
            <span className="overflow-hidden">
                <span data-eb-index className="block text-cobalt-hi">
                    {index}
                </span>
            </span>
            <span data-eb-rule className="h-px w-10 origin-left bg-primary" />
            <span className="overflow-hidden">
                <span data-eb-label className="block text-accent/80">
                    {label}
                </span>
            </span>
        </p>
    );
}
