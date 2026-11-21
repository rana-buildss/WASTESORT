import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Heart, Shield, HelpCircle, MapPin, ExternalLink, CheckCircle } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

export default function Footer() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      <footer className="bg-charcoal text-gray-300 pt-16 pb-12 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                  <Recycle className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  Waste<span className="text-brand-400">Sort</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                Scan Smart. Sort Right. Save the Planet. An AI-powered environmental assistant delivering real-time material classification, step-by-step preparation guidelines, and local drop-off center discovery.
              </p>
              <div className="p-3 bg-gray-800/80 rounded-xl border border-gray-700/60 text-xs text-gray-300 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Demonstration Dataset Active:</span>
                  <p className="text-gray-400 mt-0.5">
                    Initial local rules dataset configured for Guwahati Municipal Corporation (Assam, India). All collection points clearly indicate demonstration or verified status.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-brand-400 transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/scanner" className="hover:text-brand-400 transition-colors">Waste Scanner</Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-brand-400 transition-colors">Waste Categories</Link>
                </li>
                <li>
                  <Link to="/collection-points" className="hover:text-brand-400 transition-colors">Collection Points</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-brand-400 transition-colors">How It Works</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Waste Categories */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/categories?cat=plastic" className="hover:text-white transition-colors">Plastics (PET, HDPE)</Link></li>
                <li><Link to="/categories?cat=paper" className="hover:text-white transition-colors">Paper & Cardboard</Link></li>
                <li><Link to="/categories?cat=batteries" className="hover:text-white transition-colors">Batteries (Hazardous)</Link></li>
                <li><Link to="/categories?cat=ewaste" className="hover:text-white transition-colors">Electronic Waste</Link></li>
                <li><Link to="/categories?cat=organic" className="hover:text-white transition-colors">Organic Wet Waste</Link></li>
                <li><Link to="/categories?cat=glass" className="hover:text-white transition-colors">Glass & Bottles</Link></li>
              </ul>
            </div>

            {/* Column 4: Help & Contact */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Transparency</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => setFeedbackOpen(true)}
                    className="hover:text-brand-400 transition-colors text-left flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Report Incorrect Result</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setFeedbackOpen(true)}
                    className="hover:text-brand-400 transition-colors text-left"
                  >
                    Suggest Missing Location
                  </button>
                </li>
                <li>
                  <Link to="/about#limitations" className="hover:text-brand-400 transition-colors">
                    AI Limitations & Safety
                  </Link>
                </li>
                <li>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-400 bg-brand-950/60 px-2 py-1 rounded border border-brand-800">
                    <CheckCircle className="w-3 h-3" />
                    Swachh Bharat Norms
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
            <p>© {new Date().getFullYear()} WasteSort. Built for Environmental Sustainability & Climate Action.</p>
            <div className="flex items-center gap-6">
              <span>Local Rule Engine: Guwahati Municipal Corp (Demo)</span>
              <span>OpenStreetMap & Leaflet</span>
            </div>
          </div>
        </div>
      </footer>

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </>
  );
}
