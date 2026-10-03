"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Odometer from "./fx/Odometer";
import SplitReveal from "./fx/SplitReveal";
import { CREATORS } from "@/app/data/creators";
import { INFLUENCER_CASES } from "@/app/data/influencerWork";

const enter = (i: number, reduce: boolean | null) => ({
    initial: reduce ? false : { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
});

/**
 * Chapter three. Four numbers, four cells, each with its own evidence:
 * real creator faces, real client badges, outlined scale.
 */
const Numbers = () => {
    const reduce = useReducedMotion();

    return (
        <section id="numbers" className="relative bg-ink px-4 py-24 sm:px-10 lg:px-16 lg:py-32">
            <div className="mx-auto max-w-[1400px]">
                <SplitReveal className="max-w-[18ch] font-display text-[clamp(2rem,4.4vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-paper">
                    Proof, <span className="font-semibold">not promises.</span>
                </SplitReveal>

                <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:grid-rows-[auto_auto]">
                    {/* Creators: the network, shown as faces */}
                    <motion.div
                        {...enter(0, reduce)}
                        className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[28px] bg-primary p-7 sm:p-9 md:col-span-2 lg:row-span-2 lg:min-h-[560px]"
                    >
                        <div className="relative z-10">
                            <Odometer value="300+" className="font-display text-[clamp(4.5rem,10vw,9.5rem)] font-semibold tracking-[-0.05em] text-white" />
                            <p className="mt-4 max-w-[28ch] text-base text-white/85 sm:text-lg">
                                Creators in our network across finance, edutainment, lifestyle and more.
                            </p>
                        </div>
                        <div className="relative z-10 mt-10 grid grid-cols-7 gap-2">
                            {CREATORS.map((c, i) => (
                                <div
                                    key={c.name}
                                    className="relative aspect-square overflow-hidden rounded-full ring-2 ring-primary transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
                                    style={{ transitionDelay: `${(i % 7) * 30}ms` }}
                                >
                                    <Image src={c.photo} alt={c.name} fill sizes="80px" className="object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
                    </motion.div>

                    {/* Views */}
                    <motion.div
                        {...enter(1, reduce)}
                        className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-ink-2 p-7 sm:p-9 md:col-span-2"
                    >
                        <span className="text-outline pointer-events-none absolute -bottom-10 -right-2 opacity-40 select-none font-display text-[11rem] font-bold leading-none tracking-[-0.06em] sm:text-[14rem]">
                            55M
                        </span>
                        <Odometer value="55M+" className="relative font-display text-[clamp(3.5rem,6vw,5.5rem)] font-semibold tracking-[-0.04em] text-paper" />
                        <p className="relative mt-6 max-w-[30ch] text-mute">Organic views generated through creator-led brand campaigns.</p>
                    </motion.div>

                    {/* Campaigns: the badges of brands behind them */}
                    <motion.div
                        {...enter(2, reduce)}
                        className="flex min-h-[260px] flex-col justify-between rounded-[28px] border border-line bg-ink-2 p-7 sm:p-9"
                    >
                        <div className="flex -space-x-3">
                            {INFLUENCER_CASES.map((c) => (
                                <div key={c.slug} className="relative size-11 overflow-hidden rounded-full bg-white ring-2 ring-ink-2">
                                    <Image src={c.logo} alt={c.brand} fill sizes="44px" className="object-cover" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <Odometer value="15+" className="font-display text-6xl font-semibold tracking-[-0.04em] text-paper" />
                            <p className="mt-3 text-mute">Brand campaigns delivered.</p>
                        </div>
                    </motion.div>

                    {/* Years */}
                    <motion.div
                        {...enter(3, reduce)}
                        className="relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-[28px] bg-linear-to-br from-ink-3 to-secondary p-7 sm:p-9"
                    >
                        <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full border-[28px] border-primary/40" />
                        <Odometer value="3+" className="relative font-display text-6xl font-semibold tracking-[-0.04em] text-paper" />
                        <p className="relative mt-3 text-mute">Years across influencer marketing and talent management.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Numbers;
