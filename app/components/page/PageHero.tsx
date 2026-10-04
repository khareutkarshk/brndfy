import SplitReveal from "../fx/SplitReveal";
import Eyebrow from "../fx/Eyebrow";

/**
 * Opening chapter for inner pages. Type-led on purpose: a glow, a faint dot
 * field and the title, with an optional visual on the right and a meta row
 * of facts along the bottom rule.
 */
export default function PageHero({
    label,
    title,
    intro,
    actions,
    aside,
    meta,
    titleClassName = "max-w-[14ch] text-[clamp(2.8rem,7vw,6.4rem)]",
}: {
    label: string;
    title: React.ReactNode;
    intro?: React.ReactNode;
    actions?: React.ReactNode;
    aside?: React.ReactNode;
    meta?: { label: string; value: string }[];
    titleClassName?: string;
}) {
    return (
        <section className="relative isolate overflow-hidden px-4 pb-16 pt-36 sm:px-10 lg:px-16 lg:pb-24 lg:pt-44">
            <div className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[70%] w-[80%] -translate-x-1/2 rounded-[100%] bg-primary/25 blur-[140px]" />
            <div
                className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
                style={{ backgroundImage: "radial-gradient(rgba(176,215,249,0.12) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
            />

            <div data-recede className="mx-auto max-w-[1400px]">
                <div className={`grid items-end gap-12 ${aside ? "lg:grid-cols-12 lg:gap-16" : ""}`}>
                    <div className={aside ? "lg:col-span-7" : ""}>
                        <Eyebrow index="01" label={label} />
                        <SplitReveal as="h1" className={`font-display font-light leading-[0.98] tracking-[-0.045em] text-paper ${titleClassName}`}>
                            {title}
                        </SplitReveal>
                        {intro && <div className="mt-8 max-w-[52ch] text-lg leading-relaxed text-mute">{intro}</div>}
                        {actions && <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>}
                    </div>
                    {aside && <div className="lg:col-span-5">{aside}</div>}
                </div>

                {meta && meta.length > 0 && (
                    <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-4 lg:mt-24">
                        {meta.map((m) => (
                            <div key={m.label}>
                                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{m.label}</dt>
                                <dd className="mt-2 font-display text-lg font-medium tracking-[-0.01em] text-paper">{m.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}
            </div>
        </section>
    );
}
