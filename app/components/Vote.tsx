'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Vote = () => {
  const [vote, setVote] = useState<boolean | null>(null);
  const [votes, setVotes] = useState<{ yes: number; no: number }>({ yes: 0, no: 0 });
  const router = useRouter();

  useEffect(() => {
    fetchVotes();
  }, []);

  const handleVote = async (vote: boolean) => {
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
          title: 'Oops...',
          text: 'You have already voted.',
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#6366f1'
        });
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      setVote(vote);
      Swal.fire({
        icon: 'success',
        title: 'Vote Submitted',
        text: 'Your vote has been submitted successfully!',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
      fetchVotes();

      // Redirect based on the vote
      if (vote) {
        router.push('/testimonies');
      } else {
        router.push('/mood');
      }
    } catch (error) {
      console.error('Vote error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit vote. Please try again later.',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 w-full mx-auto"
    >
      <h3 className="text-3xl font-bold text-white mb-6 text-center">Is God good to you?</h3>
      <div className="">
        <p className="text-center text-2xl mt-4 mb-8 text-white/60">Total votes:</p>
        <p className="text-center text-9xl mt-4 mb-8 text-white/60">{totalVotes}</p>
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <h4 className="text-xl font-semibold mb-4 text-center text-white">Results</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-green-400">Yes</span>
              <span className="text-green-400">{yesPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${yesPercentage}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-red-400">No</span>
              <span className="text-red-400">{noPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${noPercentage}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-red-500 to-rose-600"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10 space-x-6 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleVote(true)}
          className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
            vote === true 
              ? 'bg-green-700/50 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:shadow-green-500/30'
          }`}
          disabled={vote !== null}
        >
          Yes
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleVote(false)}
          className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
            vote === false 
              ? 'bg-red-700/50 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-lg hover:shadow-red-500/30'
          }`}
          disabled={vote !== null}
        >
          No
        </motion.button>
      </div> 
    </motion.div>
  );
};

export default Vote;