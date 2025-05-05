"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CtaSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-netspire-black z-0"></div>
      
      {/* Pink glow effect */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-netspire-pink opacity-10 blur-3xl z-0"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.1, 0.15, 0.1], 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Animated shapes */}
      <motion.div 
        className="absolute top-20 left-[10%] w-40 h-40 rounded-full bg-netspire-pink opacity-20 blur-xl"
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-[10%] w-60 h-60 rounded-full bg-netspire-pink-light opacity-15 blur-2xl"
        animate={{ 
          y: [0, 40, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className="max-w-5xl mx-auto bg-netspire-gray bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-12 md:p-16 border border-netspire-pink border-opacity-20 shadow-lg shadow-netspire-pink/10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block px-6 py-2 bg-netspire-pink bg-opacity-20 rounded-full text-netspire-pink font-medium text-sm tracking-wide uppercase mb-6"
            >
              Let's Work Together
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              Ready to <span className="text-gradient">Transform</span> Your Digital Presence?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Let's collaborate to create exceptional digital experiences that elevate your brand and drive meaningful results.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.a
                href="https://calendly.com/netspirestudios/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gradient inline-block text-white px-10 py-5 rounded-full font-medium text-xl shadow-lg"
              >
                Book Now
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center font-medium text-xl text-white hover:text-netspire-pink transition-colors"
              >
                Get in Touch
              </motion.a>

              <motion.a
                href="#services"
                whileHover={{ 
                  scale: 1.05,
                  color: "#FF1053"
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center font-medium text-xl text-white hover:text-netspire-pink transition-colors"
              >
                Explore Services
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 