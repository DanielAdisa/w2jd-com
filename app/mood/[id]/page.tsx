"use client";

import { notFound } from 'next/navigation';
import { moods } from '@/data/moods';

import Link from 'next/link';
import { use, useRef } from 'react';
import html2canvas from 'html2canvas'; // Ensure you have this package installed
import zubi from '@/public/Assets/ruth.jpg'
import Image from 'next/image';

const MoodPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  // Find the mood by its ID
  const mood = moods.find((m) => m.id === id);

  // If the mood is not found, show a 404 page
  if (!mood) {
    notFound();
  }

  // Reference for the content to generate the image
  const contentRef = useRef<HTMLDivElement>(null);


const generateImage = async () => {
  if (!contentRef.current) return;

  const content = contentRef.current;

  // Preload images within the content
  const images = Array.from(content.querySelectorAll("img"));
  const preloadPromises = images.map((img) => {
    return new Promise<void>((resolve, reject) => {
      const testImg = new Image();
      testImg.crossOrigin = "anonymous"; // Enable CORS for external images
      testImg.src = img.src;
      testImg.onload = () => resolve();
      testImg.onerror = (err) => reject(err);
    });
  });

  try {
    // Wait for all images to preload
    await Promise.all(preloadPromises);

    // Use html2canvas to capture the content
    const canvas = await html2canvas(content, {
      useCORS: true, // Allow cross-origin resources
      backgroundColor: "#ffffff", // Solid background color
      scale: 2, // Increase resolution
      logging: true,
    });

    // Convert canvas to image and trigger download
    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${mood.title}-mood-image.png`;
    link.click();
  } catch (error) {
    console.error("Error generating image:", error);
    alert("Failed to generate image. Please check console for details.");
  }
};

  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Hero Section with Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={mood.images[0]} // Use the first image from the mood's images array
          alt={`${mood.title} hero image`}
          fill
          objectFit="cover"
          className="transition-transform duration-700 hover:scale-105"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
      </div>

      {/* Mood Content Section */}
      <div ref={contentRef} className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 mt-8 relative">
      <div className="relative w-full overflow-clip h-[400.083px]">
        <Image
          src={zubi}
          alt="Hero Image"
          height={200}
          width={400}
          layout="fit-content"
          className="object-fill mx-auto  absolute inset-0"
          />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
      </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">{mood.title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 text-center">{mood.description}</p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Personal Story</h2>
          <p className="text-md text-gray-700 dark:text-gray-300 mt-2">{mood.personalStory}</p>
        </div>
      </div>

      {/* Button to generate image */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={generateImage}
          className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
          Generate & Download Image
        </button>
      </div>
    </div>
  );
};

export default MoodPage;




// const generateImage = async () => {
//   if (!contentRef.current) return;

//   const content = contentRef.current;

//   // Clone the content to modify it without affecting the original
//   const clonedContent = content.cloneNode(true) as HTMLElement;

//   // Add custom styles or modifications to the cloned content
//   clonedContent.style.backgroundColor = "#ffffff"; // Set a white background
//   clonedContent.style.padding = "20px"; // Add some padding
//   clonedContent.style.borderRadius = "10px"; // Rounded corners
//   clonedContent.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)"; // Add a subtle shadow

//   // Hide unwanted elements (e.g., buttons, controls, etc.)
//   const unwantedElements = clonedContent.querySelectorAll(".exclude-from-image");
//   unwantedElements.forEach((el) => el.remove());

//   // Append the modified clone to the DOM temporarily for rendering
//   document.body.appendChild(clonedContent);
//   clonedContent.style.position = "absolute";
//   clonedContent.style.top = "-9999px"; // Move it off-screen

//   // Use html2canvas to capture the modified content
//   const canvas = await html2canvas(clonedContent, {
//     useCORS: true, // Allows capturing images from external URLs (ensure the server supports CORS)
//     backgroundColor: null, // Transparent background (if needed)
//   });

//   // Remove the cloned element from the DOM
//   document.body.removeChild(clonedContent);

//   // Generate the image URL and trigger download
//   const imageUrl = canvas.toDataURL("image/png");
//   const link = document.createElement("a");
//   link.href = imageUrl;
//   link.download = `${mood.title}-mood-image.png`;
//   link.click();
// };