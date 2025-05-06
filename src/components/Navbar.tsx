"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting state to avoid window references during SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    if (typeof window === 'undefined') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Fallback scroll behavior
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      } 
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05, 
      color: '#FF1053',
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  // Hamburger menu button variants
  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (custom: number) => ({
      rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
      y: custom === 1 ? 8 : custom === 3 ? -8 : 0,
      opacity: custom === 2 ? 0 : 1,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  };

  // Only render complete component after mounting
  if (!mounted) {
    return <nav className="fixed w-full z-50 py-6"></nav>;
  }

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'py-2 bg-black bg-opacity-90 shadow-lg backdrop-blur-sm' : 'py-4 sm:py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold"
        >
          <a href="#home" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Netspire Logo" 
              width={160} 
              height={50} 
              className="h-auto w-auto max-w-[120px] sm:max-w-[160px]"
              priority
            />
          </a>
        </motion.div>
        
        <div className="hidden md:flex space-x-8">
          {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              variants={linkVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.3, delay: 0.1 * index + 0.3 }
              }}
              className="text-white hover:text-netspire-pink transition-colors"
            >
              {item}
            </motion.a>
          ))}
          
          <motion.a
            href="#book-now"
            onClick={(e) => handleSmoothScroll(e, "#book-now")}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.3, delay: 0.1 * 5 + 0.3 }
            }}
            className="btn-gradient px-4 py-2 rounded-full text-white font-medium text-sm shadow-md"
          >
            Book Now
          </motion.a>
        </div>
        
        {/* Improved hamburger menu button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center rounded-full border border-white/10 bg-black/40 backdrop-blur-sm"
          aria-label="Menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center relative">
            {[1, 2, 3].map((line) => (
              <motion.span
                key={line}
                custom={line}
                variants={lineVariants}
                animate={mobileMenuOpen ? "open" : "closed"}
                className={`w-6 h-0.5 bg-white block rounded-full absolute transform origin-center ${
                  line === 1 ? '-translate-y-2' : line === 3 ? 'translate-y-2' : ''
                }`}
              />
            ))}
          </div>
        </motion.button>
      </div>

      {/* Improved Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden fixed inset-x-0 top-[60px] bg-black bg-opacity-95 backdrop-filter backdrop-blur-md border-t border-netspire-gray/20 py-6 px-4 shadow-lg max-h-[calc(100vh-60px)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  variants={mobileItemVariants}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const targetId = `#${item.toLowerCase()}`;
                    handleSmoothScroll(e, targetId);
                  }}
                  className="text-white hover:text-netspire-pink py-3 px-2 text-lg font-medium transition-colors border-b border-netspire-gray/10 last:border-0"
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="#book-now"
                variants={mobileItemVariants}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  handleSmoothScroll(e, "#book-now");
                }}
                className="btn-gradient px-6 py-3 rounded-full text-white font-medium text-base shadow-md text-center mt-2"
              >
                Book Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 