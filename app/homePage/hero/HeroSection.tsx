import React from 'react';
import { motion } from 'framer-motion';
import HeroBg from './HeroBg';
import HeroLeft from './HeroLeft';
import HeroRight from './HeroRight';


const Hero = () => {



    return (
        <motion.div
            className="relative min-h-screen overflow-hidden">

            {/* Hero Background */}
            <HeroBg />

            {/* Main content */}
            <div className="relative lg:container lg:mx-auto px-4 md:px-6 py-24 md:py-28 xl:py-20">

                <div className="grid md:grid-cols-2 gap-12 justify-center items-center">

                    {/* Hero Left */}
                    <HeroLeft />

                    {/* Hero Right */}
                    <HeroRight />

                    {/* Floating card */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-4 right-[25%] bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl md:block hidden z-10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🏆</span>
                            </div>
                            <div>
                                <h4 className={`font-sans text-gray-100 font-semibold`}>
                                    Best Design Award
                                </h4>
                                <p className={`font-ui text-sm text-gray-400`}>
                                    2024 Architecture Excellence
                                </p>
                            </div>
                        </div>
                    </motion.div> */}

                </div>

            </div>

        </motion.div>


    );
};

export default Hero;