import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, Clock, Award, Users } from 'lucide-react';
import { Inter, Playfair_Display, DM_Sans } from 'next/font/google';
import { useInView } from 'react-intersection-observer';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });


const Hero = () => {
    const [scrollY, setScrollY] = useState(0);
    const [hoveredStat, setHoveredStat] = useState<number | null>(null);
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const [ref, inView] = useInView({ triggerOnce: true }); // Detects when the stats section is in view
    const [values, setValues] = useState([0, 0, 0, 0]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);


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

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    const parallaxY = scrollY * 0.5;

    const stats = [
        { icon: Clock, number: '15+', label: 'Years Experience', color: 'bg-yellow-400' },
        { icon: Award, number: '200+', label: 'Projects Completed', color: 'bg-gray-700' },
        { icon: Users, number: '50+', label: 'Awards Won', color: 'bg-yellow-600' }
    ];

    return (
        <div className="relative min-h-screen bg-gray-950 overflow-hidden">
            {/* Enhanced animated background patterns */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute w-96 h-96 bg-yellow-400 rounded-full blur-3xl -top-20 -left-20"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute w-96 h-96 bg-gray-400 rounded-full blur-3xl -bottom-20 -right-20"
                />
            </div>

            {/* Interactive grid pattern overlay */}
            <motion.div
                className="absolute inset-0 bg-grid-pattern opacity-5"
                animate={{
                    backgroundPosition: ['0px 0px', '20px 20px', '0px 0px'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Main content */}
            <div className="relative container mx-auto px-6 pt-32">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left column - Enhanced text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4 text-center md:text-left">
                            <motion.div
                                className="relative inline-block p-4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <motion.span
                                    className={`${dmSans.className} text-yellow-400 text-lg tracking-wider relative z-10`}
                                >
                                    INNOVATIVE ARCHITECTURE
                                </motion.span>
                                <div
                                    className="absolute inset-0 bg-gray-800 opacity-20 rounded-lg -z-10"
                                    // layoutId="highlight"
                                />
                            </motion.div>

                            <motion.h1
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
                            </motion.h1>

                            <motion.p
                                className={`${inter.className} text-gray-400 text-lg max-w-md`}
                                whileHover={{ x: 10 }}
                            >
                                Transform your space with our innovative architectural solutions.
                                We blend modern aesthetics with functional design.
                            </motion.p>
                        </div>

                        {/* Enhanced button animations */}
                        <motion.div
                            className="flex gap-6 justify-center md:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <motion.button
                                className={`${dmSans.className} group bg-yellow-400 hover:bg-yellow-500 text-gray-900 md:px-8 px-4 py-4 rounded-lg flex items-center gap-2 transition-all duration-300`}
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
                                className={`${dmSans.className} relative overflow-hidden border border-gray-700 hover:border-yellow-400 text-gray-100 md:px-8 px-4 py-4 rounded-lg`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.span className="relative z-10">Contact Us</motion.span>
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
                            className="grid grid-cols-4 gap-8 pt-12 border-t border-gray-800"
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

                                        className={`${playfair.className} text-3xl font-bold text-yellow-400`}
                                        animate={{ scale: hoveredStat === index ? 1.1 : 1 }}
                                    >
                                        {values[index]}+
                                    </motion.h3>
                                    <p className={`${inter.className} text-sm text-gray-400`}>
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right column - Enhanced image/3D content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{
                            y: -parallaxY,
                            rotateX: rotateX,
                            rotateY: rotateY,
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHoveringImage(true)}
                        onMouseLeave={() => setIsHoveringImage(false)}
                        className="relative hidden md:block perspective-1000"
                    >
                        <motion.div
                            className="relative w-full aspect-square cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >

                            <AnimatePresence>
                                {isHoveringImage && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-yellow-400 mix-blend-saturation z-10 rounded-xl"
                                    />
                                )}
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-transparent opacity-40 z-10 rounded-xl" />
                            <div className="flex min-h-screen bg-gray-900">
                                <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full overflow-hidden">
                                    {/* 16 Divs for grid cells */}
                                    {Array.from({ length: 16 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="bg-cover bg-no-repeat mix-blend-hard-light rounded-xl"
                                            style={{
                                                backgroundImage: "url('https://images.unsplash.com/photo-1662377517331-0dafaf91cc20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image URL
                                                backgroundSize: "400%",
                                                backgroundPosition: `${(index % 4) * 33.33}% ${(Math.floor(index / 4)) * 33.33}%`,
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            {/* Enhanced floating card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="absolute -bottom-10 -left-10 bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl cursor-pointer z-10"
                            >
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <span className="text-2xl">🏆</span>
                                    </motion.div>
                                    <div>
                                        <motion.h4
                                            className={`${dmSans.className} text-gray-100 font-semibold`}
                                            whileHover={{ x: 5 }}
                                        >
                                            Best Design Award
                                        </motion.h4>
                                        <p className={`${inter.className} text-sm text-gray-400`}>
                                            2024 Architecture Excellence
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;