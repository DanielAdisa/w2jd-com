'use client';

import React, { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrayingHands, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Clock, Share2 } from 'lucide-react';
import { FaPersonPraying } from 'react-icons/fa6';

const PrayerRequestDetail = () => {
  const { id } = useParams() ?? {};

  interface PrayerRequest {
    id: string;
    title: string;
    content: string;
    author: string;
    isPublic: boolean;
    category?: string;
    createdAt: string;
    praying: number;
    comments?: Comment[];
  }

  interface Comment {
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }

  const [prayerRequest, setPrayerRequest] = useState<PrayerRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPraying, setIsPraying] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
    const router = useRouter();
    const commentRef = useRef<HTMLDivElement>(null);
  
    const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchPrayerRequest(id);
      fetchComments(id);
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (id && typeof id === 'string') {
        fetchPrayerRequest(id);
        fetchComments(id);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    const prayedRequests = JSON.parse(localStorage.getItem('prayedRequests') || '{}');
    if (prayerRequest?.id && prayedRequests[prayerRequest.id]) {
      setIsPraying(true);
    }
  }, [prayerRequest?.id]);

  const fetchPrayerRequest = async (id: string) => {
    try {
      const response = await fetch(`/api/prayers/${id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setPrayerRequest(data);
    } catch (error) {
      console.error('Fetch error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async (id: string) => {
    try {
      const response = await fetch(`/api/prayers/${id}/comments`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setComments(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch comments');
    }
  };

  const handlePray = async () => {
    if (isLoading || isPraying) return;
    
    // Check if the user already prayed for this request
    const prayedRequests = JSON.parse(localStorage.getItem('prayedRequests') || '{}');
    if (prayerRequest?.id && prayedRequests[prayerRequest.id]) {
      Swal.fire({
        icon: 'info',
        title: 'Already Prayed',
        text: 'You have already prayed for this request.',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff',
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`/api/prayers/${id}/pray`, {
        method: 'POST',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update praying count');
      }
  
      const updatedPrayerRequest = await response.json();
      setPrayerRequest(updatedPrayerRequest);
      setIsPraying(true);
  
      // Record the prayer in localStorage
      if (prayerRequest?.id) {
        prayedRequests[prayerRequest.id] = true;
        localStorage.setItem('prayedRequests', JSON.stringify(prayedRequests));
      }
  
      Swal.fire({
        icon: 'success',
        title: 'Prayed!',
        text: 'You have prayed for this request.',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff',
      });
    } catch (error) {
      console.error('Pray error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to pray for the request. Please try again later.',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !commentAuthor.trim()) return;
    try {
      const response = await fetch(`/api/prayers/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment, author: commentAuthor }),
      });
      if (!response.ok) throw new Error('Failed to add comment');
      const comment = await response.json();
      setComments([...comments, comment]);
      setNewComment('');
      setCommentAuthor('');
      localStorage.setItem('commentAuthor', commentAuthor); // Store the comment author in local storage
      Swal.fire({
        icon: 'success',
        title: 'Comment Added!',
        text: 'Your comment has been added successfully.',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff',
      });
    } catch (error) {
      console.error('Add comment error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add comment. Please try again later.',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff',
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: prayerRequest?.title,
          text: prayerRequest?.content,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share error:', err);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this comment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff',
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/prayers/${id}/comments`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ commentId }),
        });
        if (!response.ok) throw new Error('Failed to delete comment');
        setComments(comments.filter(comment => comment.id !== commentId));
        Swal.fire({
          icon: 'success',
          title: 'Comment Deleted!',
          text: 'Your comment has been deleted successfully.',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff',
        });
      } catch (error) {
        console.error('Delete comment error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete comment. Please try again later.',
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff',
        });
      }
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 p-4">{error}</div>
  );

  if (!prayerRequest) return (
    <div className="text-center text-white p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center justify-center">
      Prayer request not found
    </div>
  );

  const currentUser = localStorage.getItem('commentAuthor');


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5 rounded-full"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100],
              opacity: [0.2, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full border border-white/10 shadow-2xl"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Share Prayer Request</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    value={window.location.href}
                    readOnly
                    aria-label="Share URL"
                    placeholder="Share URL"
                    title="Share URL"
                    className="flex-1 bg-white/5 text-gray-300 px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setShowShareModal(false);
                      Swal.fire({
                        icon: 'success',
                        title: 'Link Copied!',
                        timer: 2000,
                        background: '#1f2937',
                        color: '#fff',
                      });
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Copy
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prayer Request Card */}
        <div className="container mx-auto max-w-4xl px-4 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex justify-between items-start p-6 md:p-8">
              {prayerRequest?.category && (
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-400/20 shadow-lg"
                >
                  {prayerRequest.category}
                </motion.span>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-2 hover:bg-white/10 flex items-center justify-center bg-yellow-500/25 rounded-full transition-colors shadow-md"
              >
                <Share2 className="w-5 h-5 text-yellow-400" />
              </motion.button>
            </div>

            <div className="px-6 md:px-8 pb-8 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                {prayerRequest?.title}
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
                {prayerRequest?.content}
              </p>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 shadow-md">
                    <span className="text-lg text-blue-400 font-medium">
                      {prayerRequest?.author?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-200 font-medium">{prayerRequest?.author}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <Clock size={14} />
                      {new Date(prayerRequest?.createdAt || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-yellow-400/10 to-amber-400/5 rounded-full border border-yellow-400/20 shadow-md"
                >
                  <FaPersonPraying className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">
                    {prayerRequest?.praying} Praying
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comments Section */}
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              Comments ({comments.length})
            </h2>
          </div>

          <div className="space-y-4 mb-5">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 group shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-300 whitespace-pre-wrap mb-3">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="font-medium">{comment.author}</span>
                      <span>•</span>
                      <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {comment.author === currentUser && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteComment(comment.id)}
                      className="p-2 text-red-500 hover:text-red-400 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comment Form */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-xl"
          >
            <input
              type="text"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 mb-4 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your name..."
            />
            <textarea
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 mb-4 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Add a prayerful comment..."
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddComment}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
            >
              Submit Comment
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="bg-white/10 backdrop-blur-md text-white p-4 rounded-full shadow-xl hover:bg-white/20 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={!isPraying ? { scale: 1.05 } : {}}
            whileTap={!isPraying ? { scale: 0.95 } : {}}
            onClick={handlePray}
            className={`p-4 rounded-full shadow-xl transition-all ${
              isPraying 
                ? 'bg-gray-500/50 cursor-not-allowed' 
                : 'bg-green-600/90 hover:bg-green-700'
            }`}
            disabled={isPraying || isLoading}
          >
            <FaPersonPraying className={`w-6 h-6 ${isPraying ? 'text-gray-300' : 'text-white'}`} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};


export default PrayerRequestDetail;