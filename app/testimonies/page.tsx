'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonyForm from '@/app/components/TestimonyForm';
import TestimonyCard from '@/app/components/TestimonyCard';
import { Cross, PlusCircle } from 'lucide-react';
import Swal from 'sweetalert2';

interface Testimony {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  likes: number;
}

interface TestimonyFormData {
  title: string;
  content: string;
  author: string;
  category?: string;
}

interface TestimonyFormData {
  title: string;
  content: string;
  author: string;
  category?: string;
}


const TestimoniesPage = () => {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchTestimonies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTestimonies();
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedCategory]);

  const fetchTestimonies = async () => {
    try {
      setError(null);
      const response = await fetch('/api/testimonies');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch testimonies');
      setTestimonies(data);
      setTotalLikes(
        data.reduce((total: number, testimony: Testimony) => total + (testimony.likes || 0), 0)
      );
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch testimonies');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (data: TestimonyFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/testimonies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit testimony');

      const newTestimony = await response.json();
      setTestimonies([newTestimony, ...testimonies]);
      setTotalLikes(totalLikes + 1);
      setShowForm(false);
    } catch (error) {
      console.error('Submit error:', error);
      setError('Failed to submit testimony');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'healing', name: 'Healing' },
    { id: 'provision', name: 'Provision' },
    { id: 'faith', name: 'Faith Journey' },
    { id: 'other', name: 'Other' },
  ];

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 p-4">{error}</div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900">
      <div className="absolute inset-0 bg-repeat opacity-5" 
           style={{ backgroundImage: "url('/sacred-geometry.png')" }} />

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-6">
            Testimonies
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto italic">
            "Let the redeemed of the Lord tell their story..." - Psalm 107:2
          </p>
          
          {/* Statistics */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-yellow-400">{totalLikes}</p>
              <p className="text-sm text-slate-400">Total Likes</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-yellow-400">{testimonies.length}</p>
              <p className="text-sm text-slate-400">Shared Testimonies</p>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="md:flex flex md:flex-row flex-col justify-center gap-4 mb-8 overflow-x-auto py-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`md:px-4 p-2 md:py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Add Testimony Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50
                     hover:bg-blue-700 transition-all duration-300"
        >
          {showForm ? <Cross size={24} /> : <PlusCircle size={24} />}
        </motion.button>

        {/* Testimony Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-2xl">
                <TestimonyForm onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonies Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonies
            .filter(testimony => selectedCategory === 'all' || testimony.category === selectedCategory)
            .map((testimony) => (
              <TestimonyCard 
                key={testimony.id} 
                testimony={testimony} 
                onLike={(id: string) => {
                  const updatedTestimonies = testimonies.map(t => 
                    t.id === id ? { ...t, likes: t.likes + 1 } : t
                  );
                  setTestimonies(updatedTestimonies);
                  setTotalLikes(totalLikes + 1);
                }}
              />
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimoniesPage;
