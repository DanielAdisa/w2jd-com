"use client"

import AboutUsSection from "./components/AboutUs";
import HeroSection from "./components/HeroSection";
import MoodsGallery from "./components/MoodsGallery";
import SearchBar from "./components/SearchBar";
import { moods } from '@/data/moods';

import SplashScreen from './components/SplashScreen';
import { useState, useEffect } from 'react';

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
          <section className="p-">
          <HeroSection />
          {/* <SearchBar moods={moods} /> */}
          <AboutUsSection/>
          {/* <MoodsGallery/> */}
          </section>
        </main>
      )}
    </div>
  );
}
