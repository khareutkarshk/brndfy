import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CASE_STUDIES } from "@/app/data/caseStudies";
import PageShell from "@/app/components/page/PageShell";
import PageHero from "@/app/components/page/PageHero";
import Chapter from "@/app/components/page/Chapter";
import FinalCTA from "@/app/components/FinalCTA";

export const metadata = {
    title: "Case Studies — Brndfy",
    description: "Explore how Brndfy has activated youth culture for India's top brands.",
};

export default function CaseStudiesPage() {
    return (
        <PageShell>
            <PageHero
                label="Campus campaigns"
                title={
                    <>
                        Campaigns that <span className="font-semibold">move culture.</span>
                    </>
                }
                intro="Sampling drives, campus activations and student-led buzz for brands that wanted to be part of youth culture, not just seen by it."
                meta={[
                    { label: "Campaigns", value: String(CASE_STUDIES.length) },
                    { label: "Focus", value: "Youth activation" },
                    { label: "Where", value: "Campuses across India" },
                    { label: "Also", value: "Influencer strategy" },
                ]}
            />

            <Chapter index="02" label="All case studies">
                {/* Bento: the first campaign leads at double size, the rest fill around it */}
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {CASE_STUDIES.map((study, i) => {
                        const lead = i === 0;
                        return (
                            <li key={study.id} className={lead ? "sm:col-span-2 lg:row-span-2" : ""}>
                                <Link
                                    href={`/case-studies/${study.slug}`}
                                    className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-ink-2 ring-1 ring-line ${
                                        lead ? "min-h-[420px] lg:min-h-0" : "aspect-[4/5] sm:aspect-auto sm:min-h-[340px]"
                                    }`}
                                >
                                    <Image
                                        src={study.thumbnail}
                                        alt={study.brandName}
                                        fill
                                        sizes={lead ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                                        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/10" />

                                    <div className="relative flex items-start justify-between p-5 sm:p-6">
                                        <span className="rounded-full bg-ink/60 px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-paper backdrop-blur">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="grid size-11 place-items-center rounded-full bg-paper text-ink transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-primary group-hover:text-white">
                                            <ArrowUpRight weight="bold" className="size-4" />
                                        </span>
                                    </div>

                                    <div className="relative p-5 sm:p-6">
                                        {study.duration && (
                                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent/80">{study.duration}</p>
                                        )}
                                        <h2
                                            className={`mt-2 font-display font-medium leading-[1.05] tracking-[-0.03em] text-paper ${
                                                lead ? "text-[clamp(2rem,3.6vw,3.2rem)]" : "text-2xl"
                                            }`}
                                        >
                                            {study.brandName}
                                        </h2>
                                        {lead && <p className="mt-3 max-w-[46ch] text-paper/75">{study.title}</p>}
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {study.campaignType.map((t) => (
                                                <span key={t} className="rounded-full border border-paper/20 bg-ink/30 px-3 py-1 text-xs text-paper/85 backdrop-blur">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <Link href="/#work" className="group mt-10 inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-paper">
                    See our creator campaigns
                    <ArrowUpRight weight="bold" className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
            </Chapter>

            <FinalCTA />
        </PageShell>
    );
}
