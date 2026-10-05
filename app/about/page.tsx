import type { ReactNode } from 'react'
import { Metadata } from 'next'
import Image from 'next/image';
import { ImpactStat } from '../data/caseStudies';
import { ImpactGrid } from '../components/ImpactCard';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import PageShell from '../components/page/PageShell';
import PageHero from '../components/page/PageHero';
import Chapter from '../components/page/Chapter';
import { CREATORS } from '../data/creators';

export const metadata: Metadata = {
    title: "About Us: India's Youth Activation Engine",
    description: "Learn about BRNDFY's journey from college corridors to becoming India's leading youth marketing agency. Discover our vision, mission, and the impact we create for brands.",
    keywords: ["youth marketing agency", "influencer marketing experts India", "campus branding specialists", "BRNDFY story"],
    alternates: {
        canonical: "/about",
    },
};


const STORY: { lead: string; mark?: string }[] = [
    { lead: "It began with a simple belief: Brands shouldn't chase reach.", mark: " They should earn trust." },
    { lead: "We started by working closely with micro creators, because that is where audiences listen most. Today, we run complete creator campaigns for brands, from discovery and scripts to performance reports." },
    { lead: "We don't just execute campaigns.", mark: "We put brands in creators' voices." },
];

function StatIcon({ children }: { children: ReactNode }) {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1744FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

const ABOUT_STATS: ImpactStat[] = [
    {
        // 300+ Creators -> users (group of people)
        value: "300+",
        label: "Creators in our network across Finance, Edutainment, Lifestyle and more.",
        icon: (
            <StatIcon>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </StatIcon>
        ),
    },
    {
        // 15+ Campaigns Delivered -> badge-check (completed / delivered)
        value: "15+",
        label: "End-to-end Campaigns Delivered",
        icon: (
            <StatIcon>
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
            </StatIcon>
        ),
    },
    {
        // 105M+ Organic views -> eye
        value: "105M+",
        label: "Organic views generated through creator-led brand campaigns.",
        icon: (
            <StatIcon>
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
            </StatIcon>
        ),
    },
    {
        // 3+ Years of experience -> calendar
        value: "3+",
        label: "Years of experience in Influencer Marketing & Talent Management.",
        icon: (
            <StatIcon>
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
            </StatIcon>
        ),
    },
    {
        // 90%+ Client retention -> repeat (loop arrows = repeat campaigns)
        value: "90%+",
        label: "Client Retention through repeat campaigns",
        icon: (
            <StatIcon>
                <path d="m17 2 4 4-4 4" />
                <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                <path d="m7 22-4-4 4-4" />
                <path d="M21 13v1a4 4 0 0 1-4 4H3" />
            </StatIcon>
        ),
    },
];;

/** Six faces from the roster, offset in two columns like a contact sheet */
function CreatorSheet() {
    const faces = CREATORS.slice(0, 6);
    return (
        <div className="relative mx-auto grid max-w-[440px] grid-cols-3 gap-3">
            {faces.map((c, i) => (
                <div
                    key={c.name}
                    className={`relative aspect-[3/4] overflow-hidden rounded-[20px] ring-1 ring-line ${i % 3 === 1 ? "translate-y-8" : ""}`}
                >
                    <Image src={c.photo} alt={c.name} fill sizes="150px" className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 right-2 truncate text-[11px] text-paper/90">{c.name}</span>
                </div>
            ))}
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-primary/20 blur-3xl" />
        </div>
    );
}

export default function AboutPage() {
    return (
        <PageShell>

            <PageHero
                label="About Brndfy"
                title={
                    <>
                        Culture over <span className="font-semibold">campaigns.</span>
                    </>
                }
                intro={
                    <>
                        <p>We did not learn this from a playbook.</p>
                        <p className="mt-3">
                            We learned it by watching what audiences trust, skip, and share, campaign after campaign.
                        </p>
                    </>
                }
                aside={<CreatorSheet />}
            />

            <Chapter index="02" label="Our story">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-mute lg:col-span-4 lg:pt-3">
                        Right creators. Honest pricing. <br/>Clean execution.
                    </p>
                    <ol className="flex flex-col gap-12 lg:col-span-8 lg:gap-16">
                        {STORY.map((line, i) => (
                            <li key={i} className="grid grid-cols-[auto_1fr] gap-5 sm:gap-8">
                                <span className="pt-3 font-mono text-xs text-cobalt-hi">{String(i + 1).padStart(2, "0")}</span>
                                <p className="font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-light leading-[1.18] tracking-[-0.025em] text-paper">
                                    {line.lead} {line.mark && <span className="font-medium text-cobalt-hi">{line.mark}</span>}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </Chapter>

            <Chapter
                index="03"
                label="Vision & mission"
                title={
                    <>
                        Where we are <span className="font-semibold">headed.</span>
                    </>
                }
            >
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[28px] bg-primary p-8 sm:p-10">
                        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
                        <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-white/75">Our vision</p>
                        <p className="relative mt-10 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
                            To make influencer marketing in India transparent, trusted and built on real influence.
                        </p>
                    </div>
                    <div className="flex min-h-[320px] flex-col justify-between rounded-[28px] border border-line bg-ink-2 p-8 sm:p-10">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-hi">Our mission</p>
                        <p className="mt-10 font-display text-[clamp(1.25rem,1.9vw,1.75rem)] font-light leading-[1.3] tracking-[-0.015em] text-paper">
                            To connect brands with the right creators and run every campaign end to end, with honest pricing, clear communication and measurable results.
                        </p>
                    </div>
                </div>
            </Chapter>

            <Chapter
                index="04"
                label="Impact"
                title={
                    <>
                        The work, <span className="font-semibold">in numbers.</span>
                    </>
                }
            >
                <ImpactGrid stats={ABOUT_STATS} />
            </Chapter>

            <Testimonials index="05" />
            <FAQ index="06" />
            <FinalCTA />
        </PageShell>
    );
}
