"use client";

import heroImage from '@/public/Assets/ruth.jpg';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { FaFacebook, FaFacebookMessenger, FaInstagram, FaLinkedinIn, FaMailchimp, FaTwitter } from 'react-icons/fa6';

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[600px]">
        <Image
          src={heroImage}
          alt="Hero Image"
          layout="fill"
          className="object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
        <div className="relative flex flex-col items-center justify-center w-full h-full text-center text-white p-4">
          <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-xl italic">We'd love to hear from you. Reach out to us below.</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="h-fit md:w-5/6 w-full mx-auto flex flex-col md:flex-row md:space-x-10 p-6 md:py-12">
        {/* Contact Form */}
        <div className="flex-1">
          <form
            className="flex flex-col space-y-6 md:w-11/12 max-w-lg mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <input
                  {...register('name', { required: "Name is required" })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-teal-500 focus:outline-none"
                  type="text"
                  placeholder="Name"
                  aria-label="Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1" aria-live="assertive">{errors.name.message}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  {...register('email', { required: "Email is required", pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email address" } })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-teal-500 focus:outline-none"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1" aria-live="assertive">{errors.email.message}</p>
                )}
              </div>
            </div>
            <input
              {...register('subject', { required: "Subject is required" })}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-teal-500 focus:outline-none"
              type="text"
              placeholder="Subject"
              aria-label="Subject"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1" aria-live="assertive">{errors.subject.message}</p>
            )}
            <textarea
              {...register('message', { required: "Message is required" })}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-teal-500 focus:outline-none"
              placeholder="Message"
              rows={10}
              aria-label="Message"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1" aria-live="assertive">{errors.message.message}</p>
            )}
            <button
              className="bg-teal-500 py-3 px-6 rounded-md text-white font-bold text-lg hover:bg-teal-600 focus:ring focus:ring-teal-400 focus:outline-none flex items-center justify-center"
              type="submit"
              disabled={isSubmitting || loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Submit'}
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="flex-1 mt-10 md:mt-0">
          <div className="md:w-full mx-auto h-[450px] border rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.0449990498078!2d-6.420074422925379!3d53.3424506722882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4867731b8a426801%3A0xc876761f4c896bec!2s1%20Rosse%20Court%20Ave%2C%20Balgaddy%2C%20Lucan%2C%20Co.%20Dublin%2C%20K78%20C638%2C%20Ireland!5e0!3m2!1sen!2sng!4v1731765100055!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Social Media & Other Contact Options */}
      <div className="bg-gray-100 py-10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Connect with Us</h2>
          <p className="text-gray-700">Follow us on social media or reach us through other platforms.</p>
          <div className="flex justify-center space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <FaFacebook/>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
              <FaTwitter/>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
              <FaInstagram/>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
              <FaLinkedinIn/>
            </a>
            <a href="mailto:info@example.com" className="text-gray-700 hover:text-gray-900">
              <FaMailchimp/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
