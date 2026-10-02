"use client";

import React, { useState } from "react";

const SERVICES = [
    {
        id: "creator-discovery",
        title: "Creator Discovery &\nMatching",
        tags: [
            "Nano, Micro, Macro & Mega Creators",
            "Niche & City-Level Targeting",
            "Audience Quality Checks",
            "Curated Shortlists",
        ],
    },
    {
        id: "campaign-strategy",
        title: "Campaign Strategy\n& Planning",
        tags: [
            "Objective-Led Planning",
            "Creator Mix Strategy",
            "Content Direction",
            "Platform Playbooks",
        ],
    },
    {
        id: "end-to-end-execution",
        title: "End-to-End\nExecution",
        tags: [
            "Briefs & Scripts",
            "Content Approvals",
            "Agreements & Payments",
            "On-Time Publishing",
        ],
    },
    {
        id: "better-roi",
        title: "Better ROI &\nMeasurable Results",
        tags: [
            "Competitive Creator Rates",
            "Rate Negotiation",
            "Performance Tracking",
            "Post-Campaign Reports",
        ],
    },
];

const Services = () => {
    const [hoveredId, setHoveredId] = useState<string | null>(SERVICES[0].id);

    return (
        <section
            id="services"
            className="relative overflow-hidden rounded-2xl bg-[#fbf8ff] py-16 px-6 sm:px-12 lg:px-20"
        >
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-80" />

            <div className="relative z-10">
                <div className="mb-12 max-w-7xl mx-auto">
                    <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary/60 uppercase">
                        /Our Services
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl text-secondary leading-tight mt-4 tracking-tight">
                        <span className="font-bold">Influencer Marketing <br /> From</span>{" "}
                        <em className="font-serif italic font-normal text-primary">Discovery to Delivery</em>
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto">
                    {SERVICES.map((service, index) => {
                        const isActive = hoveredId === service.id;
                        const isNotLast = index < SERVICES.length - 1;

                        return (
                            <div key={service.id}>
                                <div
                                    className="group grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 py-7 lg:py-8 cursor-default"
                                    onMouseEnter={() => setHoveredId(service.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <h3
                                        className={`text-2xl sm:text-3xl lg:text-[2rem] font-normal leading-tight tracking-tight whitespace-pre-line transition-colors duration-300 ${
                                            isActive
                                                ? "text-primary"
                                                : "text-secondary"
                                        }`}
                                    >
                                        {service.title}
                                    </h3>

                                    <div className="flex flex-wrap content-center gap-2">
                                        {service.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-primary text-white border-primary"
                                                        : "bg-transparent text-secondary/70 border-secondary/20"
                                                }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {isNotLast && (
                                    <div className="h-0.5 rounded-full opacity-80 bg-[linear-gradient(90deg,transparent_0%,#1d4ed8_25%,#60a5fa_50%,#1d4ed8_75%,transparent_100%)]" />
                                )}
                            </div>
                        );
                    })}
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
            `}</style>
        </section>
    );
};

export default Services;
