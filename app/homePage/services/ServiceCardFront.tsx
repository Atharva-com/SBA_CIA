import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, CheckCircle2 } from 'lucide-react'

interface ServiceCardFrontProps {
    handleFlip: () => void;
    service: {
        icon: React.ReactNode;
        title: string;
        description: string;
        features: string[];
    };
    hoveredStep: number | null;
    index: number;
}

const ServiceCardFront: React.FC<ServiceCardFrontProps> = ({ handleFlip, service, hoveredStep, index }) => {

    const cardInnerVariants = {
        hidden: {
            x: -20,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <>
            <div className="absolute w-full h-full backface-hidden">

                <motion.div
                    className="h-full flex items-center relative overflow-hidden rounded-2xl bg-gray-900 md:p-6 p-4 border border-gray-800 hover:border-yellow-400 transition-all duration-300 group"
                    whileHover={{ y: -5 }}
                >

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Animated Background Pattern */}
                    <motion.div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: "radial-gradient(circle at 2px 2px, yellow 1px, transparent 0)",
                            backgroundSize: "32px 32px"
                        }}
                        animate={{
                            backgroundPosition: hoveredStep === index ? ["0px 0px", "32px 32px"] : "0px 0px"
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />


                    {/* Front Content */}
                    <motion.div className="relative z-10">

                        {/* Icon and Title */}
                        <div className="flex items-center justify-between mb-6">

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                variants={cardInnerVariants}
                                className="p-3 bg-gray-800 rounded-lg text-yellow-400 group-hover:bg-yellow-400 group-hover:text-gray-900 transition-all duration-300"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                {service.icon}
                            </motion.div>

                        </div>

                        <motion.h3
                            initial="hidden"
                            whileInView="visible"
                            variants={cardInnerVariants}
                            transition={{ delay: 0.2 }}
                            className={`font-display text-2xl font-bold text-gray-100 mb-4`}>
                            {service.title}
                        </motion.h3>

                        <motion.p
                            initial="hidden"
                            whileInView="visible"
                            variants={cardInnerVariants}
                            transition={{ delay: 0.4 }}
                            className={`font-ui text-gray-400 mb-6`}>
                            {service.description}
                        </motion.p>

                        {/* Features */}
                        <div className="space-y-3">
                            {service.features.map((feature, featureIndex) => (
                                <motion.div
                                    key={featureIndex}
                                    className="flex items-center gap-2 text-gray-300"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: featureIndex * 0.1 }}
                                >
                                    <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                                    <span className={`font-sans text-sm`}>{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Flip Button */}
                        <motion.button
                            initial="hidden"
                            whileInView="visible"
                            variants={cardInnerVariants}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleFlip}
                            className={`font-sans mt-8 px-6 py-3 bg-gray-800 text-gray-100 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 w-full flex items-center justify-center gap-2`}
                        >
                            Show More
                            <ChevronRight className="w-4 h-4" />
                        </motion.button>

                    </motion.div>

                </motion.div>

            </div>
        </>
    )
}

export default ServiceCardFront