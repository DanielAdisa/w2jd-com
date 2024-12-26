'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/public/wwjd.svg'; // Replace with your logo path
import { motion } from 'framer-motion';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Adjust time in milliseconds (3 seconds)

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-slate-900 to-slate-950"
    >
      <div className="relative">
        {/* Background Effects */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent rounded-xl to-slate-500/10 animate-pulse"></div> */}
        
        <div className="relative text-center space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-xl opacity-25 animate-pulse"></div>
            <Image
              src={logo}
              alt="Moods Logo"
              width={150}
              height={150}
              className="relative rounded-full mx-auto"
              priority
            />
          </motion.div>

          {/* Text Content */}
          <div className="space-y-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            >
              Moods
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-purple-200/80"
            >
              Share your journey of faith
            </motion.p>
          </div>

          {/* Loading Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center space-x-2"
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
