"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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

        // Give Next.js a moment to render the new page before querying the DOM
        const tryScroll = (attempts = 0) => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            } else if (attempts < 10) {
                setTimeout(() => tryScroll(attempts + 1), 100);
            }
        };

        // Small initial delay so the new page content is mounted
        setTimeout(() => tryScroll(), 80);
    }, [pathname]);

    return null;
}
