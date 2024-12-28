import React from 'react'
import { motion } from 'framer-motion';

const HeroGridPattern = () => {
    return (
        <>
            {/* Interactive blueprint grid pattern overlay */}
            <motion.div
                className="absolute inset-0 z-[0]"
                animate={{
                    backgroundPosition: ['0px 0px', '30px 30px', '0px 0px'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
                    backgroundSize: '200px 200px',
                    opacity: 0.3,
                }}
            />
        </>
    )
}

export default HeroGridPattern