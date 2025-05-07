"use client";

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Updated projects with standardized aspect ratios
const projects = [
  {
    title: "Elevate Finance",
    category: "Web Application",
    description: "Modern banking platform with intuitive dashboard and real-time analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#3b82f6",
    size: "large", // 2x2 size
    aspectRatio: "aspect-[4/3]"
  },
  {
    title: "Quantum Studios",
    category: "Brand Identity",
    description: "Complete brand overhaul for a digital production company.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#8b5cf6",
    size: "small", // 1x1 size
    aspectRatio: "aspect-square"
  },
  {
    title: "EcoHarvest",
    category: "E-commerce",
    description: "Sustainable product marketplace with advanced filtering and checkout.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#10b981",
    size: "medium", // 2x1 size
    aspectRatio: "aspect-[2/1]"
  },
  {
    title: "Pulse Fitness",
    category: "Mobile App",
    description: "Workout tracking app with social features and personalized routines.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#ef4444",
    size: "small", // 1x1 size
    aspectRatio: "aspect-square"
  },
  {
    title: "Skyline Properties",
    category: "Web Application",
    description: "Real estate platform with virtual tours and interactive property maps.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#f59e0b",
    size: "medium", // 2x1 size
    aspectRatio: "aspect-[2/1]"
  },
  {
    title: "Culinary Cloud",
    category: "Mobile App",
    description: "Recipe discovery and meal planning app with ingredient recognition.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#6366f1",
    size: "small", // 1x1 size
    aspectRatio: "aspect-square"
  },
  {
    title: "NexusVR",
    category: "Virtual Reality",
    description: "Immersive VR experience for virtual real estate tours and architecture visualization.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#8B5CF6",
    size: "rectangular", // 1x2 size (vertical rectangle)
    aspectRatio: "aspect-[1/2]"
  },
  {
    title: "Terra Analytics",
    category: "Data Dashboard",
    description: "Environmental monitoring platform with real-time data visualization and reporting.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#10B981",
    size: "large", // 2x2 size
    aspectRatio: "aspect-[4/3]"
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              custom={getGridPosition(index)}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className={`relative group overflow-hidden rounded-xl h-full
                w-full
                ${getGridClass(project.size)}
                sm:${getGridClass(project.size)}
                md:${getGridClass(project.size)}
                ${project.aspectRatio}
                sm:${project.aspectRatio}
                md:${project.aspectRatio}
              `}
              style={{
                gridColumn: 'span 1',
                gridRow: 'span 1',
              }}
            >
              {/* Project image with proper aspect ratio */}
              <div className={`absolute inset-0 z-0 aspect-square sm:${project.aspectRatio} md:${project.aspectRatio}`}>
                <div 
                  className="h-full w-full transition-transform duration-700 ease-in-out bg-cover bg-center bg-no-repeat group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
              
              {/* Image content container - maintains consistent layout */}
              <div className={`relative w-full h-full ${project.aspectRatio} flex items-end`}>
                {/* Gradient overlay for better text readability */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-10"
                  style={{ background: `linear-gradient(to top, black, ${project.color}10, transparent)` }}
                ></div>
                
                {/* Text overlay panel */}
                <div 
                  className="absolute inset-0 z-20 p-4 md:p-6 flex flex-col justify-end transform transition-transform duration-500"
                >
                  {/* Accent line on side */}
                  <div 
                    className="absolute top-6 bottom-6 left-0 w-1 opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:h-full group-hover:top-0 group-hover:bottom-0"
                    style={{ backgroundColor: project.color }}
                  ></div>
                  
                  {/* Semi-transparent panel for text */}
                  <div className="bg-black/30 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg border border-white/10 transform transition-all duration-500 group-hover:bg-black/50 group-hover:border-white/20">
                    <div 
                      className="inline-block py-1 px-2 text-xs font-medium tracking-wide text-white rounded-full mb-2 backdrop-blur-sm"
                      style={{ backgroundColor: `${project.color}80` }}
                    >
                      {project.category}
                    </div>
                    
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-netspire-pink transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-200 mt-1 text-xs sm:text-sm opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {project.description}
                    </p>
                    
                    <motion.span 
                      className="inline-flex items-center text-netspire-pink font-medium mt-2 text-sm opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.span>
                  </div>
                </div>
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