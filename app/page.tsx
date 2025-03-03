'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import HeroSection from './components/HeroSection';
import MoodOfTheDay from './components/moodoftheday';
import AboutUsSection from './components/AboutUs';
import Vote from './components/Vote';
import Footer from './components/Footer';
import { Menu, Navigation, X } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('vote');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

    const handleScroll = () => {
      // Calculate which section is in view based on viewport percentage
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sections = ['vote', 'hero', 'mood', 'about'];
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If section is at least 30% visible in viewport
          if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  interface Section {
    id: string;
    label: string;
  }

  const scrollToSection = (sectionId: string): void => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setMobileNavOpen(false);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 relative overflow-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 z-50 transform-origin-0"
        style={{ scaleX }}
      />
      
      {/* Mobile Navigation Button */}
      <button 
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-purple-600/80 hover:bg-purple-500/80 backdrop-blur-sm p-3.5 rounded-full lg:hidden text-white shadow-lg transition-all duration-300"
        aria-label="Toggle navigation"
      >
        {mobileNavOpen ? (
          <X size={22} className="transition-transform duration-300 transform rotate-90" />
        ) : (
          <Navigation size={22} className="transition-transform duration-300" />
        )}
      </button>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-slate-900/95 to-purple-900/95 backdrop-blur-md p-6 pt-16 lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              {[
                { id: 'vote', label: 'Vote' },
                { id: 'hero', label: 'Hero' },
                { id: 'mood', label: 'Mood' },
                { id: 'about', label: 'About' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id 
                      ? 'bg-purple-600/30 text-white font-medium' 
                      : 'text-gray-300 hover:bg-purple-600/20'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"/>
      </div>
      
      {/* Floating particles for visual interest */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 1 + 0.5}vw`,
              height: `${Math.random() * 1 + 0.5}vw`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 20 - 10],
              opacity: [0.2, 0],
              scale: [1, 0.8],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
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
                staggerChildren: 0.2
              }
            }
          }}
          className="relative w-full px-4 sm:px-6 md:px-8 lg:px-16"
        >
          <motion.section
            id="vote"
            variants={fadeUpVariants}
            className="relative min-h-[100vh] flex flex-col w-full justify-center py-[10vh]"
          >
            <Vote />
          </motion.section>

          <motion.section
            id="hero"
            variants={fadeUpVariants}
            className="relative min-h-[90vh] py-[10vh]"
          >
            <HeroSection />
          </motion.section>

          <motion.section
            id="mood"
            variants={fadeUpVariants}
            className="relative min-h-[90vh] py-[10vh]"
          >
            <MoodOfTheDay />
          </motion.section>

          <motion.section
            id="about"
            variants={fadeUpVariants}
            className="relative min-h-[90vh] py-[10vh] bg-gradient-to-t from-blue-950/50 to-purple-950/50 backdrop-blur-sm rounded-3xl"
          >
            <AboutUsSection />
          </motion.section>

          {/* Desktop Navigation Dots - Hidden on small screens */}
          <div className="fixed right-[3vw] top-1/2 transform -translate-y-1/2 space-y-6 hidden lg:block">
            {[
              { id: 'vote', label: 'Vote' },
              { id: 'hero', label: 'Hero' },
              { id: 'mood', label: 'Mood' },
              { id: 'about', label: 'About' }
            ].map((section) => (
              <motion.div
                key={section.id}
                className="group relative"
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                    activeSection === section.id ? 'bg-purple-500 ring-2 ring-purple-300/50' : 'bg-gray-400/70'
                  }`}
                  onClick={() => scrollToSection(section.id)}
                />
                <span className="absolute left-0 -translate-x-full px-4 py-1 ml-4 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity bg-purple-900/80 backdrop-blur-sm rounded-lg whitespace-nowrap">
                  {section.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Gradient Overlay */}
          <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-950/40" />
        </motion.main>
      )}
    </div>
  );
}