import { motion } from 'framer-motion';

const TeamSection = () => {

    const timelineEvents = [
        { year: "2010", title: "Company Founded", description: "Our journey began with a vision to create unique architectural solutions." },
        { year: "2015", title: "First Major Project", description: "Completed the first major commercial project that set the tone for future growth." },
        { year: "2020", title: "Expanding Globally", description: "Opened offices in multiple countries and started working on international projects." },
        { year: "2024", title: "Pioneering New Technologies", description: "Adopting AI and 3D printing for cutting-edge architectural designs." },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };


    const visionPoints = [
        {
            title: "Innovative Design",
            description: "Pushing boundaries with cutting-edge architectural solutions",
            icon: "🎯"
        },
        {
            title: "Sustainability",
            description: "Creating eco-friendly spaces for a better tomorrow",
            icon: "🌱"
        },
        {
            title: "Client Focus",
            description: "Delivering beyond expectations with personalized solutions",
            icon: "🤝"
        }
    ];

    return (
        <div className="bg-gray-950 md:py-24 py-16 px-6">
            <div className="container mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <motion.span
                        className="text-yellow-400 text-lg tracking-wider font-sans"
                        whileHover={{ scale: 1.05 }}
                    >
                        MORE ABOUT US
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-100 font-display">
                        Our Journey, Our Team, Our Vision
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-ui">
                        From humble beginnings to becoming a global leader in architectural design, explore our story and meet the team behind the success.
                    </p>
                </motion.div>

                {/* Timeline Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 space-y-8"
                >
                    <h3 className="text-center text-3xl font-bold text-gray-100 font-ui">
                        Our Journey
                    </h3>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute w-1 bg-gray-800 h-full left-1/2 transform -translate-x-1/2"></div>
                        <div className="space-y-8">
                            {timelineEvents.map((event, index) => (
                                <motion.div
                                    key={index}
                                    className={`relative flex items-center gap-6 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                                        }`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <div className="bg-yellow-400 w-8 h-8 rounded-full flex-shrink-0"></div>
                                    <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-sm">
                                        <h4 className="text-lg font-bold text-yellow-400 font-sans">{event.year}</h4>
                                        <p className="text-yellow-300 font-ui">
                                            {event.title}
                                        </p>
                                        <p className="text-gray-300 font-ui">
                                            {event.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Team Section */}
              {/* Enhanced Team Section */}
              <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32"
                >
                    <motion.div 
                        className="text-center space-y-4 mb-16"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                    >
                        <motion.span 
                            className="text-yellow-400 text-lg tracking-wider font-sans inline-block"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            OUR TEAM
                        </motion.span>
                        <h3 className="text-4xl font-bold text-gray-100 font-display">
                        Meet the Experts Behind the Designs
                        </h3>
                    </motion.div>

                </motion.div>

                {/* Vision Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32"
                >
                    <h3 className="text-center text-3xl font-bold text-gray-100 font-display mb-16">
                        Our Vision
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {visionPoints.map((point, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors duration-300"
                            >
                                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-6 mx-auto">
                                    <span className="text-3xl">{point.icon}</span>
                                </div>
                                <h4 className="text-xl font-bold text-yellow-400 text-center mb-4 font-display">
                                    {point.title}
                                </h4>
                                <p className="text-gray-400 text-center font-ui">
                                    {point.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default TeamSection;
