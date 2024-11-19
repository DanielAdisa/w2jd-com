'use client';

import Link from 'next/link';
import { moods } from '@/data/moods';
import zubi from '@/public/Assets/ruth.jpg'
import Image from 'next/image';

const MoodListPage = () => {
  return (
    <div className="min-h-screen p bg-gray-100">
      {/* <div className="relative w-full h-[597.083px]">
        <Image
          src={zubi}
          alt="Hero Image"
          layout="fill"
          className="object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative flex flex-col w-full h-full items-center justify-center z-10 text-center text-white p-2 md:p-3">
          <h1 className="text-4xl font-bold mb-4">Architectural Visualization</h1>
          <p className="text-xl font-serif">
            Less is only more where more is no good.
            <br />
            <br />– Frank Lloyd Wright
          </p>
        </div> 
      </div> */}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Explore Moods</h1>
        <p className="text-center text-gray-600 mb-12">
          Discover different moods, explore their stories, and find helpful resources.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {moods.map((mood) => (
            <Link 
              key={mood.id} 
              href={`/mood/${mood.id}`}
              className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={mood.images[0]} // Display the first image as a preview
                  alt={mood.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{mood.title}</h2>
                <p className="text-sm text-gray-600">{mood.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodListPage;
