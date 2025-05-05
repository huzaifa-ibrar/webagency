"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
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
        scrolled ? 'py-3 bg-black bg-opacity-90 shadow-lg' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold"
        >
          <span className="text-white">Net</span>
          <span className="text-netspire-pink">spire</span>
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
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen 
                ? "M6 18L18 6M6 6l12 12" 
                : "M4 6h16M4 12h16m-7 6h7"} 
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-filter backdrop-blur-sm border-t border-netspire-gray/20 py-6 px-4 shadow-lg"
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
                  className="text-white hover:text-netspire-pink py-2 px-2 text-lg font-medium transition-colors border-b border-netspire-gray/10 last:border-0"
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