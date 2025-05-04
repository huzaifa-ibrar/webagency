"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const CtaSection = () => {
  const calendlyUrl = "https://calendly.com/netspirestudios/30min?month=2025-05";
  
  return (
    <section className="py-24 bg-netspire-black relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-netspire-pink opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-netspire-pink opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-netspire-gray bg-opacity-10 backdrop-filter backdrop-blur-md rounded-3xl border border-netspire-gray border-opacity-20 p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-netspire-pink opacity-10 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-netspire-pink opacity-10 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to Transform Your <span className="text-gradient">Digital Presence?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Let's create something extraordinary together. Our team is ready to bring your vision to life.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a 
              href={calendlyUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-gradient px-8 py-4 rounded-full text-white font-semibold text-lg sm:text-xl shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Get Started
            </a>
            
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-full border-2 border-netspire-pink border-opacity-40 text-white font-semibold text-lg sm:text-xl transform transition-all duration-200 hover:bg-netspire-pink hover:bg-opacity-10 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 