'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/public/Assets/ruth.jpg'; // Replace with your logo path

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src={logo}
            alt="Moods Logo"
            width={150}
            height={150}
            className="animate-bounce rounded-full mx-auto"
          />
        </div>

        {/* Tagline */}
        <h1 className="text-2xl md:text-4xl font-bold">Moods</h1>
        <p className="text-lg md:text-xl mt-2 font-light opacity-80">
          Finding your light through every mood.
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
