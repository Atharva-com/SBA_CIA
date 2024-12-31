import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, TreePine, ChevronLeft, ChevronRight } from 'lucide-react';
import { Inter, DM_Sans } from 'next/font/google';
import HeroGridPattern from '../hero/HeroGridPattern';

const inter = Inter({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

const testimonials = [
    {
        id: 1,
        name: "Sarah Anderson",
        role: "Property Developer",
        category: "Commercial",
        icon: Building2,
        content: "Their innovative approach to modern architecture transformed our vision into reality. The attention to detail and sustainable design practices exceeded our expectations.",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Homeowner",
        category: "Residential",
        icon: Home,
        content: "Working with this team was an absolute pleasure. They understood our vision perfectly and delivered a home that perfectly balances aesthetics with functionality.",
    },
    {
        id: 3,
        name: "Emma Roberts",
        role: "Landscape Designer",
        category: "Landscape",
        icon: TreePine,
        content: "The collaboration resulted in an extraordinary outdoor space that seamlessly blends with the natural environment. Their attention to sustainable practices was impressive.",
    }
];

const OverlappingTestimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                handleNext();
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [currentIndex, isAutoPlaying]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const getCardPosition = (index: number) => {
        const diff = index - currentIndex;
        if (diff === 0) return 'center';
        if (diff === 1 || (diff === -2 && index === 0)) return 'right';
        if (diff === -1 || (diff === 2 && index === 2)) return 'left';
        return 'hidden';
    };

    const cardVariants = {
        center: {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            zIndex: 3,
        },
        left: {
            x: '-120%',
            scale: 1,
            opacity: 0.5,
            zIndex: 2,
        },
        right: {
            x: '120%',
            scale: 1,
            opacity: 0.5,
            zIndex: 2,
        },
        hidden: {
            x: 0,
            scale: 0.8,
            opacity: 0,
            zIndex: 1,
        },
    };

    return (
        <div className="relative min-h-screen bg-gray-950 bg-opacity-90 px-4 md:px-6 py-20 md:py-20 lg:py-40 lg:mx-auto ">
            {/* Background Image */}
            <HeroGridPattern />

            {/* Content */}
            <div className="container mx-auto px-2 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className={`font-outfit text-4xl md:text-6xl font-bold text-gray-100 mb-4`}>
                    Client Success Stories 
                        <span className="text-yellow-400 pl-2">.</span>
                    </h2>
                    <p className={`${inter.className} text-gray-400`}>
                        Hear from our satisfied clients about their experience working with us.
                    </p>
                </motion.div>

                {/* Testimonials Slider */}
                <div className="relative max-w-xl mx-auto h-[350px]">

                    <div className="absolute inset-0 ">
                        {testimonials.map((testimonial, index) => {
                            const position = getCardPosition(index);
                            const Icon = testimonial.icon;

                            return (
                                <motion.div
                                    key={testimonial.id}
                                    custom={position}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate={position}
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.8 },
                                        scale: { duration: 0.8 },
                                    }}
                                    className="absolute top-0 left-0 right-0 w-full"
                                    style={{
                                        pointerEvents: position === 'center' ? 'auto' : 'none',
                                    }}
                                >
                                    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 h-full">
                                        <div className="flex md:flex-row flex-col gap-4 h-full">
                                            {/* Left Section */}
                                            <div className="md:w-1/3 border-r border-gray-800 pr-4">
                                                <div className="flex flex-col items-center text-center space-y-4">
                                                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                                                        <Icon className="w-8 h-8 text-yellow-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className={`${dmSans.className} text-lg font-bold text-gray-100`}>
                                                            {testimonial.name}
                                                        </h3>
                                                        <p className={`${inter.className} text-sm text-gray-400 mt-1`}>
                                                            {testimonial.role}
                                                        </p>
                                                    </div>
                                                    <span className="px-3 py-1.5 bg-gray-800 rounded-full text-yellow-400 text-xs">
                                                        {testimonial.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Right Section */}
                                            <div className="md:w-2/3 flex items-center">
                                                <blockquote className={`${inter.className} text-gray-300 text-base italic`}>
                                                    &quot;{testimonial.content}&quot;
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>                    

                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                handlePrev();
                                setIsAutoPlaying(false);
                            }}
                            className="bg-gray-800 hover:bg-gray-700 text-gray-100 p-3 rounded-full"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                handleNext();
                                setIsAutoPlaying(false);
                            }}

                            className="bg-gray-800 hover:bg-gray-700 text-gray-100 p-3 rounded-full"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>

                
            </div>
        </div>
    );
};

export default OverlappingTestimonials;