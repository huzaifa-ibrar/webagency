"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Web Development',
    subtitle: 'Custom Websites & Web Applications',
    description: 'We build responsive, high-performance websites and web applications that deliver exceptional user experiences. Our development team leverages cutting-edge technologies to create scalable solutions that drive business growth.',
    features: [
      'Custom Web Applications',
      'E-commerce Solutions',
      'Progressive Web Apps',
      'Content Management Systems',
      'API Integrations',
      'Full-stack Development'
    ],
    gradient: 'from-netspire-pink/10 to-pink-600/5',
    border: 'border-netspire-pink/30',
    accent: 'bg-netspire-pink',
    textShadow: 'text-shadow-md'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Web Maintenance',
    subtitle: 'Keep Your Digital Assets Performing',
    description: 'We provide comprehensive website maintenance services to ensure your digital presence remains secure, up-to-date, and performing optimally. Our proactive approach prevents issues before they impact your business.',
    features: [
      'Performance Optimization',
      'Security Updates & Monitoring',
      'Content Management',
      'Technical Support',
      'Regular Backups',
      'Analytics & Reporting'
    ],
    gradient: 'from-pink-500/10 to-netspire-pink/5',
    border: 'border-pink-400/30',
    accent: 'bg-pink-500',
    textShadow: ''
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'UI/UX Design',
    subtitle: 'Intuitive & Beautiful Interfaces',
    description: 'We create beautiful, intuitive interfaces that ensure seamless user journeys and boost conversions. Our design process focuses on understanding user needs and business goals to deliver exceptional digital experiences.',
    features: [
      'User Research & Testing',
      'Wireframing & Prototyping',
      'Interaction Design',
      'Visual Design',
      'Design Systems',
      'Accessibility Compliance'
    ],
    gradient: 'from-rose-500/10 to-netspire-pink/5',
    border: 'border-rose-400/30',
    accent: 'bg-rose-500',
    textShadow: ''
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Mobile Apps',
    subtitle: 'Cross-Platform Solutions',
    description: 'We develop native and cross-platform mobile applications that engage users and deliver results. Our mobile solutions are built with a focus on performance, usability, and scalability to ensure your app stands out in the market.',
    features: [
      'iOS & Android Development',
      'Cross-Platform Apps',
      'Native Applications',
      'Progressive Web Apps',
      'App Store Optimization',
      'Ongoing Support & Updates'
    ],
    gradient: 'from-netspire-pink/10 to-rose-600/5',
    border: 'border-netspire-pink/30',
    accent: 'bg-netspire-pink',
    textShadow: ''
  }
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const controls = useAnimation();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Handle mounting and check if desktop
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 768);
      
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1],
        delay: custom * 0.2
      }
    })
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: custom * 0.1
      }
    })
  };

  const featureListVariants = {
    hidden: { height: 0, opacity: 0, overflow: 'hidden' },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: { 
        height: { duration: 0.4 },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  };

  // Toggle service and fix hover state bugs
  const toggleService = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling
    setActiveService(activeService === index ? null : index);
  };

  // Repair hover bug by using CSS-only transitions for simple animations
  const handleMouseEnter = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.classList.add('hover-state');
    }
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.classList.remove('hover-state');
    }
  };

  return (
    <section id="services" className="py-20 sm:py-32 md:py-40 bg-netspire-black relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-netspire-pink to-transparent opacity-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-netspire-pink to-transparent opacity-20"></div>
      <div className="absolute top-[10%] right-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-netspire-pink opacity-5 blur-[100px]"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-netspire-pink opacity-5 blur-[100px]"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 sm:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8"
          >
            Our <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            We deliver comprehensive digital solutions tailored to your specific needs,
            helping your business thrive in the digital landscape.
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              ref={(el) => { cardRefs.current[index] = el; }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`relative backdrop-filter backdrop-blur-md rounded-xl overflow-hidden transform-gpu min-h-[auto] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 service-card`}
              onClick={(e) => toggleService(index, e)}
            >
              {/* Card background with gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20`}></div>
              
              {/* Top shine effect */}
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
              
              {/* 3D envelope effect */}
              <div className={`h-full flex flex-col bg-netspire-black/80 backdrop-filter backdrop-blur-md border ${service.border} rounded-xl p-6 sm:p-8 md:p-10 shadow-xl transition-all duration-300`}>
                {/* Card top accent */}
                <div className={`absolute top-0 inset-x-0 h-1 ${service.accent} opacity-70`}></div>
                
                {/* Icon container with glow */}
                <div className="mb-5 sm:mb-8 relative">
                  <div className={`absolute -inset-1 rounded-full blur-md opacity-20 ${service.accent}`}></div>
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-netspire-gray/40 border border-netspire-gray/30 shadow-lg text-netspire-pink">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 transition-colors duration-300 text-white hover-text-pink ${service.textShadow}`}>
                  {service.title}
                </h3>
                
                <h4 className="text-base sm:text-lg text-gray-300 mb-3 sm:mb-4">{service.subtitle}</h4>
                
                <p className="text-gray-300 mb-6 text-sm sm:text-base md:text-lg">
                  {service.description}
                </p>
                
                <div className="mt-auto">
                  <button 
                    onClick={(e) => toggleService(index, e)}
                    className="flex items-center justify-between w-full text-netspire-pink font-semibold mb-4"
                  >
                    <span>What we offer:</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 transition-transform duration-300 ${activeService === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {isMounted && (activeService === index || isDesktop) && (
                      <motion.div
                        variants={featureListVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="grid grid-cols-1 gap-y-2 sm:gap-y-3"
                      >
                        {service.features.map((feature, i) => (
                          <motion.div 
                            key={i}
                            variants={featureVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            className="flex items-center"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${service.accent} mr-3`}></div>
                            <span className="text-sm sm:text-base text-gray-200">{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <a 
                    href="#contact"
                    className="inline-flex items-center text-netspire-pink font-medium mt-5 sm:mt-8 transition-all duration-300 learn-more-link"
                  >
                    <span className="learn-more-text">Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-all duration-300 arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add CSS for hover effects to avoid Framer Motion bugs */}
      <style jsx global>{`
        .service-card:hover {
          box-shadow: 0 10px 30px -5px rgba(255, 16, 83, 0.2);
        }
        .service-card:hover .hover-text-pink {
          color: #FF1053;
        }
        .learn-more-link:hover .learn-more-text {
          transform: translateX(4px);
        }
        .learn-more-link:hover .arrow-icon {
          transform: translateX(8px);
        }
        .text-shadow-md {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </section>
  );
};

export default ServicesSection; 