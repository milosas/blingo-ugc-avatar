import { useState } from 'react';

interface PostActionButtonsProps {
  onCopy: () => Promise<boolean>;
  onRegenerateText: () => void;
  onRegenerateImage: () => void;
  isLoadingText: boolean;
  isLoadingImage: boolean;
  hasText: boolean;
  hasImage: boolean;
  labels: {
    copy: string;
    copied: string;
    regenerateText: string;
    regenerateImage: string;
  };
}

export function PostActionButtons({
  onCopy,
  onRegenerateText,
  onRegenerateImage,
  isLoadingText,
  isLoadingImage,
  hasText,
  hasImage,
  labels,
}: PostActionButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Copy */}
      <button
        onClick={handleCopy}
        disabled={!hasText}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6B35] text-white text-sm font-medium rounded-xl hover:bg-[#E55A2B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {labels.copied}
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {labels.copy}
          </>
        )}
      </button>

      {/* Regenerate text */}
      <button
        onClick={onRegenerateText}
        disabled={isLoadingText || !hasText}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5E3] text-[#1A1A1A] text-sm font-medium rounded-xl hover:bg-[#F7F7F5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className={`w-4 h-4 ${isLoadingText ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {labels.regenerateText}
      </button>

      {/* Regenerate image */}
      {hasImage && (
        <button
          onClick={onRegenerateImage}
          disabled={isLoadingImage}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5E3] text-[#1A1A1A] text-sm font-medium rounded-xl hover:bg-[#F7F7F5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className={`w-4 h-4 ${isLoadingImage ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {labels.regenerateImage}
        </button>
      )}
    </div>
  );
}
