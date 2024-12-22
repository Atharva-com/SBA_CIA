import { motion } from "framer-motion";
import { useState } from "react";
const AboutSection = () => {
    const [hovered, setHovered] = useState(false);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
        }
    };


    return (
        <div className="bg-gray-950 py-24 px-6 relative overflow-hidden">
            {/* Floating Decorative Elements */}
            <motion.div
                className="absolute top-16 right-16 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
            ></motion.div>
            <motion.div
                className="absolute bottom-20 left-10 w-24 h-24 bg-gray-800 rounded-full blur-2xl opacity-50"
                animate={{ scale: [1, 0.9, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
            ></motion.div>



            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
                {/* Left Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="md:w-1/2 space-y-6"
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { duration: 1 } }
                        }}
                    >
                        {/* Wrapper for the leader section */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={itemVariants}
                            className=""
                        >
                            {/* Subheading */}
                            <motion.span
                                className="text-yellow-400 text-sm tracking-wider uppercase font-sans"
                                whileHover={{ scale: 1.05 }}
                                variants={itemVariants}
                            >
                                Shree Bhargava and Associate
                            </motion.span>

                            {/* Main Heading */}
                            <motion.h2
                                className="text-4xl md:text-6xl font-bold text-gray-100 font-display"
                                variants={itemVariants}
                            >
                                Meet Our Leader
                            </motion.h2>
                        </motion.div>
                    </motion.div>
                    <motion.p
                        className="text-gray-400 leading-relaxed font-ui"
                        variants={itemVariants}
                    >
                        At SBA-CIA, we transform spaces into timeless masterpieces, blending creativity and precision to bring every client’s vision to life. Our designs harmonize aesthetics with functionality, delivering personalized architectural experiences that inspire and endure
                    </motion.p>

                    {/* Founder Quote */}
                    <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
                        <p className="text-gray-300 italic">
                            “we go beyond building structures; we craft environments that inspire, reflect, and elevate the way you live and work.”
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 px-4 py-2 text-sm bg-yellow-400 text-gray-900 rounded-full shadow hover:bg-yellow-300 transition-all duration-300 font-ui"
                        >
                            Read My Story
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Content (Founder Image and Info) */}
                <motion.div
                    className="md:w-1/2 relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
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
                            className="w-full h-auto object-cover transition-transform duration-500"
                            animate={{ scale: hovered ? 1.05 : 1 }}
                        />
                        {/* 3D Tilt Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950 opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                            style={{
                                transform: hovered
                                    ? "rotateY(3deg) rotateX(-3deg)"
                                    : "rotateY(0deg) rotateX(0deg)",
                            }}
                        >
                            <h3 className="text-2xl font-bold text-yellow-400 font-display">Ar. Shashank Pare</h3>
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

