import { ImpactStat } from "@/app/data/caseStudies";
import Odometer from "./fx/Odometer";

// Icons arrive with hard-coded #1744FF paint; recolour them per surface
const ICON_ON_INK = "[&_svg]:size-7 [&_[stroke='#1744FF']]:stroke-accent [&_[fill='#1744FF']]:fill-accent [&_svg[stroke='#1744FF']]:stroke-accent";
const ICON_ON_BLUE = "[&_svg]:size-7 [&_[stroke='#1744FF']]:stroke-white [&_[fill='#1744FF']]:fill-white [&_svg[stroke='#1744FF']]:stroke-white";

// ─── Single impact stat card ──────────────────────────────────────────────────
export function ImpactCard({ stat, lead = false }: { stat: ImpactStat; lead?: boolean }) {
    return (
        <div
            className={`relative flex h-full min-h-[220px] flex-col justify-between gap-10 overflow-hidden rounded-[28px] p-7 sm:p-9 ${
                lead ? "bg-primary" : "border border-line bg-ink-2"
            }`}
        >
            {lead && <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />}
            <div className={`relative grid size-14 place-items-center rounded-full ${lead ? "bg-white/15" : "bg-primary/15"} ${lead ? ICON_ON_BLUE : ICON_ON_INK}`}>
                {typeof stat.icon === "string" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1744FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={stat.icon} />
                    </svg>
                ) : (
                    stat.icon
                )}
            </div>
            <div className="relative">
                <Odometer
                    value={stat.value}
                    className={`font-display font-semibold leading-none tracking-[-0.04em] ${
                        lead ? "text-[clamp(3.4rem,6vw,5.4rem)] text-white" : "text-[clamp(2.2rem,3.4vw,3rem)] text-paper"
                    }`}
                />
                <p className={`mt-3 text-sm sm:text-base ${lead ? "text-white/85" : "text-mute"}`}>{stat.label}</p>
            </div>
        </div>
    );
}

// ─── Impact bento ─────────────────────────────────────────────────────────────
// Five stats: the first leads wide, the rest fill a row of three below it
export function ImpactGrid({ stats }: { stats: ImpactStat[] }) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, i) => (
                <div key={stat.label} className={i === 0 ? "sm:col-span-2" : ""}>
                    <ImpactCard stat={stat} lead={i === 0} />
                </div>
            ))}
        </div>
    );
}
