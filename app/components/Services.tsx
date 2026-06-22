"use client";

import React, { useState } from "react";

const SERVICES = [
    {
        id: "campus-branding",
        title: "Campus Branding &\nYouth Engagement",
        tags: [
            "Campus Activations",
            "College Ambassador Programs",
            "On-Ground Promotions",
            "Youth Campaign Strategy",
        ],
    },
    {
        id: "influencer-marketing",
        title: "Influencer Marketing\n& Talent Management",
        tags: [
            "Influencer Campaigns",
            "Creator Partnerships",
            "Talent Management",
            "Performance Tracking",
        ],
    },
    {
        id: "social-media",
        title: "Social Media\nMarketing Services",
        tags: [
            "Content Strategy",
            "Creative Production",
            "Paid Media Ads",
            "Community Growth",
        ],
    },
    {
        id: "ethical-marketing",
        title: "Ethical Marketing &\nROI-Driven Solutions",
        tags: [
            "Transparent Reporting",
            "Data Optimization",
            "Budget Efficiency",
            "Measurable Growth",
        ],
    },
];

const Services = () => {
    const [hoveredId, setHoveredId] = useState<string | null>(SERVICES[0].id);

    return (
        <section
            id="services"
            className="relative bg-white rounded-2xl py-16 px-6 sm:px-12 lg:px-20"
        >
            {/* Header */}
            <div className="mb-12 max-w-7xl mx-auto">
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary/60 uppercase">
                    /Our Services
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-secondary leading-tight mt-4 tracking-tight">
                    <span className="font-bold">Marketing Strategies <br /> For</span>{" "}
                    <em className="font-serif italic font-normal text-primary">Business Growth</em>
                </h2>
            </div>

            {/* Service rows */}
            <div className="max-w-7xl mx-auto divide-y divide-secondary/15">
                {SERVICES.map((service) => {
                    const isActive = hoveredId === service.id;
                    return (
                        <div
                            key={service.id}
                            className="group grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 py-7 lg:py-8 cursor-default"
                            onMouseEnter={() => setHoveredId(service.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Left — service name */}
                            <h3
                                className={`text-2xl sm:text-3xl lg:text-[2rem] font-normal leading-tight tracking-tight whitespace-pre-line transition-colors duration-300 ${
                                    isActive
                                        ? "text-primary"
                                        : "text-secondary"
                                }`}
                            >
                                {service.title}
                            </h3>

                            {/* Right — tags */}
                            <div className="flex flex-wrap content-center gap-2">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-all duration-300 ${
                                            isActive
                                                ? "bg-primary text-white border-primary"
                                                : "bg-transparent text-secondary/70 border-secondary/20"
                                        }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Services;
