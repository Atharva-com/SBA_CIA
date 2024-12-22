import React, { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import {
  ArrowRight,Calendar, MapPin,
  X, ChevronLeft, ChevronRight, Maximize2, Grid, Users,
  Clock, Square, Heart, Share2, Download
} from 'lucide-react';
// import { Dialog } from '@/components/ui/dialog';

const playfair = Playfair_Display({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

const projects = [
  {
    id: 1,
    title: 'Modern Minimalist Villa',
    category: 'residential',
    description: 'A contemporary residential project featuring clean lines and sustainable materials.',
    location: 'Los Angeles, CA',
    year: '2024',
    image: '/api/placeholder/800/600',
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ],
    stats: {
      area: '5,200 sq ft',
      duration: '14 months',
      awards: 2,
      team: 8
    },
    features: [
      'Sustainable Materials',
      'Smart Home Integration',
      'Energy Efficient',
      'Indoor-Outdoor Living'
    ]
  },
  // Add more projects with similar structure
];

const FullScreenPreview = ({ project, onClose, currentImageIndex, setCurrentImageIndex }: { project: Project; onClose: () => void; currentImageIndex: number; setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>> }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-yellow-400 transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <motion.div className="relative w-full max-w-7xl px-12">
        <motion.img
          src={project.gallery[currentImageIndex]}
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          className={`w-full h-auto max-h-[80vh] object-contain cursor-zoom-in
            ${isZoomed ? 'scale-150' : 'scale-100'}`}
          onClick={() => setIsZoomed(!isZoomed)}
          transition={{ duration: 0.3 }}
        />

        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
          <button
            onClick={handlePrev}
            className="bg-gray-900/50 hover:bg-yellow-400 p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-900/50 hover:bg-yellow-400 p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {project.gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors
                ${currentImageIndex === index ? 'bg-yellow-400' : 'bg-gray-500'}`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  year: string;
  image: string;
  gallery: string[];
  stats: {
    area: string;
    duration: string;
    awards: number;
    team: number;
  };
  features: string[];
}

const ProjectCard = ({ project, onExpand }: { project: Project; onExpand: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -10 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-xl bg-gray-900 group"
    >
      <motion.div
        className="relative aspect-[4/3] overflow-hidden"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 p-6 flex flex-col justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3
          className={`${playfair.className} text-xl text-white font-bold mb-4`}
        >
          {project.title}
        </motion.h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm">{project.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm">{project.stats.area}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <motion.button
            onClick={onExpand}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center"
          >
            <Maximize2 className="w-5 h-5 text-yellow-400" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectDetails = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 z-40 bg-gray-950/95 overflow-y-auto"
      >
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${playfair.className} text-3xl text-white font-bold`}
            >
              {project.title}
            </motion.h2>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              <div className="relative">
                <img
                  src={project.gallery[currentImageIndex]}
                  alt={project.title}
                  className="w-full rounded-xl"
                />
                
                <button
                  onClick={() => setIsFullScreen(true)}
                  className="absolute top-4 right-4 bg-gray-900/50 p-2 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-4 mt-4 overflow-x-auto pb-4">
                {project.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden
                      ${currentImageIndex === index ? 'ring-2 ring-yellow-400' : ''}`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Grid, label: 'Overview', id: 'overview' },
                  { icon: Users, label: 'Team', id: 'team' },
                  { icon: Clock, label: 'Timeline', id: 'timeline' }
                ].map(({ icon: Icon, label, id }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${activeTab === id ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-gray-300'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <p className="text-gray-300">{project.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {project.stats && Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="bg-gray-800 p-4 rounded-lg">
                            <div className="text-yellow-400 text-sm uppercase">{key}</div>
                            <div className="text-white font-bold">{value}</div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h4 className="text-white font-bold mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <Square className="w-4 h-4 text-yellow-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between pt-6 border-t border-gray-800">
                <button className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors">
                  <Heart className="w-5 h-5" />
                  Save
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isFullScreen && (
          <FullScreenPreview
            project={project}
            onClose={() => setIsFullScreen(false)}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
};

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
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="bg-gray-950 py-24">
      <div className="container mx-auto px-6">
      <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
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
          </motion.div>
          <motion.p 
            className={`${dmSans.className} text-gray-400 max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Explore our portfolio of innovative architectural designs spanning residential, 
            commercial, and landscape projects.
          </motion.p>
        </motion.div>

        {/* Enhanced Category Filter */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onExpand={() => {
                setSelectedProject(project);
                setIsPreviewOpen(true);
              }}
            />
          ))}
        </div>

        <AnimatePresence>
          {isPreviewOpen && selectedProject && (
            <ProjectDetails
              project={selectedProject}
              onClose={() => setIsPreviewOpen(false)}
            />)}
        </AnimatePresence>
        </div>
        </div>
  )
}