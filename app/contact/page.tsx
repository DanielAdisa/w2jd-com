'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import heroImage from '@/public/Assets/ruth.jpg'; // Replace with your desired hero image
import Link from 'next/link';

const ContactUs: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to an API or email service)
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="relative w-full h-[600px]">
        <Image
          src={heroImage}
          alt="Contact Hero Image"
          layout="fill"
          className="object-cover absolute inset-0 opacity-80"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative flex flex-col w-full h-full items-center justify-center z-10 text-center text-white p-8 md:p-16">
          <h1 className="text-5xl font-extrabold leading-tight mb-4 text-shadow-lg">
            Contact Us
          </h1>
          <p className="text-xl font-serif max-w-3xl mx-auto">
            We're here to help you. Reach out with any questions, thoughts, or feedback. We'd love to hear from you!
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
          Get in Touch
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">
          Whether you have a question, suggestion, or just want to say hello, we're here to listen and support you.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              placeholder="Enter your message"
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-4 rounded-lg text-xl hover:bg-blue-700 transition-all ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Why Contact Us Section */}
      <div className="bg-gray-800 dark:bg-gray-900 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-100 mb-8">Why We’re Here</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            At Misfits for Christ, we believe in the power of community and connection. We're here to support you on your journey and answer any questions you may have.
          </p>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="max-w-7xl mx-auto p-4 text-center py-16">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Join Our Community
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Whether you are new to our community or have been with us for years, we invite you to continue walking this journey together. Join us in spreading love and hope to all.
        </p>
        <Link href="/contact" className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg hover:bg-blue-700 transition-all ease-in-out">
          Get Involved
        </Link>
      </div>
    </div>
  );
};

export default ContactUs;
