"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const calendlyUrl = "https://calendly.com/netspirestudios/30min?month=2025-05";

  return (
    <section ref={ref} id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-netspire-black hero-glow"></div>
      
      {/* Abstract shapes */}
      <motion.div 
        className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-netspire-pink opacity-20 blur-3xl floating"
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.15, 0.2, 0.15], 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute -left-20 bottom-1/4 w-80 h-80 rounded-full bg-netspire-pink-light opacity-10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.1, 0.15, 0.1], 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />

      {/* Hero content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-block mb-4 px-6 py-2 border border-netspire-pink rounded-full text-sm md:text-base tracking-wide text-netspire-pink"
        >
          INNOVATIVE WEB SOLUTIONS
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight"
        >
          We Create <span className="text-gradient">Digital</span> <br />
          Experiences That <span className="text-gradient">Matter</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 md:mb-12"
        >
          Netspire transforms ideas into stunning web solutions that captivate audiences 
          and drive business growth.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <motion.a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient text-white px-10 py-4 rounded-full font-medium text-xl shadow-lg"
          >
            Get Started
          </motion.a>
          
          <motion.a
            href="#portfolio"
            whileHover={{ 
              scale: 1.05,
              color: "#FF1053"
            }}
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-netspire-pink px-10 py-4 rounded-full font-medium text-xl border border-white hover:border-netspire-pink transition-colors"
          >
            View Our Work
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 