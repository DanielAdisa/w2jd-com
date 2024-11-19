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
  
    // Clone the content to isolate it
    const clonedContent = content.cloneNode(true) as HTMLElement;
  
    // Style adjustments for the cloned content
    clonedContent.style.backgroundColor = "#ffffff"; // Solid white background
    clonedContent.style.padding = "20px";
    clonedContent.style.borderRadius = "10px";
    clonedContent.style.boxSizing = "border-box"; // Ensure box-model consistency
  
    // Add inline styles for all images in the cloned content
    const images = clonedContent.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(async (img) => {
        const canvasImage = img as HTMLImageElement;
  
        return new Promise((resolve, reject) => {
          if (!canvasImage.complete) {
            canvasImage.onload = resolve;
            canvasImage.onerror = reject;
          } else {
            resolve(true);
          }
  
          img.style.maxWidth = "100%";
          img.style.height = "auto";
          img.setAttribute("crossOrigin", "anonymous"); // Enable CORS
        });
      })
    );
  
    // Append the cloned content offscreen for rendering
    clonedContent.style.position = "fixed";
    clonedContent.style.top = "-9999px";
    clonedContent.style.left = "-9999px";
    document.body.appendChild(clonedContent);
  
    try {
      // Render the cloned content to a canvas
      const canvas = await html2canvas(clonedContent, {
        useCORS: true,
        backgroundColor: "#ffffff", // Ensure white background for clarity
        logging: true,
        width: clonedContent.offsetWidth, // Use actual rendered width
        height: clonedContent.offsetHeight, // Use actual rendered height
        scale: 2, // Enhance resolution
      });
  
      // Generate and download the image
      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "mood-image.png"; // Adjust filename as needed
      link.click();
    } catch (error) {
      console.error("Image generation failed:", error);
      alert("Something went wrong. Please try again!");
    } finally {
      // Cleanup
      if (document.body.contains(clonedContent)) {
        document.body.removeChild(clonedContent);
      }
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
      <div ref={contentRef} className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-t-lg rounded-xl shadow-xl md:p-0 p-4 md:mt-8 relative">
      <div className="relative w-full overflow-clip h-[400.083px]">
        <Image
          src={zubi}
          alt="Hero Image"
          height={200}
          width={400}
          layout="responsive"
          className="object  mx-auto absolute inset-0"
          />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
      </div>
        <div className="md:p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">{mood.title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 text-center">{mood.description}</p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Personal Story</h2>
          <p className="text-md text-gray-700 dark:text-gray-300 mt-2">{mood.personalStory}</p>
        </div>
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