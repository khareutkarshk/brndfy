"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { embedUrl, isVertical, platformOf, type Reel } from "@/app/data/influencerWork";
import { getLenis } from "./SmoothScroll";

/**
 * In-page player for creator videos. YouTube and Instagram both expose an
 * embeddable URL; if an embed is blocked the viewer can still open the
 * original post from the footer link.
 */
export default function VideoLightbox({
    reel,
    brand,
    onClose,
}: {
    reel: Reel | null;
    brand?: string;
    onClose: () => void;
}) {
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!reel) return;
        const lenis = getLenis();
        lenis?.stop();
        const prevFocus = document.activeElement as HTMLElement | null;
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            lenis?.start();
            prevFocus?.focus();
        };
    }, [reel, onClose]);

    const src = reel ? embedUrl(reel.url) : null;
    const vertical = reel ? isVertical(reel.url) : false;
    const platform = reel ? platformOf(reel.url) : "youtube";

    return (
        <AnimatePresence>
            {reel && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${reel.creator} video${brand ? ` for ${brand}` : ""}`}
                    className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    data-lenis-prevent
                >
                    <button aria-label="Close video" className="absolute inset-0 cursor-default bg-ink/85 backdrop-blur-md" onClick={onClose} />

                    <motion.div
                        className="relative flex max-h-full w-full flex-col items-center"
                        style={{ maxWidth: vertical ? 400 : 1100 }}
                        initial={{ y: 40, scale: 0.96 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 20, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    >
                        <div className="mb-3 flex w-full items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="truncate font-display text-base font-medium text-paper">{reel.creator}</p>
                                {brand && <p className="truncate text-xs text-mute">for {brand}</p>}
                            </div>
                            <button
                                ref={closeRef}
                                onClick={onClose}
                                aria-label="Close video"
                                className="grid size-10 shrink-0 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20"
                            >
                                <X weight="bold" className="size-4" />
                            </button>
                        </div>

                        <div
                            className={`relative w-full overflow-hidden rounded-[20px] bg-ink-2 ring-1 ring-line ${
                                vertical ? "aspect-[9/16] max-h-[72dvh]" : "aspect-video"
                            }`}
                        >
                            {src && (
                                <iframe
                                    src={src}
                                    title={`${reel.creator} video`}
                                    className="absolute inset-0 size-full"
                                    allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                                    allowFullScreen
                                />
                            )}
                        </div>

                        <div className="mt-3 flex w-full flex-wrap items-center justify-between gap-3 text-sm">
                            <a href={reel.profile} target="_blank" rel="noopener noreferrer" className="text-mute underline-offset-4 hover:text-paper hover:underline">
                                View creator profile
                            </a>
                            <a
                                href={reel.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-4 py-2 text-paper transition-colors hover:border-paper/50"
                            >
                                Open on {platform === "youtube" ? "YouTube" : "Instagram"}
                                <ArrowUpRight weight="bold" className="size-3.5" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
