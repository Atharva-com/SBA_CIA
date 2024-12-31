import React, { useState, useEffect, useMemo } from 'react';
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

    const businessHours: Record<Day, { open: string; close: string }> = useMemo(() => ({
        mon: { open: '09:30', close: '18:30' },
        tue: { open: '09:30', close: '18:30' },
        wed: { open: '09:30', close: '18:30' },
        thu: { open: '09:30', close: '18:30' },
        fri: { open: '09:30', close: '18:30' },
        sat: { open: '10:00', close: '14:00' },
        sun: { open: '', close: '' }
    }), []);

    useEffect(() => {
        const checkBusinessHours = () => {
            // Create date object for Indian time
            const now = new Date();
            const indiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

            const days: Day[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            const currentDay = days[indiaTime.getDay()];
            const hours = businessHours[currentDay];

            if (!hours.open || !hours.close) {
                setIsOpen(false);
                setOpeningIn('Closed today');
                return;
            }

            // Convert current time to minutes (Indian time)
            const currentTime = indiaTime.getHours() * 60 + indiaTime.getMinutes();

            // Convert business hours to minutes
            const [openHour, openMinute] = hours.open.split(':').map(Number);
            const [closeHour, closeMinute] = hours.close.split(':').map(Number);
            const openTime = openHour * 60 + openMinute;
            const closeTime = closeHour * 60 + closeMinute;

            const isCurrentlyOpen = currentTime >= openTime && currentTime < closeTime;
            setIsOpen(isCurrentlyOpen);

            // Calculate time until opening
            if (!isCurrentlyOpen) {
                if (currentTime < openTime) {
                    // Will open later today
                    const diff = openTime - currentTime;
                    setOpeningIn(`Opens in ${Math.floor(diff / 60)}h ${diff % 60}m`);
                } else {
                    // Find next opening time
                    let nextDayIndex = (indiaTime.getDay() + 1) % 7;
                    let daysChecked = 0;

                    // Look for the next open day
                    while (daysChecked < 7) {
                        const nextDay = days[nextDayIndex];
                        const nextDayHours = businessHours[nextDay];

                        if (nextDayHours.open && nextDayHours.close) {
                            //   const [nextOpenHour, nextOpenMinute] = nextDayHours.open.split(':').map(Number);
                            //   const minutesToNextDay = (24 * 60 - currentTime) + (nextOpenHour * 60 + nextOpenMinute);

                            if (daysChecked === 0) {
                                setOpeningIn(`Opens tomorrow at ${nextDayHours.open}`);
                            } else {
                                setOpeningIn(`Opens ${days[nextDayIndex]} at ${nextDayHours.open}`);
                            }
                            break;
                        }

                        nextDayIndex = (nextDayIndex + 1) % 7;
                        daysChecked++;
                    }

                    if (daysChecked === 7) {
                        setOpeningIn('Temporarily closed');
                    }
                }
            } else {
                // Calculate remaining open time
                const remainingTime = closeTime - currentTime;
                setOpeningIn(`Closes in ${Math.floor(remainingTime / 60)}h ${remainingTime % 60}m`);
            }
        };

        // Initial check
        checkBusinessHours();

        // Update every minute
        const interval = setInterval(checkBusinessHours, 60000);
        return () => clearInterval(interval);
    }, [businessHours]);


    return (
        <>
            <AnimatePresence mode="wait">

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-gray-900 rounded-xl p-4 md:py-0 md:px-3 md:bg-transparent space-y-4 w-full "
                >
                    {activeTab === 'contact' && (
                        <>
                            <div className="space-y-3">
                                {/* Contact methods */}
                                {contactDetails.map((item, index) => (

                                    <motion.div
                                        key={item.type}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleContactMethod(item.type, item.value)}
                                        className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg cursor-pointer bg-gray-700/50 transition-colors group"
                                    >
                                        <item.icon className="w-5 h-5 text-yellow-400" />
                                        <div className='flex-1'>
                                            <h4 className="font-medium text-gray-300">{item.label}</h4>
                                            <p className="text-gray-400 group-hover:text-yellow-400 transition-colors break-all">
                                                {item.value}
                                            </p>
                                        </div>
                                        <ArrowRight className="hidden md:block w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'hours' && (
                        <div className="md:space-y-2 space-y-4">
                            <motion.div
                                initial={{ scale: 0.95 }}
                                whileInView={{ scale: 1 }}
                                className={`p-4 rounded-lg ${isOpen ? 'bg-green-900/20' : 'bg-red-900/20'
                                    } flex items-center justify-center w-full`}
                            >
                                <motion.div
                                    whileInView={{
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


                            {/* Business Hours - Responsive Grid */}
                            <div className="grid gap-2">
                                {Object.entries(businessHours).map(([day, hours], index) => (
                                    <motion.div
                                        key={day}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex justify-between p-3 bg-gray-700/50 rounded-lg text-sm md:text-base text-gray-400"
                                    >
                                        <span className="capitalize">{day}</span>
                                        <span className="">
                                            {hours.open ? `${hours.open} - ${hours.close}` : 'Closed'}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'social' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {socialDetails.map((social) => (
                                <motion.button
                                    key={social.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleContactMethod('social', social.url)}
                                    className={`${social.color} p-4 rounded-lg flex items-center justify-center md:justify-start gap-3 transition-all duration-300 w-full`}
                                >
                                    <social.icon className="w-5 h-5" />
                                    <span className="font-medium">{social.name}</span>
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