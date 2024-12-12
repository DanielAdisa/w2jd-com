'use client';

import Image from 'next/image';
import { FC } from 'react';
import heroImage from '@/public/Assets/ruth.jpg'; // Replace with your desired hero image
import Link from 'next/link';

const OurMission: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="relative w-full h-[600px]">
        <Image
          src={heroImage}
          alt="Hero Image"
          layout="fill"
          className="object-cover absolute inset-0 opacity-80"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative flex flex-col w-full h-full items-center justify-center z-10 text-center text-white p-8 md:p-16">
          <h1 className="text-5xl font-extrabold leading-tight mb-4 text-shadow-lg">
            Our Mission
          </h1>
          <p className="text-xl font-serif max-w-3xl mx-auto">
            At Misfits for Christ, we create a space for individuals who feel they don't belong, offering compassion, support, and empowerment through the grace of Christ.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
          Our Core Values
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">
          These core values guide us in our mission to spread love, hope, and healing to those who need it most.
        </p>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Compassion */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-4">Compassion</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              We show empathy and kindness to everyone, embracing their struggles and offering support and understanding.
            </p>
          </div>

          {/* Authenticity */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-4">Authenticity</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              We embrace who we truly are, both individually and as a community, and support each other's growth in Christ.
            </p>
          </div>

          {/* Empowerment */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-4">Empowerment</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              We help individuals discover their potential in Christ and provide tools to rise above challenges.
            </p>
          </div>

          {/* Community */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-4">Community</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              We create a supportive and inclusive environment where everyone is encouraged to grow and connect in faith.
            </p>
          </div>
        </div>
      </div>

      {/* Why We Do It */}
      <div className="bg-gray-800 dark:bg-gray-900 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-100 mb-8">Why We Do It</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Our mission is to break the barriers that keep people apart, offering a sense of belonging to those who feel overlooked or forgotten. In Christ, we find our true purpose and we are committed to helping others do the same.
          </p>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="max-w-7xl mx-auto p-4 text-center py-16">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Join Us on Our Journey
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Whether you're just beginning your journey with Christ or have been walking with Him for years, we invite you to join us in spreading love, hope, and healing to the world around us.
        </p>
        <Link href="/contact" className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg hover:bg-blue-700 transition-all ease-in-out">
          Get Involved
        </Link>
      </div>
    </div>
  );
};

export default OurMission;
