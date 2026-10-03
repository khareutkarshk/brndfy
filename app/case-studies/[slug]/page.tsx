import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CASE_STUDIES } from "@/app/data/caseStudies";
import FAQ from "@/app/components/FAQ";
import FinalCTA from "@/app/components/FinalCTA";
import { ImpactGrid } from "@/app/components/ImpactCard";
import PageShell from "@/app/components/page/PageShell";
import PageHero from "@/app/components/page/PageHero";
import Chapter from "@/app/components/page/Chapter";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

/** The closing statement's last sentence is the line we want remembered */
function splitClosing(statement: string) {
    const parts = statement.split(". ");
    const last = parts.pop() ?? "";
    return { before: parts.length ? `${parts.join(". ")}. ` : "", last };
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const index = CASE_STUDIES.findIndex((s) => s.slug === slug);
    if (index === -1) notFound();

    const study = CASE_STUDIES[index];
    const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
    const closing = splitClosing(study.approach.closingStatement);

    return (
        <PageShell>
            <PageHero
                label={study.brandName}
                title={study.title}
                titleClassName="max-w-[18ch] text-[clamp(2.4rem,5vw,4.6rem)]"
                intro={
                    <>
                        <Link href="/case-studies" className="group mb-6 inline-flex items-center gap-2 text-sm text-paper/80 hover:text-paper">
                            <ArrowLeft weight="bold" className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                            All campaigns
                        </Link>
                        {study.outcome && <p>{study.outcome}</p>}
                    </>
                }
                aside={
                    <div className="relative">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-line">
                            <Image src={study.thumbnail} alt={`${study.brandName} campaign`} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 grid size-24 place-items-center overflow-hidden rounded-full bg-white p-3 shadow-[0_30px_80px_-20px_rgba(23,68,255,0.55)] ring-4 ring-ink sm:size-28">
                            <div className="relative size-full">
                                <Image src={study.logo} alt={`${study.brandName} logo`} fill sizes="112px" className="object-contain" />
                            </div>
                        </div>
                    </div>
                }
                meta={[
                    { label: "Brand", value: study.brandName },
                    ...(study.duration ? [{ label: "Duration", value: study.duration }] : []),
                    { label: "Campaign", value: study.campaignType.slice(0, 2).join(" + ") },
                    { label: "Headline result", value: `${study.impact.stats[0].value} ${study.impact.stats[0].label.toLowerCase()}` },
                ]}
            />

            <Chapter index="02" label="The challenge">
                <p className="max-w-[34ch] font-display text-[clamp(1.6rem,3vw,2.8rem)] font-light leading-[1.18] tracking-[-0.025em] text-paper">
                    {study.challenge}
                </p>
            </Chapter>

            <Chapter
                index="03"
                label="Our approach"
                title={study.approach.description}
            >
                <ol className="grid gap-3 sm:grid-cols-2">
                    {study.approach.points.map((point, i) => (
                        <li key={point} className="flex min-h-[150px] flex-col justify-between gap-8 rounded-[24px] border border-line bg-ink-2 p-6 sm:p-7">
                            <span className="font-mono text-[11px] tracking-[0.18em] text-cobalt-hi">{String(i + 1).padStart(2, "0")}</span>
                            <p className="font-display text-lg font-medium leading-snug tracking-[-0.01em] text-paper sm:text-xl">{point}</p>
                        </li>
                    ))}
                </ol>
                <p className="mt-14 max-w-[30ch] font-display text-[clamp(1.6rem,3vw,2.8rem)] font-light leading-[1.15] tracking-[-0.025em] text-paper">
                    {closing.before}
                    <span className="font-semibold text-cobalt-hi">{closing.last}</span>
                </p>
            </Chapter>

            {study.gallery.length >= 2 && (
                <section className="px-4 sm:px-10 lg:px-16">
                    <div className="mx-auto grid max-w-[1400px] gap-3 sm:grid-cols-2">
                        {study.gallery.slice(0, 2).map((img, i) => (
                            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-[28px] ring-1 ring-line">
                                <Image src={img} alt={`${study.brandName} campaign image ${i + 1}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <Chapter
                index="04"
                label="The impact"
                title={
                    <>
                        What it <span className="font-semibold">added up to.</span>
                    </>
                }
            >
                <ImpactGrid stats={study.impact.stats} />
            </Chapter>

            {study.gallery.length >= 3 && (
                <section className="px-4 sm:px-10 lg:px-16">
                    <div className="relative mx-auto aspect-[21/9] max-w-[1400px] overflow-hidden rounded-[28px] ring-1 ring-line">
                        <Image src={study.gallery[2]} alt={`${study.brandName} campaign image 3`} fill sizes="100vw" className="object-cover" />
                    </div>
                </section>
            )}

            {/* Next campaign: keep the reader moving through the work */}
            <section className="px-4 pt-20 sm:px-10 lg:px-16 lg:pt-28">
                <Link
                    href={`/case-studies/${next.slug}`}
                    className="group relative mx-auto flex max-w-[1400px] items-center justify-between gap-6 overflow-hidden rounded-[28px] border border-line bg-ink-2 p-7 transition-colors duration-500 hover:border-primary hover:bg-primary sm:p-10"
                >
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute group-hover:text-white/75">Next campaign</p>
                        <p className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-none tracking-[-0.04em] text-paper group-hover:text-white">
                            {next.brandName}
                        </p>
                    </div>
                    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45 sm:size-20">
                        <ArrowUpRight weight="bold" className="size-5 sm:size-6" />
                    </span>
                </Link>
            </section>

            <FAQ index="05" />
            <FinalCTA />
        </PageShell>
    );
}
