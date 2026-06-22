"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// Smoothly scrolls to a hash on the current page, or navigates to /#hash on other pages
function NavLink({
    href,
    children,
    className,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const isHash = href.startsWith('#');

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isHash) {
            e.preventDefault();
            const id = href.slice(1);
            if (pathname === '/') {
                // Already on home — just scroll
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Navigate to home with hash, then HashScrollHandler will scroll
                router.push('/' + href);
            }
            onClick?.();
        } else {
            onClick?.();
        }
    };

    return (
        <a href={isHash && pathname !== '/' ? '/' + href : href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Work', href: '#work' },
        { name: 'Services', href: '#services' },
        { name: 'Client', href: '#clients' },
        { name: "FAQ's", href: '#faq' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 px-4 py-6 md:px-10">
            <nav className="bg-[#03001A] rounded-2xl px-7.5 py-4 flex items-center justify-between shadow-lg border border-white/5">
                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <Image
                        src="/brndfy_logo.png"
                        alt="Brndfy Logo"
                        width={120}
                        height={40}
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-16">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            href={link.href}
                            className="text-white/80 hover:text-white text-md font-normal transition-colors"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Desktop Button */}
                <div className="hidden lg:block">
                    <NavLink
                        href="/case-studies"
                        className="text-white border border-white/20 px-6 py-2 rounded-full text-sm font-normal backdrop-blur-sm transition-all hover:bg-white/10"
                    >
                        Our Work
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-white p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                        suppressHydrationWarning
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-24 left-4 right-4 bg-[#03001A] rounded-2xl p-6 shadow-2xl border border-white/5 flex flex-col gap-4 z-40">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            href={link.href}
                            className="text-white/80 hover:text-white text-lg font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <NavLink
                        href="/case-studies"
                        className="bg-white text-secondary text-center px-6 py-3 rounded-full font-bold mt-2 block"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Our Work
                    </NavLink>
                </div>
            )}
        </header>
    );
};

export default Header;
