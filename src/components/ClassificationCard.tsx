import React from 'react';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Sparkles,
  ShieldAlert,
  Droplet,
  Layers,
  Tag,
  Info,
} from 'lucide-react';
import { WasteAnalysisResult } from '../types/waste';
import {
  getCategoryColor,
  getWasteTypeBadge,
  formatConfidence,
} from '../utils/formatters';

interface ClassificationCardProps {
  result: WasteAnalysisResult;
  onCorrect: () => void;
}

export default function ClassificationCard({
  result,
  onCorrect,
}: ClassificationCardProps) {
  const categoryStyle = getCategoryColor(result.category);
  const wasteTypeBadge = getWasteTypeBadge(result.waste_type);
  const confidence = formatConfidence(result.confidence);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
      {/* Top Banner if Special Handling is Required (e.g., Batteries or Hazardous) */}
      {result.special_handling && (
        <div className="bg-rose-600 text-white px-6 py-3.5 flex items-start gap-3 shadow-sm">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 animate-bounce-slow" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold uppercase tracking-wide">
              Special Handling & Hazard Warning:
            </span>{' '}
            {result.special_handling_warning ||
              'This item cannot be placed in standard household waste. Follow strict containment protocols.'}
          </div>
        </div>
      )}

      {/* Main Identified Item Header */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryStyle.badge}`}
              >
                {result.category}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${wasteTypeBadge.className}`}
              >
                {wasteTypeBadge.label}
              </span>
              {result.is_demo && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Demo Classification
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal pt-1">
              {result.item_name}
            </h2>
            <p className="text-sm text-subtext font-medium flex items-center gap-1.5">
              <span>Material:</span>
              <strong className="text-charcoal font-semibold">{result.material}</strong>
              <span className="text-gray-300">•</span>
              <span>Condition:</span>
              <span className="text-gray-700 italic">{result.condition}</span>
            </p>
          </div>

          {/* AI Confidence Meter */}
          <div className="flex flex-col items-start md:items-end gap-1.5 bg-gray-50 p-3.5 rounded-2xl border border-gray-100 min-w-[160px]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span className="text-xs font-bold text-charcoal">
                {confidence.percentage}% Match
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${confidence.percentage}%` }}
              />
            </div>
            <span className="text-[10px] font-medium text-subtext">
              {confidence.label}
            </span>
          </div>
        </div>

        {/* Feature Grid: Recyclability & Segregation Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          {/* Recyclability Status */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                result.recyclable
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {result.recyclable ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-subtext">
                Recyclability
              </span>
              <p className="text-sm font-bold text-charcoal mt-0.5">
                {result.recyclable ? 'Suitable for Recycling' : 'Non-Recyclable Residual'}
              </p>
            </div>
          </div>

          {/* Waste Type Bin */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-subtext">
                Primary Segregation
              </span>
              <p className="text-sm font-bold text-charcoal mt-0.5">
                {result.waste_type}
              </p>
            </div>
          </div>

          {/* Recommended Disposal Stream */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-subtext">
                Recommended Action
              </span>
              <p className="text-sm font-bold text-charcoal mt-0.5 line-clamp-1">
                {result.disposal_action}
              </p>
            </div>
          </div>
        </div>

        {/* Correction Trigger Link */}
        <div className="pt-6 flex justify-end">
          <button
            type="button"
            onClick={onCorrect}
            className="text-xs font-semibold text-gray-500 hover:text-brand-700 hover:underline flex items-center gap-1.5 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Incorrect identification? Correct it</span>
          </button>
        </div>
      </div>
    </div>
  );
}
