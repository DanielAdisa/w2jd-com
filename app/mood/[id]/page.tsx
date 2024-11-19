"use client";

import { notFound } from 'next/navigation';
import { moods } from '@/data/moods';
import Image from 'next/image';
import { use, useRef } from 'react';
import html2canvas from 'html2canvas'; // Ensure you have this package installed

const MoodPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  // Find the mood by its ID
  const mood = moods.find((m) => m.id === id);

  // If the mood is not found, show a 404 page
  if (!mood) {
    notFound();
  }

  // Reference for the content to generate the image
  const contentRef = useRef<HTMLDivElement>(null);

  // Function to generate the image
  const generateImage = async () => {
    if (!contentRef.current) return;

    const content = contentRef.current;

    // Use html2canvas to capture only the relevant content (no carousel controls)
    const canvas = await html2canvas(content, { useCORS: true });
    const imageUrl = canvas.toDataURL('image/png');

    // Create a downloadable link for the image
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${mood.title}-mood-image.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Hero Section with Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={mood.images[0]} // Use the first image from the mood's images array
          alt={`${mood.title} hero image`}
          fill
          objectFit="cover"
          className="transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
      </div>

      {/* Mood Content Section */}
      <div ref={contentRef} className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 mt-8 relative">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">{mood.title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 text-center">{mood.description}</p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Personal Story</h2>
          <p className="text-md text-gray-700 dark:text-gray-300 mt-2">{mood.personalStory}</p>
        </div>
      </div>

      {/* Button to generate image */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={generateImage}
          className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Generate & Download Image
        </button>
      </div>
    </div>
  );
};

export default MoodPage;
