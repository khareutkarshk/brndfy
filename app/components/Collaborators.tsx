"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

// ─── Top 20 college logos ────────────────────────────────────────────────────
import c01 from "@/assets/logos/All Colleges/college-01.jpeg";
import c02 from "@/assets/logos/All Colleges/college-02.jpeg";
import c03 from "@/assets/logos/All Colleges/college-03.jpeg";
import c04 from "@/assets/logos/All Colleges/college-04.jpeg";
import c05 from "@/assets/logos/All Colleges/college-05.jpeg";
import c06 from "@/assets/logos/All Colleges/college-06.jpeg";
import c07 from "@/assets/logos/All Colleges/college-07.jpeg";
import c08 from "@/assets/logos/All Colleges/college-08.jpeg";
import c09 from "@/assets/logos/All Colleges/college-09.jpeg";
import c10 from "@/assets/logos/All Colleges/college-10.jpeg";
import c11 from "@/assets/logos/All Colleges/college-11.jpeg";
import c12 from "@/assets/logos/All Colleges/college-12.jpeg";
import c13 from "@/assets/logos/All Colleges/college-13.jpeg";
import c14 from "@/assets/logos/All Colleges/college-14.jpeg";
import c15 from "@/assets/logos/All Colleges/college-15.jpeg";
import c16 from "@/assets/logos/All Colleges/college-16.jpeg";
import c17 from "@/assets/logos/All Colleges/college-17.jpeg";
import c18 from "@/assets/logos/All Colleges/college-18.jpeg";
import c19 from "@/assets/logos/All Colleges/college-19.jpeg";
import c20 from "@/assets/logos/All Colleges/college-20.jpeg";
import c21 from "@/assets/logos/All Colleges/college-21.jpeg";
import c22 from "@/assets/logos/All Colleges/college-22.jpeg";

// ─── Hover bg images ─────────────────────────────────────────────────────────
import Bg1 from "@/assets/logos/brands/bg1.png";
import Bg2 from "@/assets/logos/brands/bg2.png";
import Bg3 from "@/assets/logos/brands/bg3.png";
import Bg4 from "@/assets/logos/brands/bg4.png";

const BG_IMAGES = [Bg1, Bg2, Bg3, Bg4];

// Layout: row1=6 | row2: 2x2 + center + 2x2 | row3=6  → 22 logos total
const TOP_ROW   = [c01, c02, c03, c04, c05, c06];
const MID_LEFT  = [c07, c08, c09, c10];   // rendered as 2x2 grid
const MID_RIGHT = [c11, c12, c13, c14];   // rendered as 2x2 grid
const BOT_ROW   = [c15, c16, c17, c18, c19, c20];

// All logos flat for mobile marquee, split into 2 rows
const ALL_COLLEGES = [c01, c02, c03, c04, c05, c06, c07, c08, c09, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22];
const MOB_ROW1 = ALL_COLLEGES.slice(0, Math.ceil(ALL_COLLEGES.length / 2));
const MOB_ROW2 = ALL_COLLEGES.slice(Math.ceil(ALL_COLLEGES.length / 2));

// ─── Single circular logo card ───────────────────────────────────────────────
const CollegeCard = ({
  src,
  bgIndex,
}: {
  src: StaticImageData;
  bgIndex: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const bg = BG_IMAGES[bgIndex % BG_IMAGES.length];

  return (
    <div
      className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-secondary/10 bg-[#F8F8F7] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover bg */}
      <Image
        src={bg}
        alt=""
        fill
        aria-hidden
        className={`object-cover transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
        sizes="90px"
      />
      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-17.5 h-17.5">
          <Image
            src={src}
            alt="College partner"
            fill
            className={`object-contain z-10 transition-all duration-300 ${hovered ? "drop-shadow-lg" : ""}`}
            sizes="70px"
          />
        </div>
      </div>
    </div>
  );
};


const Collaborators = () => {
  return (
    <section
      id="collaborators"
      className="relative bg-white rounded-2xl py-20 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* ── Mobile: Heading on top + 2 auto-scrolling rows ── */}
      <div className="sm:hidden">
        {/* Header */}
        <div className="text-center px-6 mb-8">
          <span className="text-[10px] font-bold tracking-[0.2em] text-secondary/50 uppercase block mb-2">
            /Collaborators
          </span>
          <h2 className="text-2xl font-bold text-secondary leading-tight tracking-tight">
            Partners
          </h2>
          <h2 className="text-2xl font-normal leading-tight tracking-tight">
            <em className="font-serif italic text-primary">We Worked With</em>
          </h2>
        </div>

        {/* Row 1 — scrolls left */}
        <div
          className="overflow-hidden mb-3"
          style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
        >
          <div className="flex gap-3 w-max animate-scroll-left hover:[animation-play-state:paused]">
            {[...MOB_ROW1, ...MOB_ROW1].map((src, i) => (
              <CollegeCard key={`mob1-${i}`} src={src} bgIndex={i} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls left at a slightly different speed */}
        <div
          className="overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
        >
          <div className="flex gap-3 w-max animate-scroll-left-slow hover:[animation-play-state:paused]">
            {[...MOB_ROW2, ...MOB_ROW2].map((src, i) => (
              <CollegeCard key={`mob2-${i}`} src={src} bgIndex={i + 11} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop: Original layout (hidden on mobile) ── */}
      <div className="hidden sm:block max-w-5xl mx-auto">

        {/* Row 1: 6 logos */}
        <div className="flex justify-center gap-4 sm:gap-5 lg:gap-6 mb-4 sm:mb-5 lg:mb-6">
          {TOP_ROW.map((src, i) => (
            <CollegeCard key={`top-${i}`} src={src} bgIndex={i} />
          ))}
        </div>

        {/* Row 2: 2x2 left | center text | 2x2 right */}
        <div className="flex items-center justify-between gap-4 sm:gap-5 lg:gap-6 mb-4 sm:mb-5 lg:mb-6">
          {/* Left 2×2 grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {MID_LEFT.map((src, i) => (
              <CollegeCard key={`ml-${i}`} src={src} bgIndex={i + 6} />
            ))}
          </div>

          {/* Center text */}
          <div className="text-center px-2 sm:px-6 lg:px-10">
            <span className="text-xs font-bold tracking-[0.2em] text-secondary/50 uppercase block mb-2">
              /Collaborators
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary leading-tight tracking-tight">
              Partners
            </h2>
            <h2 className="text-3xl lg:text-4xl font-normal leading-tight tracking-tight">
              <em className="font-serif italic text-primary">We Worked With</em>
            </h2>
          </div>

          {/* Right 2×2 grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {MID_RIGHT.map((src, i) => (
              <CollegeCard key={`mr-${i}`} src={src} bgIndex={i + 10} />
            ))}
          </div>
        </div>

        {/* Row 3: 6 logos */}
        <div className="flex justify-center gap-4 sm:gap-5 lg:gap-6">
          {BOT_ROW.map((src, i) => (
            <CollegeCard key={`bot-${i}`} src={src} bgIndex={i + 10} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Collaborators;
