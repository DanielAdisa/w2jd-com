'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import HeroSection from './components/HeroSection';
import MoodOfTheDay from './components/moodoftheday';
import AboutUsSection from './components/AboutUs';
import Vote from './components/Vote';
import Footer from './components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 relative overflow-hidden">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 transform-origin-0"
        style={{ scaleX }}
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"/>
      </div>

      {isLoading ? (
        <SplashScreen />
      ) : (
        <motion.main
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
          className="relative w-full md:px-8 lg:px-16"
        >
          <motion.div
            id="vote"
            variants={fadeUpVariants}
            className="relative px-4 h-screen flex flex-col w-full justify-center md:py-24"
          >
            <Vote />
          </motion.div>

          <motion.div
            id="hero"
            variants={fadeUpVariants}
            className="relative md:py-20"
          >
            <HeroSection />
          </motion.div>

          <motion.div
            id="mood"
            variants={fadeUpVariants}
            className="relative md:py-20"
          >
            <MoodOfTheDay />
          </motion.div>

          <motion.div
            id="about"
            variants={fadeUpVariants}
            className="relative md:py-20 bg-gradient-to-t from-blue-900/50 to-slate-900/50 backdrop-blur-sm rounded-3xl"
          >
            <AboutUsSection />
          </motion.div>

          {/* Navigation Dots */}
          <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-6 hidden lg:block">
            {[
              { id: 'vote', label: 'Vote' },
              { id: 'hero', label: 'Hero' },
              { id: 'mood', label: 'Mood' },
              { id: 'about', label: 'About' }
            ].map((section, index) => (
              <motion.div
                key={section.id}
                className="group relative"
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                    scrollY >= index * 500 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                />
                <span className="absolute left-0 -translate-x-full px-4 py-1 ml-4 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm rounded-lg whitespace-nowrap">
                  {section.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Gradient Overlay */}
          <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-900/40" />
        </motion.main>
      )}
    </div>
  );
}