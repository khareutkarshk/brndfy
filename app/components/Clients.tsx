"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import INDmoney from "@/assets/logos/Influencer-brand-logos/INDmoney.png";
import Abhibus from "@/assets/logos/Influencer-brand-logos/Abhibus.png";
import AU from "@/assets/logos/Influencer-brand-logos/AU.png";
import HilaryRhoda from "@/assets/logos/Influencer-brand-logos/Hilary Rhoda.png";
import Drishti from "@/assets/logos/Influencer-brand-logos/Drishti.png";
import Monster from "@/assets/logos/Influencer-brand-logos/Monster.png";
import Nescafe from "@/assets/logos/Influencer-brand-logos/Nescafe.png";
import Newton from "@/assets/logos/Influencer-brand-logos/Newton.png";
import Polaris from "@/assets/logos/Influencer-brand-logos/Polaris.png";
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


import Bg1 from "@/assets/logos/brands/bg1.png";
import Bg2 from "@/assets/logos/brands/bg2.png";
import Bg3 from "@/assets/logos/brands/bg3.png";
import Bg4 from "@/assets/logos/brands/bg4.png";

const BG_IMAGES = [Bg1, Bg2, Bg3, Bg4];

interface Brand {
    name: string;
    logo: StaticImageData;
    bg: StaticImageData;
}

const BRAND_LIST: Omit<Brand, "bg">[] = [
    { name: "INDmoney", logo: INDmoney },
    { name: "Vyapar", logo: Vyapar },
    { name: "Slice", logo: Slice },
    { name: "AU Small Finance Bank", logo: AU },
    { name: "Porter", logo: Porter },
    { name: "Newton School of Technology", logo: Newton },
    { name: "Polaris School of Technology", logo: Polaris },
    { name: "Scaler School of Technology", logo: Scalar },
    { name: "Stride School of Business", logo: Stride },
    { name: "Vedam School of Technology", logo: Vedam },
    { name: "NIAT", logo: NIAT },
    { name: "Abhibus", logo: Abhibus },
    { name: "Hilary Rhoda", logo: HilaryRhoda },
    { name: "Drishti", logo: Drishti },
    { name: "Monster Energy", logo: Monster },
    { name: "Nescafe", logo: Nescafe },
    { name: "Predator Energy", logo: Predator },
    { name: "Qonect", logo: Qonect },
    { name: "Viberse", logo: Viberse },
];

// Assign a bg deterministically by index so it's stable across renders
const BRANDS: Brand[] = BRAND_LIST.map((brand, i) => ({
    ...brand,
    bg: BG_IMAGES[i % BG_IMAGES.length],
}));

// Split brands into two rows for mobile marquee
const BRANDS_ROW1 = BRANDS.slice(0, Math.ceil(BRANDS.length / 2));
const BRANDS_ROW2 = BRANDS.slice(Math.ceil(BRANDS.length / 2));

const BrandCard = ({ brand }: { brand: Brand }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative flex items-center justify-center aspect-square rounded-xl overflow-hidden border border-secondary/10 cursor-pointer transition-all duration-300 p-3 sm:p-4"
            style={{ backgroundColor: "#F8F8F7" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Background image — fades in on hover */}
            <Image
                src={brand.bg}
                alt=""
                fill
                aria-hidden
                className={`object-cover transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"
                    }`}
                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12vw"
            />

            {/* Logo — sits above bg, drops grayscale on hover */}
            <div className="relative z-10 size-20">
                <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className={`object-contain size-24 transition-all duration-300 `}
                />
            </div>
        </div>
    );
};

const Clients = () => {
    return (
        <section
            id="clients"
            className="relative bg-white rounded-2xl py-16 sm:px-12 lg:px-20 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-12 max-w-7xl mx-auto px-6 sm:px-0">
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary/60 uppercase">
                    /Clients
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary leading-tight mt-4 tracking-tight">
                    Some of the Brands <br />
                </h2>
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight tracking-tight">
                    <em className="font-serif italic text-primary">We Worked With</em>
                </h2>
            </div>

            {/* ── Desktop: Logo grid (hidden on mobile) ── */}
            <div className="hidden sm:grid max-w-7xl mx-auto grid-cols-6 lg:grid-cols-8 gap-3">
                {BRANDS.map((brand) => (
                    <BrandCard key={brand.name} brand={brand} />
                ))}
            </div>

            {/* ── Mobile: 2 auto-scrolling rows (hidden on desktop) ── */}
            <div className="sm:hidden flex flex-col gap-3">
                {/* Row 1 — scrolls left */}
                <div
                    className="overflow-hidden"
                    style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
                >
                    <div className="flex gap-3 w-max animate-scroll-left hover:[animation-play-state:paused]">
                        {[...BRANDS_ROW1, ...BRANDS_ROW1].map((brand, i) => (
                            <div key={`m1-${brand.name}-${i}`} className="w-20 shrink-0">
                                <BrandCard brand={brand} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 — scrolls left at a slightly different speed */}
                <div
                    className="overflow-hidden"
                    style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
                >
                    <div className="flex gap-3 w-max animate-scroll-left-slow hover:[animation-play-state:paused]">
                        {[...BRANDS_ROW2, ...BRANDS_ROW2].map((brand, i) => (
                            <div key={`m2-${brand.name}-${i}`} className="w-20 shrink-0">
                                <BrandCard brand={brand} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;
