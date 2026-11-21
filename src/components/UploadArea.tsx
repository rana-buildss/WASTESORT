import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  Camera,
  X,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  HelpCircle,
} from 'lucide-react';
import { validateWasteImage, compressImage } from '../utils/imageValidation';
import { DEMO_ITEMS, DemoItem } from '../utils/demoData';

interface UploadAreaProps {
  onImageSelected: (imageData: string, file?: File) => void;
  onSelectDemoItem: (demo: DemoItem) => void;
  onClear: () => void;
  selectedPreview: string | null;
  selectedFile: File | null;
  selectedDemo: DemoItem | null;
  isLoading: boolean;
}

export default function UploadArea({
  onImageSelected,
  onSelectDemoItem,
  onClear,
  selectedPreview,
  selectedFile,
  selectedDemo,
  isLoading,
}: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileProcess = async (file: File) => {
    setErrorMessage(null);
    const validation = validateWasteImage(file);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Invalid image file.');
      return;
    }

    try {
      const compressedDataUrl = await compressImage(file);
      onImageSelected(compressedDataUrl, file);
    } catch (err: any) {
      setErrorMessage('Could not process this image. Please try another one.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
        onChange={handleChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleChange}
      />

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm animate-fadeIn">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Upload issue:</span> {errorMessage}
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-red-500 hover:text-red-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Image Preview State or Drag & Drop Zone */}
      {selectedPreview ? (
        <div className="relative bg-white rounded-2xl border-2 border-brand-200 shadow-card p-4 sm:p-6 transition-all">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner flex-shrink-0">
              <img
                src={selectedPreview}
                alt="Selected waste item"
                className="w-full h-full object-contain p-2"
              />
              {selectedDemo && (
                <div className="absolute top-2 left-2 bg-brand-700/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow">
                  Preset Sample
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-3">
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for AI Analysis
                </span>
                <h3 className="text-lg font-bold text-charcoal mt-2">
                  {selectedDemo ? selectedDemo.name : selectedFile?.name || 'Waste Photo Captured'}
                </h3>
                <p className="text-xs text-subtext mt-1">
                  {selectedFile
                    ? `${(selectedFile.size / 1024).toFixed(0)} KB • ${selectedFile.type}`
                    : 'High-resolution photo ready for Gemini multimodal evaluation.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Change Photo
                </button>
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={isLoading}
                  className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" /> Retake
                </button>
                <button
                  type="button"
                  onClick={onClear}
                  disabled={isLoading}
                  className="px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all bg-white ${
            dragActive
              ? 'border-brand-500 bg-brand-50/50 scale-[1.01]'
              : 'border-gray-300 hover:border-brand-400 hover:bg-brand-50/20 shadow-sm'
          }`}
        >
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mx-auto shadow-sm">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-charcoal">
                Drop your waste image here
              </h3>
              <p className="text-sm text-subtext mt-1">
                Supports JPG, PNG, WEBP up to 10 MB. Compressed automatically on device.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Photograph</span>
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-gray-300 hover:border-brand-500 hover:bg-brand-50 text-charcoal font-semibold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4 text-brand-600" />
                <span>Open Mobile Camera</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preset Demo Items for Instant Hackathon Testing */}
      <div className="bg-gray-50/80 border border-gray-200/80 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
              Hackathon Live Demo Presets
            </span>
          </div>
          <span className="text-[11px] font-medium text-subtext hidden sm:inline">
            Click to test instant scenarios
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {DEMO_ITEMS.map((item) => {
            const isSelected = selectedDemo?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectDemoItem(item)}
                className={`flex flex-col items-center p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-500/20 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-brand-300 hover:bg-brand-50/40 shadow-subtle'
                }`}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 mb-2 flex items-center justify-center">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-charcoal text-center line-clamp-1 w-full">
                  {item.name}
                </span>
                <span className="text-[10px] text-brand-700 font-medium text-center mt-0.5">
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
