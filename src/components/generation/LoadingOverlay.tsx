import { useState, useEffect } from 'react';
import type { GenerationProgress } from '../../types/generation';
import { useLanguage } from '../../contexts/LanguageContext';

interface LoadingOverlayProps {
  progress: GenerationProgress;
  onCancel: () => void;
}

// Map progress stages to percentages
const progressToPercent: Record<GenerationProgress, number> = {
  'sending': 5,
  'generating-1': 25,
  'generating-2': 55,
  'generating-3': 85,
  'complete': 100
};

export function LoadingOverlay({ progress, onCancel }: LoadingOverlayProps) {
  const { t } = useLanguage();
  const [tip, setTip] = useState('');
  const [displayPercent, setDisplayPercent] = useState(0);

  // Pick a random tip on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * t.tips.length);
    setTip(t.tips[randomIndex]);
  }, [t.tips]);

  // Animate percentage counter
  useEffect(() => {
    const targetPercent = progressToPercent[progress] || 0;
    const step = targetPercent > displayPercent ? 1 : -1;

    if (displayPercent !== targetPercent) {
      const timer = setInterval(() => {
        setDisplayPercent(prev => {
          const next = prev + step;
          if ((step > 0 && next >= targetPercent) || (step < 0 && next <= targetPercent)) {
            clearInterval(timer);
            return targetPercent;
          }
          return next;
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [progress, displayPercent]);

  // Get progress message based on current stage
  const getProgressMessage = () => {
    switch (progress) {
      case 'sending':
        return t.loading.sending;
      case 'generating-1':
      case 'generating-2':
        return t.loading.generating;
      case 'generating-3':
        return t.loading.almostDone;
      case 'complete':
        return t.loading.complete;
      default:
        return t.loading.sending;
    }
  };

  const percent = progressToPercent[progress] || 0;
  const circumference = 2 * Math.PI * 70; // radius = 70
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-[#E5E5E3] rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl animate-slide-up">
        {/* Circular progress */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background track */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#EFEFED"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#FF6B35"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-[#1A1A1A]">
                {displayPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Progress message */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-[#1A1A1A]">
            {getProgressMessage()}
          </p>
          <p className="text-sm text-[#999999] mt-1">
            {progress === 'generating-3' ? '~20s' : progress === 'generating-2' ? '~40s' : progress === 'generating-1' ? '~60s' : ''}
          </p>
        </div>

        {/* Tip */}
        <div className="bg-[#F7F7F5] border border-[#E5E5E3] p-4 rounded-xl mb-6">
          <p className="text-sm text-[#666666] text-center">
            {tip}
          </p>
        </div>

        {/* Cancel button */}
        <button
          onClick={onCancel}
          className="w-full py-3 px-4 bg-white hover:bg-[#F7F7F5] border border-[#E5E5E3] hover:border-[#D4D4D2] text-[#666666] hover:text-[#1A1A1A] font-medium rounded-full transition-all"
        >
          {t.actions.cancel}
        </button>
      </div>
    </div>
  );
}
