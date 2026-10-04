"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, InstagramLogo, YoutubeLogo, HandGrabbing, Play } from "@phosphor-icons/react";
import SplitReveal from "./fx/SplitReveal";
import Eyebrow from "./fx/Eyebrow";
import VideoLightbox from "./fx/VideoLightbox";
import { CREATORS, RISING_CREATORS, type Creator, type RisingCreator } from "@/app/data/creators";
import type { Reel } from "@/app/data/influencerWork";

gsap.registerPlugin(ScrollTrigger);

const STEP = 360 / CREATORS.length;

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
const countWord = (n: number) => WORDS[n] ?? String(n);

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
 * The creator becomes the Brndfy mark: their portrait fills the circle and
 * the B bowl above it carries their deal count. Proportions follow the mark's
 * 1340 x 1920 geometry in BrndfyMark.
 */
function CreatorMark({ creator, className = "w-[104px] sm:w-[168px]" }: { creator: RisingCreator; className?: string }) {
    return (
        <div className={`relative aspect-[1340/1920] shrink-0 ${className}`}>
            <div className="absolute inset-x-0 top-0 flex h-1/2 flex-col justify-center rounded-l-[6px] rounded-r-full bg-primary pl-[9%] text-white">
                <span className="font-display text-[2.2rem] font-semibold leading-none tracking-[-0.05em] sm:text-[3.6rem] lg:text-[4.3rem]">{creator.deals.length}</span>
                <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/75 sm:text-[10px] lg:text-[11px]">Brand deals</span>
            </div>
            <div className="absolute left-[26.1%] top-[51%] aspect-square w-[70.2%] overflow-hidden rounded-full ring-1 ring-line">
                <Image src={creator.photo} alt={creator.name} fill sizes="(max-width: 640px) 74px, 141px" className="object-cover" />
            </div>
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
        <section id="creators" className="relative overflow-hidden">
            {/* Desktop: pinned ring */}
            <div ref={root as React.Ref<HTMLDivElement>} className="relative hidden h-[100dvh] min-h-[720px] flex-col lg:flex">
                {/* Stage lighting: a cool spotlight from above, a dot grid that fades out from the ring, darker edges */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_32%_75%_at_50%_0%,rgba(176,215,249,0.13),transparent_70%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(176,215,249,0.16)_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(ellipse_45%_40%_at_50%_62%,black,transparent)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_55%,transparent_45%,rgba(5,6,26,0.75))]" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1400px] px-16 pt-24">
                    <Eyebrow index="05" label="The creators" />
                    <h2 className="chapter-title max-w-[16ch]">
                        The creators behind <span className="font-semibold">the numbers.</span>
                    </h2>
                </div>

                <div data-ring-stage className="relative flex-1 cursor-grab touch-pan-y select-none" style={{ perspective: "1700px" }}>
                    {/* The ring's floor: radius 560 seen at perspective 1700 projects to roughly 840 x 56 just under the cards */}
                    <div aria-hidden className="pointer-events-none absolute left-1/2 top-[40%]">
                        <div className="absolute left-0 top-[78px] h-[90px] w-[420px] -translate-x-1/2 rounded-[100%] bg-primary/40 blur-[50px]" />
                        <div className="absolute left-0 top-[84px] h-[60px] w-[860px] -translate-x-1/2 rounded-[100%] border border-accent/15" />
                        <div className="absolute left-0 top-[139px] h-px w-[260px] -translate-x-1/2 bg-linear-to-r from-transparent via-accent/60 to-transparent" />
                    </div>

                    <div ref={ring} className="absolute left-1/2 top-[40%] h-0 w-0" style={{ transformStyle: "preserve-3d", transform: "translateZ(-560px)" }}>
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

                    <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center">
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
                <Eyebrow index="05" label="The creators" />
                <SplitReveal className="chapter-title max-w-[16ch]">
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

            {/* On the rise: repeat partners, one full-width spotlight each */}
            <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-20 sm:px-10 lg:px-16 lg:pb-28 lg:pt-16">
                <SplitReveal className="max-w-[22ch] font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.08] tracking-[-0.03em] text-paper">
                    {RISING_CREATORS.length === 1 ? "A creator on the rise." : "Creators on the rise."}{" "}
                    <span className="font-semibold">{countWord(RISING_CREATORS[0].deals.length)} brand deals and counting.</span>
                </SplitReveal>
                <div className="mt-12 flex flex-col gap-3">
                    {RISING_CREATORS.map((rc, ri) => (
                        <motion.div
                            key={rc.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.9, delay: ri * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group/card relative isolate grid gap-8 overflow-hidden rounded-l-[28px] rounded-r-[56px] border border-line bg-ink-2 p-5 sm:rounded-r-[96px] sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10 lg:pr-16"
                        >
                            <div className="pointer-events-none absolute -left-32 -top-32 -z-10 size-[26rem] rounded-full bg-primary/20 blur-[110px]" />
                            <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 size-96 rounded-full bg-primary/10 blur-[110px] transition-opacity duration-700 group-hover/card:opacity-100 sm:opacity-60" />

                            {/* The creator */}
                            <div className="flex items-end gap-5 sm:gap-7 lg:col-span-5 lg:flex-col lg:items-start lg:justify-between lg:border-r lg:border-line lg:pr-12">
                                <CreatorMark creator={rc} className="w-[104px] sm:w-[168px] lg:w-[200px]" />
                                <div className="min-w-0 pb-1">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-hi">Repeat partner {String(ri + 1).padStart(2, "0")}</p>
                                    <p className="mt-2 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-paper">{rc.name}</p>
                                    <p className="mt-3 hidden max-w-[34ch] text-sm leading-relaxed text-mute lg:block">
                                        {rc.deals.length} brands, from ed-tech to universities, chose to work with {rc.name.split(" ")[0]} through us.
                                    </p>
                                    <a
                                        href={rc.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3.5 py-1.5 text-xs text-paper transition-colors hover:border-paper/60"
                                    >
                                        <InstagramLogo weight="fill" className="size-3.5" /> View profile
                                        <ArrowUpRight weight="bold" className="size-3" />
                                    </a>
                                </div>
                            </div>

                            {/* Deal ledger: each deal is a tile cut like the B bowl, numbered, tap to watch */}
                            <div className="lg:col-span-7">
                                <div className="hairline lg:hidden" />
                                <div className="mt-5 flex items-baseline justify-between gap-4 lg:mt-0">
                                    <p className="font-display text-sm font-medium text-paper">The deals</p>
                                    <p className="text-xs text-mute">Tap any brand to watch</p>
                                </div>
                                <ol className="mt-5 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:gap-3">
                                    {rc.deals.map((d, di) => (
                                        <li key={d.brand}>
                                            <button
                                                onClick={() => setPlaying({ reel: { creator: rc.name, profile: rc.instagram, url: d.url }, brand: d.brand })}
                                                className="group flex w-full items-center gap-3 rounded-l-[8px] rounded-r-full border border-line bg-ink/40 py-2 pl-3 pr-2 text-left transition-colors duration-300 hover:border-primary hover:bg-primary lg:py-3 lg:pl-4"
                                            >
                                                <span className="font-mono text-[10px] text-cobalt-hi transition-colors group-hover:text-white/70 lg:text-[11px]">{String(di + 1).padStart(2, "0")}</span>
                                                <span className="min-w-0 flex-1 truncate text-xs text-paper/85 group-hover:text-white lg:text-sm">{d.brand}</span>
                                                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-paper/10 text-paper transition-colors group-hover:bg-white group-hover:text-primary lg:size-8">
                                                    <Play weight="fill" className="size-2.5 translate-x-px lg:size-3" />
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ol>
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
