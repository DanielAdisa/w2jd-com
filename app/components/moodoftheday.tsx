'use client';

import { useState, useEffect, useRef } from 'react';
import { moods } from '@/data/moods';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toPng } from 'html-to-image';
import { format } from 'date-fns';

const MoodOfTheDay = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentMood, setCurrentMood] = useState(moods[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    if (!contentRef.current) return;

    try {
      setIsGenerating(true);
      const content = contentRef.current;

      // Calculate the position and dimensions
      const rect = content.getBoundingClientRect();

      // Apply specific styles
      content.style.position = "relative";
      content.style.zIndex = "9999";
      content.style.overflow = "visible";
      content.style.borderRadius = "20px";

      // Generate and download image
      const dataUrl = await toPng(content);
      const link = document.createElement('a');
      link.download = `mood-of-the-day-${currentMood.title}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    // Select a random mood for the day
    const randomIndex = Math.floor(Math.random() * moods.length);
    setCurrentMood(moods[randomIndex]);
  }, []);

  const today = format(new Date(), 'EEEE, MMMM do');

  return (
    <div className="bg-gradient-to-r mx-auto from-teal-500 to-blue-500 pt-20 p-6">
      <div  className="max-w-3xl bg-white  mx-auto text-gray-800 rounded-3xl shadow-lg overflow-hidden relative">
        <div ref={contentRef} className=" bg-white rounded-3xl shadow-lg overflow-hidden relative">
        {/* Top Banner */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600"></div>
        
        {/* Hero Image */}
        <div className="relative w-full h-[300px]">
          <Image
            src={currentMood.images[0]}
            alt={currentMood.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          {/* Day and Date Badge */}
          <div className="absolute top-4 left-4 bg-teal-600 text-white px-4 py-2 rounded-full">
            {today}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-teal-600">{currentMood.title}</h2>
          <p className="text-lg mb-6">{currentMood.description}</p>
          <div className="space-y-4">
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-700 mb-2">Reflection</h3>
              <p>{currentMood.personalStory}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">Scripture for Today</h3>
              {currentMood.verses.map((verse, index) => (
                <p key={index} className="mb-2">{verse}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button
          onClick={generateImage}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {isGenerating ? "Generating..." : "Generate & Download Image"}
        </Button>
        </div>
    </div>
  );
};

export default MoodOfTheDay;
