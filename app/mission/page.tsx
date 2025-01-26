'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Brain, Heart, Lightbulb } from 'lucide-react';

const MissionPage = () => {
  const [stats, setStats] = useState({ 
    totalImagesGenerated: 0, 
    totalSubscribers: 0, 
    totalVotes: 0 ,
    totalPrayers: 0,
    totalComments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section with Romans 12:2 */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src="/Assets/transformation.jpg" 
            alt="Transformation" 
            layout="fill" 
            objectFit="cover" 
            className="opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-purple-900/60 to-slate-900/90" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-4xl mx-auto space-y-8"
        >
          <span className="text-purple-300 text-xl font-medium">Romans 12:2</span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            "Do not conform to the pattern of this world, but be
            <span className="text-purple-400"> transformed </span>
            by the renewing of your mind."
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            We are on a mission to facilitate spiritual transformation through digital ministry.
          </p>
        </motion.div>
      </section>

      {/* Transformation Focus */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Brain className="w-12 h-12" />,
                title: "Mind Renewal",
                description: "Transform your thinking through biblical truth and wisdom"
              },
              {
                icon: <Heart className="w-12 h-12" />,
                title: "Heart Change",
                description: "Experience deep spiritual transformation from within"
              },
              {
                icon: <Lightbulb className="w-12 h-12" />,
                title: "Life Impact",
                description: "Live out your renewed purpose in Christ"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 
                         border border-purple-500/20 hover:border-purple-500/40 
                         transition-all duration-300"
              >
                <div className="text-purple-400 mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 px-4 bg-gradient-to-br from-purple-900/30 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: stats.totalImagesGenerated, label: 'Lives Reached' },
              { number: stats.totalSubscribers, label: 'Community Members' },
              { number: stats.totalPrayers, label: 'On Going Prayers' },
              { number: stats.totalComments, label: 'Live Comments' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white/5 rounded-2xl border border-purple-500/20"
              >
                <div className="text-5xl font-bold text-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl font-bold">Begin Your Transformation</h2>
          <p className="text-xl text-gray-300">
            Join our community and experience the renewing power of Christ
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white 
                       px-8 py-4 mt-5 rounded-full text-lg font-semibold 
                       inline-flex items-center gap-2 transition-all duration-300"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default MissionPage;