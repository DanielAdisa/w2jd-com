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
      className="min-h-screen pt-20 pb-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 "
    >
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-500/10 via-purple-500/10 to-slate-500/10 pointer-events-none"></div> */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div ref={contentRef} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Christmas Banner */}
          <div className="h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500"></div>

          {/* Hero Section */}
          <div className="relative h-[400px]">
            <Image
              src={mood.images[0]}
              alt={mood.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full">
              🎄 Merry Christmas
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 p-8"
            >
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
                {mood.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                {mood.description}
              </p>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-red-50 dark:bg-slate-700/50 p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-serif text-red-700 dark:text-red-400 mb-4">
                Christmas Reflection
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                {mood.personalStory}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-serif text-green-700 dark:text-green-400 mb-6">
                Scripture Gifts
              </h2>
              {mood.verses.map((verse, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-green-50 dark:bg-slate-700/50 p-6 rounded-2xl"
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
