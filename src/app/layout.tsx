import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Netspire | Modern Web Agency',
  description: 'Crafting innovative digital experiences that transform brands',
  icons: {
    icon: [],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener("DOMContentLoaded", function() {
              // Check if browser supports smooth scrolling
              const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
              
              // Create a more robust smooth scrolling function
              function smoothScroll(target, duration) {
                var targetElement = document.querySelector(target);
                if (!targetElement) return;
                
                // If browser supports smooth scrolling and we're not forcing JS implementation
                if (supportsNativeSmoothScroll && !window.forceJSSmoothScroll) {
                  var navbarHeight = document.querySelector('nav').offsetHeight;
                  var targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                  
                  window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                  });
                  return;
                }
                
                // JS implementation for browsers without support
                var targetPosition = targetElement.getBoundingClientRect().top;
                var navbarHeight = document.querySelector('nav').offsetHeight;
                var startPosition = window.pageYOffset;
                var distance = targetPosition - navbarHeight;
                var startTime = null;
                
                function animation(currentTime) {
                  if (startTime === null) startTime = currentTime;
                  var timeElapsed = currentTime - startTime;
                  var run = ease(timeElapsed, startPosition, distance, duration);
                  window.scrollTo(0, run);
                  if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                // Easing function for smooth animation
                function ease(t, b, c, d) {
                  t /= d / 2;
                  if (t < 1) return c / 2 * t * t + b;
                  t--;
                  return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
              }
              
              // Make the function available globally
              window.smoothScroll = smoothScroll;
              
              // Force JS implementation on some mobile browsers for better experience
              window.forceJSSmoothScroll = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              
              // Add event listeners to all anchor links
              document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                  e.preventDefault();
                  const targetId = this.getAttribute('href');
                  if (targetId === '#') return;
                  
                  // Call our custom smooth scroll function with 800ms duration
                  smoothScroll(targetId, 800);
                });
              });
            });
          `
        }} />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen bg-netspire-black">
          {children}
        </main>
      </body>
    </html>
  );
} 