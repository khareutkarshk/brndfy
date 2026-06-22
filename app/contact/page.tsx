"use client";
import FAQ from "../components/FAQ";
import React, { useState } from "react";
import Image from "next/image";

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
        "w-full bg-white border border-secondary/15 rounded-xl px-4 py-3 text-secondary placeholder:text-secondary/35 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none";
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-semibold text-secondary/60 tracking-wide uppercase">
                {label}{required && <span className="text-primary ml-0.5">*</span>}
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
            {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
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
        <div className="bg-white p-3 rounded-2xl flex flex-col gap-3 min-h-screen">

            {/* ── HERO ── */}
            <div className="relative rounded-2xl min-h-[60vh] lg:min-h-[75vh] w-full bg-secondary overflow-hidden">
                {/* Background */}
                <Image
                    src="/bg.png"
                    alt="Contact Hero Background"
                    fill
                    className="object-cover"
                    priority
                />

                {/* 3D logo — right side */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] lg:w-[45%] h-full flex items-center justify-end pr-8 sm:pr-16 lg:pr-24 pointer-events-none">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-105 lg:h-105">
                        <Image
                            src="/logo3d.png"
                            alt="Brndfy 3D Logo"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                </div>

                {/* Text — left side */}
                <div className="relative z-10 flex flex-col justify-center min-h-[60vh] lg:min-h-[75vh] px-6 sm:px-12 lg:px-20 pt-28 pb-16 max-w-2xl">
                    <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 font-normal mb-6">
                        Get In Touch
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-none tracking-tight">
                        Let&apos;s Build<br />
                        Something<br />
                        <em className="font-serif italic font-normal text-primary">That Moves.</em>
                    </h1>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 right-6 sm:right-12 lg:right-20 z-20 flex items-center gap-3 text-white/60">
                    <span className="text-[10px] uppercase tracking-[0.25em]">Scroll for more</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </div>

            {/* ── CONTACT BODY ── */}
            <section className=" rounded-2xl px-6 sm:px-12 lg:px-20 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* ── LEFT — info ── */}
                    <div className="lg:col-span-5 flex flex-col gap-10">
                        <div>
                            <span className="text-sm font-bold tracking-[0.2em] text-secondary uppercase">
                                / Let&apos;s Connect
                            </span>
                        </div>

                        {/* Info blocks */}
                        <div className="flex flex-col gap-8">
                            {/* Address */}
                            <div className="flex flex-col gap-1.5">
                                <p className="text-xs font-bold tracking-[0.15em] uppercase text-secondary">Address</p>
                                <p className="text-secondary text-sm leading-relaxed">
                                    Knowledge Park II, Greater Noida,<br />Uttar Pradesh, India
                                </p>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <p className="text-xs font-bold tracking-[0.15em] uppercase text-secondary">Email</p>
                                <a
                                    href="mailto:vikash@brndfy.com"
                                    className="text-secondary text-sm hover:text-primary transition-colors"
                                >
                                    vikash@brndfy.com
                                </a>
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-1.5">
                                <p className="text-xs font-bold tracking-[0.15em] uppercase text-secondary">Phone</p>
                                <div className="flex flex-col gap-1">
                                    <a href="tel:+919690752035" className="text-secondary text-sm hover:text-primary transition-colors">
                                        +91 9690752035
                                    </a>
                                   
                                </div>
                            </div>

                            {/* Follow Us */}
                            <div className="flex flex-col gap-3">
                                <p className="text-xs font-bold tracking-[0.15em] uppercase text-secondary/50">Follow Us</p>
                                <div className="flex items-center gap-3">
                                    {SOCIALS.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.label}
                                            className="w-10 h-10 rounded-full border border-secondary/15 flex items-center justify-center text-secondary hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT — form ── */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-2xl">
                            <div className="mb-8">
                                <span className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">
                                    / Send Us A Message
                                </span>
                                <p className="text-secondary/60 text-sm mt-2 leading-relaxed">
                                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                                </p>
                            </div>

                            {/* Success state */}
                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1744FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-secondary text-lg font-bold tracking-tight">Message Sent!</h3>
                                        <p className="text-secondary/60 text-sm mt-1">
                                            Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="text-primary text-sm font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                                    <Field
                                        label="Your Name"
                                        id="name"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={setName}
                                        required
                                        error={errors.name}
                                    />
                                    <Field
                                        label="Email"
                                        id="email"
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={setEmail}
                                        required
                                        error={errors.email}
                                    />
                                    <Field
                                        label="Message"
                                        id="message"
                                        placeholder="Tell us about your project"
                                        value={message}
                                        onChange={setMessage}
                                        required
                                        textarea
                                        error={errors.message}
                                    />

                                    {serverError && (
                                        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                                            {serverError}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="mt-2 w-full bg-primary text-white rounded-xl py-3.5 px-6 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                                                </svg>
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            <FAQ />

        </div>
    );
}
