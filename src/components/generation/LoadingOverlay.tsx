import { useState, useEffect } from 'react';
import type { GenerationProgress } from '../../types/generation';
import { useLanguage } from '../../contexts/LanguageContext';

interface LoadingOverlayProps {
  progress: GenerationProgress;
  onCancel: () => void;
}

export function LoadingOverlay({ progress, onCancel }: LoadingOverlayProps) {
  const { t } = useLanguage();
  const [tip, setTip] = useState('');

  // Pick a random tip on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * t.tips.length);
    setTip(t.tips[randomIndex]);
  }, [t.tips]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 animate-slide-up">
        {/* Progress bar */}
        <div className="mb-6">
          <progress
            className="w-full h-2 rounded-full [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-blue-600 [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-blue-600 [&::-moz-progress-bar]:rounded-full"
          />
        </div>

        {/* Progress message */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            {getProgressMessage()}
          </p>
        </div>

        {/* Tip */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 text-center">
            {tip}
          </p>
        </div>

        {/* Cancel button */}
        <button
          onClick={onCancel}
          className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
        >
          {t.actions.cancel}
        </button>
      </div>
    </div>
  );
}
