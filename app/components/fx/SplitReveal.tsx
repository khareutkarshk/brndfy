"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Tag = "h1" | "h2" | "h3" | "p" | "div";

/**
 * Headline that rises line by line out of a mask when it scrolls into view.
 * Used for every section title so each chapter "opens" the same way.
 */
export default function SplitReveal({
    as: Tag = "h2",
    children,
    className = "",
    delay = 0,
    start = "top 85%",
}: {
    as?: Tag;
    children: React.ReactNode;
    className?: string;
    delay?: number;
    start?: string;
}) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            let split: SplitText | undefined;
            // Wait for webfonts so line breaks are measured with the real metrics
            document.fonts.ready.then(() => {
                if (!el.isConnected) return;
                split = SplitText.create(el, {
                    type: "lines",
                    mask: "lines",
                    linesClass: "pb-[0.08em]",
                    autoSplit: true,
                    onSplit(self) {
                        return gsap.from(self.lines, {
                            yPercent: 110,
                            rotate: 2,
                            duration: 1.1,
                            ease: "expo.out",
                            stagger: 0.09,
                            delay,
                            scrollTrigger: { trigger: el, start, once: true },
                        });
                    },
                });
            });
            return () => split?.revert();
        });
        return () => mm.revert();
    }, [delay, start]);

    return (
        <Tag ref={ref as React.Ref<never>} className={className}>
            {children}
        </Tag>
    );
}
