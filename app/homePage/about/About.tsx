import { motion } from "framer-motion";
import { useRef, useState } from "react";
const AboutSection = () => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.3, duration: 0.8, delay: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        }
    };


    return (
        <div ref={ref} className="md:py-24 py-16 px-6 relative overflow-hidden">

            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
                {/* Left Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="md:w-1/2 space-y-6"
                >
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={itemVariants}
                    >
                        {/* Wrapper for the leader section */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            variants={itemVariants}
                            className=""
                        >
                            {/* Subheading */}
                            <motion.span
                                className="text-yellow-400 text-sm tracking-wider uppercase font-sans font-bold"
                                whileHover={{ scale: 1.05 }}
                                initial="hidden"
                                whileInView="visible"
                                variants={itemVariants}
                                style={{
                                    background: 'linear-gradient(to right, #f59e0b, #fbbf24)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Shree Bhargava and Associate
                            </motion.span>

                            {/* Main Heading */}
                            <motion.h2
                                initial="hidden"
                                whileInView="visible"
                                className="text-4xl md:text-6xl font-bold text-gray-800 font-display text-transparent bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text"
                                variants={itemVariants}
                            >
                                Meet Our Leader
                            </motion.h2>
                        </motion.div>
                    </motion.div>

                    {/* <motion.p
                        className="text-gray-400 leading-relaxed font-ui md:block hidden"
                        variants={itemVariants}
                    >
                        At SBA-CIA, we transform spaces into timeless masterpieces, blending creativity and precision to bring every client’s vision to life. Our designs harmonize aesthetics with functionality, delivering personalized architectural experiences that inspire and endure
                    </motion.p> */}

                    {/* Founder Quote */}
                    <div className="mt-6 bg-gradient-to-r from-gray-700 to-gray-900 p-6 rounded-lg shadow-lg">
                        <p className="text-gray-300 italic">
                            “we go beyond building structures; we craft environments that inspire, reflect, and elevate the way you live and work.”
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 px-4 py-2 text-sm text-gray-800 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-full shadow hover:bg-gradient-to-r hover:from-[#fbbf24] hover:to-[#f59e0b] transition-all duration-300 font-ui cursor-pointer"
                        >
                            Read My Story
                        </motion.button>

                    </div>

                </motion.div>

                {/* Right Content (Founder Image and Info) */}
                <motion.div
                    className="md:w-1/2 relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                >
                    {/* Founder Image with Hover Effects */}
                    <div
                        className="relative rounded-xl overflow-hidden shadow-lg group transform-gpu"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <motion.img
                            src="https://plus.unsplash.com/premium_photo-1661335257817-4552acab9656?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image path
                            alt="Founder of SBA-CIA"
                            className="w-full md:h-auto h-96 object-cover transition-transform duration-500"
                            animate={{ scale: hovered ? 1.05 : 1 }}
                        />
                        {/* 3D Tilt Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                            style={{
                                transform: hovered
                                    ? "rotateY(3deg) rotateX(-3deg)"
                                    : "rotateY(0deg) rotateX(0deg)",
                            }}
                        >
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-transparent bg-clip-text font-display">Ar. Shashank Pare</h3>
                            <p className="text-gray-400 text-sm font-ui">Shree Bhargava and Associate - Creative Indian Architect</p>
                            <p className="text-gray-300 text-sm font-ui">Founder & Lead Architect</p>
                        </motion.div>
                    </div>

                </motion.div>
            </div>

        </div>
    );
};

export default AboutSection;

{/* Core Values Section */ }
{/* <div className="mt-16">
                <h3 className="text-center text-3xl font-bold text-gray-100 mb-8 font-sans">
                    Our Core Values
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Innovation", description: "Pioneering bold ideas." },
                        { title: "Integrity", description: "Building trust always." },
                        { title: "Sustainability", description: "Eco-friendly solutions." },
                    ].map((value, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:bg-gray-700 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <h4 className="text-xl font-bold text-yellow-400 font-ui">
                                {value.title}
                            </h4>
                            <p className="text-gray-300 mt-4 font-ui">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div> */}

