'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { moods } from '@/data/moods';

interface Mood {
  id: string;
  title: string;
  description: string;
  images: string[];
  personalStory: string;
  verses: string[];
  resources: string[];
}

interface SearchBarProps {
  moods: Mood[];
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mapping challenging moods to their opposite positive moods
  const reliefMap: Record<string, string[]> = {
    anxious: ['peaceful', 'hopeful', 'confident'],
    sad: ['joyful', 'grateful', 'content'],
    fearful: ['faithful', 'empowered', 'confident'],
    angry: ['peaceful', 'thankful', 'content'],
    lonely: ['loved', 'hopeful', 'connected'],
    confused: ['faithful', 'hopeful', 'peaceful'],
    depressed: ['joyful', 'grateful', 'victorious'],
    stressed: ['peaceful', 'hopeful', 'content'],
    overwhelmed: ['peaceful', 'joyful', 'content'],
    discouraged: ['hopeful', 'victorious', 'confident'],
    guilty: ['sanctified', 'forgiven', 'peaceful'],
    tempted: ['faithful', 'victorious', 'sanctified'],
    deceived: ['faithful', 'hopeful', 'empowered'],
    'weak to flesh': ['empowered', 'sanctified', 'victorious'],
    empty: ['grateful', 'content', 'hopeful'],
  };

  const searchedMood = moods.find(
    (mood) => mood.title.toLowerCase() === searchQuery.toLowerCase()
  );

  // Determine suggested relief moods
  const reliefMoods =
    reliefMap[searchQuery.toLowerCase()]?.map((relief) =>
      moods.find((mood) => mood.title.toLowerCase() === relief)
    ) || [];

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for moods..."
        className="w-full p-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200"
      />
      {searchQuery && (
        <div className="absolute mt-2 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg z-10">
          {/* Display searched mood */}
          {searchedMood && (
            <div className="p-4">
              <Link
                href={`/mood/${searchedMood.id}`}
                passHref
                className="group block p-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <span className="text-md font-medium bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                      {searchedMood.title}
                    </span>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {searchedMood.description}
                    </p>
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300 transition-colors duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Display relief moods */}
          {reliefMoods.length > 0 && (
            <div className="p-4">
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                You are feeling {searchQuery}. Why not look at these moods to feel better:
              </p>
              <div className="grid gap-4">
                {reliefMoods.map(
                  (reliefMood) =>
                    reliefMood && (
                      <Link
                        key={reliefMood.id}
                        href={`/mood/${reliefMood.id}`}
                        passHref
                        className="group block p-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-1">
                            <span className="text-md font-medium bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                              {reliefMood.title}
                            </span>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                              {reliefMood.description}
                            </p>
                          </div>
                          <div className="text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300 transition-colors duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
