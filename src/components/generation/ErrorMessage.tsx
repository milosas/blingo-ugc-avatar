import { useEffect } from 'react';
import type { ErrorType } from '../../types/generation';
import { UI_TEXT } from '../../constants/ui';

interface ErrorMessageProps {
  errorType: ErrorType;
  onDismiss: () => void;
}

export function ErrorMessage({ errorType, onDismiss }: ErrorMessageProps) {
  // Map error type to message
  const getErrorMessage = () => {
    switch (errorType) {
      case 'TIMEOUT':
        return UI_TEXT.errors.timeout;
      case 'NETWORK':
        return UI_TEXT.errors.network;
      case 'API_ERROR':
        return UI_TEXT.errors.api;
      default:
        return UI_TEXT.errors.default;
    }
  };

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
        {/* Error header */}
        <div className="flex items-center gap-3 mb-4">
          {/* Error icon */}
          <div className="text-4xl">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900">Klaida</h2>
        </div>

        {/* Error message */}
        <p className="text-gray-700">
          {getErrorMessage()}
        </p>
      </div>
    </div>
  );
}
