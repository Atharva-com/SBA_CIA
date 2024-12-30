import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Phone, Mail, MessageCircle, Twitter,
    Instagram, Facebook, ArrowRight, X,
} from 'lucide-react';

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

// Contact Details
const contactDetails = [
    { icon: Phone, label: 'Call Us', value: businessInfo.phone, type: 'phone' },
    { icon: MessageCircle, label: 'WhatsApp', value: businessInfo.whatsapp, type: 'whatsapp' },
    { icon: Mail, label: 'Email Us', value: businessInfo.email, type: 'email' },
    { icon: MapPin, label: 'Visit Us', value: businessInfo.address, type: 'address' }
]

// SocialDetails
const socialDetails = [
    { icon: Instagram, name: 'Instagram', url: businessInfo.socials.instagram, color: 'bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' },
    { icon: Facebook, name: 'Facebook', url: businessInfo.socials.facebook, color: 'bg-gradient-to-r from-[#00c6ff] to-[#0072ff]' },
    { icon: Twitter, name: 'LinkedIn', url: businessInfo.socials.linkedin, color: 'bg-[#0077B5]' },
    { icon: X, name: 'Twitter', url: businessInfo.socials.twitter, color: 'bg-gradient-to-r from-[#1DA1F2] to-[#0d90e0]' }
]

interface ContactLeftProps {
    activeTab: string;
    handleContactMethod: (type: string, value: string) => void;
}

const ContactLeft: React.FC<ContactLeftProps> = ({ activeTab, handleContactMethod }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [openingIn, setOpeningIn] = useState('');

    type Day =
        | 'mon'
        | 'tue'
        | 'wed'
        | 'thu'
        | 'fri'
        | 'sat'
        | 'sun';

    const businessHours: Record<Day, { open: string; close: string }> = {
        mon: { open: '9:00 AM', close: '5:00 PM' },
        tue: { open: '9:00 AM', close: '5:00 PM' },
        wed: { open: '9:00 AM', close: '5:00 PM' },
        thu: { open: '9:00 AM', close: '5:00 PM' },
        fri: { open: '9:00 AM', close: '5:00 PM' },
        sat: { open: '10:00 AM', close: '4:00 PM' },
        sun: { open: '', close: '' }, // Closed
    };

    // Business hours check
    useEffect(() => {
        const checkBusinessHours = () => {
            const now = new Date();
            const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            const currentDay = days[now.getDay()] as Day;
            const hours = businessHours[currentDay];

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
        <>
            <AnimatePresence mode="wait">

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-gray-900 rounded-xl p-4 space-y-4"
                >
                    {activeTab === 'contact' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
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

                            {Object.entries(businessHours).map(([day, hours], index) => (
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
                                    className={`${social.color} py-4 px-16 rounded-lg flex items-center gap-3 transition-all duration-300`}
                                >
                                    <social.icon className="w-5 h-5" />
                                    <span className="font-medium font-ui text-gray-950">{social.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    )}

                </motion.div>

            </AnimatePresence>
        </>
    )
}

export default ContactLeft