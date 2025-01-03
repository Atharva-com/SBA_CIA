import React from 'react'
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import mapBg from '../../../public/map-bg.jpg';

interface ContactRightProps {
  handleContactMethod: (method: string, url: string) => void;
  url: string;
}

const ContactRight: React.FC<ContactRightProps> = ({ handleContactMethod, url }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative h-[300px] md:h-[400px] w-full px-3"
      >
        <div
          onClick={() => handleContactMethod('map', url)}
          className="relative h-full rounded-xl overflow-hidden cursor-pointer group"
        >
          <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              className="w-full h-full object-cover transition-opacity duration-300"
              src={mapBg}
              alt="Location Map"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-yellow-400 text-gray-900 px-4 md:px-6 py-2 md:py-3 rounded-lg flex items-center gap-2 text-sm md:text-base"
              >
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                <span className={`font-sans font-medium`}>View on Google Maps</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>


    </>
  )
}

export default ContactRight