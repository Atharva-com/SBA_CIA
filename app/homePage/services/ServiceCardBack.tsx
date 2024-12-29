import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Phone, Mail, Calendar, ArrowRight,
    RotateCcw
} from 'lucide-react';
import ActionButton from '@/app/utils/ActionButton';

interface Service {
    title: string;
    processSteps: string[];
    benefits: { icon: JSX.Element; text: string }[];
}

const ServiceCardBack = ({ isFlipped, hoveredStep, setHoveredStep, index, service, handleFlip, activeTab, setActiveTab }: { isFlipped: boolean, hoveredStep: number | null, setHoveredStep: (step: number | null) => void, index: number, service: Service, handleFlip: () => void, activeTab: string, setActiveTab: (tab: string) => void }) => {


    const tabs = [
        { id: 'process', label: 'Process' },
        { id: 'benefits', label: 'Benefits' },
        { id: 'contact', label: 'Contact' }
    ];

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
            <div
                className="absolute w-full h-full backface-hidden"
                style={{
                    transform: "rotateY(180deg)",
                    zIndex: isFlipped ? 10 : -1, // Ensure correct z-index for interactivity
                    pointerEvents: isFlipped ? "auto" : "none" // Allow interaction only when flipped
                }}
            >
                <motion.div className="h-full relative rounded-2xl bg-gray-900 md:p-8 p-4 border border-yellow-400 group">

                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

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

                    <motion.div className="relative z-10 h-full flex flex-col">

                        {/* Header */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            variants={cardInnerVariants}
                            className="flex justify-between items-center mb-6">

                            <motion.h4 className={`font-display text-2xl font-bold text-gray-100`}>
                                {service.title}
                            </motion.h4>

                            <ActionButton service={service} />

                        </motion.div>

                        {/* Tabs */}
                        <motion.div className="flex gap-2 mb-6">
                            {tabs.map((tab) => (
                                <motion.button
                                    key={tab.id}
                                    initial="hidden"
                                    whileInView="visible"
                                    variants={cardInnerVariants}
                                    transition={{ delay: 0.1 * index }}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-sans transition-all
                            ${activeTab === tab.id
                                            ? 'bg-yellow-400 text-gray-900'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {tab.label}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex-grow overflow-y-auto overflow-x-hidden "
                            >
                                {activeTab === 'process' && (
                                    <motion.div className="space-y-4">
                                        {service.processSteps.map((step, stepIndex) => (
                                            <motion.div
                                                key={stepIndex}
                                                initial="hidden"
                                                whileInView="visible"
                                                variants={cardInnerVariants}
                                                transition={{ delay: 0.2 * stepIndex }}
                                                onHoverStart={() => setHoveredStep(stepIndex)}
                                                onHoverEnd={() => setHoveredStep(null)}
                                                className="relative"
                                            >
                                                <motion.div
                                                    className={`p-4 rounded-lg border ${hoveredStep === stepIndex
                                                        ? 'bg-gray-800'
                                                        : 'border-gray-800 bg-gray-900'
                                                        } transition-all duration-300`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <motion.div
                                                            className="w-8 h-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center font-bold"
                                                            whileHover={{ scale: 1.1, rotate: 360 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            {stepIndex + 1}
                                                        </motion.div>
                                                        <span className={`font-ui text-gray-100`}>
                                                            {step}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {activeTab === 'benefits' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {service.benefits.map((benefit, benefitIndex) => (
                                            <motion.div
                                                key={benefitIndex}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: benefitIndex * 0.1 }}
                                                whileHover={{ scale: 1.05 }}
                                                className="p-4 bg-gray-800 rounded-lg"
                                            >
                                                <div className="flex flex-col items-start gap-3">
                                                    <span className="p-2 bg-yellow-400 rounded-lg text-gray-900">
                                                        {benefit.icon}
                                                    </span>
                                                    <span className={`font-ui text-sm text-gray-300`}>
                                                        {benefit.text}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'contact' && (
                                    <div className="space-y-4">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-4"
                                        >
                                            {[
                                                { icon: <Phone />, text: "Schedule a Call" },
                                                { icon: <Mail />, text: "Send Message" },
                                                { icon: <Calendar />, text: "Book Consultation" }
                                            ].map((item, index) => (
                                                <motion.button
                                                    key={index}
                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full p-4 bg-gray-800 rounded-lg flex items-center justify-between text-gray-100 hover:bg-gray-700 transition-all"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-yellow-400">{item.icon}</span>
                                                        <span className={`font-sans`}>{item.text}</span>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4" />
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    </div>
                                )}

                            </motion.div>

                        </AnimatePresence>

                        {/* Footer Actions */}
                        <motion.div className="mt-6 flex gap-2">
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleFlip}
                                className={`font-sans flex-1 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center gap-2`}
                            >
                                <RotateCcw className="w-4 h-4" />
                                Back to Overview
                            </motion.button>

                        </motion.div>

                    </motion.div>

                </motion.div>
                
            </div>
        </>
    )
}

export default ServiceCardBack