'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PrayerRequestForm from '@/app/components/PrayerRequestForm';
import PrayerCard from '@/app/components/PrayerRequestCard';
import { Cross, PlusCircle } from 'lucide-react';
import Swal from 'sweetalert2';

interface PrayerRequest {
  id: string;
  title: string;
  content: string;
  author: string;
  isPublic: boolean;
  createdAt: string;
  praying: number;
  category?: string;
}

interface PrayerRequestFormData {
  title: string;
  content: string;
  author: string;
  isPublic: boolean;
  category?: string;
}

const PrayersPage = () => {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [totalPrayers, setTotalPrayers] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchPrayerRequests();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPrayerRequests();
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedCategory]);

  const fetchPrayerRequests = async () => {
    try {
      setError(null);
  
      const response = await fetch('/api/prayers');
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Unexpected response format:', text);
        throw new Error('Unexpected response format');
      }
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
  
      if (!Array.isArray(data)) {
        throw new Error('Expected array of prayer requests');
      }
  
      setPrayerRequests(data);
      setTotalPrayers(data.reduce((total: number, prayer: PrayerRequest) => 
        total + (prayer.praying || 0), 0
      ));
  
    } catch (error) {
      console.error('Fetch error:', error instanceof Error ? error.message : 'Unknown error');
      setError('Failed to fetch prayer requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (data: PrayerRequestFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/prayers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit prayer request');

      const newPrayerRequest = await response.json();
      setPrayerRequests([newPrayerRequest, ...prayerRequests]);
      setTotalPrayers(totalPrayers + 1);
      setShowForm(false);
      localStorage.setItem('prayerAuthor', data.author); // Store the prayer author in local storage
    } catch (error) {
      console.error('Submit error:', error instanceof Error ? error.message : error);
      setError('Failed to submit prayer request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePrayerRequest = async (prayerId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this prayer request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/prayers/${prayerId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete prayer request');
        setPrayerRequests(prayerRequests.filter(prayer => prayer.id !== prayerId));
        setTotalPrayers(totalPrayers - 1);
        Swal.fire({
          icon: 'success',
          title: 'Prayer Request Deleted!',
          text: 'Your prayer request has been deleted successfully.',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff',
        });
      } catch (error) {
        console.error('Delete prayer request error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete prayer request. Please try again later.',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff',
        });
      }
    }
  };

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'healing', name: 'Healing' },
    { id: 'guidance', name: 'Guidance' },
    { id: 'thanksgiving', name: 'Thanksgiving' },
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

  const currentUser = localStorage.getItem('prayerAuthor');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900">
      {/* Sacred Geometry Background Pattern */}
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
            Prayer Requests
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto italic">
            "For where two or three gather in my name, there am I with them." - Matthew 18:20
          </p>
          
          {/* Statistics */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-yellow-400">{totalPrayers}</p>
              <p className="text-sm text-slate-400">Total Prayers</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-yellow-400">{prayerRequests.length}</p>
              <p className="text-sm text-slate-400">Active Requests</p>
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

        {/* Add Prayer Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50
                     hover:bg-blue-700 transition-all duration-300"
        >
          {showForm ? <Cross size={24} /> : <PlusCircle size={24} />}
        </motion.button>

        {/* Prayer Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-2xl">
                <PrayerRequestForm onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prayer Cards Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {prayerRequests
            .filter(prayer => selectedCategory === 'all' || prayer.category === selectedCategory)
            .map((prayer) => (
              <PrayerCard 
                key={prayer.id} 
                prayer={prayer} 
                currentUser={currentUser} 
                handleDeletePrayerRequest={handleDeletePrayerRequest} 
              />
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PrayersPage;