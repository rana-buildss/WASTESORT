import React from 'react';
import WasteScanner from '../components/WasteScanner';
import { Sparkles, Camera, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Scanner() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold border border-brand-200 shadow-subtle">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Multimodal Waste Scanner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight font-sans">
          Scan & Identify Waste Item
        </h1>
        <p className="text-sm sm:text-base text-subtext max-w-lg mx-auto">
          Capture or upload any waste item to get instantaneous material classification, preparation steps, and collection guidance.
        </p>
      </div>

      {/* Main Scanner Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-card">
        <WasteScanner />
      </div>

      {/* Live Demonstration Advice & Scanner Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-subtle space-y-2">
          <h4 className="text-sm font-bold text-charcoal flex items-center gap-2">
            <Camera className="w-4 h-4 text-brand-600" /> Photo Capture Best Practices
          </h4>
          <ul className="text-xs text-subtext space-y-1.5 list-disc pl-4">
            <li>Ensure the waste item is well-lit and centered in the frame.</li>
            <li>Capture resin codes or symbols (e.g., PET 1, HDPE 2) if visible.</li>
            <li>Show whether the container has leftover food or liquids.</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-subtle space-y-2">
          <h4 className="text-sm font-bold text-charcoal flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600" /> Local Rules Integration
          </h4>
          <p className="text-xs text-subtext leading-relaxed">
            All AI classifications are crossed-referenced with municipal waste regulations (initial demonstration region: Guwahati Municipal Corporation).
          </p>
        </div>
      </div>
    </div>
  );
}
