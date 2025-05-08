"use client";

import { useState } from 'react';
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

  // Handle when preloader completes
  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>
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