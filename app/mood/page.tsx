'use client';

import Link from 'next/link';
import { moods } from '@/data/moods';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const MoodListPage = () => {
  const [filter, setFilter] = useState<'Positive' | 'Challenging'>('Positive');
  const [isLoading, setIsLoading] = useState(true);

  // Load the filter from localStorage when the component mounts
  useEffect(() => {
    const savedFilter = localStorage.getItem('moodFilter') as 'Positive' | 'Challenging';
    if (savedFilter) {
      setFilter(savedFilter);
    }
    setIsLoading(false);
  }, []);

  // Save the filter to localStorage whenever it changes
  const handleFilterChange = (newFilter: 'Positive' | 'Challenging') => {
    setFilter(newFilter);
    localStorage.setItem('moodFilter', newFilter);
  };

  const filteredMoods = moods.filter(mood => mood.category === filter);

  const FilterSelector = () => (
    <div className="flex justify-center gap-4 mb-12">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleFilterChange('Positive')}
        className={`px-6 py-3 rounded-full font-medium transition-all duration-300
          ${filter === 'Positive' 
            ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/25' 
            : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Positive
        </span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleFilterChange('Challenging')}
        className={`px-6 py-3 rounded-full font-medium transition-all duration-300
          ${filter === 'Challenging' 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
            : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Challenging
        </span>
      </motion.button>
    </div>
  );

  return (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 min-h-screen flex flex-col overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-purple-800 to-blue-900"></div>

      {/* Animated Color Spots */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-rose-500/30 rounded-full blur-[128px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-1/2 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[128px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500/30 rounded-full blur-[128px]"
      />

      {/* Content Container */}
      <div className="relative z-10 flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-sans bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Explore Moods
            </h1>
            <p className="text-white/70 dark:text-slate-400 max-w-2xl mx-auto">
              Discover different emotional journeys and spiritual reflections
            </p>
          </motion.div>

          <FilterSelector />

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredMoods.map((mood, index) => (
                <motion.div
                  key={mood.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/mood/${mood.id}`}
                    className="group block relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={mood.images[0]}
                        alt={mood.title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="relative p-6 space-y-3">
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                      
                      <h2 className="text-xl font-sans text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                        {mood.title}
                      </h2>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {mood.description}
                      </p>

                      <div className="pt-4 flex items-center justify-between text-sm">
                        <span className="text-teal-600 dark:text-teal-400">Read more</span>
                        <svg 
                          className="w-5 h-5 text-teal-600 dark:text-teal-400 transform group-hover:translate-x-2 transition-transform duration-300"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodListPage;