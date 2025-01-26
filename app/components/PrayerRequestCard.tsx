import Link from 'next/link';
import { Heart, Clock, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import { FaPersonPraying } from 'react-icons/fa6';

interface PrayerCardProps {
  prayer: {
    id: string;
    title: string;
    content: string;
    author: string;
    praying: number;
    category?: string;
    createdAt: string;
  };
  currentUser: string | null;
  handleDeletePrayerRequest: (prayerId: string) => void;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer, currentUser, handleDeletePrayerRequest }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    handleDeletePrayerRequest(prayer.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/prayers/${prayer.id}`} className="block h-full">
        <div className="group relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg 
                      rounded-xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 
                      border border-white/5 hover:border-white/20">
          
          <div className="flex justify-between items-start mb-4">
            {prayer.category && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                {prayer.category}
              </span>
            )}
            
            {prayer.author === currentUser && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="ml-2 p-2 text-red-500 hover:text-red-400 bg-red-500/10 
                         rounded-full transition-colors duration-200"
                title="Delete prayer request"
                aria-label="Delete prayer request"
              >
                <Trash size={16} />
              </motion.button>
            )}
          </div>

          <div className="space-y-3 mb-4">
            <h3 className="text-lg md:text-xl font-bold text-white line-clamp-2 
                         group-hover:line-clamp-none transition-all duration-300">
              {prayer.title}
            </h3>
            
            <p className="text-sm md:text-base text-slate-300 line-clamp-3 
                       group-hover:line-clamp-none transition-all duration-300">
              {prayer.content}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between 
                        gap-3 mt-auto pt-4 border-t border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="font-medium truncate">{prayer.author}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} />
                <span>{formatDistanceToNow(new Date(prayer.createdAt))} ago</span>
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 
                       text-yellow-400"
            >
              <FaPersonPraying 
                className="w-4 h-4 fill-current group-hover:scale-110 
                         transition-transform duration-300" 
              />
              <span className="text-sm font-medium">{prayer.praying} Praying</span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PrayerCard;