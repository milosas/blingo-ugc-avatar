interface EmptyStateProps {
  type: 'guest' | 'empty';
  onAction: () => void;
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const isGuest = type === 'guest';

  const title = isGuest
    ? 'Sign in to see your gallery'
    : 'No images yet';

  const subtitle = isGuest
    ? 'Create an account to save and manage your generated images'
    : 'Generate your first image to start your gallery';

  const buttonText = isGuest ? 'Sign In' : 'Generate Image';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Illustration - Gallery icon */}
      <div className="mb-6">
        <svg
          className="w-24 h-24 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-gray-500 mb-6 text-center max-w-sm">
        {subtitle}
      </p>

      {/* CTA Button */}
      <button
        onClick={onAction}
        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {buttonText}
      </button>
    </div>
  );
}
