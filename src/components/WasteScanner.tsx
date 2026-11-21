import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Scan, AlertCircle } from 'lucide-react';
import UploadArea from './UploadArea';
import LoadingState from './LoadingState';
import { DemoItem } from '../utils/demoData';
import { identifyWasteImage } from '../services/aiService';
import { saveWasteScan } from '../services/scanService';

interface WasteScannerProps {
  onSuccess?: (result: any) => void;
  compact?: boolean;
}

export default function WasteScanner({ onSuccess, compact = false }: WasteScannerProps) {
  const navigate = useNavigate();
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<DemoItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageSelected = (imageData: string, file?: File) => {
    setSelectedPreview(imageData);
    setSelectedFile(file || null);
    setSelectedDemo(null);
    setErrorMessage(null);
  };

  const handleSelectDemoItem = (demo: DemoItem) => {
    setSelectedDemo(demo);
    setSelectedPreview(demo.thumbnail);
    setSelectedFile(null);
    setErrorMessage(null);
  };

  const handleClear = () => {
    setSelectedPreview(null);
    setSelectedFile(null);
    setSelectedDemo(null);
    setErrorMessage(null);
  };

  const handleIdentifyWaste = async () => {
    if (!selectedPreview) {
      setErrorMessage('Please capture, upload, or choose a demo item first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await identifyWasteImage(selectedPreview, {
        demoId: selectedDemo?.id,
        isDemo: Boolean(selectedDemo),
        locality: 'Guwahati Municipal Corporation Area',
      });
      const savedScan = await saveWasteScan(result);

      // Include preview image inside result for rich dashboard display
      const finalResult = {
        ...result,
        image_preview: selectedPreview,
        id: savedScan.record.id,
        scan_saved_to_database: savedScan.savedToDatabase,
      };

      if (onSuccess) {
        onSuccess(finalResult);
      } else {
        // Store in sessionStorage and navigate to /results
        sessionStorage.setItem('wastesort_latest_result', JSON.stringify(finalResult));
        navigate('/results');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'AI Waste Identification failed. Please check your image or try another item.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full ${compact ? 'max-w-2xl' : 'max-w-3xl'} mx-auto`}>
      {isLoading ? (
        <LoadingState imagePreview={selectedPreview} />
      ) : (
        <div className="space-y-6">
          <UploadArea
            onImageSelected={handleImageSelected}
            onSelectDemoItem={handleSelectDemoItem}
            onClear={handleClear}
            selectedPreview={selectedPreview}
            selectedFile={selectedFile}
            selectedDemo={selectedDemo}
            isLoading={isLoading}
          />

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Identify Waste Primary Action Button */}
          {selectedPreview && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleIdentifyWaste}
                className="w-full sm:w-auto min-w-[280px] px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg shadow-brand-600/30 hover:shadow-brand-600/40 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Scan className="w-5 h-5 animate-pulse" />
                <span>Identify Waste with AI</span>
                <Sparkles className="w-4 h-4 text-brand-200" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
