"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    // Create a parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (window.innerWidth / 2 - clientX) / 30;
      const y = (window.innerHeight / 2 - clientY) / 30;
      
      gsap.to(".parallax-glow", {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
      });
      
      gsap.to(".hero-image", {
        x: x * 0.5,
        y: y * 0.5,
        duration: 1,
        ease: "power2.out"
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      id="hero"
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] parallax-glow"></div>
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/30 blur-[80px] parallax-glow"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-white">We Transform Ideas Into </span>
              <span className="text-primary glow-text">Digital Experiences</span>
            </motion.h1>
            
            <motion.p 
              className="text-text-secondary text-lg mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Netspire Studios creates cutting-edge digital solutions that elevate your brand. Our team of experts combines creativity and technology to deliver stunning websites that drive results.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a href="#contact" className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 glow-primary">
                Get Started
              </a>
              <a href="#works" className="border border-primary/30 hover:border-primary text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10">
                See Our Work
              </a>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-gray-800 flex items-center justify-center text-xs">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-primary font-medium">100+ Projects</div>
                <div className="text-text-secondary text-sm">Delivered successfully</div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative hero-image">
              <div className="w-full h-[500px] rounded-2xl bg-gradient-to-br from-secondary to-background border border-white/10 p-4 backdrop-blur-sm">
                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-primary/80 blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-primary/80 blur-xl"></div>
                <div className="h-full w-full rounded-xl bg-black/50 backdrop-blur-sm p-6">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="flex flex-col gap-4">
                      <div className="h-1/2 rounded-lg bg-secondary border border-white/10 p-4 flex items-center justify-center">
                        <div className="text-primary text-4xl font-bold">UI/UX</div>
                      </div>
                      <div className="h-1/2 rounded-lg bg-secondary border border-white/10 p-4 flex items-center justify-center">
                        <div className="text-primary text-4xl font-bold">Dev</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="h-2/3 rounded-lg bg-secondary border border-white/10 p-4 flex items-center justify-center">
                        <div className="text-primary text-4xl font-bold">Web3</div>
                      </div>
                      <div className="h-1/3 rounded-lg bg-secondary border border-white/10 p-4 flex items-center justify-center">
                        <div className="text-primary text-4xl font-bold">AI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 backdrop-blur-md rounded-full border border-primary/50 flex items-center justify-center animate-float">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-primary/20 backdrop-blur-md rounded-full border border-primary/50 flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 