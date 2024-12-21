'use client'; // Ensures this component runs on the client-side

import { Button } from '@/components/ui/button';
import React from 'react';
import SearchBar from './SearchBar';
import { moods } from '@/data/moods';
// import video from ""

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
    <section className="relative h-screen overflow-hidden ">
      {/* Background Video */}
      <video
  className="absolute md:top-0 md:left-0 w-full h-full md:object-center object-right object-cover -z-10"
  src="/Assets/hero.mp4" // Correct video path
  autoPlay
  loop
  muted
  playsInline
  poster="/Assets/hope.jpg"
  aria-label="Background video of a divine journey"
></video>


{/* Overlay */}
<div className="absolute inset-0 bg-black opacity-50"></div>

{/* Content */}
<section className="relative mt-6 flex flex-col items-center justify-center md:w-1/2 h-full text-center px-6 text-white">
  <h1 className="text-3xl md:text-6xl font-bold leading-tight">
    Experience the Divined
  </h1>
  <p className="mt-4 text-base md:text-xl">
    A journey through faith, guided by His light and glory.
  </p>
  <div className="mt-6 flex flex-wrap justify-center gap-4">
    <Button
      className="px-6 py-3 bg-white text-blue-500 rounded-lg font-medium shadow-md hover:bg-gray-100 transition"
      aria-label="Explore more"
    >
      Explore More
    </Button>
    <Button
      className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-500 transition"
      aria-label="Learn more"
    >
      Learn More
    </Button>
  </div>
          <SearchBar moods={moods} />
</section>
    </section>
  );
};

export default HeroSection;


// Software engineer with over 6 years of diverse industry experience including recent experience in core fintech and (startup)
// supply chain SaaS. Passionate about crafting intuitive experiences, architecting scalable systems, and delivering robust
// applications. Proven track record of driving innovation, working with distributed teams, and enhancing reliability across
// various IT sectors.