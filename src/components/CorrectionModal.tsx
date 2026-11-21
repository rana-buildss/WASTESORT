import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { WasteCategory } from '../types/waste';
import { submitClassificationCorrection } from '../services/feedbackService';

const ALL_CATEGORIES: WasteCategory[] = [
  'Plastic',
  'Paper and cardboard',
  'Glass',
  'Metal',
  'Organic and biodegradable waste',
  'Electronic waste',
  'Batteries',
  'Hazardous waste',
  'Mixed waste',
  'General non-recyclable waste',
];

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalItem: string;
  originalCategory: WasteCategory;
  onCorrectionApplied: (newCategory: WasteCategory) => void;
}

export default function CorrectionModal({
  isOpen,
  onClose,
  originalItem,
  originalCategory,
  onCorrectionApplied,
}: CorrectionModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<WasteCategory>(originalCategory);
  const [explanation, setExplanation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await submitClassificationCorrection({
        original_item: originalItem,
        original_category: originalCategory,
        corrected_category: selectedCategory,
        explanation,
      });

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      setSubmittedMessage(result.message);
      setSubmitted(true);
      setTimeout(() => {
        onCorrectionApplied(selectedCategory);
        onClose();
        setSubmitted(false);
        setSubmittedMessage('');
        setExplanation('');
      }, 1400);
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not save this correction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-charcoal">
              Correct AI Classification
            </h3>
            <p className="text-xs text-subtext mt-0.5">
              Help calibrate local AI recognition for {originalItem}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-charcoal hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-charcoal">Correction Logged!</h4>
            <p className="text-xs text-subtext">
              {submittedMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMessage && <p role="alert" className="text-sm text-red-700">{errorMessage}</p>}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-subtext mb-1">
                Current Identification
              </label>
              <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-700 font-medium">
                <strong>{originalItem}</strong> (Classified as {originalCategory})
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                Select Correct Category *
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as WasteCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-charcoal"
              >
                {ALL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                Explanation or Item Details (Optional)
              </label>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="e.g. This is a multi-layered pouch with aluminum lining, not pure plastic."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none text-charcoal"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-600/20 active:scale-95 transition-all"
              >
                {isSubmitting ? 'Submitting...' : 'Save Correction'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
