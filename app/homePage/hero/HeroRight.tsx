import React from 'react'
import { motion } from 'framer-motion';
import heroImage from '../../../public/heroBg/heroImage-1.png'
import Image from 'next/image';

const HeroRight = () => {

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
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={textAnimation}
                className="relative w-full rounded-lg overflow-hidden shadow-lg">

                <Image
                    src={heroImage}
                    alt="About Background"
                    className='w-full h-full'
                />

            </motion.div>
        </>
    )
}

export default HeroRight