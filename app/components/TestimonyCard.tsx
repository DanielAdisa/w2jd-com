import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface TestimonyCardProps {
  testimony: {
    id: string;
    title: string;
    content: string;
    author: string;
    category: string;
    image?: string;
    createdAt: string;
    likes: number;
  };
  onLike: (id: string) => void;
}

const TestimonyCard: React.FC<TestimonyCardProps> = ({ testimony, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(testimony.likes);

  useEffect(() => {
    const likedTestimonies = JSON.parse(localStorage.getItem('likedTestimonies') || '{}');
    setIsLiked(Boolean(likedTestimonies[testimony.id]));
  }, [testimony.id]);

  const handleLikeToggle = async () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
    onLike(testimony.id);

    const likedTestimonies = JSON.parse(localStorage.getItem('likedTestimonies') || '{}');
    if (isLiked) {
      delete likedTestimonies[testimony.id];
    } else {
      likedTestimonies[testimony.id] = true;
    }
    localStorage.setItem('likedTestimonies', JSON.stringify(likedTestimonies));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
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

      <div className="flex justify-between items-center mb-4">
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
          {testimony.category}
        </span>
        <span className="text-xs text-slate-400">
          {format(new Date(testimony.createdAt), 'MMM dd, yyyy')}
        </span>
      </div>

      <Link href={`/testimonies/${testimony.id}`} passHref>
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-300 cursor-pointer">
          {testimony.title}
        </h3>
      </Link>

      <p className="text-slate-300 text-sm mb-4 line-clamp-3 hover:line-clamp-none transition-all duration-300">
        {testimony.content}
      </p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
        <span className="text-sm text-slate-400 font-medium">{testimony.author}</span>
        <button
          onClick={handleLikeToggle}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-red-500 transition-all duration-300"
        >
          <motion.div
            whileTap={{ scale: 1.2 }}
            className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`}
          >
            <Heart />
          </motion.div>
          <span>{likes}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default TestimonyCard;
