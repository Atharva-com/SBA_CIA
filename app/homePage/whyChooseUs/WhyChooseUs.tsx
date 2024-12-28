import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Ruler, Compass, Building2, Users, Award, Building, Scale, Brush, Warehouse, HardHat, Scan,
} from 'lucide-react';
import { Playfair_Display, Inter, DM_Sans } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

const WhyChooseUs = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  // const [activeTab, setActiveTab] = useState('residential');
  const { scrollYProgress } = useScroll();
  // const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const features = [
    {
      icon: <Compass className="w-8 h-8" />,
      title: 'Innovative Design Approach',
      description: 'Merging parametric design with traditional architecture principles.',
      tools: ['Grasshopper', 'Rhino 3D', 'Dynamo', 'BIM'],
      expertise: ['Parametric Design', 'Digital Fabrication', 'Computational Architecture']
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: 'Technical Excellence',
      description: 'We prioritize green building practices. From initial concept to final construction, we ensure precision at every stage.',
      tools: ['Revit', 'AutoCAD', 'Lumion', '3ds Max'],
      expertise: ['Construction Documentation', 'Building Codes', 'Structural Integration']
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: 'Sustainable Innovation',
      description: 'Creating eco-conscious designs using advanced energy modeling and sustainable materials.',
      tools: ['Energy Plus', 'Green Building Studio', 'Ecotect'],
      expertise: ['LEED Certification', 'Energy Modeling', 'Sustainable Materials']
    },
    {
      icon: <Scan className="w-8 h-8" />,
      title: 'Digital Integration',
      description: 'Utilizing laser scanning and point cloud technology for precise as-built documentation and renovation projects.',
      tools: ['Leica', 'FARO', 'ReCap', 'CloudCompare'],
      expertise: ['3D Scanning', 'Point Cloud Processing', 'Digital Twin Creation']
    },
    {
      icon: <HardHat className="w-8 h-8" />,
      title: 'Project Management',
      description: 'Comprehensive oversight of architectural projects, ensuring timely delivery and quality control.',
      tools: ['Procore', 'PlanGrid', 'Buildertrend'],
      expertise: ['Construction Admin', 'Quality Control', 'Timeline Management']
    },
    {
      icon: <Warehouse className="w-8 h-8" />,
      title: 'Space Planning',
      description: 'Strategic space utilization through advanced planning tools and methodologies.',
      tools: ['Space Syntax', 'Stacking Plans', 'Bubble Diagrams'],
      expertise: ['Space Analysis', 'Circulation Studies', 'Programming']
    }
  ];

  // const projectTypes = {
  //   residential: {
  //     icon: <Home className="w-6 h-6" />,
  //     title: 'Residential',
  //     projects: ['Custom Homes', 'Multi-family Housing', 'Urban Apartments']
  //   },
  //   commercial: {
  //     icon: <Building className="w-6 h-6" />,
  //     title: 'Commercial',
  //     projects: ['Office Buildings', 'Retail Spaces', 'Hotels']
  //   },
  //   institutional: {
  //     icon: <Landmark className="w-6 h-6" />,
  //     title: 'Institutional',
  //     projects: ['Universities', 'Museums', 'Healthcare']
  //   }
  // };

  const ProcessStep = ({ step, index }: { step: { title: string; description: string }; index: number }) => (
    <motion.div
      className="relative flex items-center gap-4 md:gap-6"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <motion.div
        className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-gray-900 font-bold"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        {index + 1}
      </motion.div>
      <div className="flex-1">
        <h4 className={`${dmSans.className} text-lg md:text-xl font-bold text-gray-100`}>
          {step.title}
        </h4>
        <p className="text-gray-400 text-sm md:text-base">{step.description}</p>
      </div>
    </motion.div>
  );


  const FloatingElement = ({ x, y, delay, children }: { x: number; y: number; delay: number; children: React.ReactNode }) => (
    <motion.div
      className="absolute text-yellow-400 text-sm bg-gray-900/90 px-3 py-1 rounded-full border border-gray-800 backdrop-blur-sm"
      initial={{ opacity: 0, x, y }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: x + (Math.random() * 100 - 50),
        y: y - 100,
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 2
      }}
    >
      {children}
    </motion.div>
  );


  return (
    <div className={`${inter.className} relative min-h-screen bg-gray-950 py-20 overflow-hidden`}>
      {/* Enhanced animated background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ scale }}
      >
        <motion.div
          className="absolute w-full h-full"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundImage: `
            radial-gradient(circle at center, #EAB308 1px, transparent 1px),
            linear-gradient(45deg, #EAB308 0.5px, transparent 0.5px)
          `,
            backgroundSize: '50px 50px, 30px 30px'
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Ruler className="w-6 h-6 text-yellow-400" />
            <span className={`font-sans text-gray-400 uppercase tracking-wider`}>
              Our Expertise
            </span>
          </motion.div>

          <h2 className={`font-display text-4xl md:text-6xl font-bold text-gray-100 mb-4`}>
            Why Choose <span className="text-yellow-400">Us ?</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg font-ui">
            Combining artistic vision with technical precision, we create architectural
            masterpieces that stand the test of time.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className="absolute inset-0 bg-yellow-400/10 rounded-xl blur-lg group-hover:blur-2xl transition-all duration-300"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="h-full bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 md:p-8"
                  whileHover={{
                    scale: 1.02,
                    borderColor: '#EAB308',
                  }}
                >
                  <motion.div
                    className="text-yellow-400 mb-6"
                  >
                    {feature.icon}
                  </motion.div>

                  <h3 className={`${dmSans.className} text-xl md:text-2xl font-bold text-gray-100 mb-4`}>
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-sm md:text-base mb-6">
                    {feature.description}
                  </p>

                  {hoveredCard === index && (
                    <>
                      {feature.tools.map((tool, toolIndex) => (
                        <FloatingElement
                          key={`tool-${toolIndex}`}
                          x={Math.random() * 200 - 100}
                          y={Math.random() * 100 + 100}
                          delay={toolIndex * 0.3}
                        >
                          <span className="text-yellow-400 text-sm">{tool}</span>
                        </FloatingElement>
                      ))}
                      {feature.expertise.map((exp, expIndex) => (
                        <FloatingElement
                          key={`exp-${expIndex}`}
                          x={Math.random() * 200 - 100}
                          y={Math.random() * 100 + 150}
                          delay={expIndex * 0.4 + 0.5}
                        >
                          <span className="text-gray-100 text-sm">{exp}</span>
                        </FloatingElement>
                      ))}
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Timeline */}
        <motion.div
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${playfair.className} text-3xl md:text-4xl font-bold text-center text-gray-100 mb-12`}>
            Our Design <span className="text-yellow-400">Process</span>
          </motion.h3>

          <div className="space-y-8">
            {[
              {
                title: "Discovery & Analysis",
                description: "In-depth site analysis and client requirement gathering using advanced surveying tools."
              },
              {
                title: "Conceptual Design",
                description: "Creating parametric models and exploring design alternatives through computational design."
              },
              {
                title: "Development & Documentation",
                description: "Detailed BIM modeling and comprehensive construction documentation."
              },
              {
                title: "Construction Administration",
                description: "Quality control and project oversight using digital collaboration tools."
              }
            ].map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Stats Section with enhanced mobile responsiveness */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { icon: <Users />, value: '500+', label: 'Satisfied Clients' },
            { icon: <Building2 />, value: '200+', label: 'Projects Delivered' },
            { icon: <Award />, value: '25+', label: 'Industry Awards' },
            { icon: <Brush />, value: '1000+', label: 'Designs Created' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 md:p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="text-yellow-400 w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {stat.icon}
              </motion.div>
              <h4 className={`${playfair.className} text-2xl md:text-3xl font-bold text-gray-100 mb-1 md:mb-2`}>
                {stat.value}
              </h4>
              <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Types Tabs - New Section */}
        {/* <div className="mb-20">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(projectTypes).map(([key, value]) => (
              <motion.button
                key={key}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm ${activeTab === key
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                  }`}
                onClick={() => setActiveTab(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {value.icon}
                {value.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-3 gap-6"
            >
              {projectTypes[activeTab].projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900 p-6 rounded-lg border border-gray-800"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="text-gray-100 font-medium mb-2">{project}</h4>
                  <div className="w-12 h-1 bg-yellow-400 rounded-full" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div> */}

      </div>
    </div>
  );
};

export default WhyChooseUs;