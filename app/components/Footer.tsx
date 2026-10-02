import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Work", href: "/#work" },
        { name: "Services", href: "/#services" },
        { name: "Contact Us", href: "/contact" },
    ];

    const socialLinks = [
        { name: "Instagram", href: "https://www.instagram.com/brndfymedia/" },
        { name: "LinkedIn", href: "https://www.linkedin.com/company/marketmafiaa/posts/?feedView=all" },
        { name: "Whatsapp", href: "https://wa.me/919690752035" },
    ];

    return (
        <footer className="relative rounded-2xl overflow-hidden">
            {/* Background */}
            <Image
                src="/Footer.avif"
                alt="Footer background"
                fill
                className="object-cover object-center"
                priority={false}
            />


            {/* Content */}
            <div className="relative z-10 px-8 pt-16 pb-8 md:px-16">

                {/* Top row */}
                <div className="flex flex-col lg:flex-row lg:justify-between gap-12 pb-16">

                    {/* Left — brand block */}
                    <div className="flex flex-col gap-6 max-w-xs">
                        {/* Logo */}
                        <Link href="/" className="shrink-0 w-fit">
                            <Image
                                src="/brndfy_logo.png"
                                alt="Brndfy Logo"
                                width={130}
                                height={44}
                                className="h-9 w-auto object-contain"
                            />
                        </Link>

                        {/* Tagline */}
                        <p className="text-white text-sm leading-relaxed">
                            Building Culture.
                            <br />Not Just Campaigns.
                        </p>

                        {/* Address */}
                        <p className="text-white text-sm leading-relaxed">
                            J-27, Gama -II, Greater Noida, 201308
                            <br />Uttar Pradesh, India
                        </p>

                        {/* Contact */}
                        <div className="flex flex-col gap-2 mt-2">
                            {/* Emails */}
                            <div className="flex flex-row gap-2 flex-nowrap">
                                <a
                                    href="mailto:vikash@brndfy.com"
                                    className="inline-flex items-center gap-2 text-white text-sm border border-white/10 rounded-full px-4 py-1.5 w-fit hover:text-white hover:border-white/30 transition-colors"
                                >
                                    vikash@brndfy.com
                                </a>

                                <a
                                    href="mailto:business@brndfy.com"
                                    className="inline-flex items-center gap-2 text-white text-sm border border-white/10 rounded-full px-4 py-1.5 w-fit hover:text-white hover:border-white/30 transition-colors"
                                >
                                    business@brndfy.com
                                </a>
                            </div>

                            {/* Contact Number */}
                            <div>
                                <a
                                    href="tel:+919690752035"
                                    className="inline-flex items-center gap-2 text-white text-sm border border-white/10 rounded-full px-4 py-1.5 w-fit hover:text-white hover:border-white/30 transition-colors"
                                >
                                    +919690752035
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right — nav columns */}
                    <div className="flex flex-row gap-16 lg:gap-24">
                        {/* Navigation */}
                        <div className="flex flex-col gap-4">
                            <p className="text-white text-sm font-semibold tracking-wide">
                                Navigation
                            </p>
                            <nav className="flex flex-col gap-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-white text-sm hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Follow Us On */}
                        <div className="flex flex-col gap-4">
                            <p className="text-white text-sm font-semibold tracking-wide">
                                Follow Us On
                            </p>
                            <nav className="flex flex-col gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white text-sm hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Locations */}
                        <div className="hidden flex-col gap-4 sm:flex">
                            <p className="text-white text-sm font-semibold tracking-wide">
                                Locations
                            </p>
                            <nav className="flex flex-col gap-3">
                                <Link href="/marketing-agency-delhi" className="text-white text-sm hover:text-white transition-colors">Delhi</Link>
                                <Link href="/marketing-agency-ncr" className="text-white text-sm hover:text-white transition-colors">Delhi NCR</Link>
                                <Link href="/marketing-agency-greater-noida" className="text-white text-sm hover:text-white transition-colors">Greater Noida</Link>
                                <Link href="/marketing-agency-india" className="text-white text-sm hover:text-white transition-colors">India</Link>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom — copyright */}
                <div className="pt-6 flex items-center justify-center">
                    <p className="text-white text-sm">
                        © {new Date().getFullYear()} Brndfy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
