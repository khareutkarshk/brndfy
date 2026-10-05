"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitReveal from "./fx/SplitReveal";
import Eyebrow from "./fx/Eyebrow";
import { MARK_D_PATH, MARK_VIEWBOX } from "./fx/BrndfyMark";
import { CREATORS } from "@/app/data/creators";

gsap.registerPlugin(ScrollTrigger);

// ─── Stage mark ───────────────────────────────────────────────────────────────

/**
 * The Brndfy mark as a watermark that assembles across the cycle: the B bowl
 * lights up at Find, the R leg at Plan, both outline at Run and both go
 * solid at Deliver, when B and R fuse into the full mark.
 */
const MARK_STATES: { d: "dim" | "lit" | "solid"; o: "dim" | "lit" | "solid" }[] = [
    { d: "lit", o: "dim" },
    { d: "dim", o: "lit" },
    { d: "lit", o: "lit" },
    { d: "solid", o: "solid" },
];

function StageMark({ stage, onBlue }: { stage: number; onBlue: boolean }) {
    const { d, o } = MARK_STATES[stage];
    const tone = onBlue ? "255,255,255" : "176,215,249";
    const paint = (state: "dim" | "lit" | "solid") => ({
        fill: state === "solid" ? `rgba(${tone},0.12)` : "none",
        stroke: `rgba(${tone},${state === "dim" ? 0.1 : 0.45})`,
        strokeWidth: 1.5,
        vectorEffect: "non-scaling-stroke" as const,
    });
    return (
        <svg
            viewBox={MARK_VIEWBOX}
            aria-hidden
            overflow="visible"
            className="pointer-events-none absolute -bottom-[18%] -left-[4%] -z-10 hidden h-[115%] w-auto select-none lg:block"
        >
            <path d={MARK_D_PATH} {...paint(d)} />
            <circle cx="820" cy="1450" r="470" {...paint(o)} />
        </svg>
    );
}

// ─── Per-service visuals ─────────────────────────────────────────────────────

function DiscoveryVisual() {
    const picks = new Set([3, 8, 10]);
    return (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3">
            {CREATORS.slice(0, 12).map((c, i) => (
                <div
                    key={c.name}
                    className={`relative aspect-square overflow-hidden rounded-full transition-all duration-700 ${
                        picks.has(i) ? "ring-[3px] ring-primary ring-offset-4 ring-offset-ink-2" : "opacity-35 grayscale"
                    }`}
                >
                    <Image src={c.photo} alt="" fill sizes="96px" className="object-cover" />
                </div>
            ))}
        </div>
    );
}

const MIX = [
    { label: "Infotainment", w: 28 },
    { label: "Gaming", w: 22 },
    { label: "Edutainment", w: 20 },
    { label: "Vlogging", w: 18 },
    { label: "Finance", w: 12 },
];

function StrategyVisual() {
    return (
        <div>
            <div className="flex h-16 overflow-hidden rounded-full">
                {MIX.map((m, i) => (
                    <div key={m.label} style={{ width: `${m.w}%`, opacity: 1 - i * 0.16 }} className="border-r-2 border-secondary bg-accent last:border-0" />
                ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {MIX.map((m, i) => (
                    <span key={m.label} className="inline-flex items-center gap-2 text-sm text-paper/85">
                        <span className="size-2.5 rounded-full bg-accent" style={{ opacity: 1 - i * 0.16 }} />
                        {m.label}
                    </span>
                ))}
            </div>
            <p className="mt-6 max-w-[40ch] text-sm text-paper/60">
                The INDmoney mix: five niches, finance deliberately kept small.
            </p>
        </div>
    );
}

const FLOW = ["Brief", "Script", "Approval", "Agreement", "Publish", "Payout"];

function ExecutionVisual() {
    return (
        <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-3">
            {FLOW.map((s, i) => (
                <li
                    key={s}
                    className={`rounded-full px-5 py-3.5 text-center text-sm ${
                        i === FLOW.length - 1 ? "bg-primary text-white" : "border border-line bg-ink/40 text-paper"
                    }`}
                >
                    {s}
                </li>
            ))}
        </ol>
    );
}

function ValueVisual() {
    return (
        <p className="font-display text-[clamp(2rem,3.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
            Right creators.
            <br />
            Right strategy.
            <br />
            <span className="text-ink">Right price.</span>
        </p>
    );
}

const SERVICES = [
    {
        title: "Creator discovery",
        stage: "Find",
        body: "We find the right creators by audience, niche, geography and campaign goal, and check audience quality before anyone reaches your shortlist.",
        tags: ["Nano to mega", "City-level targeting", "Audience checks"],
        visual: <DiscoveryVisual />,
        surface: "bg-ink-2 border border-line",
    },
    {
        title: "Campaign strategy",
        stage: "Plan",
        body: "We build the creator mix and content direction around your objective, not around who is trending this week.",
        tags: ["Objective-led", "Creator mix", "Platform playbooks"],
        visual: <StrategyVisual />,
        surface: "bg-secondary",
    },
    {
        title: "End-to-end execution",
        stage: "Run",
        body: "Briefs, scripts, approvals, agreements, payments and publishing. One shared sheet, always current, nothing to chase.",
        tags: ["Briefs & scripts", "Approvals", "On-time publishing"],
        visual: <ExecutionVisual />,
        surface: "bg-ink-3",
    },
    {
        title: "Better value",
        stage: "Deliver",
        body: "We negotiate competitive creator rates and share the real commercials, so more of your budget becomes content.",
        tags: ["Rate negotiation", "Transparent pricing", "Post-campaign reports"],
        visual: <ValueVisual />,
        surface: "bg-primary",
    },
];

/**
 * Chapter seven. A real sticky stack: each service pins at the top and is
 * pushed back as the next one slides over it.
 */
const Services = () => {
    const root = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
            const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", el);
            cards.forEach((card, i) => {
                if (i === cards.length - 1) return;
                // Previous card shrinks and dims as the next one slides over it
                const st = { trigger: cards[i + 1], start: "top bottom", end: "top top", scrub: true };
                gsap.to(card.querySelector("[data-stack-inner]"), { scale: 0.9, ease: "none", scrollTrigger: st });
                gsap.to(card.querySelector("[data-stack-dim]"), { opacity: 0.65, ease: "none", scrollTrigger: st });
            });
        });
        return () => mm.revert();
    }, []);

    return (
        <section ref={root} id="services" className="relative px-4 pt-20 sm:px-10 lg:px-16 lg:pt-28">
            <div data-recede className="mx-auto max-w-[1400px]">
                <Eyebrow index="07" label="What we do" />
                <SplitReveal className="chapter-title max-w-[18ch]">
                    From discovery <span className="font-semibold">to delivery.</span>
                </SplitReveal>
                <p className="mt-6 max-w-[48ch] text-lg text-mute">The entire influencer marketing cycle, handled by one team.</p>

                <div className="mt-14 flex flex-col gap-4 pb-24 lg:mt-10 lg:gap-0 lg:pb-0">
                    {SERVICES.map((s, i) => {
                        const onBlue = i === 3;
                        return (
                            <div key={s.title} data-stack-card className="lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:items-center">
                                <div
                                    data-stack-inner
                                    className={`relative isolate w-full origin-top overflow-hidden rounded-l-[28px] rounded-r-[72px] sm:rounded-r-[120px] lg:rounded-r-[160px] ${s.surface}`}
                                    style={{ marginTop: `${i * 14}px` }}
                                >
                                    {/* Stage strip: where this service sits in the cycle */}
                                    <div
                                        className={`flex items-center gap-4 border-b py-4 pl-7 pr-16 font-mono text-[11px] uppercase tracking-[0.18em] sm:pl-10 sm:pr-24 lg:pl-14 lg:pr-28 ${
                                            onBlue ? "border-white/20 text-white/80" : "border-line text-mute"
                                        }`}
                                    >
                                        <span className={onBlue ? "text-white" : "text-cobalt-hi"}>{String(i + 1).padStart(2, "0")}</span>
                                        <span>{s.stage}</span>
                                        <div className="ml-auto flex items-center gap-1.5" aria-hidden>
                                            {SERVICES.map((_, j) => (
                                                <span
                                                    key={j}
                                                    className={`h-1 rounded-full transition-all ${j === i ? "w-8" : "w-3"} ${
                                                        onBlue ? (j <= i ? "bg-white" : "bg-white/25") : j <= i ? "bg-primary" : "bg-paper/15"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="hidden sm:inline">{String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}</span>
                                    </div>

                                    <div className="relative grid grid-cols-1 gap-10 p-7 sm:p-10 lg:min-h-[62dvh] lg:grid-cols-2 lg:gap-16 lg:p-14">
                                        <StageMark stage={i} onBlue={onBlue} />
                                        <div className={`pointer-events-none absolute -right-32 -top-32 -z-10 size-96 rounded-full blur-3xl ${onBlue ? "bg-white/15" : "bg-primary/20"}`} />

                                        <div className="flex flex-col justify-between gap-10">
                                            <div>
                                                <h3 className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.03em] text-paper">
                                                    {s.title}
                                                </h3>
                                                <p className={`mt-5 max-w-[42ch] text-base leading-relaxed sm:text-lg ${onBlue ? "text-white/85" : "text-mute"}`}>{s.body}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {s.tags.map((t) => (
                                                    <span
                                                        key={t}
                                                        className={`rounded-full px-3.5 py-1.5 text-xs backdrop-blur ${onBlue ? "bg-white/15 text-white" : "border border-line bg-ink/30 text-paper/80"}`}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Viewfinder: the visual sits in a framed stage with corner ticks */}
                                        <div
                                            className={`relative flex w-full items-center rounded-[20px] p-6 sm:p-8 [&>:last-child]:w-full ${
                                                onBlue ? "bg-white/[0.06]" : "bg-ink/35 ring-1 ring-line"
                                            }`}
                                            style={{
                                                backgroundImage: `radial-gradient(${onBlue ? "rgba(255,255,255,0.14)" : "rgba(176,215,249,0.09)"} 1px, transparent 1px)`,
                                                backgroundSize: "18px 18px",
                                            }}
                                        >
                                            {(["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"] as const).map((pos) => (
                                                <span
                                                    key={pos}
                                                    aria-hidden
                                                    className={`pointer-events-none absolute size-4 ${pos} ${onBlue ? "border-white/60" : "border-cobalt-hi"}`}
                                                />
                                            ))}
                                            {s.visual}
                                        </div>
                                    </div>
                                    <div data-stack-dim className="pointer-events-none absolute inset-0 bg-ink opacity-0" aria-hidden />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
