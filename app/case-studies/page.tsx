import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES } from "@/app/data/caseStudies";

export const metadata = {
    title: "Case Studies — Brndfy",
    description: "Explore how Brndfy has activated youth culture for India's top brands.",
};

export default function CaseStudiesPage() {
    return (
        <div className="bg-white p-3 rounded-2xl flex flex-col gap-3 min-h-screen">

            {/* ── HERO ── */}
            <div className="relative rounded-2xl min-h-[50vh] lg:min-h-[60vh] w-full bg-secondary overflow-hidden">
                <Image
                    src="/bg.png"
                    alt="Case Studies Hero"
                    fill
                    className="object-cover"
                    priority
                />

                {/* 3D logo — right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full flex items-center justify-end pr-8 sm:pr-16 lg:pr-24 pointer-events-none">
                    <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-105 lg:h-105">
                        <Image
                            src="/logo3d.png"
                            alt="Brndfy 3D Logo"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                </div>

                {/* Text — left */}
                <div className="relative z-10 flex flex-col justify-center min-h-[50vh] lg:min-h-[60vh] px-6 sm:px-12 lg:px-20 pt-28 pb-16 max-w-2xl">
                    <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 font-normal mb-6">
                        Our Work
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-none tracking-tight">
                        Campaigns That<br />
                        <em className="font-serif italic font-normal text-primary">Move Culture.</em>
                    </h1>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 right-6 sm:right-12 lg:right-20 z-20 flex items-center gap-3 text-white/60">
                    <span className="text-[10px] uppercase tracking-[0.25em]">Scroll for more</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </div>

            {/* ── GRID ── */}
            <section className="bg-[#F7F7F8] rounded-2xl px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
                <div className="max-w-7xl mx-auto">

                    {/* Label */}
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                        <div>
                            <span className="text-xs font-bold tracking-[0.2em] text-secondary/50 uppercase">
                                / All Case Studies
                            </span>
                            <p className="text-secondary/60 text-sm mt-1.5">
                                {CASE_STUDIES.length} campaigns · youth activation · campus marketing · influencer strategy
                            </p>
                        </div>
                    </div>

                    {/* Card grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {CASE_STUDIES.map((study) => (
                            <Link
                                key={study.id}
                                href={`/case-studies/${study.slug}`}
                                className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-secondary block"
                            >
                                {/* Thumbnail */}
                                <Image
                                    src={study.thumbnail}
                                    alt={study.brandName}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Brand logo pill */}
                                {study.logo && (
                                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                                        <div className="relative w-16 h-5">
                                            <Image
                                                src={study.logo}
                                                alt={study.brandName}
                                                fill
                                                className="object-contain"
                                                sizes="64px"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Arrow on hover */}
                                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </div>

                                {/* Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1.5">
                                    <h2 className="font-bold text-white text-lg leading-tight tracking-tight">
                                        {study.brandName}
                                    </h2>
                                    <p className="text-xs text-white/60 font-medium tracking-wide">
                                        {study.campaignType.join(" · ")}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
