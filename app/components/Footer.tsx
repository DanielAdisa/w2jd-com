'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaHeart } from 'react-icons/fa6';
import { useState } from 'react';
import Swal from 'sweetalert2';




export const mainRoutes = [
  { path: '/', label: 'Home' },
  { path: '/mood', label: 'Moods' },
  { path: '/testimonies', label: 'Testimonies' },
  // { path: '/mission', label: 'Our Mission' },
  // { path: '/contact', label: 'Contact' },
  { path: '/mood-of-the-day', label: 'Mood Of The Day' },
  { path: '/prayers', label: 'Prayer Requests' }
];

export const socialLinks = [
  { href: 'https://x.com/Misfits_4Christ?t=yBk6zwTG1dShduAy12dn0Q&s=09', label: 'Twitter' },
  { href: 'https://www.instagram.com/misfits_for_christ?igsh=MThobXhpbHEwb21vYg==', label: 'Instagram' },
  { href: 'mailto:misfits.for4.christ@gmail.com', label: 'Email' },
];

  



const Footer = () => {
  const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !email.includes('@')) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid email address',
      text: 'Please enter a valid email address.',
      background: '#1f2937',
      color: '#fff',
      confirmButtonColor: '#6366f1'
    });
    return;
  }

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 409) {
      Swal.fire({
        icon: 'info',
        title: '<span style="font-size: 1.5rem; font-weight: bold;">Already Subscribed</span>',
        html: `
          <p style="font-size: 1rem; color: #e5e7eb; margin-top: 0.5rem;">
            You have already subscribed. Thank you for staying with us!
          </p>
        `,
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        color: '#f3f4f6',
        showConfirmButton: true,
        confirmButtonText: 'Okay',
        confirmButtonColor: '#4f46e5',
        buttonsStyling: false,
        customClass: {
          popup: 'rounded-2xl shadow-lg',
          confirmButton: 'px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out',
        },
        timer: 5000, // Automatically closes after 5 seconds
        timerProgressBar: true, // Show progress bar for auto-close
      });
      
      return;
    }

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }

    setEmail('');
    Swal.fire({
      icon: 'success',
      title: '<span style="font-size: 1.5rem; font-weight: bold;">Subscribed!</span>',
      html: `
        <p style="font-size: 1rem; color: #e5e7eb; margin-top: 0.5rem;">
          You have successfully subscribed. Welcome aboard!
        </p>
      `,
      background: 'linear-gradient(135deg, #1f2937, #111827)',
      color: '#f3f4f6',
      showConfirmButton: true,
      confirmButtonText: 'Got it!',
      confirmButtonColor: '#4f46e5',
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-2xl shadow-xl',
        confirmButton: 'px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 ease-in-out',
      },
      timer: 5000, // Automatically closes after 5 seconds
      timerProgressBar: true, // Show a progress bar for auto-close
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Subscription Failed',
      text: 'Failed to subscribe. Please try again later.',
      background: '#1f2937',
      color: '#fff',
      confirmButtonColor: '#6366f1'
    });
  }
};

  return (
    <footer className="bg-gradient-to-br z-50 from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Misfits for Christ
            </h2>
            <p className="text-gray-300 leading-relaxed">
              A movement dedicated to spreading the love of Christ, inspiring hope, and bringing faith to life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
            {mainRoutes.map(({ path, label }) => (
              <li key={path}>
                <Link
                  href={path}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
            </ul>
          </div>

          {/* Contact Info */}
          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            {/* <ul className="space-y-2 text-gray-300">
              <li>info@misfitsforchrist.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Faith Street</li>
              <li>New York, NY 10001</li>
            </ul> 
         // </div> 

          {/* Social & Newsletter */}
          <div className="space-y-6">
          <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
                  >
                    {i === 0 && <FaTwitter className="w-5 h-5 text-white" />}
                    {/* {i === 1 && <FaFacebook className="w-5 h-5 text-white" />} */}
                    {i === 1 && <FaInstagram className="w-5 h-5 text-white" />}
                    {i === 2 && <FaEnvelope className="w-5 h-5 text-white" />}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p className="flex items-center justify-center gap-2">
            Made with <FaHeart className="text-red-500" /> by <Link href={"https://daniel-port-sept.vercel.app/"}> Adisa Made It </Link> © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


