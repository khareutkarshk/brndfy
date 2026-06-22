"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
    {
        question: "How do you engage students and youth communities through campus branding?",
        answer:
            "We design on-ground activations, ambassador programs, and interactive campaigns that feel native to campus culture, ensuring authentic engagement rather than forced promotion.",
    },
    {
        question: "What's your process for onboarding and managing influencers or creators?",
        answer:
            "We identify the right-fit creators, align them with brand goals, handle contracts and communication, and monitor performance to ensure smooth execution.",
    },
    {
        question: "How do you design social media campaigns that deliver measurable impact?",
        answer:
            "We combine creative storytelling with data-driven targeting, clear KPIs, and continuous optimization to maximize reach, engagement, and conversions.",
    },
    {
        question: "What steps do you take to ensure ethical marketing practices?",
        answer:
            "We prioritize transparency, honest messaging, compliant disclosures, and audience-first communication in every campaign.",
    },
    {
        question: "How do you track ROI and performance across campaigns?",
        answer:
            "We track performance using defined KPIs, real-time analytics, and detailed reporting dashboards to measure reach, engagement, and conversions.",
    },
    {
        question: "Can you customize strategies for different brands and industries?",
        answer:
            "Yes. We tailor strategies based on industry, audience behavior, brand goals, and budget to ensure maximum relevance and impact.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className=" rounded-2xl px-8 py-16 md:px-16">
            {/* Section Label */}
            <p className="text-secondary font-medium text-sm mb-8 tracking-wide">
                / FAQ&apos;s
            </p>

            <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
                {/* Left Heading */}
                <div className="md:w-2/5 shrink-0">
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
                        Some Questions
                    </h2>
                    <h2 className="text-4xl md:text-5xl italic text-primary leading-tight font-serif font-normal">
                        For Our Client
                    </h2>
                </div>

                {/* Right Accordion */}
                <div className="flex-1 flex flex-col gap-3">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                style={{ backgroundColor: isOpen ? "#E8F3FE" : "#B0D7F9" }}
                                className="border border-primary overflow-hidden transition-colors duration-300"
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                                >
                                    <span className="text-secondary font-medium text-sm pr-4">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="shrink-0 w-7 h-7 rounded-full border border-secondary/40 flex items-center justify-center"
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7 1V13M1 7H13"
                                                stroke="#0D1350"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-6 pb-5 text-secondary/70 text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
