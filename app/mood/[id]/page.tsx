"use client";

import { notFound } from 'next/navigation';
import { moods } from '@/data/moods';
import Image from 'next/image';
import { use, useState } from 'react';

const ProjectPage = ({ params }: { params: Promise<{ id: string }> }) => {
  // Use the `use` hook to resolve the `params` Promise and extract the `id`
  const { id } = use(params);
  
  // Find the mood by its ID
  const mood = moods.find((p) => p.id === id);

  // If the mood is not found, show a 404 page
  if (!mood) {
    notFound();
  }

  // State for managing the carousel index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next image in the carousel
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mood.images.length);
  };

  // Function to move to the previous image in the carousel
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + mood.images.length) % mood.images.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Header Image Section (Carousel) */}
      <div className="relative w-full h-[50vh] md:h-screen overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={mood.images[currentIndex]}
            alt={`Mood ${mood.id} - Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700"
          />
        </div>
        {/* Image Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800"
        >
          &lt;
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800"
        >
          &gt;
        </button>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75" />
        <div className="absolute bottom-5 left-5 text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold animate-fade-in-up">{mood.title}</h1>
          <p className="text-lg font-light mt-4 opacity-80">An immersive journey into {mood.title}</p>
        </div>
      </div>

      {/* Project Details Section */}
      <div className="flex-row content-center h-auto md:mt-10 p-5 bg-white dark:bg-slate-800 shadow-xl rounded-t-xl mx-auto max-w-3xl transform transition duration-500 ease-in-out hover:shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white text-center mb-6">{mood.title}</h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center md:mt-4">
          {mood.description}
        </p>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 italic mt-8 text-center">
          Presented with passion and precision.
        </p>
      </div>
    </div>
  );
};

export default ProjectPage;
