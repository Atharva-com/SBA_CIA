import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Ruler, Compass, PenTool, Building2, Users, Award, ChevronRight } from 'lucide-react';
import { DM_Sans, Playfair_Display } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

const WhyChooseUs = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), {
    stiffness: 100,
    damping: 30
  });

  const features = [
    {
      icon: Building2,
      title: "Innovative Design Excellence",
      description: "Pushing boundaries with cutting-edge architectural solutions that blend aesthetics with functionality.",
      stats: "150+ Award-Winning Designs",
      color: "from-yellow-400/20 to-transparent"
    },
    {
      icon: Users,
      title: "Client-Centric Approach",
      description: "Your vision drives our process. We collaborate closely to bring your architectural dreams to life.",
      stats: "98% Client Satisfaction",
      color: "from-gray-400/20 to-transparent"
    },
    {
      icon: Compass,
      title: "Sustainable Architecture",
      description: "Creating eco-friendly spaces that harmonize with the environment and reduce carbon footprint.",
      stats: "40% Energy Efficiency Improvement",
      color: "from-yellow-400/20 to-transparent"
    }
  ];

  const ArchitecturalTools = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.8,
          rotate: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="0.5" />
        <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" />
        <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" />
      </motion.g>
    </svg>
  );

  interface AnimatedCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    stats: string;
    color: string;
    index: number;
  }

  const AnimatedCard = ({ icon: Icon, title, description, stats, color, index }: AnimatedCardProps) => {
    const isHovered = hoveredCard === index;

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1,
          y: 0
        }}
        transition={{ delay: index * 0.2 }}
        onHoverStart={() => setHoveredCard(index)}
        onHoverEnd={() => setHoveredCard(null)}
        className="relative group"
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.03 : 1,
            y: isHovered ? -5 : 0
          }}
          className={`
            relative p-6 rounded-xl bg-gray-800 overflow-hidden
            border border-gray-700 hover:border-yellow-400/50
            transition-colors duration-300
          `}
        >
          {/* Background gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* Icon */}
          <motion.div
            animate={{
              rotate: isHovered ? [0, -10, 10, -10, 0] : 0
            }}
            transition={{ duration: 0.5 }}
            className="relative mb-4"
          >
            <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-yellow-400" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-3 relative">
            <motion.h3
              animate={{
                x: isHovered ? 10 : 0
              }}
              className={`${playfair.className} text-xl font-semibold text-gray-100`}
            >
              {title}
            </motion.h3>
            
            <motion.p
              animate={{
                x: isHovered ? 10 : 0
              }}
              transition={{ delay: 0.1 }}
              className="text-gray-400"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              className="pt-4"
            >
              <div className="flex items-center gap-2 text-yellow-400">
                <span className="text-sm font-medium">{stats}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className={`${dmSans.className} relative min-h-screen bg-gray-900 py-20 overflow-hidden`}>
      {/* Background Elements */}
      <ArchitecturalTools />
      
      {/* Content */}
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 30
          }}
        >
          <motion.span 
            className="text-yellow-400 text-sm uppercase tracking-wider"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Why Choose Us
          </motion.span>
          
          <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-gray-100 mt-4 mb-6`}>
            Crafting Architectural Excellence
            <span className="text-yellow-400">.</span>
          </h2>
          
          <p className="text-gray-400 text-lg">
            With decades of expertise and a passion for innovative design, we transform spaces into 
            extraordinary experiences that inspire and endure.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          style={{ y }}
          className="mt-20 grid md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "25+", label: "Years Experience" },
            { number: "500+", label: "Projects Completed" },
            { number: "150+", label: "Design Awards" },
            { number: "50+", label: "Team Experts" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20
              }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg bg-gray-800/50 backdrop-blur"
            >
              <motion.h3
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`${playfair.className} text-3xl font-bold text-yellow-400`}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;