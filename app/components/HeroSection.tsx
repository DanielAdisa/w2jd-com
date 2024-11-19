'use client'; // Ensures this component runs on the client-side

import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute md:top-0 md:left-0 w-full h-full md:object-center object-right object-cover -z-10"
        src="/Assets/Hero.mp4" // Correct video path
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/20 "></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center md:w-1/2 h-full text-center px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Experience the Divine
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          A journey through faith, guided by His light and glory.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="#explore-more"
            className="px-6 py-3 bg-white text-blue-500 rounded-lg font-medium shadow-md hover:bg-gray-100 transition"
          >
            Explore More
          </a>
          <a
            href="#learn-more"
            className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-500 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
