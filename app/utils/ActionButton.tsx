import React, { useState } from 'react';
import {
    Share2,
    Download,
    Link2,
    Mail,
    Twitter,
    Linkedin,
    Facebook,
    Check,
    FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DM_Sans } from 'next/font/google';
const dmSans = DM_Sans({ subsets: ['latin'] });

// Share Menu Component
const ShareMenu = ({ isOpen, service, onClose }: { isOpen: boolean; service: Service; onClose: () => void;}) => {
    const [copyStatus, setCopyStatus] = useState('');

    const shareUrl = `https://yourwebsite.com/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`;

    const shareOptions = [
        {
            icon: <Mail className="w-4 h-4" />,
            label: 'Email',
            action: () => {
                window.location.href = `mailto:?subject=Check out this architectural service&body=I thought you might be interested in ${service.title}: ${shareUrl}`;
            }
        },
        {
            icon: <Twitter className="w-4 h-4" />,
            label: 'Twitter',
            action: () => {
                window.open(`https://twitter.com/intent/tweet?text=Check out ${service.title}&url=${encodeURIComponent(shareUrl)}`);
            }
        },
        {
            icon: <Linkedin className="w-4 h-4" />,
            label: 'LinkedIn',
            action: () => {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
            }
        },
        {
            icon: <Facebook className="w-4 h-4" />,
            label: 'Facebook',
            action: () => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
            }
        },
        {
            icon: <Link2 className="w-4 h-4" />,
            label: 'Copy Link',
            action: async () => {
                try {
                    await navigator.clipboard.writeText(shareUrl);
                    setCopyStatus('copied');
                    setTimeout(() => setCopyStatus(''), 2000);
                } catch (err) {
                    console.error('Failed to copy link', err);
                    setCopyStatus('failed');
                }
            }
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute right-0 top-12 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-2 z-50"
                >
                     {/* Close Button */}
                     <div className="flex justify-end absolute right-0 top-0">
                        <button
                            onClick={onClose} // Add your close logic here
                            className="text-gray-400 hover:text-gray-100 p-2 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-1">
                        {shareOptions.map((option) => (
                            <motion.button
                                key={option.label}
                                className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                                onClick={option.action}
                                whileHover={{ x: 5 }}
                            >
                                <span className="text-yellow-400">{option.icon}</span>
                                <span className={`${dmSans.className} text-sm`}>{option.label}</span>
                                {option.label === 'Copy Link' && copyStatus === 'copied' && (
                                    <Check className="w-4 h-4 text-green-400 ml-auto" />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Download Menu Component
const DownloadMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const downloadOptions = [
        {
            icon: <FileDown className="w-4 h-4" />,
            label: 'Service Brochure (PDF)',
            action: () => {
                // Generate and download PDF (you'll need to implement this based on your backend)
                const downloadFile = async (fileType: string) => {
                    try {
                      const response = await fetch(`/api/download/${fileType}`);
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${fileType}.pdf`;
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error('Download failed:', error);
                    }
                  };
                
                  downloadFile('service-brochure');

                console.log('Downloading brochure...');
            }
        },
        {
            icon: <FileDown className="w-4 h-4" />,
            label: 'Project Portfolio',
            action: () => {
                // Download portfolio
                console.log('Downloading portfolio...');
            }
        },
        {
            icon: <FileDown className="w-4 h-4" />,
            label: 'Price Guide',
            action: () => {
                // Download price guide
                console.log('Downloading price guide...');
            }
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute right-0 top-12 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-2 z-50"
                >
                    {/* Close Button */}
                    <div className="flex justify-end  absolute right-0 top-0">
                        <button
                            onClick={onClose} // Add your close logic here
                            className="text-gray-400 hover:text-gray-100 p-2 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-1">
                        {downloadOptions.map((option) => (
                            <motion.button
                                key={option.label}
                                className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                                onClick={option.action}
                                whileHover={{ x: 5 }}
                            >
                                <span className="text-yellow-400">{option.icon}</span>
                                <span className={`${dmSans.className} text-sm`}>{option.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Action Buttons Component
interface Service {
    title: string;
    // Add other properties of the service object if needed
}

const ActionButton = ({ service }: { service: Service }) => {
    const [shareMenuOpen, setShareMenuOpen] = useState(false);
    const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

    return (
        <div className="flex gap-2 relative">
            <motion.div className="relative">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        setShareMenuOpen(!shareMenuOpen);
                        setDownloadMenuOpen(false);
                    }}
                    className="p-2 bg-gray-800 rounded-lg text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition-all"
                >
                    <Share2 className="w-4 h-4" />
                </motion.button>
                <ShareMenu
                    isOpen={shareMenuOpen}
                    onClose={() => setShareMenuOpen(false)}
                    service={service}
                />
            </motion.div>

            <motion.div className="relative">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        setDownloadMenuOpen(!downloadMenuOpen);
                        setShareMenuOpen(false);
                    }}
                    className="p-2 bg-gray-800 rounded-lg text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition-all"
                >
                    <Download className="w-4 h-4" />
                </motion.button>
                <DownloadMenu
                    isOpen={downloadMenuOpen}
                    onClose={() => setDownloadMenuOpen(false)}
                />
            </motion.div>
        </div>
    );
};

export default ActionButton;