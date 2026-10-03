"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitReveal from "./fx/SplitReveal";

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

type Brand = { name: string; logo: StaticImageData };

const ROW_A: Brand[] = [
    { name: "INDmoney", logo: INDmoney },
    { name: "Vyapar", logo: Vyapar },
    { name: "slice", logo: Slice },
    { name: "AU Small Finance Bank", logo: AU },
    { name: "Porter", logo: Porter },
    { name: "Newton School of Technology", logo: Newton },
    { name: "Polaris School of Technology", logo: Polaris },
    { name: "Scaler School of Technology", logo: Scalar },
    { name: "Stride School of Business", logo: Stride },
    { name: "Vedam School of Technology", logo: Vedam },
];

const ROW_B: Brand[] = [
    { name: "NIAT", logo: NIAT },
    { name: "AbhiBus", logo: Abhibus },
    { name: "Hilary Rhoda", logo: HilaryRhoda },
    { name: "Drishti IAS", logo: Drishti },
    { name: "Monster Energy", logo: Monster },
    { name: "Nescafe", logo: Nescafe },
    { name: "Predator Energy", logo: Predator },
    { name: "Qoneqt", logo: Qonect },
    { name: "Viberse", logo: Viberse },
    { name: "Polka Pop", logo: Polkapop },
];

function Row({ brands, dir }: { brands: Brand[]; dir: 1 | -1 }) {
    return (
        <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div data-marquee={dir} className="flex w-max gap-4 sm:gap-6">
                {[...brands, ...brands].map((b, i) => (
                    <div
                        key={`${b.name}-${i}`}
                        className="group relative size-24 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-line transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 hover:scale-105 sm:size-32"
                    >
                        <Image src={b.logo} alt={i < brands.length ? b.name : ""} fill sizes="128px" className="object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Chapter seven. The page's one marquee: two rows in opposite directions
 * that speed up with scroll velocity and flip with scroll direction.
 */
const Clients = () => {
    const root = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const tweens = gsap.utils.toArray<HTMLElement>("[data-marquee]", el).map((track) => {
                const dir = Number(track.dataset.marquee);
                return gsap.fromTo(
                    track,
                    { xPercent: dir === 1 ? 0 : -50 },
                    { xPercent: dir === 1 ? -50 : 0, duration: 38, ease: "none", repeat: -1 },
                );
            });
            let heading = 1;
            const st = ScrollTrigger.create({
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    heading = self.direction;
                    const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
                    tweens.forEach((t) => {
                        gsap.to(t, { timeScale: heading * boost, duration: 0.2, overwrite: true });
                        gsap.to(t, { timeScale: heading, duration: 1.2, delay: 0.2, ease: "power2.out" });
                    });
                },
            });
            return () => st.kill();
        });
        return () => mm.revert();
    }, []);

    return (
        <section ref={root} id="clients" className="relative overflow-hidden bg-ink py-24 lg:py-32">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-16">
                <SplitReveal className="max-w-[20ch] font-display text-[clamp(2rem,4.4vw,4rem)] font-light leading-[1.05] tracking-[-0.035em] text-paper">
                    Brands we have <span className="font-semibold">built with.</span>
                </SplitReveal>
            </div>
            <div className="mt-14 flex flex-col gap-4 sm:gap-6 lg:mt-20">
                <Row brands={ROW_A} dir={1} />
                <Row brands={ROW_B} dir={-1} />
            </div>
        </section>
    );
};

export default Clients;
