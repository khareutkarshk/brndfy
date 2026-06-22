"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import Abhibus from "@/assets/logos/brands/Abhibus.png";
import Abros from "@/assets/logos/brands/abros.jpeg";
import AmarUjala from "@/assets/logos/brands/amarujala.png";
import AmericanWaffle from "@/assets/logos/brands/americanwaffle.jpeg";
import BurgerSingh from "@/assets/logos/brands/burgersingh.png";
import Cadbury from "@/assets/logos/brands/cadbury.png";
import CampusTimes from "@/assets/logos/brands/campustimes.png";
import CocaCola from "@/assets/logos/brands/cocacola.jpeg";
import CoolbergBlack from "@/assets/logos/brands/CoolbergLogo_black.png";
import Drishti from "@/assets/logos/brands/dristhi.png";
import Emoi from "@/assets/logos/brands/emoi.png";
import Evepaper from "@/assets/logos/brands/evepaper.png";
import Extracts from "@/assets/logos/brands/extracts.png";
import Fancode from "@/assets/logos/brands/fancode.png";
import HilaryRhoda from "@/assets/logos/brands/hilaryrhoda.jpeg";
import Ixigo from "@/assets/logos/brands/ixigo.jpeg";
import JainShikanji from "@/assets/logos/brands/jainshikanji.png";
import JioSavaan from "@/assets/logos/brands/jiosavaan.png";
import Midnight from "@/assets/logos/brands/midnight.png";
import Monster from "@/assets/logos/brands/monster.png";
import Ocean from "@/assets/logos/brands/ocean.png";
import Osata from "@/assets/logos/brands/osata.png";
import Outdefine from "@/assets/logos/brands/outdefine.png";
import PolkaPop from "@/assets/logos/brands/polkapop.png";
import Predator from "@/assets/logos/brands/predator.png";
import Qelica from "@/assets/logos/brands/qelica.png";
import Qoneqt from "@/assets/logos/brands/qoneqt.png";
import Rabrees from "@/assets/logos/brands/rabrees.png";
import RedBull from "@/assets/logos/brands/redbull.png";
import SevaHub from "@/assets/logos/brands/sevahub.png";
import SkillArena from "@/assets/logos/brands/skillarena.png";
import Smaaash from "@/assets/logos/brands/smaaash.jpeg";
import StockEdge from "@/assets/logos/brands/stockedge.jpeg";
import TFE from "@/assets/logos/brands/tfe.jpeg";
import TheWaffleCo from "@/assets/logos/brands/thewaffleco.png";
import Unacademy from "@/assets/logos/brands/unacademy.png";
import Unstop from "@/assets/logos/brands/unstop.png";
import VedicJal from "@/assets/logos/brands/vedicjal.png";
import Viberse from "@/assets/logos/brands/viberse.png";

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
    { name: "Abhibus", logo: Abhibus },
    { name: "Coca-Cola", logo: CocaCola },
    { name: "Abros", logo: Abros },
    { name: "Amar Ujala", logo: AmarUjala },
    { name: "Monster Energy", logo: Monster },
    { name: "Qoneqt", logo: Qoneqt },
    { name: "Red Bull", logo: RedBull },
    { name: "Hilary Rhoda", logo: HilaryRhoda },
    { name: "Ixigo", logo: Ixigo },
    { name: "Coolberg", logo: CoolbergBlack },
    { name: "Cadbury", logo: Cadbury },
    { name: "Unacademy", logo: Unacademy },
    { name: "JioSavaan", logo: JioSavaan },
    { name: "Unstop", logo: Unstop },
    { name: "Smaaash", logo: Smaaash },
    { name: "Stock Edge", logo: StockEdge },
    { name: "Emoi", logo: Emoi },
    { name: "American Waffle", logo: AmericanWaffle },
    { name: "Fancode", logo: Fancode },
    { name: "TFE", logo: TFE },
    { name: "Qelica", logo: Qelica },
    { name: "Skill Arena", logo: SkillArena },
    { name: "Predator", logo: Predator },
    { name: "Polka Pop", logo: PolkaPop },
    { name: "Osata", logo: Osata },
    { name: "Outdefine", logo: Outdefine },
    { name: "Viberse", logo: Viberse },
    { name: "The Waffle Co.", logo: TheWaffleCo },
    { name: "Drishti IAS", logo: Drishti },
    { name: "Burger Singh", logo: BurgerSingh },
    { name: "Extracts", logo: Extracts },
    { name: "Midnight", logo: Midnight },
    { name: "Ocean", logo: Ocean },
    { name: "Rabrees", logo: Rabrees },
    { name: "Seva Hub", logo: SevaHub },
    { name: "Evepaper", logo: Evepaper },
    { name: "Jain Shikanji", logo: JainShikanji },
    { name: "Campus Times", logo: CampusTimes },
    { name: "Vedic Jal", logo: VedicJal },
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

