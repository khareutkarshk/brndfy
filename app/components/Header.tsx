"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { List, X } from "@phosphor-icons/react";
import MagneticButton from "./fx/MagneticButton";
import { getLenis, scrollToTarget } from "./fx/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

/** Pages are routes; home chapters are /#hash so they work from any page */
const NAV = [
    { name: "About", href: "/about" },
    { name: "Case studies", href: "/case-studies" },
    { name: "Creators", href: "/#creators" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/contact" },
];

/**
 * On the home page, chapter links scroll through Lenis instead of jumping.
 * Lenis is resumed first: the mobile menu pauses it, and a paused Lenis
 * ignores scrollTo. Everything else is left to Next's router, and
 * HashScrollHandler finishes /#hash arrivals from other pages.
 */
function useNavigate() {
    const pathname = usePathname();
    return (href: string, e: React.MouseEvent) => {
        if (pathname !== "/") return;
        if (href === "/" || href.startsWith("/#")) {
            e.preventDefault();
            getLenis()?.start();
            scrollToTarget(href === "/" ? 0 : href.slice(1));
            history.replaceState(null, "", href === "/" ? "/" : href);
        }
    };
}

/** Route links light up on their page (and its children); chapter links never do */
const isCurrent = (href: string, pathname: string) => !href.includes("#") && href !== "/" && pathname.startsWith(href);

const Header = () => {
    const bar = useRef<HTMLElement>(null);
    const progress = useRef<HTMLSpanElement>(null);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    // Any route change (including back/forward) closes the menu
    const [menuPath, setMenuPath] = useState(pathname);
    if (menuPath !== pathname) {
        setMenuPath(pathname);
        setOpen(false);
    }
    const go = useNavigate();

    // Hide on the way down, return on the way up; thin progress line underneath
    useEffect(() => {
        const el = bar.current;
        if (!el) return;
        let hidden = false;
        const setHidden = (hide: boolean) => {
            if (hide === hidden) return;
            hidden = hide;
            gsap.to(el, { yPercent: hide ? -140 : 0, duration: 0.5, ease: "power3.out", overwrite: true });
        };

        // A new page starts with the bar in view, even if we left the last one mid-hide:
        // overwrite kills a hide tween still running from the previous page. While the
        // route settles the old scroll offset can still report "going down", so the bar
        // may show but not hide for a moment.
        gsap.set(el, { yPercent: 0, overwrite: true });
        const settled = performance.now() + 600;
        const st = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
                if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
                const past = self.scroll() > 120;
                el.dataset.solid = String(past);
                setHidden(self.direction === 1 && past && performance.now() > settled);
            },
        });

        // At the very top nothing scrolls, so no update fires: catch a stale hide once the
        // route has settled, and let any upward gesture bring the bar back
        const check = window.setTimeout(() => window.scrollY <= 120 && setHidden(false), 800);
        let touchY = 0;
        const onWheel = (e: WheelEvent) => e.deltaY < 0 && setHidden(false);
        const onTouchStart = (e: TouchEvent) => (touchY = e.touches[0].clientY);
        const onTouchMove = (e: TouchEvent) => e.touches[0].clientY - touchY > 8 && setHidden(false);
        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });

        return () => {
            st.kill();
            window.clearTimeout(check);
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, [pathname]);

    useEffect(() => {
        const lenis = getLenis();
        if (open) lenis?.stop();
        else lenis?.start();
    }, [open]);

    return (
        <>
            <header ref={bar} data-solid="false" className="group/bar fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-6 sm:pt-4">
                <nav className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between overflow-hidden rounded-full border border-paper/10 bg-ink/55 pl-6 pr-2 backdrop-blur-xl transition-colors duration-500 group-data-[solid=true]/bar:bg-ink/85">
                    <Link href="/" aria-label="Brndfy home" className="shrink-0" onClick={(e) => go("/", e)}>
                        <Image src="/brndfy_logo.png" alt="Brndfy" width={120} height={25} className="h-6 w-auto" priority />
                    </Link>

                    <div className="hidden items-center gap-1 xl:flex">
                        {NAV.map((l) => {
                            const current = isCurrent(l.href, pathname);
                            return (
                                <Link
                                    key={l.name}
                                    href={l.href}
                                    onClick={(e) => go(l.href, e)}
                                    aria-current={current ? "page" : undefined}
                                    className={`rounded-full px-4 py-2 text-sm transition-colors hover:bg-paper/10 hover:text-paper ${
                                        current ? "bg-paper/10 text-paper" : "text-paper/75"
                                    }`}
                                >
                                    {l.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden xl:block">
                        <MagneticButton href="/contact" strength={0.2} className="py-2! pl-5!">
                            Start a campaign
                        </MagneticButton>
                    </div>

                    <button
                        className="grid size-12 place-items-center rounded-full text-paper xl:hidden"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                    >
                        {open ? <X className="size-6" /> : <List className="size-6" />}
                    </button>

                    <span ref={progress} className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-primary" aria-hidden />
                </nav>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-[55] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-paper xl:hidden"
                        initial={{ clipPath: "inset(0 0 100% 0)" }}
                        animate={{ clipPath: "inset(0 0 0% 0)" }}
                        exit={{ clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <nav className="flex flex-col gap-1">
                            {[{ name: "Home", href: "/" }, ...NAV].map((l, i) => {
                                const current = isCurrent(l.href, pathname) || (l.href === "/" && pathname === "/");
                                return (
                                    <motion.div
                                        key={l.name}
                                        initial={{ y: 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <Link
                                            href={l.href}
                                            onClick={(e) => {
                                                setOpen(false);
                                                go(l.href, e);
                                            }}
                                            aria-current={current ? "page" : undefined}
                                            className={`flex items-baseline gap-4 py-1 font-display text-[clamp(2rem,9vw,2.6rem)] font-light tracking-[-0.03em] ${
                                                current ? "text-paper" : "text-paper/70"
                                            }`}
                                        >
                                            <span className="font-mono text-[11px] text-cobalt-hi">{String(i + 1).padStart(2, "0")}</span>
                                            {l.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} onClick={() => setOpen(false)}>
                            <MagneticButton href="/contact">Start a campaign</MagneticButton>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
