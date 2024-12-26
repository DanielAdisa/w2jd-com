'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaHeart } from 'react-icons/fa6';

const Footer = () => {
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
              {['Home', 'About', 'Contact', 'Blog'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>info@misfitsforchrist.com</li>
              {/* <li>+1 (555) 123-4567</li>
              <li>123 Faith Street</li>
              <li>New York, NY 10001</li> */}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[FaFacebook, FaTwitter, FaInstagram, FaEnvelope].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-purple-600 px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
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
