'use client';

import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { moods } from '@/data/moods';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toPng } from 'html-to-image';
import { format } from 'date-fns';

const MoodOfTheDay = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentMood, setCurrentMood] = useState(moods[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      link.download = `${currentMood.title}-reflection.png`;
      link.href = dataUrl;
      link.click();
  
      // Update generation count
      const response = await fetch('/api/mood/updateGenerationCount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moodId: currentMood.id, moodName: currentMood.title }),
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

  useEffect(() => {
    // Select a random mood for the day
    const randomIndex = Math.floor(Math.random() * moods.length);
    setCurrentMood(moods[randomIndex]);
  }, []);

  const today = format(new Date(), 'EEEE, MMMM do');

  return (
    <div className="bg-gradient-to-r mx-auto from-teal-500 to-blue-500 pt-20 p-6">
      <div  className="max-w-3xl bg-white  mx-auto text-gray-800 rounded-3xl shadow-lg overflow-hidden relative">
        <div ref={contentRef} className=" bg-white rounded-3xl shadow-lg overflow-hidden relative">
        {/* Top Banner */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600"></div>
        
        {/* Hero Image */}
        <div className="relative w-full h-[300px]">
          <Image
            src={currentMood.images[0]}
            alt={currentMood.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          {/* Day and Date Badge */}
          <div className="absolute top-4 left-4 bg-teal-600 text-white px-4 py-2 rounded-full">
            {today}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-teal-600">{currentMood.title}</h2>
          <p className="text-lg mb-6">{currentMood.description}</p>
          <div className="space-y-4">
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-700 mb-2">Reflection</h3>
              <p>{currentMood.personalStory}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">Scripture for Today</h3>
              {currentMood.verses.map((verse, index) => (
                <p key={index} className="mb-2">{verse}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button
          onClick={generateImage}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {isGenerating ? "Generating..." : "Generate & Download Image"}
        </Button>
        </div>
    </div>
  );
};

export default MoodOfTheDay;

