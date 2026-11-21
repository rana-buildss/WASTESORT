import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

const ANALYSIS_STEPS = [
  'Analyzing your image...',
  'Identifying material...',
  'Checking disposal guidelines...',
  'Preparing your recommendation...',
];

interface LoadingStateProps {
  imagePreview?: string | null;
}

export default function LoadingState({ imagePreview }: LoadingStateProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % ANALYSIS_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-brand-100 shadow-hover p-8 sm:p-12 text-center max-w-xl mx-auto my-6 animate-fadeIn">
      {/* Animated Visual Scanner */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-8 rounded-2xl overflow-hidden border-2 border-brand-400 bg-brand-950/5 shadow-inner">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Analyzing item"
            className="w-full h-full object-cover filter brightness-95"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-50">
            <Sparkles className="w-12 h-12 text-brand-500 animate-pulse" />
          </div>
        )}

        {/* Laser scanner bar */}
        <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-brand-500 to-transparent shadow-[0_0_15px_#22c55e] animate-scan-line" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#16a34a15_1px,transparent_1px),linear-gradient(to_bottom,#16a34a15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      </div>

      {/* Rotating Progress Messages per Feature 1 & Page 2 requirements */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-600" />
          <span>Multimodal AI Vision Active</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-charcoal min-h-[36px] transition-all duration-300">
          {ANALYSIS_STEPS[currentStepIndex]}
        </h3>

        <p className="text-xs text-subtext max-w-sm mx-auto">
          Gemini image model is examining surface texture, polymer type, hazard indicators, and comparing with local disposal by-laws.
        </p>

        {/* Step indicator pills */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {ANALYSIS_STEPS.map((step, idx) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === currentStepIndex
                  ? 'w-8 bg-brand-600'
                  : idx < currentStepIndex
                  ? 'w-2 bg-brand-300'
                  : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
