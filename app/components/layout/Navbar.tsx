"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronDown, Phone } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '/services',
      hasDropdown: true 
    },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your search logic here
    setIsSearchOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-sm py-4' 
          : 'bg-transparent py-6'
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
                      className={`font-ui flex items-center text-gray-300 font-semibold transition-colors`}
                    >
                      {item.name}
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
                        >
                          <div className="py-1">
                            {services.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className="block px-4 py-3 hover:bg-gray-700"
                              >
                                <span className="block text-sm font-medium tracking-wide font-ui text-yellow-300">
                                  {service.name}
                                </span>
                                <span className="block mt-1 text-xs tracking-wide font-ui text-gray-400">
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
                      className={`font-ui text-gray-300 font-semibold transition-colors`}
                    >
                      {item.name}
                    </Link>
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 mt-2 bg-gray-500 group-hover:w-full transition-all duration-300"
                    />
                  </motion.div>
                )}
              </div>
            ))}

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-300 hover:text-gray-500"
            >
              <Search size={20} />
            </motion.button>

            {/* Contact Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 rounded-full bg-yellow-300 text-gray-900 hover:bg-yellow-500 transition-colors"
            >
              <Phone size={16} className="mr-2" />
              <span className={`font-ui font-medium`}>Contact Us</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(true)}
              className="text-yellow-400"
            >
              <Search size={20} />
            </motion.button>
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
              className="md:hidden mt-4 bg-yellow-200 p-4 rounded-b-3xl"
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
                            className="mt-2 pl-4"
                          >
                            {services.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className="block py-2"
                                onClick={() => setIsOpen(false)}
                              >
                                <span className="block text-sm font-medium text-gray-900">
                                  {service.name}
                                </span>
                                <span className="block mt-1 text-xs text-gray-500">
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
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-full mt-4 flex items-center justify-center px-4 py-2 rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors"
              >
                <Phone size={16} className="mr-2" />
                <span className={`font-ui font-medium`}>Contact Us</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50"
            >
              <div className="flex items-start justify-center pt-16 px-4">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="w-full max-w-2xl"
                >
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search projects, services..."
                      className="w-full bg-gray-800 text-gray-100 placeholder-gray-400 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-300"
                    >
                      <X size={20} />
                    </button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;