import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Scan,
  MapPin,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Share2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ClassificationCard from '../components/ClassificationCard';
import DisposalInstructions from '../components/DisposalInstructions';
import CorrectionModal from '../components/CorrectionModal';
import { WasteAnalysisResult, WasteCategory } from '../types/waste';
import { DEMO_ITEMS } from '../utils/demoData';

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();

  const [result, setResult] = useState<WasteAnalysisResult | null>(null);
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    // 1. Check if passed via router state
    if (location.state && location.state.result) {
      setResult(location.state.result);
      if (location.state.result.recyclable) {
        triggerConfetti();
      }
      return;
    }

    // 2. Check sessionStorage
    const stored = sessionStorage.getItem('wastesort_latest_result');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setResult(parsed);
        if (parsed.recyclable) {
          triggerConfetti();
        }
        return;
      } catch (e) {
        console.error(e);
      }
    }

    // 3. Fallback to Demo Item 1 (Clean plastic bottle) so user never hits a blank page
    const fallback = DEMO_ITEMS[0].result;
    setResult({
      ...fallback,
      image_preview: DEMO_ITEMS[0].thumbnail,
    });
  }, [location.state]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#22c55e', '#86efac', '#0284c7'],
      });
    } catch (e) {
      // Ignore if confetti not supported
    }
  };

  const handleCorrectionApplied = (newCategory: WasteCategory) => {
    if (!result) return;
    const updated: WasteAnalysisResult = {
      ...result,
      category: newCategory,
      confidence: 1.0,
      disposal_action: `Manually corrected to ${newCategory}`,
    };
    setResult(updated);
    sessionStorage.setItem('wastesort_latest_result', JSON.stringify(updated));
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: `WasteSort Guide: ${result.item_name}`,
        text: `I just checked how to properly dispose of ${result.item_name} on WasteSort!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  if (!result) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Top Breadcrumb & Action Header */}
      {typeof result.scan_saved_to_database === 'boolean' && (
        <div className={`rounded-xl border px-4 py-3 text-sm ${result.scan_saved_to_database ? 'border-green-200 bg-green-50 text-green-800' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>
          {result.scan_saved_to_database
            ? 'This scan was saved to your scan history in Supabase.'
            : 'Supabase could not be reached. This scan is saved in this browser only.'}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Identification Complete
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
            Disposal Recommendation
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-1.5 shadow-subtle"
          >
            <Share2 className="w-3.5 h-3.5 text-gray-500" />
            <span>{shareCopied ? 'Link Copied!' : 'Share Guide'}</span>
          </button>

          <Link
            to="/scanner"
            className="px-4 py-2 text-xs font-semibold text-brand-700 bg-brand-50 border border-brand-200 hover:bg-brand-100 rounded-xl transition-colors flex items-center gap-1.5 shadow-subtle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scan Another Item</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Uploaded Image Preview & Classification Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Preview Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-gray-100 shadow-card space-y-4">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center p-2 shadow-inner">
            {result.image_preview ? (
              <img
                src={result.image_preview}
                alt={result.item_name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center p-4 text-subtext">
                <Layers className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                <span className="text-xs">Image evaluated</span>
              </div>
            )}
          </div>

          <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
            <span className="font-bold text-charcoal block">Analyzed Item</span>
            <p className="text-gray-700 font-medium">{result.item_name}</p>
            <p className="text-[11px] text-subtext">Identified via multimodal vision & local rules engine</p>
          </div>
        </div>

        {/* Right Column: Classification Card */}
        <div className="lg:col-span-8">
          <ClassificationCard
            result={result}
            onCorrect={() => setCorrectionModalOpen(true)}
          />
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div>
        <DisposalInstructions
          result={result}
          onFindCollectionPoints={() =>
            navigate(`/collection-points?category=${encodeURIComponent(result.category)}`)
          }
        />
      </div>

      {/* Bottom Action Footer */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-charcoal">
            Find where to drop off {result.item_name}
          </h4>
          <p className="text-xs text-subtext mt-0.5">
            Locate certified collection kiosks, scrap recovery centers, and bins near you.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to={`/collection-points?category=${encodeURIComponent(result.category)}`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Find Collection Points</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Correction Modal */}
      <CorrectionModal
        isOpen={correctionModalOpen}
        onClose={() => setCorrectionModalOpen(false)}
        originalItem={result.item_name}
        originalCategory={result.category}
        onCorrectionApplied={handleCorrectionApplied}
      />
    </div>
  );
}
