'use client'; // Ensures this component runs on the client-side

import { Button } from '@/components/ui/button';
import React from 'react';
import SearchBar from './SearchBar';
import { moods } from '@/data/moods';
import Image from 'next/image';

interface Mood {
  id: string;
  title: string;
  description: string;
  images: string[];
  personalStory: string;
  verses: string[];
  resources: string[];
}

interface SearchBarProps {
  moods: Mood[];
}

const HeroSection = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Assets/hope.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>

      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-500/30 to-teal-400/30 z-10"></div>

      {/* Text Content over Hero Image */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Our Community</h1>
        <p className="text-lg md:text-xl max-w-3xl mb-8">
          Discover the power of faith, hope, and love through our community and outreach programs.
        </p>
        <div className="w-full max-w-2xl">
          <SearchBar moods={moods} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;