import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import architectBg from '../../public/background/OIU9QH0 (1).jpg'

const AnimatedText = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const bgRef = useRef(null);
    const router = useRouter();

    const handleExploreClick = () => {
        router.push("/projects");
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Create a timeline for coordinated animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "center center",
                end: "bottom center",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                toggleActions: "play none none none",
                markers: false,
            },
        });

        // Add animations to the timeline
        tl.fromTo(
            bgRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 5 }
        ).fromTo(
            textRef.current,
            {
                opacity: 0,
                y: 100,
                z: -500,
                scale: 0,
            },
            {
                opacity: 1,
                y: 0,
                z: 0,
                scale: 0.9,
                duration: 5,
            },
            "-=0.5" // Start this animation slightly earlier
        );

        // Cleanup ScrollTriggers on unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            // style={{ backgroundImage: `url('\architecture-background-design (1).jpg')` }}
            className='h-[150vh] px-24 py-24 pb-12 relative flex items-center justify-center'
            style={{
                padding: "0rem",
            }}
        >

            <Image
                src={architectBg}
                alt="Architecture background"
                className="absolute inset-0 z-0 w-full h-[150vh] object-cover opacity-85"
            />


            <div className="flex flex-col items-center gap-3 text-center">

                <div className='perspective-1000 relative'>

                    <div ref={textRef} className='flex flex-col items-center justify-center gap-4 transform-gpu'>

                        <div className="perspective-1000 font-outfit max-w-xl text-2xl text-gray-700 leading-tight">
                            Designing Dreams, Building Realities.
                        </div>

                        <div className="text-gray-800 italic text-3xl md:text-5xl"
                            style={{
                                fontFamily: 'cursive',
                                textShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
                                lineHeight: "1.3"
                            }}
                        >
                            Shree Bhargava Infrastructure Development <br />
                            Creative Indian Architects
                        </div>

                        {/* All projects Button */}
                        <div className="text-center mt-4">
                            <motion.button
                                onClick={handleExploreClick}
                                whileHover={{
                                    scale: 1.05

                                }}
                                style={{
                                    background: "linear-gradient(90deg, #FFD700, #FFC107, #FFB300)",
                                    boxShadow: "0px 0px 15px rgba(255, 213, 0, 0.7)",
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="relative overflow-hidden px-8 md:px-12 py-3 text-sm md:text-base font-medium bg-yellow-400 text-gray-900 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 font-sans">
                                    Let&apos; Create Together
                                    <motion.span
                                        initial={{ x: -10 }}
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            duration: 1.5,
                                        }}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.span>
                                </span>

                                {/* Ripple Effect */}
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-yellow-500 opacity-20 rounded-full transform scale-0 group-hover:scale-150 transition-all duration-700 ease-out"
                                ></span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedText;
