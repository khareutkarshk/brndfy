"use client";
import FAQ from "../components/FAQ";
import React, { useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import PageShell from "../components/page/PageShell";
import SplitReveal from "../components/fx/SplitReveal";
import Eyebrow from "../components/fx/Eyebrow";

const SOCIALS = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/brndfy/",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/marketmafiaa/posts/?feedView=all",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: "WhatsApp",
        href: "https://wa.me/919690752035",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
        ),
    },
];

const Field = ({
    label,
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    required,
    textarea,
    error,
}: {
    label: string;
    id: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
    textarea?: boolean;
    error?: string;
}) => {
    const base =
        `w-full resize-none rounded-[18px] border bg-ink/60 px-5 py-4 text-paper placeholder:text-mute/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
            error ? "border-red-400/70" : "border-line focus:border-primary"
        }`;
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                {label}
                {required && <span className="ml-0.5 text-cobalt-hi">*</span>}
            </label>
            {textarea ? (
                <textarea
                    id={id}
                    rows={5}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={base}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={base}
                />
            )}
            {error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
        </div>
    );
};

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [serverError, setServerError] = useState("");

    const validate = () => {
        const e: typeof errors = {};
        if (!name.trim()) e.name = "Name is required.";
        if (!email.trim()) e.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
        if (!message.trim()) e.message = "Message is required.";
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length > 0) return;

        setStatus("loading");
        setServerError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });
            const data = await res.json();
            if (!res.ok) {
                setServerError(data.error || "Something went wrong.");
                setStatus("error");
            } else {
                setStatus("success");
                setName("");
                setEmail("");
                setMessage("");
            }
        } catch {
            setServerError("Network error. Please try again.");
            setStatus("error");
        }
    };

    return (
        <PageShell>
            {/* Opening chapter doubles as the contact sheet: the ask on the left, the form on the right */}
            <section className="relative isolate overflow-hidden px-4 pb-20 pt-36 sm:px-10 lg:px-16 lg:pb-28 lg:pt-44">
                <div className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[70%] w-[80%] -translate-x-1/2 rounded-[100%] bg-primary/25 blur-[140px]" />
                <div
                    className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
                    style={{ backgroundImage: "radial-gradient(rgba(176,215,249,0.12) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
                />

                <div data-recede className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <Eyebrow index="01" label="Contact" />
                        <SplitReveal as="h1" className="max-w-[12ch] font-display text-[clamp(2.8rem,6vw,5.6rem)] font-light leading-[0.98] tracking-[-0.045em] text-paper">
                            Let&apos;s build something <span className="font-semibold">that moves.</span>
                        </SplitReveal>
                        <p className="mt-8 max-w-[40ch] text-lg leading-relaxed text-mute">
                            Tell us the goal and budget. We will come back with the creator mix, usually within 24 hours.
                        </p>

                        <dl className="mt-12 divide-y divide-line border-y border-line">
                            {[
                                { label: "Email", value: "vikash@brndfy.com", href: "mailto:vikash@brndfy.com" },
                                { label: "Phone", value: "+91 96907 52035", href: "tel:+919690752035" },
                                { label: "Office", value: "Knowledge Park II, Greater Noida, Uttar Pradesh" },
                            ].map((row) => (
                                <div key={row.label} className="grid grid-cols-[88px_1fr] items-baseline gap-4 py-5">
                                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{row.label}</dt>
                                    <dd className="text-paper">
                                        {row.href ? (
                                            <a href={row.href} className="underline-offset-4 transition-colors hover:text-accent hover:underline">
                                                {row.value}
                                            </a>
                                        ) : (
                                            row.value
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-8 flex items-center gap-3">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="grid size-11 place-items-center rounded-full border border-paper/20 text-paper transition-colors hover:border-primary hover:bg-primary hover:text-white"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="relative overflow-hidden rounded-[28px] border border-line bg-ink-2 p-6 sm:p-10">
                            <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/15 blur-3xl" />
                            <p className="relative font-mono text-[11px] uppercase tracking-[0.18em]">
                                <span className="text-cobalt-hi">02</span> <span className="text-paper">Send us a message</span>
                            </p>

                            {status === "success" ? (
                                <div className="relative flex flex-col items-start gap-5 py-14">
                                    <CheckCircle weight="fill" className="size-14 text-primary" />
                                    <div>
                                        <h2 className="font-display text-3xl font-medium tracking-[-0.03em] text-paper">Message sent.</h2>
                                        <p className="mt-2 text-mute">Thanks for reaching out. We will get back to you within 24 hours.</p>
                                    </div>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="rounded-full border border-paper/20 px-5 py-2.5 text-sm text-paper transition-colors hover:border-paper/60"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate className="relative mt-8 flex flex-col gap-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field label="Your name" id="name" placeholder="Full name" value={name} onChange={setName} required error={errors.name} />
                                        <Field label="Email" id="email" type="email" placeholder="you@company.com" value={email} onChange={setEmail} required error={errors.email} />
                                    </div>
                                    <Field
                                        label="Message"
                                        id="message"
                                        placeholder="The objective, the budget, the timeline"
                                        value={message}
                                        onChange={setMessage}
                                        required
                                        textarea
                                        error={errors.message}
                                    />

                                    {serverError && (
                                        <p className="rounded-[18px] border border-red-400/30 bg-red-400/10 px-5 py-3 text-sm text-red-300">{serverError}</p>
                                    )}

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm text-mute">We reply within 24 hours.</p>
                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-sm font-medium text-white transition-colors hover:bg-cobalt-hi disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {status === "loading" ? "Sending…" : "Send message"}
                                            <span className="grid size-10 place-items-center rounded-full bg-white text-primary transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5">
                                                {status === "loading" ? (
                                                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                                                    </svg>
                                                ) : (
                                                    <ArrowRight weight="bold" className="size-4" />
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <FAQ index="03" />
        </PageShell>
    );
}
