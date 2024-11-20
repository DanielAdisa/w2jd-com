"use client";

import { notFound } from "next/navigation";
import { moods } from "@/data/moods";

import { use, useRef } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const MoodPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const mood = moods.find((m) => m.id === id);

  if (!mood) {
    notFound();
  }

  const contentRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!contentRef.current) return;

    const content = contentRef.current;

    const clonedContent = content.cloneNode(true) as HTMLElement;
    clonedContent.style.backgroundColor = "#ffffff";
    clonedContent.style.borderRadius = "10px";

    // Ensure images within the cloned content keep their aspect ratio
    const images = clonedContent.querySelectorAll("img");
    images.forEach((img) => {
      img.setAttribute("crossOrigin", "anonymous");
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.objectFit = "cover"; // Fixes aspect ratio stretching
    });

    // Temporarily append the cloned content for rendering
    document.body.appendChild(clonedContent);
    clonedContent.style.position = "absolute";
    clonedContent.style.top = "-9999px";

    try {
      const canvas = await html2canvas(clonedContent, {
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: clonedContent.scrollWidth,
        windowHeight: clonedContent.scrollHeight,
      });

      const imageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `${mood.title}-mood-image.png`;
      link.click();
    } catch (error) {
      console.error("Image generation failed:", error);
    } finally {
      document.body.removeChild(clonedContent);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-5 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={mood.images[0]}
          alt={`${mood.title} hero image`}
          fill
          objectFit="cover"
          className="transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
      </div>

      {/* Mood Content Section */}
      <div
        ref={contentRef}
        className="max-w-3xl mx-auto bg-stone-100 dark:bg-slate-800 rounded-xl shadow-xl md:p-3 p-4 md:mt-8"
      >
        {/* Image Inside Card with Fixed Aspect Ratio */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "100%",
            aspectRatio: "4 / 3", // Maintain 4:3 aspect ratio
          }}
        >
          <Image
            src={mood.images[0]}
            alt="Mood Image"
            layout="fill"
            objectFit="cover" // Ensures the image is cropped to fit
            className="rounded-md"
          />
        </div>

        {/* Content Section */}
        <div className="md:p-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            {mood.title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 text-center">
            {mood.description}
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Personal Story
            </h2>
            <p className="text-md text-gray-700 dark:text-gray-300 mt-2">
              {mood.personalStory}
            </p>
          </div>
        </div>
      </div>

      {/* Button to Download Image */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={generateImage}
          className="py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Generate & Download Image
        </Button>
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