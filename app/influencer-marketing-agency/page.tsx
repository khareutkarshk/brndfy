import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import JsonLd from "@/app/components/JsonLd";
import FAQ from "@/app/components/FAQ";
import FinalCTA from "@/app/components/FinalCTA";
import MagneticButton from "@/app/components/fx/MagneticButton";
import PageShell from "@/app/components/page/PageShell";
import PageHero from "@/app/components/page/PageHero";
import Chapter from "@/app/components/page/Chapter";
import { INFLUENCER_CASES } from "@/app/data/influencerWork";
import { CREATORS } from "@/app/data/creators";

export const metadata: Metadata = {
    title: "Influencer Marketing Agency in India & Delhi NCR",
    description:
        "BRNDFY is an influencer marketing agency in Delhi NCR running creator campaigns for INDmoney, slice, Vyapar, Polaris, Newton School and AbhiBus. 200+ creators, 20M+ views, 35K+ leads.",
    keywords: [
        "influencer marketing agency",
        "influencer marketing agency in India",
        "influencer marketing agency in Delhi NCR",
        "influencer marketing agency in Noida",
        "finance influencer marketing",
        "creator marketing agency",
    ],
    alternates: { canonical: "/influencer-marketing-agency" },
};

/** "4.5M+" -> 4_500_000, "17K+" -> 17_000, "16,200+" -> 16_200 */
const parseFigure = (v: string) => {
    const n = parseFloat(v.replace(/,/g, ""));
    return /M/i.test(v) ? n * 1e6 : /K/i.test(v) ? n * 1e3 : n;
};
const sumStat = (pattern: RegExp, index?: number) =>
    INFLUENCER_CASES.reduce((total, c) => {
        const stat = index === undefined ? c.stats.find((s) => pattern.test(s.label)) : c.stats[index];
        return total + (stat ? parseFigure(stat.value) : 0);
    }, 0);
// Rounded down, so the headline never claims more than the cases add up to
const floorTo = (n: number, step: number) => Math.floor(n / step) * step;

const CREATOR_TOTAL = floorTo(sumStat(/./, 0), 100);
const VIEWS_TOTAL = floorTo(sumStat(/views/i) / 1e6, 5);
const LEADS_TOTAL = floorTo(sumStat(/leads/i) / 1e3, 5);

const PRINCIPLES = [
    {
        title: "Right-size the creator tier",
        body: "Bigger is not always better. Vyapar's earlier mega-influencer campaigns had poor ROI, so we moved them to 150+ regional nano creators whose audiences matched their MSME customers. That produced 17K+ leads over four cohorts.",
        slug: "vyapar",
    },
    {
        title: "Mix niches, not just reach",
        body: "For INDmoney we deliberately limited finance creators and spread the campaign across infotainment, gaming, edutainment and vlogging. That call became the strategy for four straight months of campaigns.",
        slug: "indmoney",
    },
    {
        title: "Speak Gen Z, natively",
        body: "slice needed five banking products in everyday Gen Z conversation. Handpicked lifestyle, couples and finance creators delivered 600K+ views at a 5.65% engagement rate.",
        slug: "slice",
    },
    {
        title: "Measure what the content moves",
        body: "Views are the start. For ed-tech brands like Polaris and Newton School we report leads per campaign, so every creator is judged on outcomes, not just impressions.",
        slug: "polaris",
    },
];

const SERVICES = [
    { title: "Creator discovery", body: "Creators found by audience, niche, geography and goal, with audience quality checked before anyone reaches your shortlist." },
    { title: "Campaign strategy", body: "A creator mix and content direction built around your objective, not around who is trending this week." },
    { title: "End-to-end execution", body: "Briefs, scripts, approvals, agreements, payments and publishing, tracked on one shared sheet." },
    { title: "Transparent pricing", body: "Creator rates negotiated directly, with the real commercials shared, so more of your budget becomes content." },
    { title: "Performance reporting", body: "Reach, views, engagement and leads reported against the objective you set at the start." },
    { title: "Talent management", body: "We represent creators on brand deals too, so we know both sides of the table." },
];

const FAQS = [
    {
        question: "What does an influencer marketing agency do?",
        answer:
            "We plan and run creator campaigns end to end: choosing the right creators, writing briefs and scripts, handling approvals, agreements and payments, publishing, and reporting results against your goal.",
    },
    {
        question: "Which industries do you run influencer campaigns for?",
        answer:
            "Most of our work is in finance and fintech (INDmoney, slice, Vyapar), ed-tech (Polaris School of Technology, Newton School of Technology) and consumer apps like AbhiBus, with creators across finance, edutainment, infotainment, gaming and lifestyle.",
    },
    {
        question: "Do you work with nano and micro creators or only big names?",
        answer:
            "Both. We pick the tier that fits the goal. Vyapar ran on 150+ regional nano creators, slice on micro creators, and INDmoney on a mega creator mix including names like Sahil Rana and Love Babbar.",
    },
    {
        question: "Where are you based?",
        answer:
            "Our office is in Greater Noida, and we work with brands across Delhi NCR and the rest of India. Creator campaigns run nationally, including regional-language creators.",
    },
    {
        question: "How do you measure influencer campaign ROI?",
        answer:
            "Every campaign runs on a shared tracker. We report views, engagement rate and, where the goal is acquisition, leads or installs, so you can compare creators and cohorts on cost per outcome.",
    },
];

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Influencer marketing",
    serviceType: "Influencer marketing agency",
    url: "https://brndfy.com/influencer-marketing-agency",
    provider: { "@type": "Organization", name: "BRNDFY", url: "https://brndfy.com" },
    areaServed: { "@type": "Country", name: "India" },
    description: metadata.description,
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function InfluencerMarketingPage() {
    return (
        <PageShell>
            <JsonLd data={serviceSchema} />
            <JsonLd data={faqSchema} />

            <PageHero
                label="Influencer marketing"
                title={
                    <>
                        Influencer marketing agency for <span className="font-semibold">brands that need results.</span>
                    </>
                }
                titleClassName="max-w-[18ch] text-[clamp(2.4rem,5.4vw,5rem)]"
                intro="We match finance, ed-tech and Gen Z brands with the right creators, from regional nano to mega, then measure what the content actually moves."
                actions={
                    <>
                        <MagneticButton href="/contact">Start a campaign</MagneticButton>
                        <MagneticButton href="/case-studies#influencer-marketing" variant="ghost">
                            See the case studies
                        </MagneticButton>
                    </>
                }
                meta={[
                    { label: "Creators activated", value: `${CREATOR_TOTAL}+` },
                    { label: "Total views", value: `${VIEWS_TOTAL}M+` },
                    { label: "Leads generated", value: `${LEADS_TOTAL}K+` },
                    { label: "Based in", value: "Delhi NCR" },
                ]}
            />

            <Chapter
                index="02"
                label="How we work"
                title={
                    <>
                        Four calls that <span className="font-semibold">made the numbers.</span>
                    </>
                }
            >
                <ol className="grid gap-3 md:grid-cols-2">
                    {PRINCIPLES.map((p, i) => (
                        <li key={p.title} className="rounded-[24px] border border-line bg-ink-2 p-6 sm:p-8">
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-hi">{String(i + 1).padStart(2, "0")}</p>
                            <h2 className="mt-4 font-display text-2xl font-medium tracking-[-0.02em] text-paper">{p.title}</h2>
                            <p className="mt-3 leading-relaxed text-mute">{p.body}</p>
                            <Link href={`/case-studies#case-${p.slug}`} className="group mt-5 inline-flex items-center gap-1.5 text-sm text-paper hover:text-cobalt-hi">
                                Read the case
                                <ArrowUpRight weight="bold" className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </li>
                    ))}
                </ol>
            </Chapter>

            <Chapter
                index="03"
                label="Results"
                title={
                    <>
                        {INFLUENCER_CASES.length} influencer campaigns, <span className="font-semibold">on the record.</span>
                    </>
                }
            >
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {INFLUENCER_CASES.map((c) => (
                        <li key={c.slug}>
                            <Link
                                href={`/case-studies#case-${c.slug}`}
                                className="group flex h-full flex-col justify-between gap-8 rounded-[24px] border border-line bg-ink-2 p-6 transition-colors duration-300 hover:border-primary"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-white">
                                        <Image src={c.logo} alt={c.brand} fill sizes="48px" className="object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="truncate font-display text-lg font-medium text-paper">{c.brand}</h3>
                                        <p className="text-xs text-mute">{c.category}</p>
                                    </div>
                                </div>
                                <dl className="grid grid-cols-2 gap-4">
                                    {c.stats.slice(0, 4).map((s) => (
                                        <div key={s.label}>
                                            <dt className="text-xs text-mute">{s.label}</dt>
                                            <dd className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em] text-paper">{s.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Chapter>

            <Chapter
                index="04"
                label="What you get"
                title={
                    <>
                        One team, <span className="font-semibold">brief to payout.</span>
                    </>
                }
            >
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((s) => (
                        <li key={s.title} className="rounded-[20px] border border-line px-6 py-6">
                            <h3 className="font-display text-lg font-medium text-paper">{s.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-mute">{s.body}</p>
                        </li>
                    ))}
                </ul>
            </Chapter>

            <Chapter
                index="05"
                label="Creators"
                title={
                    <>
                        Some of the creators <span className="font-semibold">we have worked with.</span>
                    </>
                }
            >
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {CREATORS.map((c) => (
                        <li key={c.name}>
                            <a href={c.instagram} target="_blank" rel="noopener noreferrer" className="group block">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
                                    <Image src={c.photo} alt={c.name} fill sizes="(max-width: 640px) 50vw, 20vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
                                </div>
                                <p className="mt-3 font-display text-base font-medium text-paper">{c.name}</p>
                                <p className="mt-1 text-xs text-mute">{c.niches.join(", ")}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </Chapter>

            <FAQ index="06" items={FAQS} />
            <FinalCTA />
        </PageShell>
    );
}
