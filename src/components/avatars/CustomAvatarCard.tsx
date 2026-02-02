import { useState, useEffect, useRef } from 'react';
import type { CustomAvatar } from '../../types/database';

interface CustomAvatarCardProps {
  avatar: CustomAvatar;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => Promise<void>;
}

export function CustomAvatarCard({
  avatar,
  isSelected,
  onSelect,
  onDelete,
}: CustomAvatarCardProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const confirmTimeoutRef = useRef<number | null>(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (confirmTimeoutRef.current) {
        clearTimeout(confirmTimeoutRef.current);
      }
    };
  }, []);

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirming) {
      // First click - start confirmation
      setConfirming(true);
      confirmTimeoutRef.current = window.setTimeout(() => {
        setConfirming(false);
      }, 3000);
      return;
    }

    // Second click - perform delete
    if (confirmTimeoutRef.current) {
      clearTimeout(confirmTimeoutRef.current);
    }
    setDeleting(true);

    try {
      await onDelete();
    } catch (error) {
      // Error is handled by parent, reset state
      setDeleting(false);
      setConfirming(false);
    }
  };

  const handleCardClick = () => {
    if (!deleting) {
      onSelect();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Show placeholder icon if image fails to load
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <div
      className={`group relative p-2 rounded-lg border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-200 hover:border-gray-300'
      } ${deleting ? 'animate-fade-out' : ''}`}
      onClick={handleCardClick}
    >
      {/* Image area */}
      <div className="aspect-square bg-gray-100 rounded-md overflow-hidden relative">
        <img
          src={avatar.image_url}
          alt="Custom avatar"
          className="w-full h-full object-cover"
          onError={handleImageError}
        />

        {/* Hover overlay with delete button */}
        <div className="card-actions absolute inset-0 bg-black/40 flex items-center justify-center">
          <button
            onClick={handleDeleteClick}
            className={`p-2 rounded-full transition-colors ${
              confirming
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-white hover:bg-gray-100'
            }`}
            title={confirming ? 'Click again to confirm' : 'Delete avatar'}
          >
            {confirming ? (
              <span className="text-white text-xs font-medium px-1">Confirm</span>
            ) : (
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
