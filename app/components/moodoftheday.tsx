'use client';

import { useState, useEffect } from 'react';
import { moods } from '@/data/moods';
import Image from 'next/image';

const DailyMood = () => {
  const [currentMood, setCurrentMood] = useState(moods[0]);

  // Function to get a random mood for the day
  useEffect(() => {
    const getRandomMood = () => {
      const randomIndex = Math.floor(Math.random() * moods.length);
      setCurrentMood(moods[randomIndex]);
    };

    getRandomMood();
  }, []); // Runs only once when the component mounts

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r p-3 from-teal-300 via-blue-500 to-indigo-600 text-white">
      <div className="max-w-3xl w-full bg-white text-gray-800 rounded-3xl shadow-lg overflow-hidden">
        {/* Hero Image */}
        <div className="relative w-full h-[300px]">
          <Image
            src={currentMood.images[0]}
            alt={currentMood.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Mood of the Day
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-center">{currentMood.title}</h2>
          <p className="text-center text-gray-600">{currentMood.description}</p>
          <div className="flex justify-center mt-4">
            <a
              href={`/mood/${currentMood.id}`}
              className="px-6 py-3 text-lg font-semibold rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
            >
              Explore Mood
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMood;
