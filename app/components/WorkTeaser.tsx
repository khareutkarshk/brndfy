import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import SplitReveal from "./fx/SplitReveal";
import Eyebrow from "./fx/Eyebrow";
import { INFLUENCER_CASES } from "@/app/data/influencerWork";
import { CASE_STUDIES } from "@/app/data/caseStudies";

const PARTS: {
    href: string;
    part: string;
    label: string;
    title: string;
    blurb: string;
    brands: { name: string; logo: StaticImageData }[];
}[] = [
    {
        href: "/case-studies#influencer-marketing",
        part: "01",
        label: "Influencer marketing",
        title: `${INFLUENCER_CASES.length} brands. ${INFLUENCER_CASES.length} briefs. Creators that delivered.`,
        blurb: "Mega, micro and regional nano creators for finance, ed-tech and travel brands, measured in views, engagement and leads.",
        brands: INFLUENCER_CASES.map((c) => ({ name: c.brand, logo: c.logo })),
    },
    {
        href: "/case-studies#college-activations",
        part: "02",
        label: "College activations",
        title: `${CASE_STUDIES.length} campus campaigns. Students who showed up.`,
        blurb: "Sampling drives, canteen integrations and student-led buzz across campuses, from a handful of colleges to forty-plus.",
        brands: CASE_STUDIES.map((c) => ({ name: c.brandName, logo: c.logo })),
    },
];

/**
 * Chapter four on the home page: a doorway into both halves of /case-studies.
 * Keeps the #work id so older /#work links still land here.
 */
export default function WorkTeaser() {
    return (
        <section id="work" className="relative px-4 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div data-recede className="mx-auto max-w-[1400px]">
                <Eyebrow index="04" label="Selected work" />
                <SplitReveal className="chapter-title max-w-[20ch]">
                    Creators that deliver. <span className="font-semibold text-cobalt-hi">Campuses that show up.</span>
                </SplitReveal>

                <div className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-2">
                    {PARTS.map((p, i) => (
                        <Link
                            key={p.href}
                            href={p.href}
                            className={`group relative isolate flex flex-col justify-between gap-12 overflow-hidden rounded-[28px] p-6 sm:p-10 ${
                                i ? "bg-secondary" : "border border-line bg-ink-2"
                            }`}
                        >
                            <div className="pointer-events-none absolute -right-32 -top-32 -z-10 size-96 rounded-full bg-primary/20 blur-[100px] transition-opacity duration-700 group-hover:opacity-100 sm:opacity-60" />
                            <div>
                                <div className="flex items-start justify-between gap-6">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.18em]">
                                        <span className="text-cobalt-hi">Part {p.part}</span> <span className="text-paper">{p.label}</span>
                                    </p>
                                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-ink transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-primary group-hover:text-white">
                                        <ArrowUpRight weight="bold" className="size-4" />
                                    </span>
                                </div>
                                <h3 className="mt-8 max-w-[18ch] font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.06] tracking-[-0.03em] text-paper">
                                    {p.title}
                                </h3>
                                <p className="mt-4 max-w-[46ch] text-mute">{p.blurb}</p>
                            </div>

                            <ul className="flex flex-wrap gap-2" aria-label={`${p.label} clients`}>
                                {p.brands.map((b) => (
                                    <li key={b.name} title={b.name} className="relative size-12 overflow-hidden rounded-full bg-white ring-[3px] ring-ink-2 sm:size-14">
                                        <Image src={b.logo} alt={b.name} fill sizes="56px" className="object-contain p-1.5" />
                                    </li>
                                ))}
                            </ul>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
