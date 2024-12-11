"use client";
import { notFound } from "next/navigation";

import { moods } from "@/data/moods";
import { use, useRef } from "react";
import { toPng } from "html-to-image";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MoodPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const mood = moods.find((m) => m.id === id);

  if (!mood) {
    notFound();
  }

  const contentRef = useRef<HTMLDivElement>(null);
  const generateImage = async () => {
    if (!contentRef.current) return;

    try {
      const content = contentRef.current;

      // Calculate the position and dimensions of the section to capture
      const rect = content.getBoundingClientRect();

      // Apply specific styles to ensure accurate rendering
      content.style.position = "relative";
      content.style.zIndex = "9999";
      content.style.overflow = "visible";
      content.style.borderRadius = "20";

      // Generate the image using `toPng`
      const dataUrl = await toPng(content, {
        backgroundColor: "#ffffff", // Non-transparent background
        cacheBust: true, // Prevents caching issues
        pixelRatio: 5, // High-quality resolution
        width: rect.width, // Capture only the width of the section
        height: rect.height, // Capture only the height of the section
      });

      // Trigger download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${mood.title.replace(/\s+/g, "-").toLowerCase()}-mood-image.png`;
      link.click();
    } catch (error) {
      console.error("Image generation failed:", error);
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
      <div className="max-w-3xl mx-auto bg-stone-50 dark:bg-slate-800 mt-5">
      <div
        ref={contentRef}
        className="p rounded-xl shadow-md"
      >
        {/* Image Inside Card */}
        <div className="relative overflow-hidden rounded-m">
          <Image
            src={mood.images[0]}
            alt="Mood Image"
            layout="responsive"
            width={100}
            height={50}
            className="rounde"
            style={{
              objectFit: "cover",
              aspectRatio: "4 / 3", // Maintain 4:3 aspect ratio
            }}
          />
        </div>

        {/* Text Content */}
        <div className="mt-2 p-2">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            {mood.title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 text-center">
            {mood.description}
          </p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Personal Story
            </h2>
            <p className="text-md text-gray-700 dark:text-gray-300 mt-2">
              {mood.personalStory}
            </p>
            <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">
              Resources
            </h2>
            {mood.resources.map((resource, index) => (
              <Link
                key={index} // Ensure unique keys
                href={resource}
                className="text-md text-blue-600  dark:text-gray-300 "
              >
                <div className=" text-center md:text-start p-0.5">{resource}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* Button to Download Image */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={generateImage}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Generate & Download Image
        </Button>
      </div>
    </div>
  );
};

export default MoodPage;
