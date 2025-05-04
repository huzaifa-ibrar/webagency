"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimationControls, PanInfo } from 'framer-motion';

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
  const testimonialRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  
  // Auto-advance testimonials - now disabled when user interacts
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const startAutoAdvance = () => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 6000);
  };
  
  const stopAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  useEffect(() => {
    startAutoAdvance();
    
    return () => stopAutoAdvance();
  }, []);

  const prevTestimonial = () => {
    stopAutoAdvance();
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    startAutoAdvance();
  };

  const nextTestimonial = () => {
    stopAutoAdvance();
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    startAutoAdvance();
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    stopAutoAdvance();
    const threshold = 50;
    
    if (info.offset.x < -threshold) {
      nextTestimonial();
    } else if (info.offset.x > threshold) {
      prevTestimonial();
    } else {
      // If drag wasn't far enough, animate back to center
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
    }
  };

  // Select a specific testimonial
  const goToTestimonial = (index: number) => {
    stopAutoAdvance();
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    startAutoAdvance();
  };

  // Animation variants
  const containerVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    })
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
      }
    }
  };

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

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] flex items-center">
            {/* Left Arrow */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -left-5 md:-left-12 z-20 bg-netspire-gray bg-opacity-30 backdrop-blur-md text-white p-3 rounded-full shadow-lg transform -translate-y-1/2 top-1/2"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            {/* Testimonial Card */}
            <div 
              ref={testimonialRef}
              className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={testimonials[current].id}
                  custom={direction}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={handleDragEnd}
                  className="bg-netspire-gray bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-netspire-gray border-opacity-20 w-full"
                >
                  <motion.div variants={itemVariants} className="mb-8">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-netspire-pink opacity-50">
                      <path d="M14.028 6C6.684 11.184 2 18.096 2 26.88C2 36.336 8.292 42 15.96 42C22.38 42 27 37.632 27 31.752C27 25.752 22.704 22.032 17.1 22.032C15.96 22.032 14.784 22.152 14.28 22.368C15.084 17.064 19.584 12.528 24.624 10.224L14.028 6ZM39.024 6C31.68 11.184 27 18.096 27 26.88C27 36.336 33.288 42 40.956 42C47.376 42 52 37.632 52 31.752C52 25.752 47.7 22.032 42.096 22.032C40.956 22.032 39.78 22.152 39.276 22.368C40.08 17.064 44.58 12.528 49.62 10.224L39.024 6Z" fill="currentColor"/>
                    </svg>
                  </motion.div>
                  
                  <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white leading-relaxed mb-12 italic">
                    "{testimonials[current].content}"
                  </motion.p>
                  
                  <div className="flex items-center">
                    <motion.div variants={itemVariants} className="mr-4">
                      <img 
                        src={testimonials[current].avatar} 
                        alt={testimonials[current].author}
                        className="w-16 h-16 rounded-full object-cover border-2 border-netspire-pink"
                      />
                    </motion.div>
                    
                    <div>
                      <motion.h4 variants={itemVariants} className="text-xl font-bold text-white">
                        {testimonials[current].author}
                      </motion.h4>
                      <motion.p variants={itemVariants} className="text-netspire-pink">
                        {testimonials[current].position}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Right Arrow */}
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -right-5 md:-right-12 z-20 bg-netspire-gray bg-opacity-30 backdrop-blur-md text-white p-3 rounded-full shadow-lg transform -translate-y-1/2 top-1/2"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current ? 'bg-netspire-pink scale-125 w-8' : 'bg-netspire-gray bg-opacity-30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe instruction for mobile */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-center text-sm text-gray-400 mt-6 md:hidden"
          >
            Swipe left or right to navigate testimonials
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 