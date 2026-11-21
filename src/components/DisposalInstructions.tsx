import React from 'react';
import {
  CheckCircle2,
  AlertOctagon,
  FileText,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { WasteAnalysisResult } from '../types/waste';

interface DisposalInstructionsProps {
  result: WasteAnalysisResult;
  onFindCollectionPoints?: () => void;
}

export default function DisposalInstructions({
  result,
  onFindCollectionPoints,
}: DisposalInstructionsProps) {
  const localRule = result.local_rule_applied;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 sm:p-8 space-y-8">
      {/* Header and Local Rules Attribution */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Verified Disposal Protocol
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-charcoal">
              Step-by-Step Instructions
            </h3>
          </div>

          {/* Local Rules Badge */}
          {localRule ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-brand-900 font-medium">
              <Building className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <span>
                Region: <strong>{localRule.locality}</strong> ({localRule.verification_status})
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <span>Local disposal guidance is currently unavailable. Please consult your municipal waste management authority.</span>
            </div>
          )}
        </div>

        {localRule && (
          <p className="text-xs text-subtext mt-2">
            Disposal guidelines derived from: <em>{localRule.source}</em>. Method: <strong>{localRule.disposal_method}</strong>.
          </p>
        )}
      </div>

      {/* Step-by-Step Numbered Cards */}
      <div className="space-y-3.5">
        {result.instructions && result.instructions.length > 0 ? (
          result.instructions.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-brand-200 hover:bg-brand-50/20 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                {idx + 1}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm sm:text-base font-semibold text-charcoal leading-snug">
                  {step}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-subtext">No explicit preparation steps needed for this waste category.</p>
        )}
      </div>

      {/* Recommended Destination Facility / Bin */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-50 to-emerald-50/40 border border-brand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800">
            Designated Destination
          </span>
          <p className="text-sm sm:text-base font-bold text-charcoal">
            {result.collection_type}
          </p>
          <p className="text-xs text-subtext">
            Ensure proper segregation before handing over to municipal sanitation crews or recycling hubs.
          </p>
        </div>

        {onFindCollectionPoints && (
          <button
            type="button"
            onClick={onFindCollectionPoints}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-brand-600/20 flex items-center gap-2 flex-shrink-0 active:scale-95 transition-all"
          >
            <MapPin className="w-4 h-4" />
            <span>Find Collection Points</span>
          </button>
        )}
      </div>
    </div>
  );
}
