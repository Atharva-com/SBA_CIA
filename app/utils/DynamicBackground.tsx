"use client"

import React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

import { ReactNode } from 'react';

const DynamicBackground = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  // Background patterns for light mode (yellow tones)
  const lightPatterns = [
    'bg-[#e0e7ff]'
  ];

  // Background patterns for dark mode (yellow and gray tones)
  // const darkPatterns = [
  //   'bg-[#030712]',
  //   'bg-[#2c2f36]',
  //   'bg-[#0f172b]',
  //   ' bg-[#101d2d]',
  // ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`transition-colors duration-700 ease-in-out
        ${theme === 'dark' ? "bg-white" : lightPatterns[0]}
      `}
    >

      {/* Content container */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

export default DynamicBackground;
