"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader = ({ onLoadingComplete }: PreloaderProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can replace this with actual resource loading)
    const timer = setTimeout(() => {
      setLoading(false);
      onLoadingComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // Nucleus animation variants
  const nucleusVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Electron animation paths
  const electronPaths = [
    { 
      animate: { 
        rotate: 360,
        transition: { 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear" 
        } 
      }
    },
    { 
      animate: { 
        rotate: -360, 
        transition: { 
          duration: 6, 
          repeat: Infinity, 
          ease: "linear"
        } 
      }
    },
    { 
      animate: { 
        rotate: 360,
        transition: { 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear"
        } 
      }
    }
  ];

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-netspire-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Main nucleus container */}
      <div className="relative w-40 h-40">
        {/* Glowing background effect */}
        <motion.div 
          className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-netspire-pink to-purple-600 opacity-30 blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Core nucleus */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full bg-gradient-to-r from-netspire-pink to-purple-600 shadow-lg shadow-netspire-pink/30"
          variants={nucleusVariants}
          animate="animate"
        />

        {/* Electron orbits */}
        {electronPaths.map((path, index) => (
          <motion.div
            key={index}
            className="absolute top-0 left-0 w-full h-full rounded-full border border-netspire-pink/20"
            style={{ 
              transform: `rotate(${index * 60}deg)`,
              width: `${100 + index * 20}%`, 
              height: `${100 + index * 20}%`,
              top: `-${index * 10}%`,
              left: `-${index * 10}%`
            }}
            variants={path}
            animate="animate"
          >
            {/* Electron particle */}
            <motion.div 
              className={`absolute w-3 h-3 rounded-full bg-netspire-pink shadow-md shadow-netspire-pink/50`}
              style={{ 
                top: index % 2 === 0 ? '0%' : '100%', 
                left: '50%',
                marginLeft: '-6px',
                marginTop: index % 2 === 0 ? '-6px' : '3px'
              }}
            />
          </motion.div>
        ))}

        {/* Shine/highlight effect */}
        <div className="absolute -top-1 -left-1 w-10 h-10 rounded-full bg-white opacity-20 blur-sm" />
      </div>
      
      {/* Loading text */}
      <motion.p 
        className="absolute bottom-20 text-netspire-pink text-xl font-light tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LOADING
      </motion.p>
    </motion.div>
  );
};

export default Preloader; 