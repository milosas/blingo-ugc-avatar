import { useCallback, useRef } from 'react';
import type { ImageSource } from '../../hooks/usePostCreator';

interface ImageSourceToggleProps {
  imageSource: ImageSource;
  onImageSourceChange: (v: ImageSource) => void;
  imagePreview: string | null;
  onFileSelect: (file: File, preview: string) => void;
  onFileRemove: () => void;
  isLoadingImage: boolean;
  labels: {
    upload: string;
    ai: string;
    gallery?: string;
    uploadHint: string;
    aiHint: string;
    remove: string;
    dragDrop: string;
  };
}

export function ImageSourceToggle({
  imageSource,
  onImageSourceChange,
  imagePreview,
  onFileSelect,
  onFileRemove,
  isLoadingImage,
  labels,
}: ImageSourceToggleProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    onFileSelect(file, preview);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const preview = URL.createObjectURL(file);
    onFileSelect(file, preview);
  }, [onFileSelect]);

  return (
    <div>
      {/* Toggle */}
      <div className="flex gap-1 bg-[#F7F7F5] rounded-lg p-1 mb-3">
        {imageSource === 'gallery' && (
          <button
            onClick={() => onImageSourceChange('gallery')}
            className="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-white text-[#1A1A1A] shadow-sm"
          >
            {labels.gallery || 'Galerija'}
          </button>
        )}
        <button
          onClick={() => onImageSourceChange('upload')}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            imageSource === 'upload'
              ? 'bg-white text-[#1A1A1A] shadow-sm'
              : 'text-[#666] hover:text-[#1A1A1A]'
          }`}
        >
          {labels.upload}
        </button>
        <button
          onClick={() => onImageSourceChange('ai')}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            imageSource === 'ai'
              ? 'bg-white text-[#1A1A1A] shadow-sm'
              : 'text-[#666] hover:text-[#1A1A1A]'
          }`}
        >
          {labels.ai}
        </button>
      </div>

      {/* Content */}
      {imageSource === 'gallery' ? (
        imagePreview ? (
          <div className="relative">
            <img src={imagePreview} alt="Gallery" className="w-full max-h-64 object-contain rounded-xl border border-[#E5E5E3]" loading="lazy" />
            <button
              onClick={() => { onFileRemove(); onImageSourceChange('upload'); }}
              className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#666] hover:text-red-500 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : null
      ) : imageSource === 'upload' ? (
        imagePreview ? (
          <div className="relative">
            <img src={imagePreview} alt="Uploaded" className="w-full max-h-64 object-contain rounded-xl border border-[#E5E5E3]" loading="lazy" />
            <button
              onClick={onFileRemove}
              className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#666] hover:text-red-500 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-[#E5E5E3] rounded-xl p-8 text-center cursor-pointer hover:border-[#FF6B35] hover:bg-[#FFF0EB]/30 transition-colors"
          >
            <svg className="w-8 h-8 text-[#999] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-[#666]">{labels.dragDrop}</p>
            <p className="text-xs text-[#999] mt-1">{labels.uploadHint}</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )
      ) : (
        <div className="bg-[#FFF0EB] rounded-xl p-4">
          <div className="flex items-center gap-2 text-[#FF6B35]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-sm font-medium">{labels.aiHint}</p>
          </div>
          {isLoadingImage && (
            <div className="mt-3 flex items-center gap-2 text-[#FF6B35]">
              <div className="w-4 h-4 rounded-full border-2 border-[#FF6B35] border-t-transparent animate-spin" />
              <p className="text-sm">Generuojama...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
