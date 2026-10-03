"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import SplitReveal from "./fx/SplitReveal";
import Eyebrow from "./fx/Eyebrow";
import indmoney from "@/assets/logos/Influencer-brand-logos/INDmoney.png";
import slice from "@/assets/logos/Influencer-brand-logos/Slice.png";
import vyapar from "@/assets/logos/Influencer-brand-logos/Vyapar.png";
import polaris from "@/assets/logos/Influencer-brand-logos/Polaris.png";
import newton from "@/assets/logos/Influencer-brand-logos/Newton.png";
import abhibus from "@/assets/logos/Influencer-brand-logos/Abhibus.png";

const TESTIMONIALS = [
    {
        quote: "Everything about the campaign lived in a shared sheet and doc, always up to date. We never had to ask for a status update.",
        name: "Influencer Marketing Manager",
        brand: "INDmoney",
        logo: indmoney,
    },
    {
        quote: "They took the campaign from creator selection to final posting without us having to chase anything.",
        name: "Senior Manager, Brand & Influencer Marketing",
        brand: "slice",
        logo: slice,
    },
    {
        quote: "The creator rates they shared were the real ones, with no inflated commercials. That transparency is rare in this space.",
        name: "Growth Marketing Lead",
        brand: "Vyapar",
        logo: vyapar,
    },
    {
        quote: "Feedback reached creators quickly, revisions came back on time, and nothing got lost in between.",
        name: "Associate Brand Manager",
        brand: "Polaris School of Technology",
        logo: polaris,
    },
    {
        quote: "Creator lists, deliverables, payment status: whatever we needed was already in the sheet. Organised and predictable.",
        name: "Performance & Influencer Marketing Lead",
        brand: "Newton School of Technology",
        logo: newton,
    },
    {
        quote: "Honest pricing, clear communication and a team that follows through. It felt like our own in-house team.",
        name: "Head of Digital Marketing",
        brand: "AbhiBus",
        logo: abhibus,
    },
];

// Resting pose for the first few cards in the pile
const POSE = [
    { y: 0, scale: 1, rotate: 0, opacity: 1 },
    { y: 22, scale: 0.95, rotate: -3.5, opacity: 1 },
    { y: 44, scale: 0.9, rotate: 3, opacity: 1 },
    { y: 60, scale: 0.86, rotate: 0, opacity: 0 },
];

/**
 * Chapter eight. Partner quotes as a physical deck: drag the top card away
 * (or use the arrows) and it returns to the back of the pile.
 */
const Testimonials = ({ index = "08" }: { index?: string }) => {
    const reduce = useReducedMotion();
    const [order, setOrder] = useState(() => TESTIMONIALS.map((_, i) => i));
    const [leaving, setLeaving] = useState<{ id: number; dir: 1 | -1 } | null>(null);

    const next = useCallback(
        (dir: 1 | -1 = 1) => {
            if (leaving) return;
            if (dir === -1) {
                // Bring the last card back on top
                setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
                return;
            }
            setLeaving({ id: order[0], dir });
        },
        [leaving, order],
    );

    const onDragEnd = (_: unknown, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 600) {
            if (!leaving) setLeaving({ id: order[0], dir: info.offset.x > 0 ? 1 : -1 });
        }
    };

    const current = TESTIMONIALS[order[0]];

    return (
        <section id="testimonials" data-tone="deep" className="relative overflow-hidden px-4 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div data-recede className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <Eyebrow index={index} label="Testimonials" />
                    <SplitReveal className="chapter-title max-w-[14ch]">
                        In their <span className="font-semibold">own words.</span>
                    </SplitReveal>
                    <p className="mt-6 max-w-[40ch] text-lg text-mute">What marketing teams say after a campaign wraps.</p>

                    <div className="mt-10 flex items-center gap-4">
                        <button
                            onClick={() => next(-1)}
                            aria-label="Previous testimonial"
                            className="grid size-12 place-items-center rounded-full border border-paper/20 text-paper transition-colors hover:border-paper/60 active:scale-95"
                        >
                            <ArrowLeft weight="bold" className="size-4" />
                        </button>
                        <button
                            onClick={() => next(1)}
                            aria-label="Next testimonial"
                            className="grid size-12 place-items-center rounded-full bg-primary text-white transition-colors hover:bg-cobalt-hi active:scale-95"
                        >
                            <ArrowRight weight="bold" className="size-4" />
                        </button>
                        <p className="ml-2 text-sm text-mute" aria-live="polite">
                            {current.brand}
                        </p>
                    </div>
                </div>

                <div className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[420px] lg:col-span-7" onKeyDown={(e) => {
                    if (e.key === "ArrowRight") next(1);
                    if (e.key === "ArrowLeft") next(-1);
                }}>
                    {order
                        .slice(0, 4)
                        .map((id, pos) => ({ id, pos }))
                        .reverse()
                        .map(({ id, pos }) => {
                            const t = TESTIMONIALS[id];
                            const isTop = pos === 0;
                            const isLeaving = leaving?.id === id;
                            const pose = POSE[pos];
                            return (
                                <motion.figure
                                    key={id}
                                    tabIndex={isTop ? 0 : -1}
                                    aria-hidden={!isTop}
                                    className={`absolute inset-x-0 top-0 flex h-[400px] flex-col justify-between rounded-[28px] p-7 outline-none sm:h-[380px] sm:p-10 ${
                                        isTop ? "cursor-grab bg-paper text-ink active:cursor-grabbing" : "bg-ink-3 text-paper"
                                    }`}
                                    style={{ zIndex: 10 - pos, boxShadow: isTop ? "0 40px 90px -30px rgba(23,68,255,0.6)" : "none" }}
                                    drag={isTop && !reduce ? "x" : false}
                                    dragSnapToOrigin
                                    dragElastic={0.6}
                                    onDragEnd={isTop ? onDragEnd : undefined}
                                    initial={false}
                                    animate={
                                        isLeaving
                                            ? { x: leaving.dir * 720, rotate: leaving.dir * 22, opacity: 0 }
                                            : { x: 0, ...pose }
                                    }
                                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                                    onAnimationComplete={() => {
                                        if (isLeaving) {
                                            setOrder((o) => [...o.slice(1), o[0]]);
                                            setLeaving(null);
                                        }
                                    }}
                                >
                                    <blockquote className="font-display text-[clamp(1.25rem,2.1vw,1.7rem)] font-normal leading-[1.3] tracking-[-0.015em]">
                                        &ldquo;{t.quote}&rdquo;
                                    </blockquote>
                                    <figcaption className="flex items-center gap-4">
                                        <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-ink/10">
                                            <Image src={t.logo} alt={t.brand} fill sizes="48px" className="object-cover" draggable={false} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{t.name}</p>
                                            <p className={`text-sm ${isTop ? "text-ink/60" : "text-mute"}`}>{t.brand}</p>
                                        </div>
                                    </figcaption>
                                </motion.figure>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
