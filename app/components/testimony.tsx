'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { testimonies } from '@/data/data';
import Image from 'next/image';

export default function TestimoniesPage() {
  const [filter, setFilter] = useState('all');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Testimonies
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Share your story of faith and inspire others
          </p>
        </motion.div>

        {/* Add Testimony Button */}
        <div className="text-center mb-12">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
            Share Your Testimony
          </button>
        </div>

        {/* Testimonies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonies.map((testimony) => (
            <motion.div
              key={testimony.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              {testimony.image && (
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={testimony.image}
                    alt={testimony.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">
                {testimony.title}
              </h3>
              <p className="text-slate-300 mb-4">{testimony.content}</p>
              <div className="flex justify-between items-center text-sm text-slate-400">
                <span>{testimony.author}</span>
                <span>{testimony.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}