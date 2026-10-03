"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SplitReveal from "./fx/SplitReveal";
import Eyebrow from "./fx/Eyebrow";

import INDmoney from "@/assets/logos/Influencer-brand-logos/INDmoney.png";
import Abhibus from "@/assets/logos/Influencer-brand-logos/Abhibus.png";
import AU from "@/assets/logos/Influencer-brand-logos/AU.png";
import HilaryRhoda from "@/assets/logos/Influencer-brand-logos/Hilary Rhoda.png";
import Drishti from "@/assets/logos/Influencer-brand-logos/Drishti.png";
import Monster from "@/assets/logos/Influencer-brand-logos/Monster.png";
import Nescafe from "@/assets/logos/Influencer-brand-logos/Nescafe.png";
import Newton from "@/assets/logos/Influencer-brand-logos/Newton.png";
import Polaris from "@/assets/logos/Influencer-brand-logos/Polaris.png";
import Polkapop from "@/assets/logos/Influencer-brand-logos/Polkapop.png";
import Predator from "@/assets/logos/Influencer-brand-logos/Predator.png";
import Qonect from "@/assets/logos/Influencer-brand-logos/Qonect.png";
import Slice from "@/assets/logos/Influencer-brand-logos/Slice.png";
import Scalar from "@/assets/logos/Influencer-brand-logos/Scalar.png";
import Stride from "@/assets/logos/Influencer-brand-logos/Stride.png";
import Vedam from "@/assets/logos/Influencer-brand-logos/Vedam.png";
import Vyapar from "@/assets/logos/Influencer-brand-logos/Vyapar.png";
import NIAT from "@/assets/logos/Influencer-brand-logos/NIAT.png";
import Viberse from "@/assets/logos/Influencer-brand-logos/Viberse.png";
import Porter from "@/assets/logos/Influencer-brand-logos/Porter.png";

/** `short` is what fits inside a mark; `name` stays the accessible label */
type Brand = { name: string; short?: string; logo: StaticImageData };

const ROW_A: Brand[] = [
    { name: "INDmoney", logo: INDmoney },
    { name: "Vyapar", logo: Vyapar },
    { name: "slice", logo: Slice },
    { name: "AU Small Finance Bank", short: "AU Bank", logo: AU },
    { name: "Porter", logo: Porter },
    { name: "Newton School of Technology", short: "Newton School", logo: Newton },
    { name: "Polaris School of Technology", short: "Polaris", logo: Polaris },
    { name: "Scaler School of Technology", short: "Scaler", logo: Scalar },
    { name: "Stride School of Business", short: "Stride", logo: Stride },
    { name: "Vedam School of Technology", short: "Vedam", logo: Vedam },
];

const ROW_B: Brand[] = [
    { name: "NIAT", logo: NIAT },
    { name: "AbhiBus", logo: Abhibus },
    { name: "Hilary Rhoda", logo: HilaryRhoda },
    { name: "Drishti IAS", logo: Drishti },
    { name: "Monster Energy", short: "Monster", logo: Monster },
    { name: "Nescafe", logo: Nescafe },
    { name: "Predator Energy", short: "Predator", logo: Predator },
    { name: "Qoneqt", logo: Qonect },
    { name: "Viberse", logo: Viberse },
    { name: "Polka Pop", logo: Polkapop },
];

const BRANDS = [...ROW_A, ...ROW_B];

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * One client as one Brndfy mark: the name sits in the B bowl, the logo fills
 * the R leg. Proportions follow the 1340 x 1920 geometry in BrndfyMark. On
 * entry the bowl slides in from the left and the leg from the right, the same
 * way the mark assembles in the preloader.
 */
function BrandMark({ brand, index }: { brand: Brand; index: number }) {
    const reduce = useReducedMotion();
    const delay = (index % 10) * 0.05 + Math.floor(index / 10) * 0.12;
    const enter = (x: number) =>
        reduce
            ? {}
            : {
                  initial: { opacity: 0, x },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true, amount: 0.4 },
                  transition: { duration: 0.9, delay, ease: EASE },
              };

    return (
        <li
            className="group relative aspect-[1340/1920] w-full snap-start max-md:[grid-column:var(--col)] max-md:[grid-row:var(--row)]"
            // Phones swipe two rows: keep 01 to 10 on top, 11 to 20 below
            style={{ "--col": (index % 10) + 1, "--row": index < 10 ? 1 : 2 } as React.CSSProperties}
            title={brand.name}
        >
            {/* B bowl: index and name */}
            <motion.div
                {...enter(-24)}
                className="absolute inset-x-0 top-0 flex h-1/2 flex-col justify-center rounded-l-[6px] rounded-r-full border border-line bg-ink-2 pl-[11%] pr-[16%] transition-colors duration-500 ease-out-expo group-hover:border-primary group-hover:bg-primary"
            >
                <span className="font-mono text-[9px] tracking-[0.16em] text-cobalt-hi transition-colors duration-500 group-hover:text-white/70 sm:text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 line-clamp-2 font-display text-[12px] font-medium leading-[1.12] tracking-[-0.01em] text-paper transition-colors duration-500 group-hover:text-white sm:text-[13px]">
                    {brand.short ?? brand.name}
                </span>
            </motion.div>

            {/* R leg: the logo */}
            <motion.div {...enter(24)} className="absolute left-[26.1%] top-[51%] aspect-square w-[70.2%]">
                <div className="relative size-full overflow-hidden rounded-full bg-white ring-1 ring-line transition-all duration-500 ease-out-expo group-hover:-translate-y-[6%] group-hover:ring-[3px] group-hover:ring-primary group-hover:ring-offset-2 group-hover:ring-offset-ink">
                    <Image src={brand.logo} alt={brand.name} fill sizes="(max-width: 768px) 80px, 120px" className="object-cover" />
                </div>
            </motion.div>
        </li>
    );
}

/**
 * Chapter seven. Every client gets its own Brndfy mark: twenty marks, all
 * visible at once. Phones swipe two rows sideways; wider screens see the grid.
 */
const Clients = () => (
    <section id="clients" className="relative overflow-hidden py-20 lg:py-28">
        <div data-recede className="mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-16">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                    <Eyebrow index="07" label="Clients" />
                    <SplitReveal className="chapter-title max-w-[16ch]">
                    Brands we have <span className="font-semibold">built with.</span>
                    </SplitReveal>
                </div>
                <p className="max-w-[36ch] text-lg text-mute">
                    {BRANDS.length} brands, each set into our mark. Fintech, edtech, consumer and more.
                </p>
            </div>

            <div className="relative mt-14 lg:mt-20">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/10 blur-[120px]" />
                <ul
                    aria-label="Brands we have worked with"
                    className="no-scrollbar relative -mx-4 grid snap-x snap-mandatory auto-cols-[104px] grid-flow-col grid-rows-2 gap-x-3 gap-y-5 overflow-x-auto px-4 pb-2 sm:-mx-10 sm:auto-cols-[120px] sm:px-10 md:mx-0 md:grid-flow-row md:grid-cols-5 md:grid-rows-none md:gap-x-6 md:gap-y-8 md:overflow-visible md:px-0 xl:grid-cols-10 xl:gap-x-4"
                >
                    {BRANDS.map((b, i) => (
                        <BrandMark key={b.name} brand={b} index={i} />
                    ))}
                </ul>
            </div>
        </div>
    </section>
);

export default Clients;
