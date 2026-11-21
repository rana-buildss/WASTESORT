import React, { useState } from 'react';
import { X, CheckCircle, MessageSquare, Send } from 'lucide-react';
import { FeedbackType, UserFeedback } from '../types/feedback';
import { submitUserFeedback } from '../services/feedbackService';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: FeedbackType;
  relatedItem?: string;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  defaultType = 'incorrect_classification',
  relatedItem = '',
}: FeedbackModalProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(defaultType);
  const [item, setItem] = useState(relatedItem);
  const [suggestedCategory, setSuggestedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      const payload: UserFeedback = {
        feedback_type: feedbackType,
        related_item: item || undefined,
        suggested_category: suggestedCategory || undefined,
        description,
        email: email || undefined,
      };

      await submitUserFeedback(payload);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setDescription('');
        setEmail('');
        onClose();
      }, 1600);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-charcoal">
                WasteSort Community Feedback
              </h3>
              <p className="text-xs text-subtext">
                Report errors or suggest missing collection facilities
              </p>
            </div>
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
            <h4 className="text-lg font-bold text-charcoal">Feedback Submitted!</h4>
            <p className="text-xs text-subtext max-w-xs mx-auto">
              Thank you for contributing to cleaner communities and improved waste segregation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                Feedback Type *
              </label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value as FeedbackType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-charcoal"
              >
                <option value="incorrect_classification">Report incorrect AI classification</option>
                <option value="missing_category">Suggest a missing waste category</option>
                <option value="incorrect_instructions">Report incorrect disposal instructions</option>
                <option value="missing_collection_point">Report a missing collection point</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                Related Item / Location Name (Optional)
              </label>
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="e.g. Milk pouch, Beltola recycling point, AA battery"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                Description & Suggestions *
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe the issue or missing data in detail..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none text-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-subtext mb-1">
                Email Address (Optional — for follow-ups)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com (optional)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-charcoal"
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
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-600/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending...' : 'Submit Feedback'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
