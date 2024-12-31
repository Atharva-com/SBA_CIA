import React from 'react'
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';

const AboutLeft = () => {

    const containerVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { staggerChildren: 0.3, duration: 0.6, delay: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.8 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
            },
        }
    };

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="md:w-1/2 space-y-6"
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={itemVariants}
                >
                    {/* Wrapper for the leader section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={itemVariants}
                        className=""
                    >
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            className="text-4xl md:text-6xl font-bold font-outfit text-transparent bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text"
                            variants={itemVariants}
                        >
                            Who We Are ?
                        </motion.h2>
                    </motion.div>

                </motion.div>

                {/* Paragraph */}
                <motion.p
                    className="text-gray-700 text-sm leading-relaxed font-ui"
                    initial="hidden"
                    whileInView="visible"
                    variants={itemVariants}
                >
                    <span className='font-bold text-lg text-gray-800'>Shree Bhargava and Associates_Creative Indian Architects (SBA_CIA)</span>
                    <br />
                    Renowned for our creative ideas and innovative approach, we leverage the latest architectural technologies to deliver exceptional designs tailored to your needs. Our expertise spans interior design, construction management, and creating functional yet aesthetic spaces.
                </motion.p>

                {/* Founder Quote */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={itemVariants}
                    className="mt-6 p-6 rounded-lg shadow-lg bg-gradient">
                    <motion.p className="text-gray-800 italic"
                    style={{
                        fontFamily: 'cursive'
                    }}
                    >
                        “Architecture is not just about buildings; it&apos;s about creating experiences that resonate with people&apos;s lives, aspirations, and dreams. Every project we undertake is an opportunity to leave a lasting legacy in the built environment.”
                    </motion.p>

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 px-4 py-2 text-sm font-bold text-gray-200 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-full shadow transition-all duration-300 font-ui cursor-pointer flex items-center"
                    >
                        Discover Our Journey
                        <motion.span
                            initial={{ x: -10 }}
                            whileInView={{ x: [0, 5, 0] }}
                            transition={{
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 1.5,
                            }}
                            className='pl-2'
                        >
                            <ArrowRight className="w-4 h-4" />
                        </motion.span>
                    </motion.button>

                </motion.div>

            </motion.div>
        </>
    )
}

export default AboutLeft