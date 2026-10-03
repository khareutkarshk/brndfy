"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "./fx/SmoothScroll";

/**
 * After any client-side navigation, if the URL contains a hash (e.g. /#work),
 * land on that chapter. Pinned sections above it keep adding scroll height
 * while they mount, so we re-measure before jumping and correct any drift.
 */
export default function HashScrollHandler() {
    const pathname = usePathname();

    useEffect(() => {
        const id = window.location.hash.slice(1);
        if (!id) return;

        let cancelled = false;
        let touched = false;
        const onInput = () => (touched = true);
        const inputs = ["wheel", "touchstart", "keydown"] as const;
        inputs.forEach((type) => window.addEventListener(type, onInput, { passive: true, once: true }));
        const timers: ReturnType<typeof setTimeout>[] = [];
        const later = (fn: () => void, ms: number) => timers.push(setTimeout(() => !cancelled && fn(), ms));

        // Arriving from another page: jump, don't glide. Next has already jumped
        // close to the hash; we land exactly once ScrollTrigger has re-measured.
        const land = () => {
            const el = document.getElementById(id);
            if (!el) return false;
            ScrollTrigger.refresh();
            const lenis = getLenis();
            if (lenis) {
                // Lenis caches the page height; after a route change it can still clamp
                // to the previous page's limit, so measure before jumping
                lenis.resize();
                lenis.start();
                lenis.scrollTo(el, { immediate: true, force: true });
            } else {
                el.scrollIntoView();
            }
            return true;
        };

        const go = (attempts = 0) => {
            if (!land()) {
                if (attempts < 20) later(() => go(attempts + 1), 100);
                return;
            }
            // Late layout (fonts, images, pin spacers) can still shift the target, and
            // shifting layout moves scrollY too, so watch for real input instead: once the
            // reader wheels, swipes or presses a key, we stop correcting.
            [400, 1200, 2500].forEach((ms) =>
                later(() => {
                    const top = document.getElementById(id)?.getBoundingClientRect().top ?? 0;
                    if (!touched && Math.abs(top) > 2) land();
                }, ms),
            );
        };

        // Wait for pinned sections and ChapterFlow's own refresh to settle first
        later(() => go(), 500);
        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
            inputs.forEach((type) => window.removeEventListener(type, onInput));
        };
    }, [pathname]);

    return null;
}
