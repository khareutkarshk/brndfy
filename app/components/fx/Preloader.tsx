"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import BrndfyMark from "./BrndfyMark";
import { finishIntro, onModelReady } from "./intro";
import { getLenis } from "./SmoothScroll";

const SEEN_KEY = "brndfy-intro-seen";

/**
 * Opening curtain for the home page: the two halves of the mark meet,
 * a counter runs to 100 while the 3D model loads, then the curtain lifts.
 * Plays once per session and never for reduced-motion users.
 */
export default function Preloader() {
    const root = useRef<HTMLDivElement>(null);
    const count = useRef<HTMLSpanElement>(null);
    const [gone, setGone] = useState(false);

    useEffect(() => {
        let seen = false;
        try {
            seen = sessionStorage.getItem(SEEN_KEY) === "1";
        } catch {}
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (seen || reduce) {
            if (root.current) root.current.style.display = "none";
            finishIntro();
            return;
        }

        // Lenis is created by the layout, whose effect runs after this one
        const lock = requestAnimationFrame(() => getLenis()?.stop());
        window.scrollTo(0, 0);
        const el = root.current!;
        const counter = { v: 0 };
        let loaded = false;
        const unsubscribe = onModelReady(() => (loaded = true));

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.from("[data-mark='d']", { xPercent: -60, opacity: 0, duration: 0.9, ease: "expo.out" }, 0)
                .from("[data-mark='o']", { xPercent: 60, opacity: 0, duration: 0.9, ease: "expo.out" }, 0.08)
                .from("[data-pre-word]", { yPercent: 120, duration: 0.8, ease: "expo.out", stagger: 0.06 }, 0.2)
                .to(counter, {
                    v: 86,
                    duration: 1.1,
                    ease: "power2.inOut",
                    onUpdate: () => {
                        if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
                    },
                }, 0.1);

            // Hold at 86 until the model is in (or 3s have passed), then finish
            const started = performance.now();
            const finish = () => {
                gsap.timeline({
                    onComplete: () => {
                        try {
                            sessionStorage.setItem(SEEN_KEY, "1");
                        } catch {}
                        getLenis()?.start();
                        setGone(true);
                    },
                })
                    .to(counter, {
                        v: 100,
                        duration: 0.35,
                        ease: "power1.out",
                        onUpdate: () => {
                            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
                        },
                    })
                    .to("[data-pre-inner]", { yPercent: -18, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.1")
                    .to(el, {
                        clipPath: "inset(0% 0% 100% 0%)",
                        duration: 1,
                        ease: "expo.inOut",
                        onStart: () => {
                            gsap.delayedCall(0.35, finishIntro);
                        },
                    }, "-=0.25");
            };
            const wait = () => {
                if (loaded || performance.now() - started > 3000) finish();
                else gsap.delayedCall(0.1, wait);
            };
            tl.call(wait);
        }, el);

        return () => {
            cancelAnimationFrame(lock);
            unsubscribe();
            ctx.revert();
            getLenis()?.start();
        };
    }, []);

    if (gone) return null;

    return (
        <div
            ref={root}
            className="fixed inset-0 z-[90] flex flex-col bg-ink text-paper"
            style={{ clipPath: "inset(0% 0% 0% 0%)" }}
            aria-hidden
        >
            <div data-pre-inner className="flex flex-1 flex-col items-center justify-center gap-8">
                <BrndfyMark className="h-24 w-auto text-primary sm:h-28" />
                <div className="flex gap-[0.35em] overflow-hidden font-display text-sm font-medium uppercase tracking-[0.3em] text-paper/80">
                    <span data-pre-word className="inline-block">Brands</span>
                    <span data-pre-word className="inline-block text-primary">+</span>
                    <span data-pre-word className="inline-block">Creators</span>
                </div>
            </div>
            <div data-pre-inner className="flex items-end justify-between px-6 pb-6 font-mono text-xs text-mute sm:px-10 sm:pb-8">
                <span>Brndfy Media</span>
                <span ref={count} className="font-display text-5xl font-light text-paper tabular-nums sm:text-7xl">000</span>
            </div>
        </div>
    );
}
