import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';


const HeroLeft = () => {


    const router = useRouter();

    const handleServiceClick = () => {
        router.push("/services");
    };

    const textAnimation = {
        hidden: { opacity: 0, y: 40, Scale: 0.8 },
        visible: {
            opacity: 1,
            y: [40, -10, 0],
            scale: 1,
            transition: {
                duration: 0.6,
                type: "spring",
                stiffness: 400,
                damping: 15,
            },
        }
    };

    return (
        <>
            {/* Left column - Enhanced text content */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={textAnimation}
                className="relative container">

                <div className='flex flex-col justify-center md:items-start items-center flex-nowrap mx-auto gap-5'>

                    {/* Badge */}
                    <Link href="/services" className='relative w-fit'>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            variants={textAnimation}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center justify-center animate-pulse cursor-pointer font-ui bg-gradient-to-r from-orange-300/50 to-[#facc15]/50 border border-white/20 rounded-full uppercase py-3 px-6 h-7">
                            <div className='space-x-2 flex items-center justify-center'>

                                <span className='text-center font-medium text-sm tracking-wide text-yellow-400'>Innovative Architecture</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none"><path d="M4.8125 2.8125L8.1875 6L4.8125 9.1875" stroke="#FF9217" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>

                            </div>
                        </motion.div>
                    </Link>

                    {/* heading */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={textAnimation}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.h1
                            initial="hidden"
                            whileInView="visible"
                            variants={textAnimation}
                            transition={{ delay: 0.4 }}
                            className="text-transparent font-outfit text-4xl md:text-6xl font-bold">

                            <motion.span
                                initial="hidden"
                                whileInView="visible"
                                variants={textAnimation}
                                transition={{ delay: 0.4 }}
                                className='pl-2 text-gradient'
                                style={{
                                    lineHeight: '1.1'
                                }}
                            >
                                New way of designing and living
                                <span className='pl-2 text-yellow-400'>.</span>
                                {/* Design. 
                                <span className=' px-4'>Build.</span>  
                                Inspire. */}
                            </motion.span>
                        </motion.h1>
                    </motion.div>

                    {/* description */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={textAnimation}
                        transition={{ delay: 0.8 }}
                        className='text-lg md:text-xl font-sans mx-auto max-w-2xl font-medium text-gray-400'>
                        {/* Transform your space with our innovative architectural solutions with functional design. */}
                        We don’t only build and design, We create an Environment for Healthy, Comfortable & Royal life.
                        <br />
                        <span className='text-yellow-400 mt-2'>SBA_CIA </span> - the architects of your dreams.
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        className="flex gap-6 justify-center md:justify-start"
                    >
                        <motion.button
                            onClick={handleServiceClick}
                            whileHover={{
                                scale: 1.05,

                            }}
                            style={{
                                background: "linear-gradient(90deg, #FFD700, #FFC107, #FFB300)",
                                boxShadow: "0px 0px 15px rgba(255, 213, 0, 0.7)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="relative overflow-hidden px-8 md:px-16 md:py-4 py-3 text-sm md:text-base font-medium bg-yellow-400 text-gray-900 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300"
                        >
                            <span className="relative flex items-center justify-center gap-2 font-sans">
                                Discuss Your Vision

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

                        {/* <motion.button
                            className={`font-ui relative overflow-hidden border border-gray-300 text-gray-100 md:px-8 px-3 py-4 rounded-lg`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span className="relative z-10">Consult Us</motion.span>

                        </motion.button> */}
                    </motion.div>

                </div>

            </motion.div>
        </>
    )
}

export default HeroLeft


