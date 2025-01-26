"use client";

import { useState, useRef, use } from "react";
import domtoimage from 'dom-to-image';
import { notFound } from "next/navigation";
import { moods } from "@/data/moods";
import { toPng } from "html-to-image";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const MoodPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const mood = moods.find((m) => m.id === id);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  if (!mood) notFound();


const generateImage = async () => {
  if (!contentRef.current) return;
  setIsLoading(true);
  try {
    const content = contentRef.current;
    const dataUrl = await toPng(content, {
      quality: 10,
      pixelRatio: 10
    });
    const link = document.createElement("a");
    link.download = `${mood.title}-reflection.png`;
    link.href = dataUrl;
    link.click();

    // Update generation count
    const response = await fetch('/api/mood/updateGenerationCount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moodId: mood.id, moodName: mood.title }),
    });

    const result = await response.json();
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Image Downloaded Successfully!',
        text: `The image has been downloaded. This mood has been downloaded ${result.count} times.`,
        background: 'linear-gradient(145deg, #1e293b, #0f172a)',
        color: '#e2e8f0',
        confirmButtonColor: '#8b5cf6',
        confirmButtonText: 'Great!',
        showClass: {
          popup: 'animate__animated animate__fadeIn',
          backdrop: 'animate__animated animate__fadeIn'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut',
          backdrop: 'animate__animated animate__fadeOut'
        },
        customClass: {
          popup: 'rounded-3xl shadow-2xl border border-green-500/20',
          title: 'font-bold text-3xl mb-4 text-green-400',
          htmlContainer: 'text-gray-300 text-lg',
          confirmButton: 'px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-medium tracking-wide'
        },
        buttonsStyling: false,
        padding: '2.5rem',
        iconColor: '#10b981'
      });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to download the image. Please try again later.',
      background: 'linear-gradient(145deg, #1e293b, #0f172a)',
      color: '#e2e8f0',
      confirmButtonColor: '#8b5cf6',
      confirmButtonText: 'Try Again',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      },
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-purple-500/20',
        title: 'font-bold text-2xl mb-4',
        htmlContainer: 'text-gray-300',
        confirmButton: 'px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-medium tracking-wide'
      },
      buttonsStyling: false,
      padding: '2rem'
    });
  } finally {
    setIsLoading(false);
  }
};

const generatePDF = async () => {
  if (!contentRef.current) return;
  setIsLoading1(true);

  try {
    const content = contentRef.current;
    const { width, height } = content.getBoundingClientRect();

    // Increase quality with higher DPI
    const scale = 4; // Increase resolution
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    // Ensure the image is fully loaded before capturing
    const imgData = await domtoimage.toPng(content, {
      width: scaledWidth,
      height: scaledHeight,
      quality: 1,
      style: {
        transform: `scale(${scale})`,
        'transform-origin': 'top left',
        '-webkit-font-smoothing': 'antialiased',
        'text-rendering': 'geometricPrecision'
      },
      cacheBust: true
    });

    const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height],
      compress: true,
      precision: 100
    });

    const img = new window.Image();
    img.src = imgData;

    await new Promise((resolve) => {
      img.onload = () => {
        pdf.addImage(
          img,
          'PNG',
          0,
          0,
          width,
          height,
          undefined,
          'FAST'
        );
        resolve(null);
      };
    });

    pdf.save(`${mood.title} || 'card'}-${Date.now()}.pdf`);

    // Update generation count
    const response = await fetch('/api/mood/updateGenerationCount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moodId: mood.id, moodName: mood.title }),
    });

    const result = await response.json();
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'PDF Downloaded',
        text: `The PDF has been downloaded. This mood has been downloaded ${result.count} times.`,
        background: 'linear-gradient(145deg, #1e293b, #0f172a)',
        color: '#e2e8f0',
        confirmButtonColor: '#8b5cf6',
        confirmButtonText: 'Great!',
        showClass: {
          popup: 'animate__animated animate__fadeIn',
          backdrop: 'animate__animated animate__fadeIn'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut',
          backdrop: 'animate__animated animate__fadeOut'
        },
        customClass: {
          popup: 'rounded-3xl shadow-2xl border border-green-500/20',
          title: 'font-bold text-3xl mb-4 text-green-400',
          htmlContainer: 'text-gray-300 text-lg',
          confirmButton: 'px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-medium tracking-wide'
        },
        buttonsStyling: false,
        padding: '2.5rem',
        iconColor: '#10b981'
      });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to generate the PDF. Please try again later.',
      background: 'linear-gradient(145deg, #1e293b, #0f172a)',
      color: '#e2e8f0',
      confirmButtonColor: '#8b5cf6',
      confirmButtonText: 'Try Again',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      },
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-purple-500/20',
        title: 'font-bold text-2xl mb-4',
        htmlContainer: 'text-gray-300',
        confirmButton: 'px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-medium tracking-wide'
      },
      buttonsStyling: false,
      padding: '2rem',
      iconColor: '#e53e3e'
    });
  } finally {
    setIsLoading1(false);
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


        <div
  ref={contentRef}
  className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:hover:shadow-[0_20px_50px_rgba(139,_92,_246,_0.3)] hover:scale-105"
>
  {/* Card Hero */}
  <div className="relative h-[400px] group">
    <Image
      src={mood.images[0]}
      alt={mood.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-[2px] transition-all duration-500" />
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-blue-900/40 transition-opacity duration-500 group-hover:opacity-75" />

    {/* Floating Badges */}
    <div className="absolute top-6 right-6 flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
      <div className="relative transform transition-transform duration-300 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-md opacity-75 animate-pulse"></div>
        {/* Existing badge code */}
      </div>
      <div className="relative transform transition-transform duration-300 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full blur-md opacity-75 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-1 md:px-4 md:py-1.5 rounded-full text-white/90 font-sans text-xs md:text-base shadow-xl backdrop-blur-sm border border-white/10 hover:border-white/20">
          {today}
        </div>
      </div>
    </div>

    {/* Title Section */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-0 p-6 w-full bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-sm"
    >
      <h1 className="text-4xl md:text-6xl font-mono text-white mb-3 tracking-tight drop-shadow-lg">
        {mood.title}
      </h1>
      <p className="text-xl md:text-2xl text-white/90 max-w-3xl font-light leading-relaxed">
        {mood.description}
      </p>
    </motion.div>
  </div>

  {/* Content Section */}
  <div className="p-4 space-y-4 bg-gradient-to-b from-transparent to-slate-50/5">
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="prose dark:prose-invert max-w-none"
    >
      <h2 className="text-2xl md:text-3xl mb-4 font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Reflection</h2>
      <blockquote className="text-slate-600 border-l-4 border-purple-500/50 p-4 bg-purple-50/5 dark:text-slate-300 rounded-r-xl shadow-sm">
        {mood.personalStory}
      </blockquote>
    </motion.div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-2"
    >
      <h2 className="text-2xl md:text-3xl mb-4 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Scripture</h2>
      {mood.verses.map((verse, index) => (
        <motion.blockquote
          key={index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="p-4 border-l-4 border-blue-500/50 bg-blue-50/5 dark:bg-slate-700/30 rounded-r-xl shadow-sm hover:shadow-md transition-all duration-300"
        >
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {verse}
          </p>
        </motion.blockquote>
      ))}
    </motion.div>
  </div>
  <div className="flex items-center justify-center p-3 bg-gradient-to-r from-black/90 via-black/95 to-black/90 text-white text-sm font-semibold tracking-wider">
    Misfits For Christ
  </div>
</div>

        {/* Floating Action Button */}
        <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  className="fixed flex flex-col gap-6 bottom-8 right-8"
>
  {/* Generate Image Button */}
  <Button
    onClick={generateImage}
    disabled={isLoading}
    className={`group relative bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white p-5 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl ${
      isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
    }`}
  >
    {isLoading ? (
      <div className="animate-spin rounded-full h-7 w-7 border-2 border-b-transparent border-white" />
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z"
        />
      </svg>
    )}
  </Button>

  {/* Generate PDF Button */}
  <Button
    onClick={generatePDF}
    disabled={isLoading1}
    className={`group relative bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white p-5 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl ${
      isLoading1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
    }`}
  >
    {isLoading1 ? (
      <div className="animate-spin rounded-full h-7 w-7 border-2 border-b-transparent border-white" />
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 11V3m0 0L8.5 6.5M12 3l3.5 3.5M6 18h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    )}
  </Button>
</motion.div>

      </motion.div>
    </motion.div>
  );
};

export default MoodPage;
