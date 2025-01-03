import React from 'react'
import HeroGridPattern from './HeroGridPattern'
import Image from 'next/image'
import ringsBg from '../../../public/rings.png'
// import iconBg from '../../../public/hero-bg.png'
import heroBgMob from '../../../public/heroBg/heroImageMob.jpg'
import { motion } from 'framer-motion'
import heroBackground from '../../../public/heroBg/heroBg3.jpg'

const HeroBg = () => {
    const textAnimation = {
        hidden: { opacity: 0, y: 40, Scale: 0.8 },
        visible: {
            opacity: 1,
            y: [-40, 10, 0],
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
            {/* hero background color */}
            {/* <div className='absolute top-0 left-0 bottom-0 right-0 pointer-events-none bg-gray-900' area-hidden="true"
                style={{
                    clipPath: "polygon(0 0, 5760px 0, 5760px calc(100% - 352px), 0 100%)"
                }}></div> */}

            {/* hero background image */}
            <div className='absolute top-0 left-0 bottom-0 right-0 pointer-events-none' area-hidden="true">
                <Image
                    src={heroBackground}
                    alt="About Background"
                    layout="fill"
                    objectFit="cover"
                    objectPosition='top center'
                    quality={100}
                    className='bg-opacity-90'
                />

                <Image
                    src={heroBgMob}
                    alt="About Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="hidden"
                />
            </div>



            {/* hero grid background pattern */}
            <HeroGridPattern />

            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={textAnimation}
                className="absolute inset-0 pointer-events-none w-[40rem] h-[40rem] top-[0%] md:left-[25%] left-0"
                aria-hidden="true"
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={textAnimation}
                    className="absolute max-w-none "
                >

                    <Image
                        src={ringsBg}
                        alt="Background SVG"
                        width={2146}
                        height={774}
                        className="block z-0 animate-spin-slow"
                    />

                    <motion.div
                        initial="hidden"
                        whileInView={{
                            opacity: 0.5,
                            y: [-40, 10, 0],
                            scale: 1,
                            transition: {
                                duration: 0.6,
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                            },
                        }}
                        variants={textAnimation}
                        className='absolute top-0 left-0 w-full opacity-30 md:hidden block'>
                        {/* <Image
                            src={iconBg}
                            alt="Icon 1"
                            width={2146}
                            height={774}
                            className="animate-spin-slow z-[10]"
                        /> */}
                    </motion.div>

                </motion.div>

            </motion.div>
        </>
    )
}

export default HeroBg