"use client";

import { useState, useRef, use } from "react";
import { notFound } from "next/navigation";
import { moods } from "@/data/moods";
import { toPng } from "html-to-image";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 pt-20 pb-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-900 via-purple-900 to-stone-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 "
    >
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-500/10 via-purple-500/10 to-slate-500/10 pointer-events-none"></div> */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div 
          ref={contentRef} 
          className="relative bg-white/80 dark:bg-slate-800/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"></div>

          {/* Top Banner */}
          <div className="relative h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>

          {/* Hero Section */}
          <div className="relative h-[450px] group">
            <Image
              src={mood.images[0]}
              alt={mood.title}
              fill
              className="object-cover transition-transform duration-700 "
              priority
            />
            
            {/* Multiple Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30" />
            
            {/* Floating Badge */}
            <div className="absolute top-6 right-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-md opacity-75"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-2.5 rounded-full text-white/90 font-medium shadow-xl backdrop-blur-sm border border-white/10">
                  ✨ Featured Reflection
                </div>
              </div>
            </div>

            {/* Title Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent"
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
          <div className="p-4 space-y-6">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: 0.2
              }}
              className="bg-gradient-to-br from-red-50 to-red-50/50 dark:from-slate-700/50 dark:to-slate-800/50 p-6 rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-500"
            >
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-2xl font-serif text-red-700 dark:text-red-400 mb-4"
              >
                Christmas Reflection
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-slate-700 dark:text-slate-300"
              >
                {mood.personalStory}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: 0.5
              }}
              className="space-y-4"
            >
              <motion.h2
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="text-2xl font-serif text-green-700 dark:text-green-400 mb-6"
              >
                Scripture Gifts
              </motion.h2>
              {mood.verses.map((verse, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -40, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: 0.7 + (index * 0.1)
                  }}
                  className="bg-gradient-to-br from-green-50 to-green-50/50 dark:from-slate-700/50 dark:to-slate-800/50 p-3 rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-500"
                >
                  <p className="text-lg text-slate-700 dark:text-slate-300 italic">
                    {verse}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Share Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={generateImage}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 via-teal-600 to-slate-700 text-white/90 text-lg py-4 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:text-white transition-all duration-300"
          >
            {isLoading ? "Generating..." : "Share Reflection"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MoodPage;
