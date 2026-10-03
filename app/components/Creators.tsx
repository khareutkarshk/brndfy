"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, InstagramLogo, YoutubeLogo, HandGrabbing } from "@phosphor-icons/react";
import SplitReveal from "./fx/SplitReveal";
import VideoLightbox from "./fx/VideoLightbox";
import { CREATORS, RISING_CREATORS, type Creator } from "@/app/data/creators";
import type { Reel } from "@/app/data/influencerWork";

gsap.registerPlugin(ScrollTrigger);

const STEP = 360 / CREATORS.length;

function CreatorDetail({ creator }: { creator: Creator }) {
    return (
        <div className="flex flex-col items-center text-center">
            <p className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-medium leading-none tracking-[-0.03em] text-paper">{creator.name}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-mute">
                {creator.ig && (
                    <span className="inline-flex items-center gap-1.5">
                        <InstagramLogo weight="fill" className="size-4 text-paper" />
                        <span className="font-mono text-paper">{creator.ig}</span>
                    </span>
                )}
                {creator.yt && (
                    <span className="inline-flex items-center gap-1.5">
                        <YoutubeLogo weight="fill" className="size-4 text-paper" />
                        <span className="font-mono text-paper">{creator.yt}</span>
                    </span>
                )}
                <span>{creator.niches.join(", ")}</span>
            </div>
            <a
                href={creator.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-4 py-2 text-sm text-paper transition-colors hover:border-paper/60"
            >
                @{creator.handle}
                <ArrowUpRight weight="bold" className="size-3.5" />
            </a>
        </div>
    );
}

/**
 * Chapter five. The roster on a 3D ring: scroll turns it, dragging spins it,
 * and whoever faces front gets the spotlight.
 */
const Creators = () => {
    const root = useRef<HTMLElement>(null);
    const ring = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [playing, setPlaying] = useState<{ reel: Reel; brand: string } | null>(null);
    const close = useCallback(() => setPlaying(null), []);

    useEffect(() => {
        const el = root.current;
        const ringEl = ring.current;
        if (!el || !ringEl) return;
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>("[data-ring-card]", ringEl);
            const shades = cards.map((c) => c.querySelector<HTMLElement>("[data-shade]")!);
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const rot = { scroll: 0, drag: 0 };
            let last = -1;

            const render = () => {
                const total = rot.scroll + rot.drag;
                ringEl.style.transform = `translateZ(-560px) rotateY(${total}deg)`;
                cards.forEach((_, i) => {
                    // Angle of this card relative to the viewer, folded into -180..180
                    const a = ((((i * STEP + total) % 360) + 540) % 360) - 180;
                    shades[i].style.opacity = String(Math.min(Math.abs(a) / 110, 0.85));
                });
                const front = ((Math.round(-total / STEP) % CREATORS.length) + CREATORS.length) % CREATORS.length;
                if (front !== last) {
                    last = front;
                    setActive(front);
                }
            };
            render();

            const st = reduce
                ? null
                : gsap.to(rot, {
                      scroll: -STEP * (CREATORS.length - 1),
                      ease: "none",
                      onUpdate: render,
                      scrollTrigger: {
                          trigger: el,
                          start: "top top",
                          end: "+=260%",
                          pin: true,
                          scrub: 0.8,
                          // Always come to rest with one creator facing front
                          snap: { snapTo: 1 / (CREATORS.length - 1), duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" },
                      },
                  });

            // Drag to spin, then settle on the nearest card
            let down = false;
            let startX = 0;
            let startDrag = 0;
            const stage = el.querySelector<HTMLElement>("[data-ring-stage]")!;
            const onDown = (e: PointerEvent) => {
                down = true;
                startX = e.clientX;
                startDrag = rot.drag;
                gsap.killTweensOf(rot, "drag");
                stage.setPointerCapture(e.pointerId);
                stage.style.cursor = "grabbing";
            };
            const onMove = (e: PointerEvent) => {
                if (!down) return;
                rot.drag = startDrag + (e.clientX - startX) * 0.25;
                render();
            };
            const onUp = () => {
                if (!down) return;
                down = false;
                stage.style.cursor = "";
                const total = rot.scroll + rot.drag;
                const snapped = Math.round(total / STEP) * STEP;
                gsap.to(rot, { drag: rot.drag + (snapped - total), duration: 0.8, ease: "expo.out", onUpdate: render });
            };
            stage.addEventListener("pointerdown", onDown);
            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);

            return () => {
                st?.scrollTrigger?.kill();
                st?.kill();
                stage.removeEventListener("pointerdown", onDown);
                window.removeEventListener("pointermove", onMove);
                window.removeEventListener("pointerup", onUp);
                ringEl.style.transform = "";
            };
        });

        return () => mm.revert();
    }, []);

    return (
        <section id="creators" className="relative overflow-hidden bg-ink">
            {/* Desktop: pinned ring */}
            <div ref={root as React.Ref<HTMLDivElement>} className="relative hidden h-[100dvh] min-h-[720px] flex-col lg:flex">
                <div className="pointer-events-none absolute left-1/2 top-[48%] h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/20 blur-[120px]" />

                <div className="relative z-10 mx-auto w-full max-w-[1400px] px-16 pt-28">
                    <h2 className="max-w-[16ch] font-display text-[clamp(2.2rem,4.2vw,4rem)] font-light leading-[1.04] tracking-[-0.035em] text-paper">
                        The creators behind <span className="font-semibold">the numbers.</span>
                    </h2>
                </div>

                <div data-ring-stage className="relative flex-1 cursor-grab touch-pan-y select-none" style={{ perspective: "1700px" }}>
                    <div ref={ring} className="absolute left-1/2 top-[44%] h-0 w-0" style={{ transformStyle: "preserve-3d", transform: "translateZ(-560px)" }}>
                        {CREATORS.map((c, i) => (
                            <div
                                key={c.name}
                                data-ring-card
                                className="absolute -left-[105px] -top-[140px] h-[280px] w-[210px] overflow-hidden rounded-[20px] bg-ink-2 ring-1 ring-line"
                                style={{ transform: `rotateY(${i * STEP}deg) translateZ(560px)`, backfaceVisibility: "hidden" }}
                            >
                                <Image src={c.photo} alt={c.name} fill sizes="210px" className="pointer-events-none object-cover" draggable={false} />
                                <div data-shade className="absolute inset-0 bg-ink" style={{ opacity: 0.85 }} />
                            </div>
                        ))}
                    </div>

                    <div className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <CreatorDetail creator={CREATORS[active]} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <p className="absolute bottom-10 right-16 z-10 inline-flex items-center gap-2 text-xs text-mute">
                        <HandGrabbing className="size-4" /> Drag to spin
                    </p>
                </div>
            </div>

            {/* Mobile and tablet: swipe row */}
            <div className="px-4 pt-24 sm:px-10 lg:hidden">
                <SplitReveal className="max-w-[16ch] font-display text-[clamp(2rem,7vw,3rem)] font-light leading-[1.05] tracking-[-0.035em] text-paper">
                    The creators behind <span className="font-semibold">the numbers.</span>
                </SplitReveal>
                <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-10 sm:px-10">
                    {CREATORS.map((c) => (
                        <a key={c.name} href={c.instagram} target="_blank" rel="noopener noreferrer" className="w-[62vw] max-w-[15rem] shrink-0 snap-center">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
                                <Image src={c.photo} alt={c.name} fill sizes="240px" className="object-cover" />
                            </div>
                            <p className="mt-3 font-display text-base font-medium text-paper">{c.name}</p>
                            <p className="mt-1 font-mono text-xs text-mute">
                                {[c.ig && `IG ${c.ig}`, c.yt && `YT ${c.yt}`].filter(Boolean).join("  /  ")}
                            </p>
                            <p className="mt-1 text-xs text-mute">{c.niches.join(", ")}</p>
                        </a>
                    ))}
                </div>
            </div>

            {/* On the rise: repeat partners */}
            <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-24 sm:px-10 lg:px-16 lg:pb-32 lg:pt-16">
                <SplitReveal className="max-w-[22ch] font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.08] tracking-[-0.03em] text-paper">
                    Creators on the rise. <span className="font-semibold">Ten brand deals each.</span>
                </SplitReveal>
                <div className="mt-12 grid gap-3 lg:grid-cols-2">
                    {RISING_CREATORS.map((rc, ri) => (
                        <motion.div
                            key={rc.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.9, delay: ri * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-[88px_1fr] gap-5 rounded-[28px] border border-line bg-ink-2 p-5 sm:grid-cols-[180px_1fr] sm:gap-6 sm:p-6"
                        >
                            <div className="relative aspect-square self-start overflow-hidden rounded-[20px] sm:aspect-[3/4]">
                                <Image src={rc.photo} alt={rc.name} fill sizes="(max-width: 640px) 88px, 180px" className="object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="font-display text-xl font-medium text-paper">{rc.name}</p>
                                        <a href={rc.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-mute hover:text-paper">
                                            View profile
                                        </a>
                                    </div>
                                    <p className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-cobalt-hi sm:text-5xl">{rc.deals.length}</p>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">
                                    {rc.deals.map((d) => (
                                        <button
                                            key={d.brand}
                                            onClick={() => setPlaying({ reel: { creator: rc.name, profile: rc.instagram, url: d.url }, brand: d.brand })}
                                            className="rounded-full border border-line px-3 py-1.5 text-xs text-paper/85 transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
                                        >
                                            {d.brand}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <VideoLightbox reel={playing?.reel ?? null} brand={playing?.brand} onClose={close} />
        </section>
    );
};

export default Creators;
