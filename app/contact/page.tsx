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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-teal-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <input
                {...register('name', { required: "Name is required" })}
                className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring focus:ring-teal-500 focus:outline-none transition-all duration-300"
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
                {...register('email', { 
                  required: "Email is required", 
                  pattern: { 
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, 
                    message: "Invalid email address" 
                  } 
                })}
                className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring focus:ring-teal-500 focus:outline-none transition-all duration-300"
                type="email"
                placeholder="Email"
                aria-label="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1" aria-live="assertive">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div>
            <textarea
              {...register('message', { required: "Message is required" })}
              className="w-full border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring focus:ring-teal-500 focus:outline-none transition-all duration-300"
              placeholder="Message"
              aria-label="Message"
              rows={5}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1" aria-live="assertive">{errors.message.message}</p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
