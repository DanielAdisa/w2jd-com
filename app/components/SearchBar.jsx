import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Adjust based on router type
// interface Mood {
//     id: string;
//     title: string;
//     description: string;
//     images: string[];
//     personalStory: string;
//     verses: string[];
//     resources: string[];
//   }
  

const SearchBar = ({ moods = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMoods, setFilteredMoods] = useState(moods);
  const [isLoading, setIsLoading] = useState(false);
  const router = typeof window !== 'undefined' ? useRouter() : null;

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
    }, 300); // Debounce delay

    return () => clearTimeout(timeout);
  }, [searchQuery, moods]);

  const handleMoodClick = (id) => {
    if (router) {
      router.push(`/mood/${id}`);
    } else {
      console.error('Router not available.');
    }
  };

  return (
    <div className="w-full p-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search moods..."
          className="w-full border rounded-lg px-4 py-2 pl-10 focus:ring focus:ring-teal-500 focus:outline-none shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-3 text-gray-400"
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
      {isLoading ? (
        <div className="mt-4 text-center text-gray-500">Loading...</div>
      ) : (
        <ul className="mt-4 space-y-2">
          {filteredMoods.length > 0 ? (
            filteredMoods.map((mood) => (
              <li
                key={mood.id}
                className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                onClick={() => handleMoodClick(mood.id)}
              >
                <span>
                  {mood.title.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => (
                    <span
                      key={i}
                      className={
                        part.toLowerCase() === searchQuery.toLowerCase()
                          ? 'text-teal-500 font-semibold'
                          : ''
                      }
                    >
                      {part}
                    </span>
                  ))}
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
