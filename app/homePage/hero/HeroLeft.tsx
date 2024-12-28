import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { ChevronRightIcon, Clock, Award, Users } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const HeroLeft = () => {

    const [ref, inView] = useInView({ triggerOnce: true });
    const [hoveredStat, setHoveredStat] = useState<number | null>(null);
    const [values, setValues] = useState([0, 0, 0, 0]);

    useEffect(() => {
        const statsData = [
            { icon: Clock, number: '15+', label: 'Years Experience', color: 'bg-yellow-400' },
            { icon: Award, number: '200+', label: 'Projects Completed', color: 'bg-gray-700' },
            { icon: Users, number: '50+', label: 'Awards Won', color: 'bg-yellow-600' }
        ];
        if (inView) {
            statsData.forEach((stat, index) => {
                let count = 0;
                const interval = setInterval(() => {
                    count++;
                    setValues((prev) => {
                        const updated = [...prev];
                        updated[index] = count;
                        return updated;
                    });
                    if (count >= parseInt(stat.number)) clearInterval(interval);
                }, 30); // Adjust the interval speed
            });
        }
    }, [inView]);

    const stats = [
        { icon: Clock, number: '15+', label: 'Years Experience', color: 'bg-yellow-400' },
        { icon: Award, number: '200+', label: 'Projects Completed', color: 'bg-gray-700' },
        { icon: Users, number: '50+', label: 'Awards Won', color: 'bg-yellow-600' }
    ];
    return (
        <>
            {/* Left column - Enhanced text content */}
            <motion.div
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
            >
                <div className="text-center md:text-left">
                    {/* Animated tagline */}
                    <motion.div
                        className="relative inline-block p-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <motion.span
                            className={`font-sans text-yellow-400 text-sm tracking-wider relative z-10`}
                        >
                            INNOVATIVE ARCHITECTURE
                        </motion.span>
                    </motion.div>

                    {/* <motion.h1
                                className={`${playfair.className} text-5xl md:text-7xl font-bold text-gray-100 leading-tight`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                Designing the Future
                                <motion.span
                                    className="text-yellow-400 inline-block"
                                    animate={{ rotate: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    .
                                </motion.span>
                            </motion.h1> */}

                    <div className="space-y-4">
                        {/* Animated Company Name */}
                        <motion.div
                            className="overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <motion.h1
                                className={`font-display text-5xl md:text-6xl font-bold text-gray-100`}
                                initial={{ y: 50 }}
                                animate={{ y: 0 }}
                                transition={{ type: 'spring', stiffness: 100, delay: 0.8 }}
                            >
                                Shree Bhargava
                            </motion.h1>
                        </motion.div>

                        {/* Highlighted Associates Section */}
                        <motion.div
                            className="relative overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            <motion.h1
                                className={`font-display text-5xl md:text-7xl font-bold`}
                                initial={{ y: 50 }}
                                animate={{ y: 0 }}
                                transition={{ type: 'spring', stiffness: 100, delay: 1 }}
                                style={{
                                    background: 'linear-gradient(to right, #f59e0b, #fbbf24)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                & Associates.

                            </motion.h1>
                        </motion.div>

                        {/* Highlighted Creative Indian Architects */}
                        <motion.div
                            className="overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1 }}
                        >
                            <motion.h3
                                className={`font-sans text-xl md:text-2xl font-bold`}
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ type: 'spring', stiffness: 120, delay: 1.2 }}
                            >
                                <span className="text-gray-400">Creative </span>
                                <motion.span
                                    className="text-yellow-400"
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    style={{
                                        textShadow: "0px 0px 10px rgba(255, 191, 0, 0.8)"
                                    }}
                                >
                                    Indian Architects
                                </motion.span>
                            </motion.h3>
                        </motion.div>

                        {/* Additional Animated Accent Line */}
                        <motion.div
                            className="h-1 bg-gradient-to-r from-yellow-500 to-orange-500 w-1/2 mx-auto"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                        />
                    </div>

                    {/* Enhanced paragraph with animations */}
                    {/* <motion.p
                                className={`${inter.className} mt-6 text-gray-400 text-lg max-w-md`}
                                whileHover={{ x: 10 }}
                            >
                                Transform your space with our innovative architectural solutions.
                                We blend modern aesthetics with functional design.
                            </motion.p> */}

                </div>

                {/* Enhanced button animations */}
                <motion.div
                    className="flex gap-6 justify-center md:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.button
                        className={`font-ui group bg-yellow-400 hover:bg-yellow-500 text-gray-900 md:px-8 px-3 py-4 rounded-lg flex items-center gap-2 transition-all duration-300`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore Projects
                        <motion.div
                            className="group-hover:translate-x-1 transition-transform"
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </motion.div>
                    </motion.button>

                    <motion.button
                        className={`font-ui relative overflow-hidden border border-gray-700 hover:border-yellow-400 text-gray-100 md:px-8 px-3 py-4 rounded-lg`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.span className="relative z-10">Consult Us</motion.span>
                        <motion.div
                            className="absolute inset-0 bg-yellow-400 opacity-0 hover:opacity-10 transition-opacity"
                            initial={false}
                            whileHover={{ scale: 1.5 }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.button>
                </motion.div>

                {/* Enhanced stats section */}
                <motion.div
                    ref={ref}
                    className="grid grid-cols-3 gap-8 pt-12 md:border-t border-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="relative group"
                            onHoverStart={() => setHoveredStat(index)}
                            onHoverEnd={() => setHoveredStat(null)}
                            whileHover={{ y: -5 }}
                        >
                            <motion.div
                                className={`w-12 h-12 ${stat.color} rounded-lg mb-4 flex items-center justify-center`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <stat.icon className="w-6 h-6 text-white" />
                            </motion.div>

                            <motion.h3

                                className={`font-display text-3xl font-bold text-yellow-400`}
                                animate={{ scale: hoveredStat === index ? 1.1 : 1 }}
                            >
                                {values[index]}+
                            </motion.h3>
                            <p className={`font-ui text-sm text-gray-400`}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </>
    )
}

export default HeroLeft


