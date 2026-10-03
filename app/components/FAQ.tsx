"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import SplitReveal from "./fx/SplitReveal";
import Eyebrow from "./fx/Eyebrow";

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

/** `index` is the chapter number on the host page; `items` swaps in page-specific questions */
const FAQ = ({ index = "09", items = FAQS }: { index?: string; items?: { question: string; answer: string }[] }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative px-4 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div data-recede className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                        <Eyebrow index={index} label="FAQ" />
                        <SplitReveal className="chapter-title max-w-[12ch]">
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
                    {items.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={faq.question} className="border-b border-line first:border-t">
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
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
