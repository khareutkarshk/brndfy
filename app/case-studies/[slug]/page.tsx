import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES } from "@/app/data/caseStudies";
import FAQ from "@/app/components/FAQ";
import { ImpactCard, ImpactGrid } from "@/app/components/ImpactCard";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const study = CASE_STUDIES.find((s) => s.slug === slug);

    if (!study) notFound();

    return (
        <div className="bg-white p-3 rounded-2xl flex flex-col gap-3 min-h-screen">
            {/* ── HERO ── */}
            <div className="relative rounded-2xl min-h-screen w-full overflow-hidden">
                {/* Background image (thumbnail as hero bg) */}
                <Image
                    src="/bg.png"
                    alt={study.brandName}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-around min-h-screen px-6 sm:px-12 lg:px-20 pt-28 pb-20 gap-6">

                    {/* Left – text */}
                    <div className="flex flex-col gap-6 max-w-2xl  w-full">

                        {/* Duration – top eyebrow */}
                        {study.duration && (
                            <span className="shimmer-border inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white/80 text-xs w-fit">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                                </svg>
                                {study.duration}
                            </span>
                        )}

                        {/* Eyebrow – campaignTypes joined by + */}
                        <p className="text-xs sm:text-sm tracking-widest uppercase text-white/70 font-normal">
                            {study.campaignType.join(" + ")}
                        </p>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
                            {study.title}
                        </h1>

                        {/* Outcome in place of duration pill */}
                        {study.outcome && (
                            <p className="text-sm text-[#CDCCD1] leading-relaxed max-w-2xl">
                                {study.outcome}
                            </p>
                        )}
                    </div>

                    {/* Right – brand logo */}
                    <div className="flex items-center justify-center w-full lg:w-auto shrink-0">
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                            <Image
                                src={study.logo}
                                alt={`${study.brandName} logo`}
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 right-6 sm:right-12 lg:right-20 z-20 flex flex-col items-center gap-4 text-white">
                    <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
                        Scroll for more
                    </span>
                    <div className="animate-bounce">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* ── CHALLENGE ── */}
            <section className="relative bg-white text-secondary py-12 px-6 sm:px-12 lg:px-20 min-h-[50vh] flex flex-col justify-center rounded-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full">
                    {/* Left label */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full py-4">
                        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary/60 uppercase">
                            / The Challenge
                        </span>
                    </div>
                    {/* Right content */}
                    <div className="lg:col-span-8">
                        <p className="text-2xl lg:text-4xl font-normal leading-[1.3] text-primary tracking-tight">
                            {study.challenge}
                        </p>
                    </div>
                </div>
            </section>

            {/* ── APPROACH ── */}
            <section className="relative bg-white text-secondary py-12 px-6 sm:px-12 lg:px-20 min-h-[50vh] flex flex-col justify-center rounded-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-7xl mx-auto w-full">
                    {/* Left label */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full py-4">
                        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary/60 uppercase">
                            / Our Approach
                        </span>
                        <div className="hidden lg:block mt-auto pt-10">
                            <p className="text-sm font-bold leading-tight text-secondary/60">
                                Strategy. Execution. Impact.
                            </p>
                        </div>
                    </div>
                    {/* Right content */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Description line */}
                        <p className="text-2xl lg:text-4xl font-normal leading-[1.3] text-primary tracking-tight">
                            {study.approach.description}
                        </p>

                        {/* Bullet points */}
                        <div className="flex flex-col gap-3">
                            {study.approach.points.map((point, i) => (
                                <p key={i} className="text-xl lg:text-4xl font-normal leading-[1.3] text-primary tracking-tight flex items-start gap-3">
                                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                                    {point}
                                </p>
                            ))}
                        </div>

                        {/* Closing statement */}
                        <p className="text-2xl lg:text-4xl font-normal leading-[1.3] text-primary tracking-tight">
                            {study.approach.closingStatement.split('. ').map((sentence, i, arr) => (
                                i === arr.length - 1 && sentence ? (
                                    <span key={i}>
                                        <span className="bg-primary rounded-md text-white px-2 italic inline box-decoration-clone">
                                            {sentence}{arr.length > 1 ? '.' : ''}
                                        </span>
                                    </span>
                                ) : (
                                    <span key={i}>{sentence}. </span>
                                )
                            ))}
                        </p>

                        {/* Mobile tagline */}
                        <div className="lg:hidden">
                            <p className="text-sm font-bold text-secondary/60">
                                Strategy. Execution. Impact.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GALLERY ROW — images 1 & 2 side by side ── */}
            {study.gallery.length >= 2 && (
                <div className="flex flex-col sm:flex-row gap-3 rounded-2xl overflow-hidden">
                    <div className="relative w-full sm:w-1/2 aspect-4/3 rounded-2xl overflow-hidden">
                        <Image
                            src={study.gallery[0]}
                            alt={`${study.brandName} campaign image 1`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                        />
                    </div>
                    <div className="relative w-full sm:w-1/2 aspect-4/3 rounded-2xl overflow-hidden">
                        <Image
                            src={study.gallery[1]}
                            alt={`${study.brandName} campaign image 2`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                        />
                    </div>
                </div>
            )}

            {/* ── IMPACT STATS ── */}
            <section className="relative bg-[#F7F7F8] rounded-2xl py-12 px-6 sm:px-12 lg:px-20 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-7xl mx-auto w-full">

                    {/* Left label */}
                    <div className="lg:col-span-4 flex flex-col py-4">
                        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary/60 uppercase">
                            / The Impact
                        </span>
                    </div>

                    {/* Right — staggered grid, no gaps */}
                    <div className="lg:col-span-8">
                        <ImpactGrid stats={study.impact.stats} />
                    </div>
                </div>
            </section>

            {/* ── WIDE IMAGE — image 4 ── */}
            {study.gallery.length >= 3 && (
                <div className="relative w-full aspect-21/9 rounded-2xl overflow-hidden">
                    <Image
                        src={study.gallery[2]}
                        alt={`${study.brandName} campaign image 4`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>
            )}

            <FAQ />

           
        </div>
    );
}