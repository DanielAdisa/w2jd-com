'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SearchBar = ({ moods = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMoods, setFilteredMoods] = useState(moods);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced filtering logic
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMoods(moods);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(() => {
      const filtered = moods.filter((mood) =>
        mood.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMoods(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, moods]);

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="How do you feel today?..."
          className="w-full border rounded-lg px-4 py-2 pl-12 focus:ring focus:ring-teal-500 focus:outline-none shadow-md"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute left-3 top-2.5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 16l-4-4m0 0l4-4m-4 4h16"
          />
        </svg>
      </div>

      {/* Search results */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {isLoading ? (
          <div className="col-span-2 text-center text-gray-500">Loading...</div>
        ) : searchQuery && filteredMoods.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 italic">
            No moods match your search.
          </div>
        ) : (
          filteredMoods.map((mood) => (
            <Link
              key={mood.id}
              href={`/mood/${mood.id}`}
              passHref
              className="block p-4 bg-teal-100 border border-teal-300 rounded-lg shadow-md hover:bg-teal-200 transition duration-200"
            >
              <div className="flex items-center justify-center h-24">
                <span className="text-teal-800 text-lg font-semibold text-center">
                  {mood.title.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => (
                    <span
                      key={i}
                      className={
                        part.toLowerCase() === searchQuery.toLowerCase()
                          ? 'text-teal-600 underline font-bold'
                          : ''
                      }
                    >
                      {part}
                    </span>
                  ))}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBar;
