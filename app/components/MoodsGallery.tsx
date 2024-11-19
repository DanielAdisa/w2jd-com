'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Dummy Data for Moods
const moods = [
  {
    id: '1',
    title: 'Joyful',
    images: ['/joy1.jpg', '/joy2.jpg'], // Add your actual image paths here
    description: 'Experience the fullness of joy through God’s presence and blessings.',
    hash: 'joyful-mood',
  },
  {
    id: '2',
    title: 'Peaceful',
    images: ['/peace1.jpg', '/peace2.jpg'],
    description: 'Discover the peace that surpasses all understanding in His Word.',
    hash: 'peaceful-mood',
  },
  {
    id: '3',
    title: 'Grateful',
    images: ['/grateful1.jpg', '/grateful2.jpg'],
    description: 'Count your blessings and embrace a spirit of thanksgiving.',
    hash: 'grateful-mood',
  },
  // Add more moods here
];

const MoodsGallery = () => {
  return (
    <section className="py-20 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Explore Moods
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Find inspiration, strength, and comfort in God’s Word for every mood you experience.
          </p>
        </div>

        {/* Moods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {moods.map((mood) => (
            <div
              key={mood.id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Mood Image */}
              <div className="h-48 w-full relative">
                <Image
                  src={mood.images[0]} // Display the first image for preview
                  alt={mood.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              {/* Mood Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold">{mood.title}</h3>
                <p className="text-gray-700">{mood.description}</p>
                <Link
                  href={`/mood/${mood.hash}`}
                  className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoodsGallery;
