"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES } from "@/app/data/caseStudies";

const Work = () => {
    // Split studies into two rows with offset ordering
    const half = Math.ceil(CASE_STUDIES.length / 2);
    const row1Studies = CASE_STUDIES.slice(0, half);
    const row2Studies = CASE_STUDIES.slice(half);

    return (
        <section
            id="work"
            className="relative bg-[#000011] rounded-2xl py-16 overflow-hidden"
        >
            {/* Section header */}
            <div className="mb-10 px-6 sm:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase">
                        /Our Work
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold lg:text-5xl  text-white leading-tight mt-4 tracking-tight">
                        Some Work of Our <br />
                    </h2>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight">
                        <em className="font-serif italic text-primary">Beloved Company</em>
                    </h2>
                </div>

                {/* View All button */}
                <Link
                    href="/case-studies"
                    className="shrink-0 inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white hover:text-secondary transition-all duration-200 self-start sm:self-auto"
                >
                    View All
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Row 1 — scrolls left */}
            <div
                className="mb-4 overflow-hidden"
                style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
            >
                <div className="flex gap-4 w-max animate-scroll-left hover:[animation-play-state:paused]">
                    {[...row1Studies, ...row1Studies].map((study, index) => (
                        <CaseStudyCard key={`row1-${study.id}-${index}`} study={study} />
                    ))}
                </div>
            </div>

            {/* Row 2 — scrolls left at a slightly different speed */}
            <div
                className="overflow-hidden"
                style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
            >
                <div className="flex gap-4 w-max animate-scroll-left-slow hover:[animation-play-state:paused]">
                    {[...row2Studies, ...row2Studies].map((study, index) => (
                        <CaseStudyCard key={`row2-${study.id}-${index}`} study={study} />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface CaseStudyCardProps {
    study: (typeof CASE_STUDIES)[number];
}

const CaseStudyCard = ({ study }: CaseStudyCardProps) => {
    return (
        <Link href={`/case-studies/${study.slug}`} className="group/card relative w-75 sm:w-90 lg:w-100 aspect-4/3 rounded-xl overflow-hidden shrink-0 cursor-pointer block">
            {/* Thumbnail image */}
            <Image
                src={study.thumbnail}
                alt={study.brandName}
                fill
                className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 400px"
            />

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Card info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-white text-xl leading-tight">
                    {study.brandName}
                </h3>
                <p className="text-sm text-white/70 line-clamp-2">
                    {study.campaignType.join(" • ")}
                </p>
            </div>
        </Link>
    );
};

export default Work;
