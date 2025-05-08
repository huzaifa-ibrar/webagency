"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedText from './AnimatedText';
import Image from 'next/image';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    if (typeof window === 'undefined') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Fallback scroll behavior
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

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

  return (
    <section ref={ref} id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background with multiple glows */}
      <div className="absolute inset-0 bg-netspire-black hero-glow"></div>
      
      {/* Animated glow orbs - more orbs with different animations */}
      <motion.div 
        className="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-netspire-pink opacity-20 blur-[80px]"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.15, 0.25, 0.15], 
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-[5%] w-[350px] h-[350px] rounded-full bg-netspire-pink opacity-10 blur-[100px]"
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.1, 0.2, 0.1], 
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      {/* New smaller glows that move more randomly */}
      <motion.div 
        className="absolute top-[20%] left-[20%] w-[200px] h-[200px] rounded-full bg-netspire-pink opacity-15 blur-[60px]"
        animate={{ 
          scale: [1, 1.5, 1], 
          opacity: [0.15, 0.3, 0.15], 
          x: [0, 40, 0],
          y: [0, -40, 0]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      <motion.div 
        className="absolute bottom-[15%] right-[25%] w-[250px] h-[250px] rounded-full bg-purple-500 opacity-10 blur-[70px]"
        animate={{ 
          scale: [1, 1.4, 1], 
          opacity: [0.1, 0.2, 0.1], 
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 3
        }}
      />
      
      {/* Central glow effect that pulses */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-netspire-pink opacity-5 blur-[150px]"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.05, 0.1, 0.05], 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      
      {/* Enhanced shine effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-netspire-pink to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-netspire-pink to-transparent opacity-30"></div>

      {/* Hero content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-6 text-center relative z-10"
      >
        {/* Mobile-only centered logo */}
        <div className="flex justify-center mb-6 md:hidden">
          <Image src="/images/logo.png" alt="Netspire Logo" width={180} height={60} className="h-auto" priority />
        </div>
        <motion.div 
          variants={itemVariants}
          className="inline-block mb-4 px-6 py-2 border border-netspire-pink rounded-full text-sm md:text-base tracking-wide text-netspire-pink"
        >
          <AnimatedText 
            text="INNOVATIVE WEB SOLUTIONS" 
            animation="typewriter" 
            staggerChildren={0.01} 
            startDelay={0.2}
          />
        </motion.div>
        
        <div className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight">
          <AnimatedText 
            text="We Create" 
            animation="staggered" 
            staggerChildren={0.03} 
            startDelay={0.4}
            className="inline-block mr-3"
          />
          <AnimatedText 
            text="Digital" 
            animation="staggered" 
            staggerChildren={0.02} 
            startDelay={0.8}
            className="inline-block mr-3 bg-gradient-to-r from-[#FF1053] via-pink-400 to-red-400 bg-clip-text text-transparent"
          />
          <br />
          <AnimatedText 
            text="Experiences That" 
            animation="staggered" 
            staggerChildren={0.02} 
            startDelay={1.1}
            className="inline-block mr-3"
          />
          <AnimatedText 
            text="Matter" 
            animation="staggered" 
            staggerChildren={0.02} 
            startDelay={1.5}
            className="inline-block bg-gradient-to-r from-[#FF1053] via-pink-400 to-red-400 bg-clip-text text-transparent"
          />
        </div>
        
        <motion.div variants={itemVariants} className="mb-10 md:mb-12">
          <AnimatedText 
            text="Netspire transforms ideas into stunning web solutions that captivate audiences and drive business growth." 
            animation="slideUp" 
            el="p"
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            staggerChildren={0.01} 
            startDelay={1.8}
          />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <motion.a
            href="#book-now"
            onClick={(e) => handleSmoothScroll(e, "#book-now")}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 25px rgba(255, 16, 83, 0.7)' 
            }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient text-white px-10 py-4 rounded-full font-medium text-xl shadow-lg"
          >
            Book Now
          </motion.a>
          
          <motion.a
            href="#portfolio"
            onClick={(e) => handleSmoothScroll(e, "#portfolio")}
            whileHover={{ 
              scale: 1.05,
              color: "#FF1053",
              borderColor: "#FF1053"
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