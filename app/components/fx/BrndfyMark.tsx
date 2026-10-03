/**
 * The Brndfy symbol as two separate shapes: the D-block (brands) and the
 * circle (creators). Geometry traced from /logo3d.png. Each part is exposed
 * with a data attribute so scroll timelines can move them independently.
 */
export const MARK_VIEWBOX = "0 0 1340 1920";
export const MARK_D_PATH =
    "M40 0H860A480 480 0 0 1 860 960H40A40 40 0 0 1 0 920V40A40 40 0 0 1 40 0Z";

export default function BrndfyMark({
    className,
    dFill = "currentColor",
    circleFill = "currentColor",
}: {
    className?: string;
    dFill?: string;
    circleFill?: string;
}) {
    return (
        <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden overflow="visible">
            <path data-mark="d" d={MARK_D_PATH} fill={dFill} />
            <circle data-mark="o" cx="820" cy="1450" r="470" fill={circleFill} />
        </svg>
    );
}
