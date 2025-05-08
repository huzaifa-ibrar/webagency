"use client";

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Updated projects with standardized aspect ratios
const projects = [
  {
    title: "EcoHarvest",
    category: "E-commerce",
    description: "Sustainable product marketplace with advanced filtering and checkout.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#FF1053",
    url: "https://www.eco-harvest.com/",
    stats: {
      performance: 55,
      traffic: 38,
      time: "3m 20s"
    }
  },
  {
    title: "Pulse Fitness",
    category: "Fitness Solutions",
    description: "Workout tracking app with social features and personalized routines.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#FF1053",
    url: "https://pulsefitness.com/",
    stats: {
      performance: 42,
      traffic: 27,
      time: "2m 45s"
    }
  },
  {
    title: "Quantum Studios",
    category: "Enterprise Tech",
    description: "Custom software, cloud integration, and digital strategies for industry leaders.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#FF1053",
    url: "https://www.quantumstudios.dev/",
    stats: {
      performance: 61,
      traffic: 44,
      time: "4m 10s"
    }
  },
  {
    title: "Elevate Finance",
    category: "Finance Platform",
    description: "Empowering exporters with international financing and risk management solutions.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "#FF1053",
    url: "https://www.elevatefinance.ca/",
    stats: {
      performance: 48,
      traffic: 32,
      time: "2m 58s"
    }
  },
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
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: index * 0.15 // Stagger based on index
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 8px 32px -8px #FF105355',
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className="relative group rounded-xl overflow-hidden bg-netspire-black border border-pink-500/20 shadow-lg flex flex-col items-stretch aspect-square"
            >
              {/* External link arrow */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-netspire-pink/80 transition-colors"
                title={`Visit ${project.title}`}
                tabIndex={0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-netspire-pink group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-10 10M17 7h-6m6 0v6" />
                </svg>
              </a>
              {/* Project image */}
              <div className="w-full h-2/3 flex-1 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full aspect-square"
                />
                {/* Pink overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-netspire-pink/40 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>
              {/* Text content below image */}
              <div className="flex flex-col items-center justify-center p-4 bg-black/70 w-full">
                <h3 className="text-lg font-bold text-netspire-pink mb-1 text-center">{project.title}</h3>
                <p className="text-xs text-gray-200 text-center mb-2">{project.description}</p>
                <div className="flex flex-row gap-3 text-xs text-pink-400 justify-center">
                  <span className="flex items-center gap-1"><svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1v-4h-1" /></svg>+{project.stats.performance}% perf</span>
                  <span className="flex items-center gap-1"><svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>+{project.stats.traffic}% traffic</span>
                  <span className="flex items-center gap-1"><svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>{project.stats.time}</span>
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