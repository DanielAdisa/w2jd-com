'use client';
import ruth from "@/public/Assets/ruth.jpg";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AboutUsSection = () => {
  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={ruth}
            alt="Misfits For Christ Hero Image"
            layout="fill"
            objectFit="cover"
            className="md:object-left-top transform scale-110 transition-all duration-1000 ease-in-out"
          />
        </div>

        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>

        {/* Text Content over Hero Image */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-3xl">
            Welcome to Misfits For Christ. We are dedicated to spreading love, hope, and faith through our community and outreach programs.
          </p>
          <Link href="/contact" className=" flex items-center justify-center">
            <span className=" absolute bottom-1/3 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Contact Us
            </span>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto py-12 px-6 space-y-12">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
          <h2 className="text-3xl font-serif mb-4 text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Our mission is to create a welcoming environment where everyone can experience the love of Christ. We believe in the power of community and strive to make a positive impact in the lives of those around us.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
          <h2 className="text-3xl font-serif mb-4 text-slate-900 dark:text-white">Our Vision</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Our vision is to see lives transformed by the love of Christ. We aim to be a beacon of hope and a source of support for individuals and families in our community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
