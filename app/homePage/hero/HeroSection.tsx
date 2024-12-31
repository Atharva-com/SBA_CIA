import React from 'react';
import { motion } from 'framer-motion';
import HeroBg from './HeroBg';
import HeroLeft from './HeroLeft';


const Hero = () => {



    return (
        <motion.div
            className="relative min-h-screen overflow-hidden">

            {/* Hero Background */}
            <HeroBg />

            {/* Main content */}
            <div className="relative lg:container lg:mx-auto px-6 md:px-8 md:py-28 xl:py-20 flex items-center justify-start h-screen">

                <div className="flex justify-center items-center">

                    {/* Hero content */}
                    <HeroLeft />

                </div>

            </div>

        </motion.div>


    );
};

export default Hero;