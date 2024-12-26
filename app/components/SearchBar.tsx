'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
  moods: {
    id: string;
    title: string;
    description: string;
    images: string[];
    personalStory: string;
    verses: string[];
    resources: string[];
  }[];
}

const SearchBar: React.FC<SearchBarProps> = ({ moods = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMoods, setFilteredMoods] = useState<Mood[]>([]);

  useEffect(() => {
    if (searchQuery === '') {
      // Select random 4 moods
      const shuffledMoods = moods.sort(() => 0.5 - Math.random());
      setFilteredMoods(shuffledMoods.slice(0, 4));
    } else {
      setFilteredMoods(
        moods.filter((mood) =>
          mood.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 4)
      );
    }
  }, [searchQuery, moods]);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search moods..."
        className="w-full p-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="mt-4">
        {filteredMoods.length === 0 ? (
          <div className="text-slate-600 dark:text-slate-400">
            No moods match your search.
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredMoods.map((mood) => (
              <Link
                key={mood.id}
                href={`/mood/${mood.id}`}
                passHref
                className="group block p-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <span className="text-md font-medium bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                      {mood.title.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => (
                        <span
                          key={i}
                          className={
                            part.toLowerCase() === searchQuery.toLowerCase()
                              ? 'text-purple-600 dark:text-purple-400 font-bold'
                              : ''
                          }
                        >
                          {part}
                        </span>
                      ))}
                    </span>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {mood.description}
                    </p>
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300 transition-colors duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
