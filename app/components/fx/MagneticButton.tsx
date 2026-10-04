"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type Variant = "solid" | "ghost" | "light";

const STYLES: Record<Variant, string> = {
    solid: "bg-primary text-white hover:bg-cobalt-hi",
    ghost: "text-paper border border-paper/25 hover:border-paper/60 backdrop-blur-sm",
    light: "bg-paper text-ink hover:bg-white",
};

/**
 * Pill CTA that leans toward the cursor. Motion values only, so pointer
 * movement never re-renders React. The arrow swaps on hover.
 */
export default function MagneticButton({
    href,
    children,
    variant = "solid",
    className = "",
    onClick,
    strength = 0.35,
}: {
    href: string;
    children: React.ReactNode;
    variant?: Variant;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    strength?: number;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const reduce = useReducedMotion();
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
    const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });

    const onMove = (e: React.PointerEvent) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <motion.span style={{ x, y }} className="inline-block">
            <Link
                ref={ref}
                href={href}
                onClick={onClick}
                onPointerMove={onMove}
                onPointerLeave={reset}
                className={`group relative inline-flex items-center gap-3 whitespace-nowrap rounded-full py-3 pl-6 pr-3 text-sm font-medium transition-colors duration-300 active:scale-[0.97] ${STYLES[variant]} ${className}`}
            >
                <span>{children}</span>
                <span
                    className={`relative grid size-8 place-items-center overflow-hidden rounded-full ${
                        variant === "solid" ? "bg-white/15" : variant === "light" ? "bg-ink text-paper" : "bg-paper/10"
                    }`}
                >
                    <ArrowUpRight
                        weight="bold"
                        className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-8 group-hover:translate-x-8"
                    />
                    <ArrowUpRight
                        weight="bold"
                        className="absolute size-4 -translate-x-8 translate-y-8 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0"
                    />
                </span>
            </Link>
        </motion.span>
    );
}
