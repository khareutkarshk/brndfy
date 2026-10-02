"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
    {
        question: "How do you find the right creators for our brand?",
        answer:
            "We shortlist creators based on your audience, niche, geography and campaign goal. We check audience quality and past content before any profile reaches you.",
    },
    {
        question: "What does your end-to-end campaign process look like?",
        answer:
            "We start from your objective, then handle creator selection, briefs and scripts, approvals, agreements, payments and publishing. You stay updated at every stage without chasing anyone.",
    },
    {
        question: "How do you make sure creator pricing is fair?",
        answer:
            "We negotiate creator rates directly and share the real commercials with you. There are no inflated quotes, so you know exactly where your budget is going.",
    },
    {
        question: "How do you track and report campaign performance?",
        answer:
            "Every campaign runs on a shared sheet and doc that we keep updated throughout. After publishing, we report reach, views and engagement against your objective.",
    },
    {
        question: "What does your talent management service include?",
        answer:
            "We represent creators from onboarding to brand deals: profile positioning, brand matching, rate negotiation and payment follow-ups. Creators focus on content while we handle the business side.",
    },
    {
        question: "How do creators get brand collaborations through you?",
        answer:
            "Creators on our roster are matched to campaigns that fit their niche and audience. We manage the brief, rates and coordination so both sides know what is expected before work begins.",
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
