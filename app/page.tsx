"use client"

import AboutUsSection from "./components/AboutUs";
import HeroSection from "./components/HeroSection";
import SplashScreen from './components/SplashScreen';
import { useState, useEffect } from 'react';
import { moods } from '@/data/moods';
import Image from 'next/image';
import SearchBar from "./components/SearchBar";

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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Match the timer in SplashScreen

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <main>
          {/* Your main content */}
          <HeroSection />
          {/* <div className=" mx-auto p-4 max-w-2xl">
          <SearchBar moods={moods} />
        </div> */}
          
          <AboutUsSection/>

        </main>
      )}
    </div>
  );
}
