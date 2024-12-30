import { motion } from 'framer-motion';
import Image from 'next/image';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Testimony } from '@/app/types/testimony';

interface TestimonyCardProps {
  testimony: Testimony;
  onLike: (id: string) => void;
}

export default function TestimonyCard({ testimony, onLike }: TestimonyCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState(testimony.likes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedTestimonies = JSON.parse(localStorage.getItem('likedTestimonies') || '{}');
    if (testimony.id && likedTestimonies[testimony.id]) {
      setIsLiked(true);
    }
  }, [testimony.id]);

  const handleLike = async () => {
    if (isLoading || isLiked) return;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/testimonies/${testimony.id}/like`, {
        method: 'POST'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update likes');
      }

      const updatedTestimony = await response.json();
      setLikes(updatedTestimony.likes);
      setIsLiked(true);

      const likedTestimonies = JSON.parse(localStorage.getItem('likedTestimonies') || '{}');
      if (testimony.id) {
        likedTestimonies[testimony.id] = true;
      }
      localStorage.setItem('likedTestimonies', JSON.stringify(likedTestimonies));
    } catch (error) {
      console.error('Like error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (isLoading || !isLiked) return;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/testimonies/${testimony.id}/unlike`, {
        method: 'POST'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update likes');
      }

      const updatedTestimony = await response.json();
      setLikes(updatedTestimony.likes);
      setIsLiked(false);

      const likedTestimonies = JSON.parse(localStorage.getItem('likedTestimonies') || '{}');
      if (testimony.id) {
        delete likedTestimonies[testimony.id];
      }
      localStorage.setItem('likedTestimonies', JSON.stringify(likedTestimonies));
    } catch (error) {
      console.error('Unlike error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      {testimony.image && (
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={testimony.image}
            alt={testimony.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
          {testimony.category}
        </span>
        <span className="text-xs text-slate-400">
          {testimony.createdAt ? format(new Date(testimony.createdAt), 'MMM dd, yyyy') : 'Date not available'}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:line-clamp-none transition-all duration-300">
        {testimony.title}
      </h3>
      
      <p className="text-slate-300 mb-4 line-clamp-3 hover:line-clamp-none transition-all duration-300">
        {testimony.content}
      </p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="font-medium">{testimony.author}</span>
        </div>
        
        <button
          onClick={isLiked ? handleUnlike : handleLike}
          className="flex items-center gap-1 text-sm"
          disabled={isLoading}
        >
          <motion.div
            whileTap={{ scale: 1.2 }}
            className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`}
          >
            <Heart />
          </motion.div>
          <span className="text-slate-400">{likes}</span>
        </button>
      </div>
    </motion.div>
  );
}