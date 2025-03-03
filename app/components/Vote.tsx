'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { Check, X } from 'lucide-react';

const Vote = () => {
  const [vote, setVote] = useState<boolean | null>(null);
  const [votes, setVotes] = useState<{ yes: number; no: number }>({ yes: 0, no: 0 });
  const [isVoting, setIsVoting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchVotes();
    const interval = setInterval(fetchVotes, 10000); // Refresh votes every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (vote: boolean) => {
    setIsVoting(true);
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote }),
      });

      if (response.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Vote Already Registered',
          text: 'Your response has already been recorded.',
          background: '#111827',
          color: '#f3f4f6',
          confirmButtonColor: '#4f46e5',
          iconColor: '#ef4444',
          showClass: {
            popup: 'animate__animated animate__fadeIn'
          }
        });
        setIsVoting(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      setVote(vote);
      fetchVotes();
      
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Response Recorded',
          text: vote 
            ? 'Your affirmation has been registered. Proceeding to testimonies...' 
            : 'Your response has been noted. Redirecting you...',
          background: '#111827',
          color: '#f3f4f6',
          confirmButtonColor: '#4f46e5',
          iconColor: vote ? '#10b981' : '#ef4444',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        
        setTimeout(() => {
          // Redirect based on the vote
          if (vote) {
            router.push('/testimonies');
          } else {
            router.push('/mood');
          }
        }, 3000);
      }, 800);

    } catch (error) {
      console.error('Vote error:', error);
      Swal.fire({
        icon: 'error',
        title: 'System Error',
        text: 'Your response could not be processed. Please try again later.',
        background: '#111827',
        color: '#f3f4f6',
        confirmButtonColor: '#4f46e5'
      });
      setIsVoting(false);
    }
  };

  const fetchVotes = async () => {
    try {
      const response = await fetch('/api/vote');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const yesVotes = data.filter((v: { vote: boolean }) => v.vote).length;
      const noVotes = data.filter((v: { vote: boolean }) => !v.vote).length;

      setVotes({ yes: yesVotes, no: noVotes });
    } catch (error) {
      console.error('Fetch votes error:', error);
    }
  };

  const totalVotes = votes.yes + votes.no;
  const yesPercentage = totalVotes > 0 ? (votes.yes / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (votes.no / totalVotes) * 100 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl w-full mx-auto relative"
    >
      {/* Terminal-like frame */}
      <div className="absolute inset-0 border border-indigo-500/30 rounded-3xl -m-1 pointer-events-none" />
      <div className="absolute inset-0 border border-indigo-500/20 rounded-3xl -m-3 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 sm:p-10 bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-indigo-500/20 w-full mx-auto overflow-hidden"
      >
        {/* Top interface elements */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2">
            {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${color}`} />
            ))}
          </div>
          <div className="text-xs text-indigo-300 tracking-widest font-mono">SYSTEM.QUERY.v1.4.7</div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-10"
        >
          <div className="relative">
            <div className="absolute -left-5 top-1/2 w-4 h-4 rounded-full bg-indigo-500/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            </div>
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-4xl sm:text-5xl font-bold text-white text-center tracking-tight leading-tight"
            >
              IS GOD GOOD <span className="text-indigo-400">TO YOU</span>?
            </motion.h3>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-indigo-900/40 border border-indigo-500/30 mb-2">
              <span className="text-xs text-indigo-300 font-mono">DATA.COLLECTION</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-indigo-300 font-mono text-sm mb-1">TOTAL RESPONSES</p>
              <div className="relative">
                <motion.p 
                  key={totalVotes}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-7xl sm:text-8xl font-mono text-white"
                >
                  {totalVotes.toString().padStart(4, '0')}
                </motion.p>
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-slate-800/60 rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="h-0.5 flex-grow bg-gradient-to-r from-indigo-500/0 to-indigo-500/70" />
              <h4 className="text-sm font-mono text-indigo-300 px-4">RESPONSE ANALYTICS</h4>
              <div className="h-0.5 flex-grow bg-gradient-to-l from-indigo-500/0 to-indigo-500/70" />
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
                    <span className="text-emerald-400 font-mono">YES</span>
                  </div>
                  <span className="text-emerald-400 font-mono">{votes.yes}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${yesPercentage}%` }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mr-2" />
                    <span className="text-rose-400 font-mono">NO</span>
                  </div>
                  <span className="text-rose-400 font-mono">{votes.no}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${noPercentage}%` }}
                    transition={{ duration: 1, delay: 1.3 }}
                    className="h-full bg-gradient-to-r from-rose-600 to-rose-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          <AnimatePresence>
            {!vote && !isVoting && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1.4 }}
                className="pt-4"
              >
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVote(true)}
                    className="relative overflow-hidden group flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-slate-800 border border-emerald-500/30 text-white transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-0 bg-gradient-to-r from-emerald-600/40 to-emerald-400/40 transition-all duration-300 group-hover:w-full" />
                    <Check size={18} className="relative z-10" />
                    <span className="relative z-10">Yes</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVote(false)}
                    className="relative overflow-hidden group flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-slate-800 border border-rose-500/30 text-white transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-0 bg-gradient-to-r from-rose-600/40 to-rose-400/40 transition-all duration-300 group-hover:w-full" />
                    <X size={18} className="relative z-10" />
                    <span className="relative z-10">No</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {isVoting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center py-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/30 border border-indigo-500/30">
                  <div className="w-4 h-4 rounded-full border-2 border-t-indigo-300 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  <span className="text-indigo-300 font-mono text-sm">Processing...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Bottom interface elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-10 pt-6 border-t border-indigo-500/20 flex justify-between items-center text-xs text-indigo-400/60 font-mono"
        >
          <div>SYSTEM.ID.8423.7A</div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse mr-2" />
            <span>AWAITING RESPONSE</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Vote;