"use client";

import { notFound } from 'next/navigation';
import { moods } from '@/data/moods';
import Image from 'next/image';
import { use, useState } from 'react';

const MoodPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  // Find the mood by its ID
  const mood = moods.find((m) => m.id === id);

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
      {/* Hero Section with Dynamic Content */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden group">
        {/* Image Carousel */}
        <div className="relative w-full h-full">
          <Image
            src={mood.images[currentIndex]}
            alt={`Mood ${mood.id} - Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80"
          />
        </div>

        {/* Gradient Overlay and Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75" />
        <div className="absolute bottom-8 left-8 text-white px-6 py-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">{mood.title}</h1>
          <p className="text-lg font-light mt-4 opacity-80">{mood.description}</p>
        </div>

        {/* Carousel Navigation */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none"
        >
          &lt;
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none"
        >
          &gt;
        </button>
      </div>

      {/* Mood Details Section */}
      <div className="flex flex-col lg:flex-row items-center md:mt-16 p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg mx-auto max-w-6xl transform transition duration-500 ease-in-out hover:shadow-2xl">
        <div className="lg:w-1/2 flex justify-center mb-6 lg:mb-0">
          <Image
            src={mood.images[0]}
            alt={`Mood ${mood.id} - Image`}
            width={500}
            height={500}
            className="rounded-lg shadow-xl"
          />
        </div>

        <div className="lg:w-1/2 lg:pl-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-6">{mood.title}</h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">{mood.description}</p>

          {/* Personal Story Section */}
          <div className="mt-8 p-6 bg-gray-100 dark:bg-slate-700 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">My Personal Story</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">{mood.personalStory}</p>
          </div>

          {/* Resources Section */}
          <div className="mt-8 space-y-4 w-full">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Helpful Resources</h3>
            <ul className="space-y-2">
              {mood.resources.map((resource, index) => (
                <li key={index} className="transition transform duration-300 hover:scale-105">
                  <a
                    href={resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline transition duration-300"
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 mt-16 bg-gray-800 text-white">
        <p className="text-lg">&copy; 2024 Mood Journey</p>
      </footer>
    </div>
  );
};

export default MoodPage;
