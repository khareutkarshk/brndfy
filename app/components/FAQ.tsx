"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import SplitReveal from "./fx/SplitReveal";

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

    return (
        <section id="faq" className="relative bg-ink px-4 py-24 sm:px-10 lg:px-16 lg:py-32">
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                        <SplitReveal className="max-w-[12ch] font-display text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.035em] text-paper">
                            Questions, <span className="font-semibold">answered.</span>
                        </SplitReveal>
                        <p className="mt-6 max-w-[34ch] text-mute">
                            Anything else? Write to{" "}
                            <a href="mailto:business@brndfy.com" className="text-paper underline underline-offset-4 hover:text-accent">
                                business@brndfy.com
                            </a>
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={faq.question} className="border-b border-line first:border-t">
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    aria-expanded={isOpen}
                                    className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-8"
                                >
                                    <span
                                        className={`font-display text-lg font-normal leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-2xl ${
                                            isOpen ? "text-paper" : "text-paper/70 group-hover:text-paper"
                                        }`}
                                    >
                                        {faq.question}
                                    </span>
                                    <motion.span
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                        className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                                            isOpen ? "bg-primary text-white" : "border border-paper/20 text-paper group-hover:border-paper/50"
                                        }`}
                                    >
                                        <Plus weight="bold" className="size-4" />
                                    </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-[62ch] pb-8 pr-16 leading-relaxed text-mute">{faq.answer}</p>
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
