import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Recycle,
  Scan,
  MapPin,
  Layers,
  Info,
  Menu,
  X,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import FeedbackModal from './FeedbackModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Scan Waste', path: '/scanner' },
    { name: 'Scan History', path: '/history' },
    { name: 'Waste Categories', path: '/categories' },
    { name: 'Find Collection Points', path: '/collection-points' },
    { name: 'How It Works', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Recycle className="w-6 h-6 animate-pulse-subtle" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-charcoal font-sans flex items-center gap-1.5">
                  Waste<span className="text-brand-600">Sort</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-100 text-brand-800 px-1.5 py-0.5 rounded-full border border-brand-200">
                    AI
                  </span>
                </span>
                <span className="text-[11px] font-medium text-subtext -mt-1 hidden sm:inline">
                  Smart Waste Guide
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-brand-700 bg-brand-50 font-semibold'
                      : 'text-gray-600 hover:text-charcoal hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setFeedbackOpen(true)}
                title="Send Feedback or Report Missing Item"
                className="p-2 text-gray-500 hover:text-brand-700 hover:bg-gray-100 rounded-lg transition-colors text-xs flex items-center gap-1 font-medium"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Feedback</span>
              </button>

              <Link
                to="/scanner"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-md shadow-brand-600/20 hover:shadow-lg hover:shadow-brand-600/30 active:scale-95 transition-all"
              >
                <Scan className="w-4 h-4" />
                <span>Scan Waste</span>
                <Sparkles className="w-3.5 h-3.5 text-brand-200" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <Link
                to="/scanner"
                className="p-2 bg-brand-600 text-white rounded-lg shadow-sm"
                aria-label="Quick Scan"
              >
                <Scan className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-brand-600 focus:outline-none rounded-lg"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'text-brand-700 bg-brand-50 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setFeedbackOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Report Issue / Give Feedback</span>
              </button>
              <Link
                to="/scanner"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-brand-600 rounded-xl shadow-md"
              >
                <Scan className="w-4 h-4" />
                <span>Scan Waste Now</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Feedback Modal */}
      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}
