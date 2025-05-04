"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    title: "Elevate Finance",
    category: "Web Application",
    description: "Modern banking platform with intuitive dashboard and real-time analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-blue-500",
  },
  {
    title: "Quantum Studios",
    category: "Brand Identity",
    description: "Complete brand overhaul for a digital production company.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-purple-500",
  },
  {
    title: "EcoHarvest",
    category: "E-commerce",
    description: "Sustainable product marketplace with advanced filtering and checkout.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-green-500",
  },
  {
    title: "Pulse Fitness",
    category: "Mobile App",
    description: "Workout tracking app with social features and personalized routines.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-red-500",
  },
  {
    title: "Skyline Properties",
    category: "Web Application",
    description: "Real estate platform with virtual tours and interactive property maps.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-yellow-500",
  },
  {
    title: "Culinary Cloud",
    category: "Mobile App",
    description: "Recipe discovery and meal planning app with ingredient recognition.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    color: "bg-indigo-500",
  },
];

const PortfolioSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-netspire-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Our <span className="text-gradient">Work</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Explore our portfolio of successful projects and see how we've helped businesses 
            achieve their digital goals.
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-xl bg-netspire-gray bg-opacity-20 backdrop-filter backdrop-blur-lg h-[400px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mb-3 ${project.color} bg-opacity-80`}>
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <motion.a 
                  href="#" 
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-netspire-pink font-medium"
                >
                  View Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-16">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block btn-gradient text-white px-8 py-3 rounded-full font-medium text-lg shadow-lg"
          >
            Start Your Project
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection; 