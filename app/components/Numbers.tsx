"use client";

import React, { useEffect, useRef, useState } from "react";

const STATS = [
    {
        target: 300,
        suffix: "+",
        category: "creators",
        badge: "Worked With",
        label: "Creators Network",
        description:
            "A growing network of creators across finance, edutainment, lifestyle, and more.",
        footerRight: "Multi-niche",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
            >
                <path
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        target: 15,
        suffix: "+",
        category: "campaigns",
        badge: "Delivered",
        label: "Brand Campaigns",
        description:
            "Creator-led campaigns executed across diverse categories and audiences.",
        footerRight: "Cross-Industry",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
            >
                <path
                    d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        target: 55,
        suffix: "M+",
        category: "views",
        badge: "Organic",
        label: "Total Views Generated",
        description:
            "Organic reach generated through creator-led brand campaigns.",
        footerRight: "Verified Reach",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
            >
                <path
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        target: 3,
        suffix: "+",
        category: "experience",
        badge: "Track Record",
        label: "Years in Industry",
        description:
            "Experience across influencer marketing, creator partnerships, and talent management.",
        footerRight: "Established",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
            >
                <path
                    d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004 0A7.487 7.487 0 0018 7.875V5.25a.75.75 0 00-.75-.75h-10.5a.75.75 0 00-.75.75v2.625c0 2.65 1.378 4.978 3.475 6.326m4.554 0a7.51 7.51 0 01-4.554 0M18 6.75h2.25a2.25 2.25 0 012.25 2.25c0 1.77-1.144 3.27-2.73 3.805M6 6.75H3.75A2.25 2.25 0 001.5 9c0 1.77 1.144 3.27 2.73 3.805"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

const useCountUp = (target: number, duration = 2000, trigger = false) => {
    const [count, setCount] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        if (!trigger || started.current) return;

        started.current = true;

        let startTimestamp: number | null = null;

        const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;

            const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1
            );

            const current = target * easeOutQuart(progress);

            setCount(Math.floor(current));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(step);
    }, [duration, target, trigger]);

    return count;
};

const StatCard = ({
    stat,
    inView,
}: {
    stat: (typeof STATS)[number];
    inView: boolean;
}) => {
    const count = useCountUp(stat.target, 1600, inView);

    return (
        <div className="metric-card rounded-2xl p-7 sm:p-8 flex flex-col justify-between group cursor-default">
            <div>
                <div className="flex items-center justify-between mb-7">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/70 text-[#000000] flex items-center justify-center shadow-[0_2px_8px_rgba(29,78,216,0.12)] group-hover:scale-110 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all duration-300">
                        {stat.icon}
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider bg-blue-50/90 text-black border border-blue-200/60 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        {stat.badge}
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="text-5xl sm:text-6xl font-bold tracking-tight text-[#1d4ed8] font-display number-glow flex items-baseline">
                        <span>{count}</span>

                        <span
                            className={`${
                                stat.suffix === "M+"
                                    ? "text-[#1d4ed8] font-bold"
                                    : "text-blue-400 font-light ml-0.5"
                            } group-hover:text-[#1d4ed8] transition-colors`}
                        >
                            {stat.suffix}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#090a0f] tracking-tight pt-1 font-display group-hover:text-[#1d4ed8] transition-colors">
                        {stat.label}
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed font-body">
                        {stat.description}
                    </p>
                </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-blue-100/70 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-[#1d4ed8] font-semibold">
                    {stat.footerLeft}
                </span>

                <span>{stat.footerRight}</span>
            </div>
        </div>
    );
};

const OutcomeCard = ({
    eyebrow,
    title,
    icon,
}: {
    eyebrow: string;
    title: string;
    icon: React.ReactNode;
}) => (
    <div className="group outcome-card rounded-xl p-5 sm:p-6 flex items-center gap-4 cursor-default">
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/70 text-[#000000] flex items-center justify-center shadow-[0_2px_8px_rgba(29,78,216,0.12)] group-hover:scale-110 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all duration-300 flex-shrink-0">
            {icon}
        </div>

        <div className="min-w-0">
            <div className="text-xs font-mono font-bold tracking-widest text-[#1d4ed8] uppercase mb-0.5">
                {eyebrow}
            </div>

            <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#090a0f] font-display group-hover:text-[#1d4ed8] transition-colors">
                {title}
            </div>
        </div>
    </div>
);

const Numbers = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="numbers"
            className="relative overflow-hidden bg-[#fbf8ff] py-20 sm:pt-24 sm:pb-20"
        >
            <div className="absolute top-12 left-1/4 w-[42rem] h-[26rem] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-64 right-16 w-96 h-96 bg-indigo-100/40 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative min-h-screen bg-grid-pattern pt-20 sm:pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12 sm:mb-14">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
                        <div className="flex items-center space-x-2.5">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#1d4ed8] shadow-[0_0_8px_rgba(29,78,216,0.6)]" />

                            <span className="font-mono text-xs text-[#1d4ed8] uppercase font-bold tracking-widest">
                                / NUMBERS &amp; OUTCOMES
                            </span>

                            <span className="text-slate-300 ml-1">|</span>

                            <span className="text-xs font-mono font-medium text-slate-500 tracking-wider uppercase">
                                Verified Impact
                            </span>
                        </div>

                        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                        <div className="lg:col-span-8">
                            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.04] font-bold tracking-tight text-[#090a0f] font-display">
                                Built on Creators
                                <br />
                                Driven by Results.
                            </h2>
                        </div>

                        <div className="lg:col-span-4 pb-2">
                            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed font-body border-l-2 border-[#1d4ed8]/40 pl-4 py-1">
                                A growing creator ecosystem, proven campaign
                                experience, and measurable reach across India&apos;s
                                digital audience.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    aria-label="Key Performance Statistics"
                    className="max-w-7xl mx-auto px-6 sm:px-8 mb-8"
                    id="metrics-section"
                >
                    <div className="h-0.5 rounded-full mb-0 opacity-80 bg-[linear-gradient(90deg,transparent_0%,#1d4ed8_25%,#60a5fa_50%,#1d4ed8_75%,transparent_100%)]" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {STATS.map((stat) => (
                            <StatCard
                                key={stat.category}
                                stat={stat}
                                inView={inView}
                            />
                        ))}
                    </div>

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                        <OutcomeCard
                            eyebrow="Execution Model"
                            title="End-to-End Campaigns"
                            icon={
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            }
                        />

                        <OutcomeCard
                            eyebrow="Talent Synergy"
                            title="Creator-First Approach"
                            icon={
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M9 14.25l6-6m4.5-1.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-10.5 9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            }
                        />

                        <OutcomeCard
                            eyebrow="High Performance"
                            title="Data-Driven Execution"
                            icon={
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621 0 1.125-1.125 1.125h-2.25c-.621 0-1.125-1.125-1.125-1.125V4.125z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .bg-grid-pattern {
                    background-size: 48px 48px;
                    background-image:
                        linear-gradient(
                            to right,
                            rgba(29, 78, 216, 0.05) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            to bottom,
                            rgba(29, 78, 216, 0.05) 1px,
                            transparent 1px
                        );
                }

                .metric-card {
                    position: relative;
                    min-height: 330px;
                    background: linear-gradient(
                        175deg,
                        #ffffff 0%,
                        #f9fbff 100%
                    );
                    box-shadow:
                        0 1px 2px rgba(15, 23, 42, 0.04),
                        0 8px 24px -6px rgba(29, 78, 216, 0.08),
                        inset 0 0 0 1px rgba(219, 234, 254, 0.9);
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .metric-card::before {
                    content: "";
                    position: absolute;
                    inset: -1px;
                    border-radius: inherit;
                    padding: 1.5px;
                    background: linear-gradient(
                        135deg,
                        rgba(29, 78, 216, 0.35) 0%,
                        rgba(59, 130, 246, 0.08) 50%,
                        rgba(29, 78, 216, 0.25) 100%
                    );
                    -webkit-mask:
                        linear-gradient(#fff 0 0) content-box,
                        linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                    opacity: 0.65;
                    transition: opacity 0.35s ease;
                }

                .metric-card:hover {
                    transform: translateY(-4px);
                    box-shadow:
                        0 20px 40px -12px rgba(29, 78, 216, 0.16),
                        0 0 0 1px rgba(29, 78, 216, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.9);
                }

                .metric-card:hover::before {
                    opacity: 1;
                }

                .number-glow {
                    text-shadow: 0 2px 14px rgba(29, 78, 216, 0.18);
                    font-feature-settings: "tnum" on, "lnum" on;
                }

                .outcome-card {
                    background: linear-gradient(
                        145deg,
                        #ffffff 0%,
                        #f8faff 100%
                    );
                    box-shadow:
                        0 2px 6px -1px rgba(15, 23, 42, 0.04),
                        0 10px 24px -8px rgba(29, 78, 216, 0.09),
                        inset 0 0 0 1px rgba(226, 232, 240, 0.85);
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .outcome-card:hover {
                    transform: translateY(-3px);
                    box-shadow:
                        0 16px 32px -8px rgba(29, 78, 216, 0.18),
                        inset 0 0 0 1.5px rgba(29, 78, 216, 0.35);
                }
            `}</style>
        </section>
    );
};

export default Numbers;