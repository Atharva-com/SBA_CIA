import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  // Ruler,
  // Building,
  // Palette,
  // Camera,
  // Lightbulb,
  // HardHat,
  // Mountain,
  // Scale,
} from 'lucide-react';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { ServiceCard } from './ServiceCard';
import { useRouter } from 'next/navigation';
import services from './ServicesData';


const playfair = Playfair_Display({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });



// const additionalServices = [
//   {
//     icon: <Ruler className="w-6 h-6" />,
//     title: "Architectural Documentation",
//     description: "Comprehensive documentation services including construction drawings, permits, and technical specifications.",
//     features: [
//       "Building Information Modeling (BIM)",
//       "Construction Documentation",
//       "Permit Application Support",
//       "As-Built Documentation"
//     ]
//   },
//   {
//     icon: <Building className="w-6 h-6" />,
//     title: "Historic Preservation",
//     description: "Specialized restoration and preservation services for historic buildings and heritage sites.",
//     features: [
//       "Historical Research & Documentation",
//       "Restoration Planning",
//       "Heritage Conservation",
//       "Adaptive Reuse Strategies"
//     ]
//   },
//   {
//     icon: <Palette className="w-6 h-6" />,
//     title: "Custom Furniture Design",
//     description: "Bespoke furniture design services that perfectly complement your architectural space.",
//     features: [
//       "Custom Built-ins",
//       "Material Selection",
//       "Prototyping",
//       "Installation Coordination"
//     ]
//   },
//   {
//     icon: <Camera className="w-6 h-6" />,
//     title: "Virtual Reality Tours",
//     description: "Immersive VR experiences of your future space before construction begins.",
//     features: [
//       "3D Virtual Walkthrough",
//       "Interactive Design Reviews",
//       "Real-time Modifications",
//       "VR Presentation Setup"
//     ]
//   },
//   {
//     icon: <Lightbulb className="w-6 h-6" />,
//     title: "Lighting Design",
//     description: "Comprehensive lighting solutions that enhance both aesthetics and functionality.",
//     features: [
//       "Natural Light Analysis",
//       "Custom Fixture Design",
//       "Smart Lighting Systems",
//       "Energy Efficiency Planning"
//     ]
//   },
//   {
//     icon: <HardHat className="w-6 h-6" />,
//     title: "Construction Management",
//     description: "Full-service construction management and supervision for your project.",
//     features: [
//       "Contractor Coordination",
//       "Timeline Management",
//       "Quality Control",
//       "Budget Monitoring"
//     ]
//   },
//   {
//     icon: <Mountain className="w-6 h-6" />,
//     title: "Sustainable Design",
//     description: "Eco-friendly architectural solutions for a sustainable future.",
//     features: [
//       "LEED Certification",
//       "Energy Analysis",
//       "Sustainable Materials",
//       "Green Building Strategies"
//     ]
//   },
//   {
//     icon: <Scale className="w-6 h-6" />,
//     title: "Code Compliance",
//     description: "Ensure your project meets all local and international building codes.",
//     features: [
//       "Code Analysis",
//       "Compliance Documentation",
//       "Safety Standards",
//       "Accessibility Reviews"
//     ]
//   }
// ];

const ServicesSection = () => {
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const router = useRouter();

  const handleExploreClick = () => {
    router.push("/services");
  };
  

  return (
    <div ref={ref} className="relative md:py-24 py-16 px-6">

      {/* serives Background */}
      <div className="absolute top-0 left-0 w-full h-1/2 inset-0 bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900"></div>

      {/* Main Content */}
      <div className="container mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16 space-y-4 relative z-10"
        >

          <motion.span
            className={`${dmSans.className} text-yellow-400 text-lg tracking-wider`}
            whileHover={{ scale: 1.05 }}
          >
            OUR EXPERTISE
          </motion.span>

          <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-gradient`}>
            Comprehensive Architectural Services
          </h2>

          {/* <p className={`${inter.className} text-gray-400 max-w-2xl mx-auto`}>
            From concept to completion, we offer a full range of architectural services
            tailored to your unique vision and requirements.
          </p> */}

        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
        >

          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>


        <div className="text-center mt-12">
          <motion.button
            onClick={handleExploreClick}
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(90deg, #FFD700, #FFC107, #FFB300)",
              boxShadow: "0px 0px 15px rgba(255, 213, 0, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden px-8 md:px-16 md:py-4 py-3 text-sm md:text-base font-medium bg-yellow-400 text-gray-900 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-sans">
              Explore All Services
              <motion.span
                initial={{ x: -10 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </span>

            {/* Ripple Effect */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-yellow-500 opacity-20 rounded-full transform scale-0 group-hover:scale-150 transition-all duration-700 ease-out"
            ></span>
          </motion.button>
        </div>

      </div>

      {/* Additional Services Section */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24"
      >
        <div className="text-center mb-16">
          <motion.span 
            className={`${dmSans.className} text-yellow-400 text-lg tracking-wider`}
            whileHover={{ scale: 1.05 }}
          >
            SPECIALIZED SERVICES
          </motion.span>
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-100 mt-4`}>
            Additional Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-yellow-400 transition-all duration-300"
            >
              <motion.div 
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-yellow-400 mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {service.icon}
              </motion.div>

              <h3 className={`${playfair.className} text-xl font-bold text-gray-100 mb-3`}>
                {service.title}
              </h3>

              <p className={`${inter.className} text-gray-400 text-sm mb-4`}>
                {service.description}
              </p>

              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: featureIndex * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className={`${dmSans.className} text-sm text-gray-300`}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${dmSans.className} mt-6 w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2 text-sm`}
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div> */}
    </div>
  );
};

export default ServicesSection;