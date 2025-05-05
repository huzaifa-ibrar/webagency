"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    content: "Netspire transformed our online presence with a stunning website that perfectly captures our brand. Their team was incredibly professional and delivered beyond our expectations.",
    author: "Sarah Johnson",
    position: "CEO, TechVision",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    content: "Working with Netspire was a game-changer for our business. They created a user-friendly e-commerce platform that significantly increased our conversion rates and customer satisfaction.",
    author: "Michael Chen",
    position: "Founder, EcoStyle",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    content: "The team at Netspire doesn't just build websites, they create digital experiences. Their attention to detail and creative approach helped us stand out in a competitive market.",
    author: "Emma Rodriguez",
    position: "Marketing Director, Pulse Media",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    content: "From concept to execution, Netspire delivered excellence at every step. Their strategic insight helped us reimagine our digital strategy and achieve remarkable growth.",
    author: "Daniel Wilson",
    position: "Operations Manager, Skyline Properties",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      // Clean up timeouts on unmount
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);
  
  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    if (!isMounted) return; // Don't run in SSR
    
    if (autoplayEnabled) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [autoplayEnabled, isMounted]);

  // Stop autoplay when interacting manually
  const pauseAutoplay = () => {
    setAutoplayEnabled(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    
    // Resume autoplay after 10 seconds of inactivity
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    
    resumeTimeoutRef.current = setTimeout(() => {
      setAutoplayEnabled(true);
    }, 10000);
  };

  const prevTestimonial = () => {
    pauseAutoplay();
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    pauseAutoplay();
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  // Select a specific testimonial
  const goToTestimonial = (index: number) => {
    pauseAutoplay();
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Improved variants for faster, more immediate animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'tween', duration: 0.2, ease: 'easeOut' },
        opacity: { duration: 0.1 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'tween', duration: 0.2, ease: 'easeIn' },
        opacity: { duration: 0.1 }
      }
    })
  };

  // Content animation - quick fade in with slight upward movement
  const contentVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.2, delay: 0.05 }
    }
  };

  if (!isMounted) {
    return <section className="py-24 bg-netspire-black relative overflow-hidden"></section>;
  }

  return (
    <section className="py-24 bg-netspire-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-netspire-pink to-transparent opacity-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-netspire-pink to-transparent opacity-20"></div>
      
      <motion.div 
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-netspire-pink opacity-5 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Client <span className="text-gradient">Testimonials</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </motion.p>
        </div>

        <div className="relative">
          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-0 md:-left-12 z-20 flex items-center">
            <button
              onClick={prevTestimonial}
              className="p-2 text-netspire-pink hover:scale-110 transition-transform duration-200"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-0 md:-right-12 z-20 flex items-center">
            <button
              onClick={nextTestimonial}
              className="p-2 text-netspire-pink hover:scale-110 transition-transform duration-200"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Testimonial slider */}
          <div className="overflow-hidden">
            <div className="relative w-full max-w-4xl mx-auto">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={testimonials[current].id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <div className="bg-netspire-gray/20 backdrop-filter backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-netspire-pink/20 shadow-xl relative overflow-hidden">
                    {/* Accent gradient line */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-netspire-pink/50 via-netspire-pink to-netspire-pink/50 rounded-t-lg"></div>
                    
                    {/* Background sparkle effect */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-netspire-pink opacity-5 blur-2xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-netspire-pink opacity-5 blur-2xl"></div>
                    
                    <div className="relative max-w-3xl mx-auto">
                      <motion.div 
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-6 flex justify-center"
                      >
                        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-netspire-pink opacity-70">
                          <path d="M14.028 6C6.684 11.184 2 18.096 2 26.88C2 36.336 8.292 42 15.96 42C22.38 42 27 37.632 27 31.752C27 25.752 22.704 22.032 17.1 22.032C15.96 22.032 14.784 22.152 14.28 22.368C15.084 17.064 19.584 12.528 24.624 10.224L14.028 6ZM39.024 6C31.68 11.184 27 18.096 27 26.88C27 36.336 33.288 42 40.956 42C47.376 42 52 37.632 52 31.752C52 25.752 47.7 22.032 42.096 22.032C40.956 22.032 39.78 22.152 39.276 22.368C40.08 17.064 44.58 12.528 49.62 10.224L39.024 6Z" fill="currentColor"/>
                        </svg>
                      </motion.div>
                      
                      <motion.p 
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed mb-8 text-center"
                      >
                        "{testimonials[current].content}"
                      </motion.p>
                      
                      <motion.div 
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center"
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-netspire-pink/30">
                          <img src={testimonials[current].avatar} alt={testimonials[current].author} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-xl font-bold text-white">
                          {testimonials[current].author}
                        </h4>
                        <p className="text-netspire-pink">
                          {testimonials[current].position}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  current === index 
                    ? 'bg-netspire-pink scale-125' 
                    : 'bg-gray-400 opacity-50 hover:opacity-75'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 