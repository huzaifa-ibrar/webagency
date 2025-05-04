"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO, TechVision",
    image: "/images/testimonial-1.png",
    quote: "Netspire Studios completely transformed our online presence. Their creative approach and technical expertise delivered a website that exceeded our expectations. The team was professional, responsive, and truly understood our vision.",
  },
  {
    name: "Michael Chen",
    position: "Marketing Director, Innovate Inc.",
    image: "/images/testimonial-2.png",
    quote: "Working with Netspire Studios was an exceptional experience. They took our complex requirements and delivered a beautiful, functional website that perfectly represents our brand. Their attention to detail is unmatched.",
  },
  {
    name: "Emily Patel",
    position: "Founder, Bloom Boutique",
    image: "/images/testimonial-3.png",
    quote: "I couldn't be happier with the website Netspire Studios created for my business. It's not only visually stunning but also converts visitors into customers. The entire process was smooth, and they were a pleasure to work with.",
  },
  {
    name: "David Wilson",
    position: "CTO, FinanceFlow",
    image: "/images/testimonial-4.png",
    quote: "The team at Netspire Studios is incredibly talented. They built a secure, high-performance web application that has become essential to our business operations. Their technical knowledge and creativity make them the perfect partner.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute -top-40 right-0 w-80 h-80 bg-primary/30 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 left-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"></div>
      
      <div ref={ref} className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white">Client</span>
            <span className="text-primary glow-text ml-2">Testimonials</span>
          </motion.h2>
          <motion.p 
            className="text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Don't just take our word for it. Hear what our clients have to say about working with us.
          </motion.p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div className="relative flex flex-col lg:flex-row items-center">
              {/* Quote */}
              <motion.div 
                className="lg:w-2/3 bg-secondary/50 backdrop-blur-sm p-8 lg:p-12 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none border border-white/10"
                key={activeIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-12 h-12 text-primary/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h3v10h-9zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3v10h-9z" />
                </svg>
                <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                  {testimonials[activeIndex].quote}
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-2xl text-primary mr-4">
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{testimonials[activeIndex].name}</h4>
                    <p className="text-text-secondary text-sm">{testimonials[activeIndex].position}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Testimonial navigation */}
              <div className="lg:w-1/3 bg-primary/10 backdrop-blur-sm p-8 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none border-t-0 lg:border-t lg:border-l-0 border border-white/10 flex flex-col justify-center items-center">
                <div className="flex flex-wrap gap-3 justify-center">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeIndex === index ? "bg-primary w-8" : "bg-white/30"
                      }`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={index}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        activeIndex === index
                          ? "bg-primary/30 border border-primary/50"
                          : "bg-secondary/30 border border-white/10 hover:border-primary/30"
                      }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-primary mx-auto">
                        {testimonial.name.charAt(0)}
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-between w-full">
                  <button
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-primary/50 transition-all duration-300"
                    onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-primary/50 transition-all duration-300"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 