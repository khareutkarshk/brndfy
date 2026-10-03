"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Rolling-digit counter. Each digit is a 0-9 column that spins into place
 * when the number scrolls into view; non-digits render as-is.
 */
export default function Odometer({ value, className = "" }: { value: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const cols = el.querySelectorAll<HTMLElement>("[data-digit]");
            cols.forEach((col) => {
                const d = Number(col.dataset.digit);
                gsap.fromTo(
                    col,
                    { yPercent: 0 },
                    {
                        // Spin a full turn plus the target digit, later digits travel further
                        yPercent: -((10 + d) / 20) * 100,
                        duration: 1.6 + Number(col.dataset.index) * 0.18,
                        ease: "expo.out",
                        scrollTrigger: { trigger: el, start: "top 88%", once: true },
                    },
                );
            });
        });
        mm.add("(prefers-reduced-motion: reduce)", () => {
            el.querySelectorAll<HTMLElement>("[data-digit]").forEach((col) => {
                gsap.set(col, { yPercent: -((10 + Number(col.dataset.digit)) / 20) * 100 });
            });
        });
        return () => mm.revert();
    }, [value]);

    let digitIndex = 0;
    return (
        <span ref={ref} className={`inline-flex leading-none tabular-nums ${className}`} aria-label={value}>
            {value.split("").map((ch, i) =>
                /\d/.test(ch) ? (
                    <span key={i} className="relative inline-block h-[1em] overflow-hidden" aria-hidden>
                        <span data-digit={ch} data-index={digitIndex++} className="flex flex-col">
                            {Array.from({ length: 20 }, (_, n) => (
                                <span key={n} className="block h-[1em]">
                                    {n % 10}
                                </span>
                            ))}
                        </span>
                    </span>
                ) : (
                    <span key={i} aria-hidden>
                        {ch}
                    </span>
                ),
            )}
        </span>
    );
}
