"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToTarget } from "./fx/SmoothScroll";

/**
 * After any client-side navigation, if the URL contains a hash (e.g. /#work),
 * wait for the page to paint and then smooth-scroll to the element with that id.
 */
export default function HashScrollHandler() {
    const pathname = usePathname();

    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        const id = hash.slice(1);
        let timer: ReturnType<typeof setTimeout>;

        // Give Next.js a moment to render the new page before querying the DOM
        const tryScroll = (attempts = 0) => {
            if (document.getElementById(id)) {
                scrollToTarget(id);
            } else if (attempts < 10) {
                timer = setTimeout(() => tryScroll(attempts + 1), 100);
            }
        };

        // Wait for pinned sections to add their spacers before measuring
        timer = setTimeout(() => tryScroll(), 400);
        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
