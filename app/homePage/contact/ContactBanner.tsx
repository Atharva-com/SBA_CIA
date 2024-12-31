import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import ContactLeft from './ContactLeft';
import ContactRight from './ContactRight';
const inter = Inter({ subsets: ['latin'] });

const ContactBanner = () => {

  const [activeTab, setActiveTab] = useState('contact');
  const ref = useRef(null);

  // Business information
  const businessInfo = {
    address: "Ambikapuri Extension, 60 Feet road, Indore, In",
    phone: "+91 7693005811",
    whatsapp: "7693005811",
    email: "contact@architectstudio.com",
    mapUrl: "https://www.google.com/maps?q=40.7128,-74.0060",
    socials: {
      instagram: "https://instagram.com/architectstudio",
      facebook: "https://facebook.com/architectstudio",
      linkedin: "https://linkedin.com/company/architectstudio",
      twitter: "https://twitter.com/architectstudio"
    },

  };

  // Handler functions
  const handleContactMethod = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        window.location.href = `tel:${value}`;
        break;
      case 'whatsapp':
        const message = encodeURIComponent("Hi! I'm interested in your architectural services.");
        window.open(`https://wa.me/${value.replace(/\D/g, '')}?text=${message}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${value}?subject=Inquiry about Architectural Services`;
        break;
      case 'map':
        window.open(value, '_blank');
        break;
      case 'social':
        window.open(value, '_blank');
        break;
    }
  };



  return (
    <div
      ref={ref}

      className={`${inter.className} relative py-20 md:py-20 lg:py-40 lg:my-20 px-4 md:px-10 min-h-screen md:min-h-0`}>


      <div className={`container md:mx-auto md:px-4 py-8 md:py-12 md:rounded-tr-[100px] md:bg-gray-950 md:opacity-90 transition-all duration-300`}>
        

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, ease: "easeOut" }}
          className="flex items-center justify-center mb-8">

          <motion.div
            className="flex flex-row gap-2 w-full md:w-auto bg-gray-900 p-1 rounded-md"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {['social', 'contact', 'hours'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-8 py-2 rounded-md transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'text-gray-400 hover:text-gray-200'
                } w-full md:w-auto text-center`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8 md:items-start md:justify-start">

          {/* Left Section */}
          <ContactLeft activeTab={activeTab} handleContactMethod={handleContactMethod} />

          {/* Map Section */}
          <ContactRight handleContactMethod={handleContactMethod} url={businessInfo.mapUrl} />

        </motion.div>

      </div>

    </div>
  );
};

export default ContactBanner;