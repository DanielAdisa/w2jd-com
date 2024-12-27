'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TestimonyFormData {
  author: string;
  title: string;
  content: string;
  category: string;
}

const categories = [
  'Praise',
  'Healing',
  'Salvation',
  'Provision',
  'Protection',
  'Other'
];

export default function TestimonyForm({ onSubmit }: { onSubmit: (data: TestimonyFormData) => Promise<void> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<TestimonyFormData>();

  const content = watch('content', '');
  const maxLength = 1000;

  const handleFormSubmit = async (data: TestimonyFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 bg-white/10 backdrop-blur-sm  rounded-xl p-8 shadow-xl"
    >
      <div>
        <label className="block text-sm font-medium text-white mb-2">Your Name</label>
        <input
          {...register('author', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-black/60 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          placeholder="Your Name"
        />
        {errors.author && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.author.message}
          </motion.p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Category</label>
        <select
          {...register('category', { required: 'Please select a category' })}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-black/60 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.category.message}
          </motion.p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Title</label>
        <input
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 3, message: 'Title must be at least 3 characters' }
          })}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-black/60 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          placeholder="Title of your testimony"
        />
        {errors.title && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-1"
          >
            {errors.title.message}
          </motion.p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Your Testimony</label>
        <textarea
          {...register('content', {
            required: 'Content is required',
            minLength: { value: 10, message: 'Please write at least 10 characters' },
            maxLength: { value: maxLength, message: `Maximum ${maxLength} characters` }
          })}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-black/60 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          placeholder="Share your testimony..."
          rows={6}
        />
        <div className="flex justify-between mt-1">
          <span className="text-sm text-white/60">
            {content.length}/{maxLength} characters
          </span>
          {errors.content && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm"
            >
              {errors.content.message}
            </motion.p>
          )}
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
          isSubmitting
            ? 'bg-gray-500 cursor-not-allowed'
            : submitSuccess
            ? 'bg-green-500'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : submitSuccess ? (
          'Testimony Submitted!'
        ) : (
          'Share Your Testimony'
        )}
      </motion.button>
    </motion.form>
  );
}