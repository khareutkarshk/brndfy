"use client";

import React from 'react'
import Image from 'next/image'

function Hero() {
    return (
        <div className='relative rounded-2xl min-h-screen w-full bg-secondary overflow-hidden'>
            {/* Background image */}
            <Image
                src="/bg.png"
                alt="Hero Background"
                fill
                className="object-cover"
                sizes="100vw"
                priority
            />

            {/* Content overlay */}
            <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 sm:px-12 lg:px-20 pt-28 pb-20 gap-12'>

                {/* Left side – text content */}
                <div className='flex flex-col gap-6 max-w-xl lg:max-w-3xl w-full'>
                    {/* Eyebrow */}
                    <p className='text-xs sm:text-sm tracking-widest uppercase text-white/70 font-normal'>
                        FINANCE FIRST - INFLUENCER & TALENT MANAGEMENT COMPANY
                    </p>

                    {/* Heading */}
                    <h1 className='text-4xl sm:text-5xl lg:text-7xl text-white leading-none tracking-tight'>
                        Building Culture. <br /> Not Just <em className='font-serif italic'>Campaigns.</em>
                    </h1>

                    {/* Body */}
                    <p className='text-sm sm:text-base lg:text-lg font-normal text-white/70 leading-relaxed '>
                        We connect brands with the right creators in Finance and Edutainment <br /> to drive real, measurable results.
                    </p>

                    {/* CTAs */}
                    <div className='flex flex-wrap gap-4 mt-2'>
                        <a
                            href="/case-studies"
                            className='px-6 py-3 rounded-md bg-white text-primary font-normal text-sm hover:bg-white/80 transition-colors duration-200 inline-flex items-center gap-2'
                        >
                            Case Studies <span aria-hidden>→</span>
                        </a>
                        <a
                            href="/contact"
                            className='px-6 py-3 rounded-md border border-white text-white font-normal text-sm hover:bg-white/10 transition-colors duration-200 inline-flex items-center gap-2'
                        >
                            Reach Out <span aria-hidden>→</span>
                        </a>
                    </div>
                </div>

                {/* Right side – 3D logo */}
                <div className='flex items-center justify-center w-full lg:w-auto shrink-0'>
                    <div className='relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px]'>
                        <Image
                            src="/logo3d.png"
                            alt="Brndfy 3D Logo"
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 500px"
                            priority
                        />
                    </div>
                </div>

            </div>

            {/* Scroll for more indicator */}
            <div className='absolute bottom-10 right-6 sm:right-12 lg:right-20 z-20 flex flex-col items-center gap-4 text-white'>
                <span className='text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-lr]'>
                    Scroll for more
                </span>
                <div className='animate-bounce'>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Hero