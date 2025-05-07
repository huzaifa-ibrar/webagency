"use client";

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Updated projects with standardized aspect ratios
const projects = [
  {
    title: "Elevate Finance",
    url: "https://elevatefinance.ca/",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Elevate Finance is a modern banking platform and a company based in Toronto.",
  },
  {
    title: "Quantum Studios",
    url: "https://quantumstudios.ca/",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Quantum Studios is a digital production company located in Toronto.",
  },
  {
    title: "EcoHarvest",
    url: "https://ecoharvest.ca/",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "EcoHarvest is a sustainable product marketplace and a Toronto-based company.",
  }
];

const PortfolioSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (custom: { row: number, col: number }) => ({
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: (custom.row * 0.3) + (custom.col * 0.15) // Stagger based on position
      }
    })
  };

  // Calculate grid position for staggered animation
  const getGridPosition = (index: number) => {
    // For a typical 3-column layout
    const col = index % 3;
    const row = Math.floor(index / 3);
    return { row, col };
  };

  // Get grid span classes based on size for precise layout
  const getGridClass = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2"; // 2x2
      case "medium":
        return "col-span-2 row-span-1"; // 2x1 horizontal rectangle
      case "rectangular":
        return "col-span-1 row-span-2"; // 1x2 vertical rectangle
      case "small":
      default:
        return "col-span-1 row-span-1"; // 1x1 square
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-netspire-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-netspire-pink to-transparent opacity-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-netspire-pink to-transparent opacity-20"></div>
      
      <div className="absolute -top-[400px] -right-[400px] w-[800px] h-[800px] rounded-full bg-netspire-pink opacity-5 blur-[120px]"></div>
      <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-netspire-pink opacity-5 blur-[100px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Our <span className="text-gradient">Work</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Explore our portfolio of successful projects and see how we've helped businesses 
            achieve their digital goals.
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group overflow-hidden rounded-xl h-full w-full bg-netspire-gray/30 border border-netspire-pink shadow-lg flex flex-col"
            >
              {/* Project image */}
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </a>
              {/* Icon/button always visible */}
              <div className="flex justify-center items-center py-4 bg-netspire-black">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-netspire-pink text-white rounded-full shadow hover:bg-pink-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Visit Website
                </a>
              </div>
              {/* Description always visible */}
              <div className="px-6 py-4 bg-netspire-black rounded-b-xl flex-1 flex items-center justify-center">
                <p className="text-gray-200 text-center text-base">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-20">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(255, 16, 83, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block btn-gradient text-white px-10 py-4 rounded-full font-medium text-lg shadow-lg"
          >
            Start Your Project
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection; 