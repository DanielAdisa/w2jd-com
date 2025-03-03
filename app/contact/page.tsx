"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa6";
import { FaPersonPraying } from 'react-icons/fa6';

import Swal from 'sweetalert2';
import Link from "next/link";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        reset();
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Thank you for reaching out! We will get back to you soon.',
          background: '#0f172a',
          color: '#fff',
          confirmButtonColor: '#6366f1'
        });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send message. Please try again.',
        background: '#0f172a',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5 rounded-full"
            style={{
              width: Math.random() * 15 + 5 + 'px',
              height: Math.random() * 15 + 5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100],
              opacity: [0.1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-16 sm:pt-20 lg:pt-24 text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Let's Connect
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-2">Philippians 4:6</p>
          <blockquote className="text-base sm:text-lg text-slate-400 italic max-w-3xl mx-auto">
            "Do not be anxious about anything, but in every situation, by prayer and petition, 
            with thanksgiving, present your requests to God."
          </blockquote>
        </motion.header>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 py-12 sm:py-16 lg:py-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full bg-slate-700/20 border border-slate-600/30 rounded-xl px-5 py-3.5
                             text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 
                             focus:border-transparent transition-all duration-200"
                    placeholder="Your Name"
                    aria-label="Your Name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1.5">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full bg-slate-700/20 border border-slate-600/30 rounded-xl px-5 py-3.5
                             text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 
                             focus:border-transparent transition-all duration-200"
                    placeholder="Your Email"
                    aria-label="Your Email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1.5">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    className="w-full bg-slate-700/20 border border-slate-600/30 rounded-xl px-5 py-3.5
                             text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 
                             focus:border-transparent transition-all duration-200"
                    placeholder="Your Message"
                    rows={5}
                    aria-label="Your Message"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1.5">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl text-white font-semibold
                         bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 
                         transition-all duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 sm:space-y-10 text-slate-100"
          >
            {/* Social Links Section Redesign */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-purple-300">Connect With Us</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <FaTwitter className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />,
                    label: 'Twitter',
                    href: 'https://x.com/Misfits_4Christ',
                    gradient: 'from-blue-500 to-blue-600'
                  },
                  {
                    icon: <FaInstagram className="w-6 h-6 text-pink-400 group-hover:text-pink-300 transition-colors" />,
                    label: 'Instagram',
                    href: 'https://www.instagram.com/misfits_for_christ',
                    gradient: 'from-pink-500 to-purple-600'
                  }
                ].map((social) => (
                  <div key={social.label} className="relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${social.gradient} rounded-xl filter blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`} />
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 hover:border-slate-700/70 transition-all duration-200"
                    >
                      <Link
                        href={social.href}
                        className="flex items-center gap-4 w-full"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="p-2 rounded-full bg-gradient-to-br from-slate-700/50 to-slate-800/50"
                        >
                          {social.icon}
                        </motion.div>
                        <span className="font-medium text-slate-200 group-hover:text-slate-100 transition-colors">
                          {social.label}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Section Redesign */}
            <motion.div whileHover={{ scale: 1.02 }} className="group">
              <Link
                href="mailto:misfits.for4.christ@gmail.com"
                className="flex items-center gap-4 p-6 rounded-2xl bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300"
              >
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20"
                >
                  <FaEnvelope className="w-8 h-8 text-purple-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300">Email Us</h3>
                  <p className="text-slate-400 text-sm mt-1">misfits.for4.christ@gmail.com</p>
                </div>
              </Link>
            </motion.div>

            {/* Prayer Request CTA Redesign */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative group mt-8"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <Link
                href="/prayers"
                className="relative flex items-center justify-center gap-3 w-full p-5 rounded-2xl
                       bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500
                       transition-all duration-200 shadow-lg"
              >
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaPersonPraying className="w-6 h-6 text-white" />
                </motion.div>
                <span className="font-semibold text-white">Submit Prayer Request</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;