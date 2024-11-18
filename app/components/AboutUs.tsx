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
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        {/* Text Content over Hero Image */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center px-6 sm:px-12 space-y-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
            Misfits For Christ
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto opacity-90">
            A movement spreading the love of Christ every day. We share His message of hope, faith, and love, one post, one challenge, and one day at a time.
          </p>
          <div className="flex space-x-6">
            <Link
              href="#join-us"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-xl hover:bg-blue-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Join The Movement
            </Link>
            <Link
              href="#explore-more"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>

      {/* About Us Content */}
      <div className="relative py-20 bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Who We Are
            </h2>
            <p className="mt-5 text-lg sm:text-xl font-medium text-gray-600 max-w-3xl mx-auto">
              Misfits For Christ is a community-driven movement, united by our faith. We spread His love and light through powerful challenges, uplifting posts, and daily acts of kindness.
            </p>
          </div>

          {/* Grid Layout with Image and Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Section */}
            <div className="order-2 md:order-1 space-y-6 md:space-y-8 text-center md:text-left">
              <h3 className="text-3xl font-semibold text-gray-900">
                A Heart for Christ, A Mission for the World
              </h3>
              <p className="text-lg text-gray-700">
                We’re on a mission to inspire and encourage people through Christ's love. Our work goes beyond words; it’s about action. Every post, challenge, and interaction is a step toward spreading His message of grace.
              </p>

              <div className="space-x-6 flex justify-center md:justify-start">
                <Link
                  href="#contact"
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-xl hover:bg-blue-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  Get In Touch
                </Link>
                <Link
                  href="#join-us"
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-600 hover:text-white"
                >
                  Join The Movement
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative w-full h-96 md:h-auto">
              <Image
                src={ruth}
                alt="Misfits For Christ Team"
                layout="responsive"
                width={700}
                height={700}
                className="object-cover rounded-lg shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mt-20 text-center">
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              Are You Ready to Make a Difference?
            </h4>
            <p className="text-lg text-gray-600 mb-6">
              We invite you to be a part of our growing movement. Share your story, join in spreading Christ's love, and help us make a global impact together.
            </p>
            <Link
              href="#explore-more"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-xl hover:bg-blue-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
