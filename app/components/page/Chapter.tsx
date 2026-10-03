import SplitReveal from "../fx/SplitReveal";
import Eyebrow from "../fx/Eyebrow";

/**
 * A standard inner-page chapter: the same padding, marker and title scale as
 * the home page, so every section opens with the same weight.
 */
export default function Chapter({
    id,
    index,
    label,
    title,
    intro,
    tone,
    children,
    className = "",
}: {
    id?: string;
    index: string;
    label: string;
    title?: React.ReactNode;
    intro?: React.ReactNode;
    tone?: "deep";
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section id={id} data-tone={tone} className={`relative px-4 py-20 sm:px-10 lg:px-16 lg:py-28 ${className}`}>
            <div data-recede className="mx-auto max-w-[1400px]">
                <Eyebrow index={index} label={label} />
                {title && <SplitReveal className="chapter-title max-w-[20ch]">{title}</SplitReveal>}
                {intro && <p className="mt-6 max-w-[52ch] text-lg text-mute">{intro}</p>}
                <div className={title || intro ? "mt-12 lg:mt-16" : ""}>{children}</div>
            </div>
        </section>
    );
}
