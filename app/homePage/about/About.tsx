
import React from 'react'
import { useRef } from "react";
import AboutLeft from "./AboutLeft";
import AboutRight from "./AboutRight";
import Image from 'next/image';
import AboutBackground from '../../../public/background-SBA_CIA.png'; // Update the path accordingly


const AboutSection = () => {
    const ref = useRef(null);

    return (
        <div ref={ref} className="px-4 md:px-6 py-12 md:py-20 lg:py-40 lg:mx-auto relative overflow-hidden">

            <div className='absolute top-10 left-0 w-full h-full z-0 opacity-50'>
                <Image
                    src={AboutBackground}
                    alt="About Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />

            </div>

            {/* About Content */}

            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">

                {/* Left Content */}
                <AboutLeft />

                {/* Right Content (Founder Image and Info) */}
                <AboutRight />

            </div>

        </div>
    );
};

export default AboutSection;

{/* Core Values Section */ }
{/* <div className="mt-16">
                <h3 className="text-center text-3xl font-bold text-gray-100 mb-8 font-sans">
                    Our Core Values
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Innovation", description: "Pioneering bold ideas." },
                        { title: "Integrity", description: "Building trust always." },
                        { title: "Sustainability", description: "Eco-friendly solutions." },
                    ].map((value, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:bg-gray-700 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <h4 className="text-xl font-bold text-yellow-400 font-ui">
                                {value.title}
                            </h4>
                            <p className="text-gray-300 mt-4 font-ui">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div> */}

