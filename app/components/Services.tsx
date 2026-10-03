"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitReveal from "./fx/SplitReveal";
import { CREATORS } from "@/app/data/creators";

gsap.registerPlugin(ScrollTrigger);

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
        body: "We find the right creators by audience, niche, geography and campaign goal, and check audience quality before anyone reaches your shortlist.",
        tags: ["Nano to mega", "City-level targeting", "Audience checks"],
        visual: <DiscoveryVisual />,
        surface: "bg-ink-2 border border-line",
    },
    {
        title: "Campaign strategy",
        body: "We build the creator mix and content direction around your objective, not around who is trending this week.",
        tags: ["Objective-led", "Creator mix", "Platform playbooks"],
        visual: <StrategyVisual />,
        surface: "bg-secondary",
    },
    {
        title: "End-to-end execution",
        body: "Briefs, scripts, approvals, agreements, payments and publishing. One shared sheet, always current, nothing to chase.",
        tags: ["Briefs & scripts", "Approvals", "On-time publishing"],
        visual: <ExecutionVisual />,
        surface: "bg-ink-3",
    },
    {
        title: "Better value",
        body: "We negotiate competitive creator rates and share the real commercials, so more of your budget becomes content.",
        tags: ["Rate negotiation", "Transparent pricing", "Post-campaign reports"],
        visual: <ValueVisual />,
        surface: "bg-primary",
    },
];

/**
 * Chapter six. A real sticky stack: each service pins at the top and is
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
        <section ref={root} id="services" className="relative bg-ink px-4 pt-24 sm:px-10 lg:px-16 lg:pt-32">
            <div className="mx-auto max-w-[1400px]">
                <SplitReveal className="max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4.8rem)] font-light leading-[1.03] tracking-[-0.035em] text-paper">
                    From discovery <span className="font-semibold">to delivery.</span>
                </SplitReveal>
                <p className="mt-6 max-w-[48ch] text-lg text-mute">The entire influencer marketing cycle, handled by one team.</p>

                <div className="mt-14 flex flex-col gap-4 pb-24 lg:mt-10 lg:gap-0 lg:pb-0">
                    {SERVICES.map((s, i) => (
                        <div key={s.title} data-stack-card className="lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:items-center">
                            <div
                                data-stack-inner
                                className={`relative grid w-full origin-top grid-cols-1 gap-10 overflow-hidden rounded-[28px] p-7 sm:p-10 lg:min-h-[70dvh] lg:grid-cols-2 lg:gap-16 lg:p-14 ${s.surface}`}
                                style={{ marginTop: `${i * 14}px` }}
                            >
                                <div className="flex flex-col justify-between gap-10">
                                    <div>
                                        <h3 className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.03em] text-paper">
                                            {s.title}
                                        </h3>
                                        <p className={`mt-5 max-w-[42ch] text-base leading-relaxed sm:text-lg ${i === 3 ? "text-white/85" : "text-mute"}`}>{s.body}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {s.tags.map((t) => (
                                            <span
                                                key={t}
                                                className={`rounded-full px-3.5 py-1.5 text-xs ${i === 3 ? "bg-white/15 text-white" : "border border-line text-paper/80"}`}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex w-full items-center *:w-full">{s.visual}</div>
                                <div data-stack-dim className="pointer-events-none absolute inset-0 bg-ink opacity-0" aria-hidden />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
