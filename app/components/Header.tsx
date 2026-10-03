"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { List, X } from "@phosphor-icons/react";
import MagneticButton from "./fx/MagneticButton";
import { getLenis, scrollToTarget } from "./fx/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const NAV = [
    { name: "About Us", href: "/about" },
    { name: "Work", href: "#work" },
    { name: "Creators", href: "#creators" },
    { name: "Services", href: "#services" },
    { name: "Clients", href: "#clients" },
    { name: "FAQ's", href: "#faq" },
];

/** Hash links scroll through Lenis on the home page, or route to /#hash elsewhere. */
function useNavigate() {
    const router = useRouter();
    const pathname = usePathname();
    return (href: string, e?: React.MouseEvent) => {
        if (!href.startsWith("#")) return;
        e?.preventDefault();
        if (pathname === "/") scrollToTarget(href);
        else router.push("/" + href);
    };
}

const Header = () => {
    const bar = useRef<HTMLElement>(null);
    const progress = useRef<HTMLSpanElement>(null);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const go = useNavigate();

    // Hide on the way down, return on the way up; thin progress line underneath
    useEffect(() => {
        const el = bar.current;
        if (!el) return;
        let hidden = false;
        const st = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
                if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
                const past = self.scroll() > 120;
                el.dataset.solid = String(past);
                const hide = self.direction === 1 && past;
                if (hide === hidden) return;
                hidden = hide;
                gsap.to(el, { yPercent: hide ? -140 : 0, duration: 0.5, ease: "power3.out", overwrite: true });
            },
        });
        return () => st.kill();
    }, [pathname]);

    useEffect(() => {
        const lenis = getLenis();
        if (open) lenis?.stop();
        else lenis?.start();
    }, [open]);

    const hrefFor = (href: string) => (href.startsWith("#") && pathname !== "/" ? "/" + href : href);

    return (
        <>
            <header ref={bar} data-solid="false" className="group/bar fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-6 sm:pt-4">
                <nav className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between overflow-hidden rounded-full border border-paper/10 bg-ink/55 pl-6 pr-2 backdrop-blur-xl transition-colors duration-500 group-data-[solid=true]/bar:bg-ink/85">
                    <Link href="/" aria-label="Brndfy home" className="shrink-0" onClick={(e) => pathname === "/" && (e.preventDefault(), scrollToTarget(0))}>
                        <Image src="/brndfy_logo.png" alt="Brndfy" width={120} height={25} className="h-6 w-auto" priority />
                    </Link>

                    <div className="hidden items-center gap-1 xl:flex">
                        {NAV.map((l) => (
                            <a
                                key={l.name}
                                href={hrefFor(l.href)}
                                onClick={(e) => go(l.href, e)}
                                className="rounded-full px-4 py-2 text-sm text-paper/75 transition-colors hover:bg-paper/10 hover:text-paper"
                            >
                                {l.name}
                            </a>
                        ))}
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
                            {[{ name: "Home", href: "/" }, ...NAV].map((l, i) => (
                                <motion.a
                                    key={l.name}
                                    href={hrefFor(l.href)}
                                    onClick={(e) => {
                                        go(l.href, e);
                                        setOpen(false);
                                    }}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-display text-4xl font-light tracking-[-0.03em]"
                                >
                                    {l.name}
                                </motion.a>
                            ))}
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
