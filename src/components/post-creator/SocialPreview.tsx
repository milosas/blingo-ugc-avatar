import { useState } from 'react';
import { FacebookPreview } from './FacebookPreview';
import { InstagramPreview } from './InstagramPreview';

interface SocialPreviewProps {
  text: string;
  imageUrl: string | null;
  labels: {
    facebook: string;
    instagram: string;
    mobile: string;
    desktop: string;
  };
}

type Platform = 'facebook' | 'instagram';
type ViewMode = 'mobile' | 'desktop';

export function SocialPreview({ text, imageUrl, labels }: SocialPreviewProps) {
  const [platform, setPlatform] = useState<Platform>('facebook');
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 bg-[#F7F7F5] rounded-lg p-1">
          <button
            onClick={() => setPlatform('facebook')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              platform === 'facebook'
                ? 'bg-white text-[#1A1A1A] shadow-sm'
                : 'text-[#666] hover:text-[#1A1A1A]'
            }`}
          >
            {labels.facebook}
          </button>
          <button
            onClick={() => setPlatform('instagram')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              platform === 'instagram'
                ? 'bg-white text-[#1A1A1A] shadow-sm'
                : 'text-[#666] hover:text-[#1A1A1A]'
            }`}
          >
            {labels.instagram}
          </button>
        </div>

        <div className="flex gap-1 bg-[#F7F7F5] rounded-lg p-1">
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'mobile' ? 'bg-white shadow-sm' : 'text-[#666] hover:text-[#1A1A1A]'
            }`}
            title={labels.mobile}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'desktop' ? 'bg-white shadow-sm' : 'text-[#666] hover:text-[#1A1A1A]'
            }`}
            title={labels.desktop}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-[#F7F7F5] rounded-xl p-4">
        {platform === 'facebook' ? (
          <FacebookPreview text={text} imageUrl={imageUrl} isMobile={viewMode === 'mobile'} />
        ) : (
          <InstagramPreview text={text} imageUrl={imageUrl} isMobile={viewMode === 'mobile'} />
        )}
      </div>
    </div>
  );
}
