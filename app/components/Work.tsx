"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InstagramLogo, Play, YoutubeLogo, ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import SplitReveal from "./fx/SplitReveal";
import Eyebrow from "./fx/Eyebrow";
import Odometer from "./fx/Odometer";
import VideoLightbox from "./fx/VideoLightbox";
import { scrollToTarget } from "./fx/SmoothScroll";
import { CREATOR_PHOTOS } from "@/app/data/creators";
import {
    INFLUENCER_CASES,
    isVertical,
    platformOf,
    youtubeThumb,
    type Cohort,
    type InfluencerCase,
    type Reel,
} from "@/app/data/influencerWork";
import { div } from "three/src/nodes/tsl/TSLBase.js";

gsap.registerPlugin(ScrollTrigger);

// ─── Reel tile ────────────────────────────────────────────────────────────────

const initials = (name: string) =>
    name
        .replace(/[^A-Za-z ]/g, "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase();

function ReelTile({ reel, index, onOpen }: { reel: Reel; index: number; onOpen: (r: Reel) => void }) {
    const live = Boolean(reel.url);
    const platform = live ? platformOf(reel.url) : "youtube";
    const vertical = live ? isVertical(reel.url) : false;
    const thumb = live && platform === "youtube" ? youtubeThumb(reel.url) : null;
    const portrait = CREATOR_PHOTOS[reel.creator];
    const PlatformIcon = platform === "youtube" ? YoutubeLogo : InstagramLogo;

    return (
        <div className={`shrink-0 snap-start ${vertical ? "w-[9.5rem] sm:w-[10.5rem]" : "w-[15rem] sm:w-[17rem]"}`}>
            <button
                type="button"
                disabled={!live}
                onClick={() => live && onOpen(reel)}
                aria-label={live ? `Play ${reel.creator}'s video` : `${reel.creator}: video going live soon`}
                className={`group relative block w-full overflow-hidden rounded-[20px] ${
                    vertical ? "aspect-[9/16]" : "aspect-video"
                } ${live ? "cursor-pointer" : "cursor-not-allowed border border-dashed border-paper/20"}`}
            >
                {thumb ? (
                    <Image src={thumb} alt="" fill sizes="280px" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
                ) : portrait ? (
                    <Image src={portrait} alt="" fill sizes="170px" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
                ) : live ? (
                    <div
                        className="absolute inset-0 grid place-items-center"
                        style={{
                            background: `linear-gradient(${150 + index * 37}deg, #1744FF 0%, #0D1350 55%, #05061A 100%)`,
                        }}
                    >
                        <span className="font-display text-4xl font-semibold tracking-tight text-white/90">{initials(reel.creator)}</span>
                    </div>
                ) : (
                    <div className="absolute inset-0 grid place-items-center bg-ink-2 px-4 text-center">
                        <span className="text-xs leading-snug text-mute">Going live soon</span>
                    </div>
                )}

                {live && (
                    <>
                        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
                        <span className="absolute left-3 top-3 grid size-7 place-items-center rounded-full bg-ink/60 text-paper backdrop-blur">
                            <PlatformIcon weight="fill" className="size-3.5" />
                        </span>
                        <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-paper text-ink transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                            <Play weight="fill" className="size-4 translate-x-px" />
                        </span>
                    </>
                )}
            </button>
            <div className="mt-2.5 flex items-baseline justify-between gap-2 px-1">
                <a
                    href={reel.profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-sm text-paper underline-offset-4 hover:underline"
                >
                    {reel.creator}
                </a>
                {reel.views && <span className="shrink-0 font-mono text-[11px] text-mute">{reel.views}</span>}
            </div>
        </div>
    );
}

// ─── Cohort chart (Vyapar) ───────────────────────────────────────────────────

function CohortChart({ cohorts }: { cohorts: Cohort[] }) {
    const reduce = useReducedMotion();
    const max = Math.max(...cohorts.map((c) => c.leads));
    return (
        <div className="rounded-[28px] border border-line bg-ink-2/60 p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-lg font-medium text-paper">Leads per cohort</p>
                <p className="text-xs text-mute">May to August</p>
            </div>
            <div className="mt-8 grid h-56 grid-cols-4 items-end gap-3 sm:gap-6">
                {cohorts.map((c, i) => (
                    <div key={c.name} className="flex h-full flex-col justify-end">
                        <p className="mb-2 font-mono text-xs text-paper sm:text-sm">{c.leads.toLocaleString("en-IN")}+</p>
                        <motion.div
                            className="origin-bottom rounded-t-[14px] bg-linear-to-t from-primary to-cobalt-hi"
                            style={{ height: `${(c.leads / max) * 78}%` }}
                            initial={reduce ? false : { scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <div className="mt-3">
                            <p className="text-sm text-paper">{c.month}</p>
                            <p className="mt-0.5 text-[11px] leading-snug text-mute">
                                {c.creators} creators
                                <br className="sm:hidden" /> <span className="hidden sm:inline">/ </span>
                                {c.views} views
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Case cover ──────────────────────────────────────────────────────────────

/**
 * The views figure as a meter: outlined at rest, then filled left to right
 * as the case scrolls into view.
 */
function ViewsMeter({ value }: { value: string }) {
    const fill = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = fill.current;
        if (!el) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(
                el,
                { clipPath: "inset(0 100% 0 0)" },
                {
                    clipPath: "inset(0 0% 0 0)",
                    ease: "none",
                    scrollTrigger: { trigger: el, start: "top 90%", end: "top 45%", scrub: 0.6 },
                },
            );
        });
        return () => mm.revert();
    }, []);

    const type = "font-display text-[clamp(4.5rem,13vw,10rem)] font-semibold leading-[0.85] tracking-[-0.055em]";
    return (
        <span className="relative inline-block">
            <span aria-hidden className={`text-outline ${type}`}>{value}</span>
            <span ref={fill} className={`absolute inset-0 bg-linear-to-r from-paper via-paper to-cobalt-hi bg-clip-text text-transparent ${type}`}>
                {value}
            </span>
        </span>
    );
}

/** Faces of the creators on a case, portraits where we have them */
function CreatorStack({ reels }: { reels: Reel[] }) {
    const names = [...new Set(reels.map((r) => r.creator))];
    const shown = names.slice(0, 5);
    return (
        <div className="flex items-center">
            <div className="flex -space-x-3">
                {shown.map((n, i) => {
                    const photo = CREATOR_PHOTOS[n];
                    return (
                        <div
                            key={n}
                            title={n}
                            className="relative grid size-11 place-items-center overflow-hidden rounded-full ring-[3px] ring-ink-2 sm:size-12"
                            style={photo ? undefined : { background: `linear-gradient(${150 + i * 37}deg, #1744FF, #0D1350)` }}
                        >
                            {photo ? (
                                <Image src={photo} alt={n} fill sizes="48px" className="object-cover" />
                            ) : (
                                <span className="font-display text-xs font-semibold text-white">{initials(n)}</span>
                            )}
                        </div>
                    );
                })}
            </div>
            {names.length > shown.length && (
                <span className="ml-2 grid size-11 place-items-center rounded-full border border-dashed border-paper/25 font-mono text-[11px] text-paper sm:size-12">
                    +{names.length - shown.length}
                </span>
            )}
        </div>
    );
}

// ─── Case article ─────────────────────────────────────────────────────────────

function CaseArticle({
    study,
    index,
    total,
    onOpen,
}: {
    study: InfluencerCase;
    index: number;
    total: number;
    onOpen: (r: Reel, brand: string) => void;
}) {
    const reduce = useReducedMotion();
    // Every case leads with creators and total views; the rest are outcomes
    const liveReels = study.reels.filter((r) => r.url).length;
    const [creators, ...restStats] = study.stats;
    const views = restStats.find((s) => /views/i.test(s.label));
    const outcomes = restStats.filter((s) => s !== views);
    const rail = useRef<HTMLDivElement>(null);
    const nudge = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });
    const groups = study.reels.reduce<{ label?: string; reels: Reel[] }[]>((acc, r) => {
        const last = acc[acc.length - 1];
        if (last && last.label === r.group) last.reels.push(r);
        else acc.push({ label: r.group, reels: [r] });
        return acc;
    }, []);

    return (
        <article id={`case-${study.slug}`} data-case className="scroll-mt-28 py-10 first:pt-0 lg:py-14">
            {/* Mobile identity (desktop shows it in the sticky index) */}
            <div className="mb-8 flex items-center gap-4 lg:hidden">
                <div className="relative size-14 overflow-hidden rounded-full bg-white">
                    <Image src={study.logo} alt={study.brand} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                    <p className="font-display text-lg font-medium text-paper">{study.brand}</p>
                    <p className="text-sm text-mute">{study.category}</p>
                </div>
            </div>

            {/* Cover: the result, front and centre */}
            <div
                className={`relative isolate overflow-hidden rounded-[28px] p-6 sm:p-10 ${
                    index % 2 ? "bg-secondary" : "border border-line bg-ink-2"
                }`}
            >
                <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[28rem] rounded-full bg-primary/25 blur-[110px]" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
                    <span className="text-cobalt-hi">
                        Case {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    {/* Phones already show the category beside the logo */}
                    <span className="hidden h-px w-8 bg-paper/20 lg:block" />
                    <span className="hidden text-mute lg:inline">{study.category}</span>
                    <div className="flex flex-wrap gap-2 normal-case tracking-normal sm:ml-auto">
                        {study.tags.map((t) => (
                            <span key={t} className="rounded-full border border-paper/15 px-3 py-1 font-sans text-xs text-paper/75">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <SplitReveal
                    as="h3"
                    className="mt-6 max-w-[18ch] font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.03em] text-paper"
                >
                    {study.tagline}
                </SplitReveal>
                <p className="mt-4 max-w-[52ch] text-mute">{study.headline}</p>

                <div className="mt-10 grid gap-8 sm:mt-14 xl:grid-cols-[1fr_auto] xl:items-end">
                    {views && (
                        <div>
                            <ViewsMeter value={views.value} />
                            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{views.label}</p>
                        </div>
                    )}
                    <div className="flex flex-col gap-6 xl:items-end xl:text-right">
                        <div className="flex items-center gap-4 xl:flex-row-reverse">
                            <CreatorStack reels={study.reels} />
                            <div>
                                <p className="font-display text-[clamp(2rem,2.5vw,3rem)] font-semibold leading-none tracking-[-0.03em] text-paper">{creators.value}</p>
                                <p className="mt-1 text-xs text-mute">{creators.label}</p>
                            </div>
                        </div>
                        {outcomes.length > 0 && (
                            <div className="flex gap-8 border-t border-paper/10 pt-5 xl:justify-end">
                                {outcomes.map((o) => (
                                    <div key={o.label}>
                                        <Odometer value={o.value} className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-semibold tracking-[-0.03em] text-paper" />
                                        <p className="mt-1 text-xs text-mute">{o.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* The ask, then our move */}
            <div className="relative mt-4 grid gap-4 md:grid-cols-2">
                {[
                    { n: "01", label: "The ask", body: study.brief, tone: "border border-line" },
                    { n: "02", label: "Our move", body: study.whatWeDid, tone: "border border-primary/35 bg-primary/[0.07]" },
                ].map((b, i) => (
                    <motion.div
                        key={b.label}
                        initial={reduce ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`rounded-[24px] p-6 sm:p-8 ${b.tone}`}
                    >
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em]">
                            <span className="text-cobalt-hi">{b.n}</span> <span className="text-paper">{b.label}</span>
                        </p>
                        <p className="mt-4 leading-relaxed text-mute">{b.body}</p>
                    </motion.div>
                ))}
                <span className="absolute left-1/2 top-1/2 hidden size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-white ring-[6px] ring-ink md:grid">
                    <ArrowRight weight="bold" className="size-4" />
                </span>
            </div>

            {study.cohorts && (
                <div className="mt-12">
                    <CohortChart cohorts={study.cohorts} />
                </div>
            )}

            {liveReels > 0 && (
                <div className="mt-14">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="font-display text-sm font-medium text-paper">Work highlights</p>
                            <p className="mt-1 text-xs text-mute">
                                {liveReels} {liveReels === 1 ? "video" : "videos"}, tap to play
                            </p>
                        </div>
                        <div className="hidden gap-2 sm:flex">
                            <button onClick={() => nudge(-1)} aria-label="Scroll videos left" className="grid size-10 place-items-center rounded-full border border-paper/20 text-paper transition-colors hover:border-paper/60 active:scale-95">
                                <ArrowLeft weight="bold" className="size-4" />
                            </button>
                            <button onClick={() => nudge(1)} aria-label="Scroll videos right" className="grid size-10 place-items-center rounded-full border border-paper/20 text-paper transition-colors hover:border-paper/60 active:scale-95">
                                <ArrowRight weight="bold" className="size-4" />
                            </button>
                        </div>
                    </div>
                    <div
                        ref={rail}
                        className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 lg:mask-[linear-gradient(to_right,black_88%,transparent)]"
                    >
                        {groups.map((g, gi) => (
                            <div key={gi} className="flex shrink-0 gap-3">
                                {g.label && (
                                    <div className="flex w-8 shrink-0 items-start justify-center pt-2">
                                        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent [writing-mode:vertical-rl]">{g.label}</span>
                                    </div>
                                )}
                                {g.reels.map((r, i) => (
                                    <ReelTile key={`${r.creator}-${i}`} reel={r} index={gi * 5 + i} onOpen={(reel) => onOpen(reel, study.brand)} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}



// ─── Section ─────────────────────────────────────────────────────────────────

/** The influencer half of /case-studies; `other` links across to the campus half */
const Work = ({
    id = "influencer-marketing",
    index = "02",
    label = "Influencer marketing",
    other = { id: "college-activations", label: "College activations" },
}: {
    id?: string;
    index?: string;
    label?: string;
    other?: { id: string; label: string };
}) => {
    const root = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0);
    const [playing, setPlaying] = useState<{ reel: Reel; brand: string } | null>(null);
    const close = useCallback(() => setPlaying(null), []);

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>("[data-case]").forEach((article, i) => {
                ScrollTrigger.create({
                    trigger: article,
                    start: "top 55%",
                    end: "bottom 55%",
                    onToggle: (self) => self.isActive && setActive(i),
                });
            });
        }, el);
        return () => ctx.revert();
    }, []);

    const current = INFLUENCER_CASES[active];

    return (
        <section ref={root} id={id} className="relative px-4 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div data-recede className="mx-auto max-w-[1400px]">
                <div className="max-w-[1100px]">
                    <Eyebrow index={index} label={label} />
                    <SplitReveal className="chapter-title max-w-[22ch]">
                        Six brands. Six briefs. <span className="font-semibold text-cobalt-hi">Creators that delivered.</span>
                    </SplitReveal>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
                    {/* Sticky index */}
                    <aside className="hidden lg:col-span-4 lg:block">
                        <div className="sticky top-28 flex flex-col gap-10">
                            <div className="relative aspect-square w-40 overflow-hidden rounded-full bg-white shadow-[0_30px_80px_-20px_rgba(23,68,255,0.55)]">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.div
                                        key={current.slug}
                                        className="absolute inset-0"
                                        initial={{ opacity: 0, scale: 0.7, rotate: -25 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 1.2, rotate: 25 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 22 }}
                                    >
                                        <Image src={current.logo} alt={current.brand} fill sizes="160px" className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <nav aria-label="Case studies" className="flex flex-col">
                                {INFLUENCER_CASES.map((c, i) => {
                                    const on = i === active;
                                    return (
                                        <button
                                            key={c.slug}
                                            onClick={() => scrollToTarget(`case-${c.slug}`)}
                                            className="group relative flex items-center gap-4 py-3 text-left"
                                        >
                                            <span className="relative h-px w-8 overflow-hidden bg-paper/15">
                                                <span
                                                    className={`absolute inset-0 origin-left bg-primary transition-transform duration-700 ease-out-expo ${on ? "scale-x-100" : "scale-x-0"}`}
                                                />
                                            </span>
                                            <span
                                                className={`font-display text-lg tracking-[-0.01em] transition-colors duration-300 ${
                                                    on ? "font-medium text-paper" : "text-mute group-hover:text-paper"
                                                }`}
                                            >
                                                {c.brand}
                                            </span>
                                        </button>
                                    );
                                })}
                            </nav>

                            <button onClick={() => scrollToTarget(other.id)} className="group inline-flex items-center gap-2 text-left text-sm text-mute transition-colors hover:text-paper">
                                {other.label}
                                <ArrowRight weight="bold" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </aside>

                    <div className="lg:col-span-8">
                        {INFLUENCER_CASES.map((study, i) => (
                            <CaseArticle key={study.slug} study={study} index={i} total={INFLUENCER_CASES.length} onOpen={(reel, brand) => setPlaying({ reel, brand })} />
                        ))}
                        <button onClick={() => scrollToTarget(other.id)} className="group mt-4 inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-paper lg:hidden">
                            {other.label}
                            <ArrowRight weight="bold" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>

            <VideoLightbox reel={playing?.reel ?? null} brand={playing?.brand} onClose={close} />
        </section>
    );
};

export default Work;
