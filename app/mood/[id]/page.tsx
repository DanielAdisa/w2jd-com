"use client";

import { useState, useRef, use } from "react";
import { notFound } from "next/navigation";
import { moods } from "@/data/moods";
import { toPng } from "html-to-image";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from 'date-fns';

const MoodPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const mood = moods.find((m) => m.id === id);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!mood) notFound();

  const generateImage = async () => {
    if (!contentRef.current) return;
    setIsLoading(true);
    try {
      const content = contentRef.current;
      const dataUrl = await toPng(content, {
        quality: 1,
        pixelRatio: 3
      });
      const link = document.createElement("a");
      link.download = `${mood.title}-reflection.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const today = format(new Date(), 'EEEE, MMMM do');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-purple-800/40 bg-gradient-to-br pt-20 pb-10 pr-4 pl-4  dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 "
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div ref={contentRef} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Card Hero */}
          <div className="relative h-[400px]">
            <Image
              src={mood.images[0]}
              alt={mood.title}
              fill
              className="object-cover transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30" />
            
            {/* Floating Badges */}
            <div className="absolute top-6 right-6 flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-md opacity-75"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-1.5 rounded-full text-white/90 font-medium shadow-xl backdrop-blur-sm border border-white/10">
                  ✨ Featured Reflection
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full blur-md opacity-75"></div>
                <div className="relative bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-1.5 rounded-full text-white/90 font-medium shadow-xl backdrop-blur-sm border border-white/10">
                  {today}
                </div>
              </div>
            </div>

            {/* Title Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 p-8 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent"
            >
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-tight">
                {mood.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl font-light">
                {mood.description}
              </p>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="prose dark:prose-invert max-w-none"
            >
              <h2 className="text-2xl md:text-3xl font-serif mb-4">Reflection</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {mood.personalStory}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-2xl md:text-3xl font-serif mb-6">Scripture</h2>
              {mood.verses.map((verse, index) => (
                <motion.blockquote
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 border-l-4 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 rounded-r-lg"
                >
                  <p className="text-slate-600 dark:text-slate-300 italic">
                    {verse}
                  </p>
                </motion.blockquote>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating Action Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-8 right-8"
        >
          <Button
            onClick={generateImage}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg py-4 px-6 rounded-full shadow-xl hover:transform hover:scale-105 transition-all duration-300"
          >
            {isLoading ? "Generating..." : "Share Reflection"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MoodPage;
