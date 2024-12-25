'use client';

import { useState, useEffect } from 'react';
import { moods } from '@/data/moods';
import Image from 'next/image';

const DailyMood = () => {
  const [currentMood, setCurrentMood] = useState(moods[0]);

  // Filter cheerful moods for Christmas
  const cheerfulMoods = moods.filter(mood => 
    mood.category === 'positive' ||
    ['Joyful', 'Hopeful', 'Peaceful', 'Victorious','Loved'].includes(mood.title)
  );

  useEffect(() => {
    const getChristmasMood = () => {
      const randomIndex = Math.floor(Math.random() * cheerfulMoods.length);
      setCurrentMood(cheerfulMoods[randomIndex]);
    };

    getChristmasMood();
  }, []);

  return (
    <div className="h-fit flex items-center pt-20 justify-center bg-gradient-to-r p-3 from-red-500 via-green-500 to-red-500 text-white">
      <div className="max-w-3xl w-full bg-white text-gray-800 rounded-3xl shadow-lg overflow-hidden relative">
        {/* Christmas Decoration */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-red-600 via-green-600 to-red-600"></div>
        
        {/* Hero Image */}
        <div className="relative w-full h-[300px]">
          <Image
            src={currentMood.images[0]}
            alt={currentMood.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          {/* Christmas Message */}
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full">
            Merry Christmas! 🎄
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-red-600">{currentMood.title}</h2>
          <p className="text-lg mb-6">{currentMood.description}</p>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Christmas Reflection</h3>
              <p>{currentMood.personalStory}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-700 mb-2">Scripture for Today</h3>
              {currentMood.verses.map((verse, index) => (
                <p key={index} className="mb-2">{verse}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMood;
