import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const HeroRight = () => {
    const [scrollY, setScrollY] = useState(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

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
  return (
    <>
    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{
                            y: -parallaxY,
                            rotateX: rotateX,
                            rotateY: rotateY,
                        }}
                        onMouseMove={handleMouseMove}

                        className="relative hidden md:block perspective-1000"
                    >
                        <motion.div
                            className="relative w-full aspect-square cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >

                            <AnimatePresence>
                                {/* {isHoveringImage && ( */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-yellow-400 mix-blend-saturation z-10 rounded-xl"
                                />
                                {/* )} */}
                            </AnimatePresence>

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


                        </motion.div>
                    </motion.div>
    </>
  )
}

export default HeroRight