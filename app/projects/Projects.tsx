import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import ProjectCard from './ProjectCard';
import ProjectPreview from './ProjectPreview';
import ProjectTransitions from './ProjectTransitions';
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation';

const playfair = Playfair_Display({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

const projects = [
  {
    id: 1,
    title: "Modern Minimalist Villa",
    category: "Residential",
    year: "2024",
    location: "Beverly Hills, CA",
    description: "A contemporary villa that embraces minimalist design principles while maximizing natural light and space efficiency.",
    images: ["https://plus.unsplash.com/premium_photo-1661872779873-5ce7b9235a0e?q=80&w=1503&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://plus.unsplash.com/premium_photo-1661962769148-fbe587e60fb8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://plus.unsplash.com/premium_photo-1661964000526-1bf2d91bd451?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    tags: ["Modern", "Minimalist", "Sustainable"]
  },

  // Add more projects as needed
];

const filterVariants = {
  selected: {
    backgroundColor: "#fbbf24",
    color: "#1f2937",
    scale: 1.1,
  },
  notSelected: {
    backgroundColor: "#1f2937",
    color: "#fbbf24",
    scale: 1,
  },
};

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'residential', name: 'Residential' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'interior', name: 'Interior' },
  { id: 'landscape', name: 'Landscape' }
];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<null | { id: number; title: string; category: string; year: string; location: string; description: string; images: string[]; tags: string[] }>(null);
  const [direction, setDirection] = useState(0);
  const router = useRouter();

  const handleExploreClick = () => {
    router.push("/projects"); 
  };

  const handleProjectClick = (project: { id: number; title: string; category: string; year: string; location: string; description: string; images: string[]; tags: string[] }) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="bg-gray-950 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ margin: "-100px" }}
          className="mb-16 text-center"
        >
          <div
          >
            <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-gray-100 mb-4`}>
              Featured Projects
              <motion.span
                className="text-yellow-400 inline-block"
                animate={{
                  rotate: [0, 5, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                .
              </motion.span>
            </h2>
          </div>
          <p
            className={`${dmSans.className} text-gray-400 max-w-2xl mx-auto`}
          >
            Explore our portfolio of innovative architectural designs spanning residential,
            commercial, and landscape projects.
          </p>
        </motion.div>

        {/* Category Filter */}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variants={filterVariants}
              animate={activeCategory === category.id ? "selected" : "notSelected"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${dmSans.className} px-6 py-2 rounded-full text-sm transition-all duration-300`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <ProjectTransitions direction={direction}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          </ProjectTransitions>
        </AnimatePresence>

        {/* All projects Button */}
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
              Explore Our Work
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

        {/* full preview */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Full Screen Preview */}
              <ProjectPreview
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={handleClose}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


