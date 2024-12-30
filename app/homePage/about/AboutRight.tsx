import React, { useState } from 'react'
import { motion } from "framer-motion";

const AboutRight = () => {
    const [hovered, setHovered] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { staggerChildren: 0.3, duration: 0.6, delay: 0.2 },
        },
    };
    return (
        <>
            <motion.div
                className="md:w-1/2 relative h-full"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
            >
                {/* Founder Image with Hover Effects */}
                <div
                    className="relative rounded-xl overflow-hidden shadow-lg group transform-gpu h-full"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <motion.img
                        src='/SBA_CIA-globe.jpg' 
                        alt="Founder of SBA-CIA"
                        className="w-full md:h-[28rem] h-96 object-cover transition-transform duration-500"
                        whileInView={{ scale: hovered ? 1.05 : 1 }}
                    />
                    {/* 3D Tilt Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                        style={{
                            transform: hovered
                                ? "rotateY(3deg) rotateX(-3deg)"
                                : "rotateY(0deg) rotateX(0deg)",
                        }}
                    >
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-transparent bg-clip-text font-display">Ar. Shashank Pare</h3>
                        <p className="text-gray-400 text-sm font-ui">Shree Bhargava and Associate - Creative Indian Architect</p>
                        <p className="text-gray-300 text-sm font-ui">Founder & Lead Architect</p>
                    </motion.div>
                </div>

            </motion.div>
        </>
    )
}

export default AboutRight