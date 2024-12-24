import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Phone, Mail, ExternalLink, MessageCircle, Twitter,
  Instagram, Facebook, ArrowRight, X,
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { DM_Sans, Inter } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const ContactBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openingIn, setOpeningIn] = useState('');
  const [activeTab, setActiveTab] = useState('contact');
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });

  // Business information
  const businessInfo = {
    address: "Ambikapuri Extension, 60 Feet road, Indore, In",
    phone: "+91 7693005811",
    whatsapp: "+91 7693005811",
    email: "contact@architectstudio.com",
    mapUrl: "https://www.google.com/maps?q=40.7128,-74.0060",
    socials: {
      instagram: "https://instagram.com/architectstudio",
      facebook: "https://facebook.com/architectstudio",
      linkedin: "https://linkedin.com/company/architectstudio",
      twitter: "https://twitter.com/architectstudio"
    },
    businessHours: {
      mon: { open: '09:00', close: '18:00' },
      tue: { open: '09:00', close: '18:00' },
      wed: { open: '09:00', close: '18:00' },
      thu: { open: '09:00', close: '18:00' },
      fri: { open: '09:00', close: '18:00' },
      sat: { open: '10:00', close: '14:00' },
      sun: { open: null, close: null }
    }
  };

  // Contact Details
  const contactDetails =[
    { icon: Phone, label: 'Call Us', value: businessInfo.phone, type: 'phone' },
    { icon: MessageCircle, label: 'WhatsApp', value: businessInfo.whatsapp, type: 'whatsapp' },
    { icon: Mail, label: 'Email Us', value: businessInfo.email, type: 'email' },
    { icon: MapPin, label: 'Visit Us', value: businessInfo.address, type: 'address' }
  ]

  // SocialDetails
  const socialDetails = [
    { icon: Instagram, name: 'Instagram', url: businessInfo.socials.instagram, color: 'bg-pink-600' },
    { icon: Facebook, name: 'Facebook', url: businessInfo.socials.facebook, color: 'bg-blue-600' },
    { icon: Twitter, name: 'LinkedIn', url: businessInfo.socials.linkedin, color: 'bg-blue-700' },
    { icon: X, name: 'Twitter', url: businessInfo.socials.twitter, color: 'bg-gray-700' }
  ]

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

  // Business hours check
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const currentDay = days[now.getDay()];
      const hours = businessInfo.businessHours[currentDay];

      if (!hours.open || !hours.close) {
        setIsOpen(false);
        return;
      }

      const currentTime = now.getHours() * 60 + now.getMinutes();
      const [openHour, openMinute] = hours.open.split(':').map(Number);
      const [closeHour, closeMinute] = hours.close.split(':').map(Number);
      const openTime = openHour * 60 + openMinute;
      const closeTime = closeHour * 60 + closeMinute;

      setIsOpen(currentTime >= openTime && currentTime < closeTime);

      if (currentTime < openTime) {
        const diff = openTime - currentTime;
        setOpeningIn(`Opens in ${Math.floor(diff / 60)}h ${diff % 60}m`);
      }
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={ref}

      className={`${inter.className} bg-gray-950 text-gray-100 relative`}>

      <div className="container mx-auto px-4 md:px-16 py-12">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -50 }} // Slide up from below
          animate={isInView ? { opacity: 1, y: 0 } : {}} // Fade in and slide into place
          transition={{ duration: 1.25, ease: "easeOut" }}
          className="flex justify-center mb-8">
          <motion.div
            className="bg-gray-900 p-1 rounded-lg flex gap-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {['contact', 'hours', 'social'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${activeTab === tab
                  ? 'bg-yellow-400 text-gray-900'
                  : 'text-yellow-400 hover:text-gray-200'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <div
          className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale:0.8, x: -200 }}
              animate={isInView ? { opacity: 1, scale:1, x: 0 } : {}} 
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-gray-900 rounded-xl p-4 space-y-4"
            >
              {activeTab === 'contact' && (
                <>
                  <div className="space-y-4">
                    {/* Contact methods */}
                    {contactDetails.map((item, index) => (

                      <motion.div
                        key={item.type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleContactMethod(item.type, item.value)}
                        className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors group"
                      >
                        <item.icon className="w-5 h-5 text-yellow-400" />
                        <div>
                          <h4 className="font-medium text-gray-300">{item.label}</h4>
                          <p className="text-gray-400 group-hover:text-yellow-400 transition-colors">
                            {item.value}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'hours' && (
                <div className="">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`p-3 rounded-lg ${isOpen ? 'bg-green-900/20' : 'bg-red-900/20'
                      } flex items-center justify-center`}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`w-3 h-3 rounded-full mr-2 ${isOpen ? 'bg-green-400' : 'bg-red-400'
                        }`}
                    />
                    <span className={isOpen ? 'text-green-400' : 'text-red-400'}>
                      {isOpen ? 'Open Now' : openingIn || 'Closed'}
                    </span>
                  </motion.div>

                  {Object.entries(businessInfo.businessHours).map(([day, hours], index) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between p-3 bg-gray-900/50 rounded-lg"
                    >
                      <span className="capitalize">{day}</span>
                      <span className="text-gray-400">
                        {hours.open ? `${hours.open} - ${hours.close}` : 'Closed'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'social' && (
                <div className="grid grid-cols-2 gap-4">
                  {socialDetails.map((social) => (
                    <motion.button
                      key={social.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleContactMethod('social', social.url)}
                      className={`${social.color} p-4 rounded-lg flex items-center gap-3 transition-all duration-300`}
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="font-medium">{social.name}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, scale:0.8, x: 200 }}
            animate={isInView ? { opacity: 1, scale:1, x: 0 } : {}} 
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-full"
          >
            <div
              onClick={() => handleContactMethod('map', businessInfo.mapUrl)}
              className="relative h-full rounded-xl overflow-hidden cursor-pointer group"
            >
              <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/api/placeholder/800/400"
                  alt="Location Map"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-300"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className={`${dmSans.className} font-medium`}>View on Google Maps</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;