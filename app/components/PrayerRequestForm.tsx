'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookMarked, Cross, Lock, Globe } from 'lucide-react';

interface PrayerRequestFormData {
  author: string;
  title: string;
  content: string;
  isPublic: boolean;
  category: string;
}

const categories = [
  { id: 'healing', name: 'Healing' },
  { id: 'guidance', name: 'Guidance' },
  { id: 'thanksgiving', name: 'Thanksgiving' },
  { id: 'other', name: 'Other' },
];

export default function PrayerRequestForm({ 
  onSubmit, 
  onClose 
}: { 
  onSubmit: (data: PrayerRequestFormData) => Promise<void>;
  onClose: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<PrayerRequestFormData>();

  const content = watch('content', '');
  const maxLength = 1000;

  const handleFormSubmit = async (data: PrayerRequestFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative max-w-2xl mx-auto bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-white/60 hover:text-white"
        aria-label="Close prayer request form"
      >
        <Cross size={20} />
      </button>

      <div className="text-center mb-8">
        <BookMarked className="w-12 h-12 mx-auto text-blue-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Share Your Prayer Request</h2>
        <p className="text-slate-300 text-sm">Your prayers matter to our community</p>
      </div>

      <motion.form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Your Name</label>
            <input
              {...register('author', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              placeholder="Your Name"
            />
            <AnimatePresence>
              {errors.author && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.author.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Category</label>
            <select
              {...register('category')}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id} className="bg-slate-800">
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Title</label>
          <input
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters' }
            })}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            placeholder="Title of your prayer request"
          />
          <AnimatePresence>
            {errors.title && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.title.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Your Prayer Request</label>
          <textarea
            {...register('content', {
              required: 'Content is required',
              minLength: { value: 10, message: 'Please write at least 10 characters' },
              maxLength: { value: maxLength, message: `Maximum ${maxLength} characters` }
            })}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            placeholder="Share your prayer request..."
            rows={6}
          />
          <div className="flex justify-between mt-1">
            <motion.span 
              animate={{ color: content.length > maxLength * 0.9 ? '#ef4444' : '#94a3b8' }}
              className="text-sm"
            >
              {content.length}/{maxLength} characters
            </motion.span>
            <AnimatePresence>
              {errors.content && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm"
                >
                  {errors.content.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-between border border-white/10 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <input
              {...register('isPublic')}
              type="checkbox"
              className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-white/10 border-white/20"
            />
            <label className="text-sm text-white flex items-center gap-2">
              {watch('isPublic') ? <Globe size={16} /> : <Lock size={16} />}
              Make this prayer request public
            </label>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full py-4 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-500 cursor-not-allowed'
              : submitSuccess
              ? 'bg-green-500'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
          } text-white shadow-lg`}
        >
          {isSubmitting ? (
            <motion.span 
              className="flex items-center justify-center"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Prayer Request...
            </motion.span>
          ) : submitSuccess ? (
            'Prayer Request Shared 🙏'
          ) : (
            'Share Prayer Request'
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}