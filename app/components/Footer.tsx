import Image from "next/image";
import Link from "next/link";

const NAV = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Case studies", href: "/case-studies" },
    { name: "Influencer marketing", href: "/influencer-marketing-agency" },
    { name: "Creators", href: "/#creators" },
    { name: "Services", href: "/#services" },
    { name: "Contact Us", href: "/contact" },
];

const SOCIAL = [
    { name: "Instagram", href: "https://www.instagram.com/brndfymedia/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/marketmafiaa/posts/?feedView=all" },
    { name: "WhatsApp", href: "https://wa.me/919690752035" },
];

const LOCATIONS = [
    { name: "Delhi", href: "/marketing-agency-delhi" },
    { name: "Delhi NCR", href: "/marketing-agency-ncr" },
    { name: "Noida", href: "/marketing-agency-noida" },
    { name: "Greater Noida", href: "/marketing-agency-greater-noida" },
    { name: "India", href: "/marketing-agency-india" },
];

const linkCls = "text-sm text-paper/70 transition-colors hover:text-paper";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden rounded-[28px] bg-ink-2 text-paper ring-1 ring-line">
            <div className="pointer-events-none absolute -bottom-1/2 left-1/2 h-full w-[120%] -translate-x-1/2 rounded-[100%] bg-primary/20 blur-[120px]" />

            <div className="relative mx-auto max-w-[1400px] px-6 pt-16 sm:px-10 lg:px-16">
                <div className="grid grid-cols-2 gap-10 pb-16 md:grid-cols-4 lg:grid-cols-12">
                    <div className="col-span-2 flex flex-col gap-6 lg:col-span-5">
                        <p className="max-w-[22ch] font-display text-2xl font-light leading-tight tracking-[-0.02em] text-paper">
                            Building culture. <span className="font-semibold">Not just campaigns.</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <a href="mailto:business@brndfy.com" className="rounded-full border border-paper/15 px-4 py-2 text-sm text-paper transition-colors hover:border-paper/50">
                                business@brndfy.com
                            </a>
                            <a href="mailto:vikash@brndfy.com" className="rounded-full border border-paper/15 px-4 py-2 text-sm text-paper transition-colors hover:border-paper/50">
                                vikash@brndfy.com
                            </a>
                            <a href="tel:+919690752035" className="rounded-full border border-paper/15 px-4 py-2 text-sm text-paper transition-colors hover:border-paper/50">
                                +91 96907 52035
                            </a>
                        </div>
                        <p className="text-sm leading-relaxed text-mute">
                            J-27, Gama-II, Greater Noida 201308
                            <br />
                            Uttar Pradesh, India
                        </p>
                    </div>

                    <nav className="flex flex-col gap-3 lg:col-span-2 lg:col-start-7" aria-label="Footer">
                        <p className="mb-1 font-display text-sm font-medium text-paper">Navigate</p>
                        {NAV.map((l) => (
                            <Link key={l.name} href={l.href} className={linkCls}>
                                {l.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex flex-col gap-3 lg:col-span-2">
                        <p className="mb-1 font-display text-sm font-medium text-paper">Follow</p>
                        {SOCIAL.map((l) => (
                            <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                                {l.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3 lg:col-span-2">
                        <p className="mb-1 font-display text-sm font-medium text-paper">Locations</p>
                        {LOCATIONS.map((l) => (
                            <Link key={l.name} href={l.href} className={linkCls}>
                                {l.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <Link href="/" aria-label="Brndfy home" className="block">
                    <Image
                        src="/brndfy_logo.png"
                        alt="Brndfy"
                        width={2030}
                        height={421}
                        sizes="(max-width: 1400px) 100vw, 1400px"
                        className="h-auto w-full opacity-95"
                    />
                </Link>

                <div className="flex flex-col gap-2 py-6 text-xs text-mute sm:flex-row sm:justify-between">
                    <p>© {new Date().getFullYear()} Brndfy Media. All rights reserved.</p>
                    <p>Finance-first influencer marketing agency</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
