"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaInstagram, FaTwitter } from "react-icons/fa6";
import { FaPray } from "react-icons/fa";
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
          background: '#1f2937',
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
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
      {/* Header Section */}
      <div className="relative pt-20 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Let's Connect</h1>
          <p className="text-xl text-gray-300 mb-2">Philippians 4:6</p>
          <p className="text-lg text-gray-300 italic">
            "Do not be anxious about anything, but in every situation, by prayer and petition, 
            with thanksgiving, present your requests to God."
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-lg p-4 rounded-3xl shadow-xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-lg px-4 py-3 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 
                             focus:border-transparent transition-all duration-300"
                    type="text"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
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
                    className="w-full bg-white/5 border border-purple-500/20 rounded-lg px-4 py-3 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 
                             focus:border-transparent transition-all duration-300"
                    type="email"
                    placeholder="Your Email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    className="w-full bg-white/5 border border-purple-500/20 rounded-lg px-4 py-3 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 
                             focus:border-transparent transition-all duration-300"
                    placeholder="Your Message"
                    rows={6}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-4 rounded-lg text-white font-semibold
                         bg-gradient-to-r from-purple-600 to-blue-600 
                         hover:from-purple-500 hover:to-blue-500 
                         transition-all duration-300 ${loading ? "opacity-50" : ""}`}
                disabled={loading}
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
  className="space-y-12 text-white p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-purple-500/20"
>
  {/* Main Contact Section */}
  <div>
    <h3 className="text-3xl font-bold mb-4 mt-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      Connect With Us
    </h3>
    <p className="text-gray-300 leading-relaxed text-lg">
      Join our community of believers. Together, we can grow in faith and make an impact for Christ.
    </p>
  </div>

  {/* Email Contact */}
  <div className="space-y-6">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Link 
        href="mailto:misfits.for4.christ@gmail.com"
        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
      >
        <div className="p-3 bg-purple-500/20 rounded-full group-hover:bg-purple-500/30 transition-colors">
          <FaEnvelope className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h4 className="font-semibold text-purple-300">Email Us</h4>
          <span className="text-gray-400">misfits.for4.christ@gmail.com</span>
        </div>
      </Link>
    </motion.div>
  </div>

  {/* Social Links */}
  <div>
    <h3 className="text-2xl font-bold mb-6 text-purple-300">Connect on Social Media</h3>
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          icon: <FaTwitter className="w-6 h-6" />,
          label: 'Twitter',
          description: 'Follow us for daily inspiration',
          href: 'https://x.com/Misfits_4Christ',
          color: 'hover:bg-blue-500/20'
        },
        {
          icon: <FaInstagram className="w-6 h-6" />,
          label: 'Instagram',
          description: 'Join our visual journey',
          href: 'https://www.instagram.com/misfits_for_christ',
          color: 'hover:bg-pink-500/20'
        }
      ].map((social) => (
        <motion.div
          key={social.label}
          whileHover={{ scale: 1.02 }}
          className="group"
        >
          <Link 
            href={social.href}
            className={`flex flex-col items-center p-6 rounded-xl bg-white/5 ${social.color} transition-all duration-300`}
          >
            <div className="p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              {social.icon}
            </div>
            <h4 className="mt-4 font-semibold">{social.label}</h4>
            <p className="text-sm text-gray-400 text-center mt-2">{social.description}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Prayer Request Button */}
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="mt-8"
  >
    <Link 
      href="/prayers"
      className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
    >
      <FaPray className="w-6 h-6" />
      <span className="font-semibold">Submit Prayer Request</span>
    </Link>
  </motion.div>
</motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;