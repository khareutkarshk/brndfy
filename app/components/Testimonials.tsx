"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import indmoney from "@/assets/logos/Influencer-brand-logos/INDmoney.png";
import slice from "@/assets/logos/Influencer-brand-logos/Slice.png";
import vyapar from "@/assets/logos/Influencer-brand-logos/Vyapar.png";
import polaris from "@/assets/logos/Influencer-brand-logos/Polaris.png";
import newton from "@/assets/logos/Influencer-brand-logos/Newton.png";
import abhibus from "@/assets/logos/Influencer-brand-logos/Abhibus.png";

const TESTIMONIALS = [
    {
        quote:
            "Everything about the campaign lived in a shared sheet and doc, always up to date. We never had to ask for a status update. We just opened the link.",
        name: "Influencer Marketing Manager",
        brand: "INDMONEY",
        logo: indmoney,
    },
    {
        quote:
            "They took the campaign from creator selection to final posting without us having to chase anything. Our team stayed on the brief while they handled the rest.",
        name: "Senior Manager, Brand & Influencer Marketing",
        brand: "SLICE UPI & CREDIT CARD",
        logo: slice,
    },
    {
        quote:
            "The creator rates they shared were the real ones, with no inflated commercials. That transparency is rare in this space, and it made our budgeting very simple.",
        name: "Growth Marketing Lead",
        brand: "VYAPAR APP",
        logo: vyapar,
    },
    {
        quote:
            "Coordination between our team and the creators was smooth. Feedback reached creators quickly, revisions came back on time, and nothing got lost in between.",
        name: "Associate Brand Manager",
        brand: "POLARIS SCHOOL OF TECHNOLOGY",
        logo: polaris,
    },
    {
        quote:
            "Creator lists, deliverables, payment status: whatever we needed was already updated in the sheet. Working with them felt organised and predictable.",
        name: "Performance & Influencer Marketing Lead",
        brand: "NEWTON SCHOOL OF TECHNOLOGY",
        logo: newton,
    },
    {
        quote:
            "Honest pricing, clear communication and a team that follows through. It felt like working with our own in-house team, not an external agency.",
        name: "Head of Digital Marketing",
        brand: "ABHIBUS",
        logo: abhibus,
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const wrap = (i: number) =>
    ((i % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;

// ─── Testimonial Card (static inner content) ─────────────────────────────────
const CardContent = ({
    quote,
    name,
    brand,
    logo,
}: {
    quote: string;
    name: string;
    brand: string;
    logo: Parameters<typeof Image>[0]["src"] | null;
}) => (
    <>
        {/* Quote SVG */}
        <div className="self-start">
            <svg width="80" height="64" viewBox="0 0 125 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M98.3953 41.2017C113.176 42.0601 125 54.9356 125 70.3863C125 86.6953 112.331 100 96.2838 100C80.2365 100 67.1453 86.6953 67.1453 70.3863C67.1453 66.5236 67.5676 63.0901 69.2568 59.6567C69.679 58.3691 70.1013 57.5107 70.5236 56.2232L96.2838 0L108.108 0L98.3953 41.2017ZM31.25 41.2017C46.4527 42.0601 58.277 54.9356 58.277 70.3863C58.277 86.6953 45.1858 100 29.1385 100C13.0912 100 0 86.6953 0 70.3863C0 65.2361 1.26689 60.515 3.80067 56.2232L29.1385 0L41.3851 0L31.25 41.2017Z" fill="#1744FF" />
            </svg>
        </div>
        {/* Content */}
        <div className="self-end pl-16 sm:pl-20">
            <p className="text-secondary text-sm leading-relaxed mb-6">{quote}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-secondary/10">
                {logo ? (
                    <div className="relative w-12 h-8 shrink-0">
                        <Image src={logo} alt={brand} fill className="object-contain" sizes="48px" />
                    </div>
                ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary text-xs font-bold">{brand[0]}</span>
                    </div>
                )}
                <div>
                    <p className="text-sm font-bold text-secondary leading-tight">{name}</p>
                    <p className="text-xs text-secondary/50 tracking-widest uppercase mt-0.5">{brand}</p>
                </div>
            </div>
        </div>
    </>
);

// ─── Nav Button ───────────────────────────────────────────────────────────────
const NavBtn = ({
    onClick,
    dir,
    label,
}: {
    onClick: () => void;
    dir: "prev" | "next";
    label: string;
}) => (
    <button
        onClick={onClick}
        aria-label={label}
        className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-secondary/20 bg-white flex items-center justify-center text-secondary hover:bg-secondary hover:text-white hover:border-secondary active:scale-95 transition-all duration-200 shadow-sm z-10"
    >
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {dir === "prev" ? (
                <path d="M15 18l-6-6 6-6" />
            ) : (
                <path d="M9 18l6-6-6-6" />
            )}
        </svg>
    </button>
);

// ─── Slot positions for framer-motion ─────────────────────────────────────────
// Each card slot is described by { x, scale, opacity, zIndex }.
// "offLeft" / "offRight" are the positions cards enter from / exit to.
type SlotStyle = { x: string; scale: number; opacity: number; zIndex: number; boxShadow: string };

const SLOTS: Record<string, SlotStyle> = {
    offLeft:  { x: "calc(var(--left-x)  - var(--card-w))", scale: 0.82, opacity: 0, zIndex: 0, boxShadow: "none" },
    left:     { x: "var(--left-x)",                         scale: 0.88, opacity: 0.4, zIndex: 1, boxShadow: "none" },
    center:   { x: "var(--center-x)",                       scale: 1,    opacity: 1,   zIndex: 10, boxShadow: "0 6px 0 0 #1744FF" },
    right:    { x: "var(--right-x)",                        scale: 0.88, opacity: 0.4, zIndex: 1, boxShadow: "none" },
    offRight: { x: "calc(var(--right-x) + var(--card-w))", scale: 0.82, opacity: 0, zIndex: 0, boxShadow: "none" },
};

// When going NEXT (direction = 1): left exits offLeft, center→left, right→center, new enters from offRight→right
// When going PREV (direction = -1): right exits offRight, center→right, left→center, new enters from offLeft→left

const slotForPosition = (
    pos: "left" | "center" | "right",
    direction: number,
    phase: "initial" | "animate" | "exit"
): SlotStyle => {
    if (phase === "animate") return SLOTS[pos];

    if (direction === 1) {
        // clicking NEXT — everything shifts left
        if (phase === "initial") {
            if (pos === "left") return SLOTS.left;      // was center, already in place
            if (pos === "center") return SLOTS.right;    // was right, starts at right
            if (pos === "right") return SLOTS.offRight;  // new card enters from offRight
        }
        if (phase === "exit") {
            if (pos === "left") return SLOTS.offLeft;    // exits to offLeft
            if (pos === "center") return SLOTS.left;     // moves to left
            if (pos === "right") return SLOTS.center;    // moves to center
        }
    } else {
        // clicking PREV — everything shifts right
        if (phase === "initial") {
            if (pos === "right") return SLOTS.right;     // was center, already in place
            if (pos === "center") return SLOTS.left;     // was left, starts at left
            if (pos === "left") return SLOTS.offLeft;    // new card enters from offLeft
        }
        if (phase === "exit") {
            if (pos === "right") return SLOTS.offRight;  // exits to offRight
            if (pos === "center") return SLOTS.right;    // moves to right
            if (pos === "left") return SLOTS.center;     // moves to center
        }
    }
    return SLOTS[pos];
};

const springTransition = { type: "spring" as const, stiffness: 260, damping: 30, mass: 1 };

// ─── Main Component ───────────────────────────────────────────────────────────
const AUTO_PLAY_MS = 3000;

const Testimonials = () => {
    const [[current, direction], setSlide] = useState([0, 0]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [layout, setLayout] = useState({ cardW: 0, centerX: 0, leftX: 0, rightX: 0 });
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const prevIdx = wrap(current - 1);
    const nextIdx = wrap(current + 1);

    const paginate = useCallback((dir: 1 | -1) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSlide(([prev]) => [wrap(prev + dir), dir]);
    }, [isAnimating]);

    // Auto-scroll: advances every AUTO_PLAY_MS unless paused or animating
    useEffect(() => {
        if (isPaused) return;

        timerRef.current = setTimeout(() => {
            paginate(1);
        }, AUTO_PLAY_MS);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [current, isPaused, paginate]);

    const computeLayout = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        const containerW = el.clientWidth;
        const isMobile = window.innerWidth < 640;

        if (isMobile) {
            const cardW = containerW * 0.85;
            const centerX = (containerW - cardW) / 2;
            setLayout({
                cardW,
                centerX,
                leftX: -cardW,
                rightX: containerW,
            });
        } else {
            const cardW = Math.min(containerW * 0.5, 700);
            const gap = 24;
            const centerX = (containerW - cardW) / 2;
            const leftX = centerX - cardW - gap;
            const rightX = centerX + cardW + gap;
            setLayout({ cardW, centerX, leftX, rightX });
        }
    }, []);

    useEffect(() => {
        computeLayout();
        window.addEventListener("resize", computeLayout);
        return () => window.removeEventListener("resize", computeLayout);
    }, [computeLayout]);

    // Build the 3 visible cards (or 1 on mobile)
    const cards: { idx: number; pos: "left" | "center" | "right" }[] = [
        { idx: prevIdx, pos: "left" },
        { idx: current, pos: "center" },
        { idx: nextIdx, pos: "right" },
    ];

    return (
        <section
            id="testimonials"
            className="relative rounded-2xl py-16 sm:py-20 overflow-hidden"
        >
            {/* ── Header ── */}
            <div className="mb-10 sm:mb-14 px-6 sm:px-12 lg:px-20">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-secondary/50 uppercase block mb-3">
                    /Testimonials
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary leading-tight tracking-tight">
                    What Our Partners
                </h2>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight">
                    <em className="font-serif italic text-primary">Are Saying</em>
                </h2>
            </div>

            {/* ── Carousel ── */}
            <div
                className=" sm:px-12 lg:px-20"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <div
                    ref={containerRef}
                    className="relative w-full overflow-hidden"
                    style={{
                        height: "24rem",
                        ["--card-w" as string]: `${layout.cardW}px`,
                        ["--center-x" as string]: `${layout.centerX}px`,
                        ["--left-x" as string]: `${layout.leftX}px`,
                        ["--right-x" as string]: `${layout.rightX}px`,
                    }}
                >
                    {/* Desktop nav buttons — inside the track so top-1/2 aligns to card height */}
                    <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-0 z-20">
                        <NavBtn onClick={() => paginate(-1)} dir="prev" label="Previous testimonial" />
                    </div>
                    <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-0 z-20">
                        <NavBtn onClick={() => paginate(1)} dir="next" label="Next testimonial" />
                    </div>

                    <AnimatePresence
                        initial={false}
                        custom={direction}
                        onExitComplete={() => setIsAnimating(false)}
                    >
                        {cards.map(({ idx, pos }) => {
                            const initial = slotForPosition(pos, direction, "initial");
                            const animate = slotForPosition(pos, direction, "animate");
                            const exit = slotForPosition(pos, direction, "exit");

                            return (
                                <motion.div
                                    key={`${pos}-${idx}`}
                                    className="absolute top-0 bg-[#E8F3FE] rounded-2xl p-7 sm:p-9 grid grid-rows-[auto_1fr] min-h-72 sm:min-h-80 will-change-transform"
                                    style={{ width: "var(--card-w)" }}
                                    initial={{
                                        x: initial.x,
                                        scale: initial.scale,
                                        opacity: initial.opacity,
                                        zIndex: initial.zIndex,
                                        boxShadow: initial.boxShadow,
                                    }}
                                    animate={{
                                        x: animate.x,
                                        scale: animate.scale,
                                        opacity: animate.opacity,
                                        zIndex: animate.zIndex,
                                        boxShadow: animate.boxShadow,
                                    }}
                                    exit={{
                                        x: exit.x,
                                        scale: exit.scale,
                                        opacity: exit.opacity,
                                        zIndex: exit.zIndex,
                                        boxShadow: exit.boxShadow,
                                    }}
                                    transition={springTransition}
                                >
                                    <CardContent
                                        quote={TESTIMONIALS[idx].quote}
                                        name={TESTIMONIALS[idx].name}
                                        brand={TESTIMONIALS[idx].brand}
                                        logo={TESTIMONIALS[idx].logo}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Mobile nav buttons ── */}
            <div className="flex sm:hidden justify-end gap-3 mt-6 pr-6">
                <NavBtn onClick={() => paginate(-1)} dir="prev" label="Previous testimonial" />
                <NavBtn onClick={() => paginate(1)} dir="next" label="Next testimonial" />
            </div>
        </section>
    );
};

export default Testimonials;
