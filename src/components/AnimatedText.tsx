"use client";

import { useEffect, ElementType } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedTextProps {
  text: string;
  el?: ElementType;
  className?: string;
  once?: boolean;
  animation?: 'typewriter' | 'fadeIn' | 'slideUp' | 'staggered';
  staggerChildren?: number;
  startDelay?: number;
  duration?: number;
  threshold?: number;
}

const AnimatedText = ({
  text,
  el = 'div',
  className,
  once = true,
  animation = 'fadeIn',
  staggerChildren = 0.03,
  startDelay = 0,
  duration = 0.5,
  threshold = 0.1,
}: AnimatedTextProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  // Split text into words
  const words = text.split(' ');
  
  const Element = motion[el as keyof typeof motion] || motion.div;
  
  if (animation === 'typewriter') {
    // Character-by-character animation
    const characters = text.split('');
    
    return (
      <div className={className} ref={ref}>
        <motion.span
          initial="hidden"
          animate={controls}
          aria-label={text}
        >
          {characters.map((char, i) => (
            <motion.span
              key={`char-${i}`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                delay: startDelay + i * staggerChildren,
                duration: 0.2
              }}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </div>
    );
  } else if (animation === 'staggered') {
    // Word-by-word, then character-by-character animation
    return (
      <div className={className} ref={ref}>
        <motion.span
          initial="hidden"
          animate={controls}
          style={{ display: 'inline-block' }}
          aria-label={text}
        >
          {words.map((word, wordIndex) => (
            <motion.span
              key={`word-${wordIndex}`}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={`char-${wordIndex}-${charIndex}`}
                  initial={{ y: 15, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
                  transition={{ 
                    delay: startDelay + (wordIndex * 5 + charIndex) * staggerChildren,
                    duration: 0.4,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
              {wordIndex !== words.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </motion.span>
      </div>
    );
  } else if (animation === 'slideUp') {
    // Word-by-word slide up animation
    return (
      <div className={className} ref={ref}>
        <motion.span
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren,
                delayChildren: startDelay,
              }
            }
          }}
          aria-label={text}
        >
          {words.map((word, i) => (
            <motion.span
              key={`word-${i}`}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration,
                    ease: [0.215, 0.61, 0.355, 1],
                  }
                }
              }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {word}
              {i !== words.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </motion.span>
      </div>
    );
  } else {
    // Default fadeIn animation
    return (
      <div className={className} ref={ref}>
        <motion.span
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren,
                delayChildren: startDelay,
              }
            }
          }}
          aria-label={text}
        >
          {words.map((word, i) => (
            <motion.span
              key={`word-${i}`}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    duration,
                  }
                }
              }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {word}
              {i !== words.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </motion.span>
      </div>
    );
  }
};

export default AnimatedText; 