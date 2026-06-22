import React from 'react'

const About = () => {
    return (
        <section id="about" className="relative bg-white text-secondary py-12 px-6 sm:px-12 lg:px-20 min-h-screen flex flex-col justify-center overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full max-w-7xl mx-auto">

                {/* Left Side Labels */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full py-4">
                    <div>
                        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-secondary/60">
                            /ABOUT US
                        </span>
                    </div>
                    <div className="hidden lg:block mt-auto">
                        <p className="text-sm font-bold leading-tight text-secondary">
                            Culture first. Creators aligned. Built to scale.
                        </p>
                    </div>
                </div>

                {/* Right Side Content */}
                <div className="lg:col-span-8 flex flex-col gap-8 lg:gap-10">
                    <div className="flex flex-col">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal leading-[1.2] text-primary tracking-tight">
                            We&apos;re Brndfy - a youth-first, data-driven marketing collective. Built for{' '}
                            <span className="bg-primary rounded-md font-normal text-white px-2 italic font-serif inline box-decoration-clone">
                                campus culture and real conversations.
                            </span>
                        </h2>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-2xl sm:text-2xl lg:text-4xl xl:text-5xl font-normal leading-[1.2] text-primary tracking-tight">
                            Inspired by the raw energy of India&apos;s student ecosystems, we know millions of voices hold infinite stories. Our job is to cut through{' '}
                            <span className="bg-primary rounded-md font-normal text-white px-2 italic font-serif inline box-decoration-clone">the hype, the noise, &</span>{' '}
                            <span className="bg-primary rounded-md font-normal text-white px-2 italic font-serif inline box-decoration-clone">the gimmicks</span> and deliver campaigns.
                        </p>
                    </div>
                </div>

                {/* Mobile version of the tagline */}
                <div className="lg:hidden mt-8">
                    <p className="text-sm font-bold text-secondary">
                        Culture first. Creators aligned. Built to scale.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About
