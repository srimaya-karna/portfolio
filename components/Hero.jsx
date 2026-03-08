import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    // Framer Motion Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="home" className="hero-brutalist">
            {/* Layer 1: Background Video (Preserved Existing Implementation) */}
            <div className="video-background-layer">
                <video autoPlay muted loop playsInline className="video-media">
                    <source src="assets/vid-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
                    <source src="assets/vid-desktop.mp4" media="(min-width: 769px)" type="video/mp4" />
                </video>
            </div>

            {/* Layer 2: Dark overlay for contrast */}
            <div className="hero-dark-overlay"></div>

            {/* Layer 3, 4, 5: Glassmorphism UI, Text, Interactive Elements */}
            <div className="hero-content-wrapper">
                <motion.div
                    className="hero-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left Section: Hero Text Block */}
                    <div className="hero-left">
                        <motion.h1 className="hero-title" variants={itemVariants}>
                            Hi, I'm Srimay Pradhan <br />
                            <span className="neon-accent">AI Systems & Software Developer</span>
                        </motion.h1>

                        <motion.p className="hero-subtitle" variants={itemVariants}>
                            Building intelligent systems, <br />
                            computational models, and scalable web tools.
                        </motion.p>

                        <motion.div className="hero-cta-group" variants={itemVariants}>
                            <motion.a
                                href="#projects"
                                className="btn-brutalist-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Projects
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="btn-brutalist-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* Right Section: Interactive Bento Grid */}
                    <div className="hero-right">
                        <div className="bento-grid">

                            {/* Card 1: Featured Project */}
                            <motion.div
                                className="bento-card"
                                variants={itemVariants}
                                whileHover="hover"
                            >
                                <div className="bento-content">
                                    <h3 className="bento-title">Featured Project</h3>
                                    <p className="bento-micro">PINNs Research - SciML</p>
                                </div>
                            </motion.div>

                            {/* Card 2: Tech Stack */}
                            <motion.div
                                className="bento-card"
                                variants={itemVariants}
                                whileHover="hover"
                            >
                                <div className="bento-content">
                                    <h3 className="bento-title">Tech Stack</h3>
                                    <p className="bento-micro">Python / React / ML</p>
                                </div>
                            </motion.div>

                            {/* Card 3: GitHub Activity */}
                            <motion.div
                                className="bento-card"
                                variants={itemVariants}
                                whileHover="hover"
                            >
                                <div className="bento-content">
                                    <h3 className="bento-title">GitHub Activity</h3>
                                    <p className="bento-micro">Open Source Contributions</p>
                                </div>
                            </motion.div>

                            {/* Card 4: Contact */}
                            <motion.div
                                className="bento-card"
                                variants={itemVariants}
                                whileHover="hover"
                            >
                                <div className="bento-content">
                                    <h3 className="bento-title">Contact</h3>
                                    <p className="bento-micro">Ready for opportunities</p>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
