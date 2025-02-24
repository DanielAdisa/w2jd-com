'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use `usePathname` for active states in Next.js 13

import { FaDoorClosed, FaDoorOpen } from 'react-icons/fa6';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const pathname = usePathname() || ''; // For active state tracking
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [header, setHeader] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollHeader = () => {
    if (!isMobileMenuOpen) {
      setHeader(window.scrollY >= window.innerHeight * 0.1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeader);
    return () => {
      window.removeEventListener('scroll', scrollHeader);
    };
  }, [isMobileMenuOpen]);

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/mood', label: 'Moods' },
    { path: '/testimonies', label: 'Testimony' },
    { path: '/mission', label: 'Our Mission' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/prayers', label: 'Prayer Requests' },
  ];

  // Updated isActive function for parent route highlighting
  const isActive = (path: string): boolean => {
    return path === '/' ? pathname === path : pathname.startsWith(path);
  };

  return (
    <header
      className={`${
        header ? 'bg-white z-50 shadow-xl text-black' : 'backdrop-blur-2xl z-50 text-white'
      } fixed top-0 w-full z-50 transition-all duration-300`}
    >
      <nav className="md:max-w-[95%] mx-auto flex items-center justify-between h-16 px-2 lg:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Avatar className="text-base">
            <AvatarFallback
              className={`${
                header ? 'text-black text-[10px] bg-gray-200' : 'text-white text-[10px] bg-black'
              } transition duration-300`}
            >
              WWJD
            </AvatarFallback>
          </Avatar>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-1 text-2xl text-inherit transition-all ease-in-out"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaDoorOpen /> : <FaDoorClosed />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-10 text-lg font-medium">
          {routes.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              className={`${
                isActive(path)
                  ? 'text-stone-50 font-semibold bg-blue-500/70 p-2 pl-4 pr-4 rounded-full hover:bg-stone-500/50'
                  : header
                  ? 'hover:text-gray-700 text-stone-50 bg-stone-500/60 p-2 pl-4 pr-4 rounded-full hover:bg-stone-500/50'
                  : 'hover:text-gray-300 bg-white/10 p-2 pl-4 pr-4 rounded-full hover:bg-stone-500/50'
              } transition duration-300`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-blue-900 bg-opacity-85 flex flex-col items-center justify-center space-y-7 text-white text-2xl font-semibold z-50">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-4 text-2xl"
            aria-label="Close menu"
          >
            <FaDoorOpen />
          </button>
          {routes.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              className={`${
                isActive(path) ? 'text-purple-600' : 'text-stone-50'
              } transition duration-300`}
              onClick={toggleMobileMenu}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
