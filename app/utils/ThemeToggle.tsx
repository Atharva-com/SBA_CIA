import React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const themeToggleVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 180 }
  };
  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variants={themeToggleVariants}
      initial="initial"
      animate={theme === 'dark' ? "animate" : "initial"}
      className="p-2 rounded-full transition-colors duration-200 btn-dark-architect dark:btn-architect
        
        hover:bg-yellow-200 dark:hover:bg-yellow-800
        ring-2 ring-yellow-800 dark:ring-yellow-400"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-yellow-700" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;