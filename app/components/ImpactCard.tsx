import React from "react";
import { ImpactStat } from "@/app/data/caseStudies";

// ─── Single impact stat card ──────────────────────────────────────────────────
export function ImpactCard({ stat }: { stat: ImpactStat }) {
    return (
        <div className="p-6 sm:p-8 flex flex-col gap-4 min-h-44 sm:min-h-52 justify-between h-full">
            {/* Icon */}
            <div className="text-primary">
                {typeof stat.icon === "string" ? (
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1744FF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d={stat.icon} />
                    </svg>
                ) : (
                    stat.icon
                )}
            </div>
            
            {/* Value */}
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold italic text-primary leading-none tracking-tight">
                {stat.value}
            </p>
            {/* Label */}
            <p className="text-sm sm:text-xl font-medium text-secondary/70 leading-snug">
                {stat.label}
            </p>
        </div>
    );
}

// ─── Staggered 5-stat grid ────────────────────────────────────────────────────
// Desktop (sm+): 3×3 grid — cards at [r1,c1], [r1,c3], [r2,c2], [r3,c1], [r3,c3]
// Mobile:        2-col staggered — cards at [r1,c1], [r2,c2], [r3,c1], [r4,c2], [r5,c1]
export function ImpactGrid({ stats }: { stats: ImpactStat[] }) {
    const positions: { col: number; row: number }[] = [
        { col: 1, row: 1 },
        { col: 3, row: 1 },
        { col: 2, row: 2 },
        { col: 1, row: 3 },
        { col: 3, row: 3 },
    ];

    const mobilePositions: { col: number; row: number }[] = [
        { col: 1, row: 1 },
        { col: 2, row: 2 },
        { col: 1, row: 3 },
        { col: 2, row: 4 },
        { col: 1, row: 5 },
    ];

    return (
        <>
            {/* Desktop: 3×3 staggered */}
            <div className="hidden sm:grid grid-cols-3 grid-rows-3">
                {stats.slice(0, 5).map((stat, i) => (
                    <div
                        key={i}
                        className="border border-primary/20"
                        style={{
                            gridColumn: `${positions[i].col}`,
                            gridRow: `${positions[i].row}`,
                        }}
                    >
                        <ImpactCard stat={stat} />
                    </div>
                ))}
            </div>

            {/* Mobile: 2-col staggered */}
            <div className="sm:hidden grid grid-cols-2 grid-rows-5">
                {stats.slice(0, 5).map((stat, i) => (
                    <div
                        key={i}
                        className="border border-primary/20"
                        style={{
                            gridColumn: `${mobilePositions[i].col}`,
                            gridRow: `${mobilePositions[i].row}`,
                        }}
                    >
                        <ImpactCard stat={stat} />
                    </div>
                ))}
            </div>
        </>
    );
}
