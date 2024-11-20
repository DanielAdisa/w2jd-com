'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 md:py-14">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Logo & Mission */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-2xl font-bold">Misfits for Christ</h2>
            <p className="mt-2 text-gray-400 max-w-md">
              A movement dedicated to spreading the love of Christ, inspiring hope, and bringing faith to life through daily challenges and heartfelt messages.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 text-center lg:text-left">
            <Link
              href="/"
              className="hover:text-gray-400 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/mood"
              className="hover:text-gray-400 transition duration-300"
            >
              Moods
            </Link>
            <Link
              href="/mission"
              className="hover:text-gray-400 transition duration-300"
            >
              Our Mission
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-400 transition duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 text-2xl">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:contact@misfitsforchrist.com"
              className="text-gray-400 hover:text-white transition duration-300"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Misfits for Christ. All rights reserved.
          </p>
          <p>
            Built with love and faith by <span className="text-blue-500">Misfits for Christ Team</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
