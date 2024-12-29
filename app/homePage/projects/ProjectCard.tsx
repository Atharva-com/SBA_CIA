import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  category: string;
  images: string[];
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {

  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1,
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <motion.div
      ref={(el) => {
        if (el && !cardsRef.current.includes(el)) {
          cardsRef.current.push(el);
        }
      }}
      layoutId={`project-${project.id}`}
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:border-yellow-400 hover:border-2">
        <motion.div
          className="relative w-full aspect-[4/3]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            width={1000}
            height={1000}
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />

          {/* Parallax Effect on Hover */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `url(${project.images[0]}) center center / cover no-repeat`,
            }}
            whileHover={{
              y: -10,
              scale: 1.05,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          ></motion.div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3
                className="text-2xl font-bold text-gradient mb-2 font-sans"
              >
                {project.title}
              </h3>

              <div
                className="flex justify-between items-center"
              >
                <span className="text-gray-400 font-ui">{project.category}</span>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-yellow-400 p-2 rounded-full"
                  onClick={onClick}
                >
                  <Plus className="w-6 h-6 text-gray-900" />
                </motion.button>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;