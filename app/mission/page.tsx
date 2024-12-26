'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Footer from '@/app/components/Footer';
import ruthImage from '@/public/Assets/ruth.jpg';

const MissionPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-indigo-900 via-teal-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <Image
          src={ruthImage}
          alt="Mission Hero Image"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Mission</h1>
          <p className="text-lg md:text-xl max-w-3xl mb-8">
            Join us in our journey to spread love, hope, and faith through our community and outreach programs.
          </p>
          <Link href="/contact">
            <span className="mt-8 bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Get Involved
            </span>
          </Link>
        </div>
      </div>
span
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm"
        >
          <h2 className="text-3xl font-serif mb-4 text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Our mission is to create a welcoming environment where everyone can experience the love of Christ. We believe in the power of community and strive to make a positive impact in the lives of those around us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm"
        >
          <h2 className="text-3xl font-serif mb-4 text-slate-900 dark:text-white">Our Vision</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Our vision is to see lives transformed by the love of Christ. We aim to be a beacon of hope and a source of support for individuals and families in our community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm"
        >
          <h2 className="text-3xl font-serif mb-4 text-slate-900 dark:text-white">Get Involved</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            We welcome you to join us in our mission. Whether through volunteering, donating, or participating in our events, your involvement makes a difference.
          </p>
          <Link href="/contact">
            <span className="mt-4 inline-block bg-gradient-to-r from-teal-600 to-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Contact Us
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default MissionPage;
