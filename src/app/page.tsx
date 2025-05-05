"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showDebug, setShowDebug] = useState(true);

  // Handle when preloader completes
  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    // Hide debug after 10 seconds
    const timer = setTimeout(() => {
      setShowDebug(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      {/* Debug section */}
      {showDebug && (
        <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 p-4 z-[9999]">
          <p className="text-white mb-2">Debug: Testing Image Paths</p>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-white text-xs">Direct Public Path:</p>
              <img src="/images/logo.png" alt="Logo Test 1" width={100} height={30} />
            </div>
            <div>
              <p className="text-white text-xs">Next Image Component:</p>
              <Image src="/images/logo.png" alt="Logo Test 2" width={100} height={30} />
            </div>
          </div>
          <button 
            className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded"
            onClick={() => setShowDebug(false)}
          >
            Hide Debug
          </button>
        </div>
      )}
      
      {/* Main content */}
      <div style={{ opacity: loading ? 0 : 1 }} className="transition-opacity duration-500">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
} 