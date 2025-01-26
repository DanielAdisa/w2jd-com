'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { Clock, Heart, Share2, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

const TestimonyDetail = () => {
  const { id } = useParams() ?? {};

  interface Testimony {
    id: string;
    title: string;
    content: string;
    author: string;
    imageUrl?: string;
    category?: string;
    likes: number;
    createdAt: string;
    comments?: Comment[];
  }

  interface Comment {
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }

  const [testimony, setTestimony] = useState<Testimony | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const router = useRouter();
  const commentRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchTestimony(id);
      fetchComments(id);
    }
  }, [id]);

  useEffect(() => {
    const likedTestimonies = JSON.parse(localStorage.getItem('likedTestimonies') || '{}');
    if (testimony?.id && likedTestimonies[testimony.id]) {
      setIsLiked(true);
    }
  }, [testimony?.id]);

  useEffect(() => {
    const savedAuthor = localStorage.getItem('commentAuthor');
    if (savedAuthor) {
      setCommentAuthor(savedAuthor);
    }
  }, []);

  const fetchTestimony = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonies/${id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setTestimony(data);
      setLikes(data.likes);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch testimony');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: testimony?.title,
          text: testimony?.content,
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
      title: 'Delete Comment?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      background: '#1f2937',
      color: '#fff'
    });

    if (result.isConfirmed) {
      setIsDeleting(true);
      try {
        await fetch(`/api/testimonies/${id}/comments/${commentId}`, {
          method: 'DELETE'
        });
        setComments(comments.filter(c => c.id !== commentId));
      } catch (error) {
        console.error('Delete error:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const fetchComments = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonies/${id}/comments`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setComments(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch comments');
    }
  };

  const handleLike = async () => {
    if (isLoading || isLiked) return;

    try {
      const response = await fetch(`/api/testimonies/${id}/like`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update likes');
      }

      const updatedTestimony = await response.json();
      setLikes(updatedTestimony.likes);
      setIsLiked(true);

      const likedTestimonies = JSON.parse(localStorage.getItem('likedTestimonies') || '{}');
      if (testimony?.id) {
        likedTestimonies[testimony.id] = true;
      }
      localStorage.setItem('likedTestimonies', JSON.stringify(likedTestimonies));

      Swal.fire({
        icon: 'success',
        title: 'Liked!',
        text: 'You have liked this testimony.',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff',
      });

    } catch (error) {
      console.error('Like error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to like the testimony. Please try again later.',
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

  const handleUnlike = async () => {
    if (isLoading || !isLiked) return;

    try {
      const response = await fetch(`/api/testimonies/${id}/unlike`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update likes');
      }

      const updatedTestimony = await response.json();
      setLikes(updatedTestimony.likes);
      setIsLiked(false);

      const likedTestimonies = JSON.parse(localStorage.getItem('likedTestimonies') || '{}');
      if (testimony?.id) {
        delete likedTestimonies[testimony.id];
      }
      localStorage.setItem('likedTestimonies', JSON.stringify(likedTestimonies));

      Swal.fire({
        icon: 'success',
        title: 'Unliked!',
        text: 'You have unliked this testimony.',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff',
      });

    } catch (error) {
      console.error('Unlike error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to unlike the testimony. Please try again later.',
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
      const response = await fetch(`/api/testimonies/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment, author: commentAuthor }),
      });
      if (!response.ok) throw new Error('Failed to add comment');
      const comment = await response.json();
      setComments([...comments, comment]);
      setNewComment('');
      setCommentAuthor('');
      localStorage.setItem('commentAuthor', commentAuthor);
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

  const generateImage = async () => {
    if (!contentRef.current) return;
    setIsGenerating(true);
    try {
      const content = contentRef.current;
      const dataUrl = await toPng(content, {
        quality: 10,
        pixelRatio: 10,
      });
      const link = document.createElement('a');
      link.download = `${testimony?.title}-card.png`;
      link.href = dataUrl;
      link.click();
      Swal.fire({
        icon: 'success',
        title: 'Image Generated!',
        text: 'The image has been generated and downloaded successfully.',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to generate image. Please try again later.',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff',
      });
    } finally {
      setIsGenerating(false);
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

  if (!testimony) return (
    <div className="text-center text-white p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center justify-center">
      Testimony not found
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-700 p-4">
      {/* Card Container with proper spacing */}
      <div className="container mx-auto max-w-4xl pt-20">
        {/* Testimony Card */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/30"
        >
          <div className="relative">
            {testimony?.imageUrl && (
              <div className="w-full h-[300px] relative">
                <Image
                  src={testimony.imageUrl}
                  alt={testimony.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}

            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-4 py-1 bg-blue-600/30 text-blue-400 
                             rounded-full text-sm font-medium border border-blue-400/20">
                  {testimony.category}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="p-2 hover:bg-white/10 bg-yellow-200/20 rounded-full transition-colors"
                >
                  <Share2 className="w-5 h-5 text-white/70" />
                </motion.button>
              </div>

              <h1 className="text-4xl font-bold text-white leading-tight">
                {testimony?.title}
              </h1>

              <p className="text-xl leading-relaxed text-gray-100">
                {testimony?.content}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 
                               flex items-center justify-center">
                    <span className="text-lg font-medium text-white">
                      {testimony?.author[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimony?.author}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      {formatDistanceToNow(new Date(testimony?.createdAt || ''), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isLiked ? handleUnlike : handleLike}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
                      ${isLiked 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{likes}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Comments Section */}
      <div className="container mx-auto max-w-4xl mt-8">
        <h2 className="text-3xl font-semibold text-white mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white/30 p-5 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-300">{comment.content}</p>
                  <p className="text-xs text-gray-400">By {comment.author} on {new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
                {comment.author === commentAuthor && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteComment(comment.id)}
                    className="p-2 text-red-500"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <input
            type="text"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white placeholder:text-gray-400"
            placeholder="Your name..."
          />
          <textarea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white placeholder:text-gray-400"
            placeholder="Add a comment..."
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="group relative bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-full shadow-lg transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateImage}
          disabled={isGenerating}
          className="group relative bg-green-600 hover:bg-green-700 text-white p-5 rounded-full shadow-lg transition-all duration-300"
        >
          {isGenerating ? (
            <div className="animate-spin rounded-full h-7 w-7 border-2 border-b-transparent border-white" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
            </svg>
          )}
        </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={isLiked ? handleUnlike : handleLike}
      className="group relative bg-red-600 hover:bg-red-700 text-white p-5 rounded-full shadow-lg transition-all duration-300"
      disabled={isLoading}
    >
      <Heart className={`w-7 h-7 ${isLiked ? 'fill-current text-red-500' : 'text-white'}`} />
      <span className="absolute right-full mr-5 bg-black/80 text-white px-4 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {likes} {isLiked ? 'Unlike' : 'Like'}
      </span>
    </motion.button>
  </div>
</div>

  );
  
};

export default TestimonyDetail;
