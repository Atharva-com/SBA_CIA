"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const services = [
    { name: 'Interior Design', href: '/services/interior-design', description: 'Transform your indoor spaces' },
    { name: 'Landscape Design', href: '/services/landscape-design', description: 'Create stunning outdoor environments' },
    { name: 'Home Design', href: '/services/home-design', description: 'Custom residential architecture' },
    { name: 'Office Design', href: '/services/office-design', description: 'Modern workplace solutions' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Carrer', href: '/carrer' },
    {
      name: 'Services',
      href: '/services',
      hasDropdown: true
    },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },

  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-gray-900/95 backdrop-blur-sm py-4'
          : 'bg-gray-900/95 py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className={`font-display text-2xl font-bold text-yellow-400`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SBA
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <motion.div
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center nav-text transition-colors`}
                    >
                      {item.name}
                      <ChevronDown size={16} className="ml-1 text-gray-200" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-gradient-to-br from-gray-300  via-gray-200 to-gray-400 ring-1 ring-black ring-opacity-5"
                        >
                          <div className="py-1">
                            {services.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className="block px-4 py-3 hover:bg-gray-400"
                              >
                                <span className="block text-sm font-medium tracking-wide font-sans text-gray-800">
                                  {service.name}
                                </span>
                                <span className="block mt-1 text-xs tracking-wide font-ui text-gray-500">
                                  {service.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="relative group"
                  >
                    <Link
                      href={item.href}
                      className={`nav-text hover:text-yellow-400 transition-colors`}
                    >
                      {item.name}
                    </Link>
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 mt-2 bg-yellow-400 group-hover:w-full transition-all duration-300"
                    />
                  </motion.div>
                )}
              </div>
            ))}

          </div>

          {/* Contact Button */}
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:flex items-center btn-bg px-4 py-2 rounded-full transition-colors hidden"
            >
              <Phone size={16} className="mr-2" />
              <span className={`font-ui font-medium`}>Get in Touch</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-yellow-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-gradient-to-br from-yellow-400 to-orange-400 p-4 rounded-b-3xl"
            >
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div className="py-2">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className={`font-ui flex items-center w-full text-gray-800 transition-colors`}
                      >
                        {item.name}
                        <ChevronDown size={16} className="ml-1" />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 pl-4 bg-gradient-to-br from-gray-300  via-gray-200 to-gray-400 rounded-lg"
                          >
                            {services.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className="block py-2"
                                onClick={() => setIsOpen(false)}
                              >
                                <span className="block text-sm font-medium text-gray-700 font-ui">
                                  {service.name}
                                </span>
                                <span className="block mt-1 text-xs text-gray-500 font-ui">
                                  {service.description}
                                </span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="py-2"
                    >
                      <Link
                        href={item.href}
                        className={`font-ui block text-gray-800 hover:text-yellow-400 transition-colors`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.nav>
  );
};

export default Navbar;