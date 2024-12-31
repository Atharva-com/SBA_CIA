import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCardFront from './ServiceCardFront';
import ServiceCardBack from './ServiceCardBack';

interface Service {
    icon: JSX.Element;
    title: string;
    description: string;
    features: string[];
    benefits: { icon: JSX.Element; text: string }[];
    processSteps: string[];
}

export const ServiceCard = ({ service, index }: { service: Service, index: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [activeTab, setActiveTab] = useState('process');
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);



    const handleFlip = () => {
        setIsFlipped((prev) => !prev);
        // Reset tab when card is flipped back
        if (isFlipped) {
            setTimeout(() => setActiveTab('process'), 300);
        }
    };



    return (
        <motion.div
            initial={{ opacity: 0, y: 30 * index, scale: 0.6 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 * index }}
            viewport={{ margin: "-100px" }}
            className="relative h-[450px] md:h-[425px] w-full perspective-1000">
            <motion.div

                className="w-full h-full relative preserve-3d transition-transform duration-700"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front of Card */}
                <ServiceCardFront handleFlip={handleFlip} service={service} hoveredStep={hoveredStep} index={index} />

                {/* Back of Card */}
                <ServiceCardBack isFlipped={isFlipped} hoveredStep={hoveredStep} setHoveredStep={setHoveredStep} index={index} service={service} handleFlip={handleFlip} activeTab={activeTab} setActiveTab={setActiveTab} />

            </motion.div>
        </motion.div>
    );
};

