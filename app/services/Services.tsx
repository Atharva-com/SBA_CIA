import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Trees,
  Paintbrush2,
  ArrowRight,
  Clock,
  Badge,
  Banknote,
  Users,
  // Ruler,
  // Building,
  // Palette,
  // Camera,
  // Lightbulb,
  // HardHat,
  // Mountain,
  // Scale,
} from 'lucide-react';
import { Inter, Playfair_Display, DM_Sans } from 'next/font/google';
import { ServiceCard } from '../components/service/ServiceCard';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

const services = [
  {
    icon: <Home className="w-8 h-8" />,
    title: "Architectural Design",
    description: "Custom building design for residential, commercial, and industrial projects.",
    features: [
      "Custom Floor Plans",
      "Smart Home Integration Planning",
      "Conceptual and schematic design.",
      "schematic and design development.",
    ],

    benefits: [
      { icon: <Clock />, text: "Fast turnaround time - 4-6 weeks for initial designs" },
      { icon: <Badge />, text: "Award-winning residential designs" },
      { icon: <Banknote />, text: "Transparent pricing and milestone-based payments" },
      { icon: <Users />, text: "Dedicated project manager throughout" }
    ],
    processSteps: [
      "Initial Consultation & Requirements Gathering",
      "Concept Development & Sketches",
      "3D Visualization & Virtual Walkthrough",
      "Detailed Planning & Documentation",
      "Construction Support & Supervision"
    ]
  },
  // {
  //   icon: <Building2 className="w-8 h-8" />,
  //   title: "Office Design",
  //   description: "Transform your workplace into a productive and inspiring environment with our commercial architecture solutions. We create spaces that enhance collaboration, productivity, and employee wellbeing.",
  //   features: [
  //     "Space Optimization & Planning",
  //     "Modern Facilities Integration",
  //     "Ergonomic Workspace Design",
  //     "Smart Building Technologies"
  //   ],
  //   benefits: [
  //     { icon: <Clock />, text: "Efficient project completion within 8-12 weeks" },
  //     { icon: <Badge />, text: "Certified commercial space planners" },
  //     { icon: <Banknote />, text: "Cost-effective solutions for any budget" },
  //     { icon: <Users />, text: "Expert commercial design team" }
  //   ],
  //   processSteps: [
  //     "Workplace Analysis & Requirements",
  //     "Space Planning & Layout Design",
  //     "Technology Integration Planning",
  //     "Material & Furniture Selection",
  //     "Implementation & Setup Support"
  //   ]
  // },
  {
    icon: <Trees className="w-8 h-8" />,
    title: "Landscape Design",
    description: "Shape outdoor spaces that harmonize with nature while meeting your functional needs.",
    features: [
      "Sustainable Garden Planning",
      "Water-Efficient Irrigation Systems",
      "Native Plant Selection",
      "Outdoor Living Spaces Design"
    ],
    benefits: [
      { icon: <Clock />, text: "Seasonal planning for year-round beauty" },
      { icon: <Badge />, text: "Eco-friendly design practices" },
      { icon: <Banknote />, text: "Maintenance-conscious planning" },
      { icon: <Users />, text: "Expert horticulturists on team" }
    ],
    processSteps: [
      "Site Analysis & Environmental Study",
      "Concept Development & Visualization",
      "Plant Selection & Arrangement",
      "Irrigation System Planning",
      "Installation & Maintenance Guide"
    ]
  },
  {
    icon: <Paintbrush2 className="w-8 h-8" />,
    title: "Interior Design",
    description: "Elevate your spaces with our comprehensive interior design services that reflect style.",
    features: [
      "Custom Color & Material Consultation",
      "Lighting Design & Planning",
      "Furniture Selection & Layout",
      "Art & Accessories Curation"
    ],

    benefits: [
      { icon: <Clock />, text: "Quick design concepts within 2 weeks" },
      { icon: <Badge />, text: "Access to exclusive furniture collections" },
      { icon: <Banknote />, text: "Flexible design packages available" },
      { icon: <Users />, text: "Experienced interior design team" }
    ],
    processSteps: [
      "Style Assessment & Brief",
      "Concept Board Creation",
      "Material & Color Selection",
      "Furniture & Accessories Sourcing",
      "Installation & Styling"
    ]
  }
];



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
  const router = useRouter();

  const handleExploreClick = () => {
    router.push("/services"); // Navigate to the services page
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };


  return (
    <div className="bg-gray-950 md:py-24 py-16 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <motion.span
            className={`${dmSans.className} text-yellow-400 text-lg tracking-wider`}
            whileHover={{ scale: 1.05 }}
          >
            OUR EXPERTISE
          </motion.span>
          <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-gray-100`}>
            Comprehensive Architectural Services
          </h2>
          <p className={`${inter.className} text-gray-400 max-w-2xl mx-auto`}>
            From concept to completion, we offer a full range of architectural services
            tailored to your unique vision and requirements.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
            <span className="relative z-10 flex items-center justify-center gap-2">
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
        whileInView={{ opacity: 1 }}
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
              whileInView={{ opacity: 1, y: 0 }}
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
                    whileInView={{ opacity: 1, x: 0 }}
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