import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  location: string;
  year: string;
  category: string;
  tags: string[];
  images: string[];
}

interface ProjectPreviewProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: { x: number; y: number }, velocity: { x: number; y: number }) => {
    return Math.abs(offset.x) * velocity.x;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return project.images.length - 1;
      if (nextIndex >= project.images.length) return 0;
      return nextIndex;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95"
        >
          {/* Close button */}
          <motion.button
            className="absolute top-4 right-4 z-50 bg-gray-800/50 p-2 rounded-full"
            whileHover={{ scale: 1.1, backgroundColor: '#ffffff20' }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          <div className="h-full flex flex-col md:flex-row">
            {/* Image Carousel */}
            <div className="relative flex-1 flex items-center justify-center p-4">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentImageIndex}
                  src={project.images[currentImageIndex]}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset, velocity);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute object-contain"
                />
              </AnimatePresence>

              {/* Navigation arrows */}
              <motion.button
                className="absolute left-4 bg-gray-800/50 p-2 rounded-full z-10"
                whileHover={{ scale: 1.1, backgroundColor: '#facc15' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>

              <motion.button
                className="absolute right-4 bg-gray-800/50 p-2 rounded-full z-10"
                whileHover={{ scale: 1.1, backgroundColor: '#facc15' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Project Details */}
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-full md:w-96 bg-gray-900 md:p-8 p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-100 font-display">{project.title}</h2>
                <p className="text-gray-500 font-ui md:block hidden">{project.description}</p>

                <div className="space-y-4  font-ui">
                  <div className="flex justify-between text-gray-300">
                    <span>Location</span>
                    <span>{project.location}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Year</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Category</span>
                    <span>{project.category}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-ui"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-gray-900 px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-ui"
                >
                  View Full Project
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectPreview;