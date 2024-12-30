'use client'; // Ensures this component runs on the client-side

import { Button } from '@/components/ui/button';
import React from 'react';
import SearchBar from './SearchBar';
import { moods } from '@/data/moods';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <div className="relative flex flex-col p-2 pt-5 items-center justify-center h-screen text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 text-center"
      >
        <h1 className="md:text-5xl text-3xl font-bold mb-4">Is God good to you?</h1>
        <p className="text-xl mb-4">Share your experience and find inspiration from others.</p>
        <div className="w-full max-w-2xl mx-auto">
          <Link href="/testimonies">
            <Button className="px-6 py-3  rounded-lg hover:bg-blue-600 transition">Share Your Story</Button>
          </Link>
          <div className="bg-white/10 backdrop-blur-lg md:scale-100 scale-90 rounded-lg mt-2 p-4 shadow-lg">
            <SearchBar moods={moods} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
