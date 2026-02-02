import { useState, useEffect, useRef } from 'react';
import { AvatarDescriptionEditor } from './AvatarDescriptionEditor';
import type { CustomAvatar } from '../../types/database';

interface CustomAvatarCardProps {
  avatar: CustomAvatar;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateDescription: (description: string) => Promise<void>;
  onDelete: () => Promise<void>;
}

export function CustomAvatarCard({
  avatar,
  isSelected,
  onSelect,
  onUpdateDescription,
  onDelete,
}: CustomAvatarCardProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const confirmTimeoutRef = useRef<number | null>(null);

  const isPending = avatar.avatar_type === 'pending';

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

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditor(true);
  };

  const handleCardClick = () => {
    if (!showEditor && !deleting) {
      onSelect();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Show placeholder icon if image fails to load
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  // Truncate description for preview (first ~50 chars)
  const truncatedDescription = avatar.description
    ? avatar.description.length > 50
      ? avatar.description.substring(0, 50) + '...'
      : avatar.description
    : '';

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
      <div className="aspect-square bg-gray-100 rounded-md mb-1 overflow-hidden relative">
        <img
          src={avatar.image_url}
          alt="Custom avatar"
          className="w-full h-full object-cover"
          onError={handleImageError}
        />

        {/* Hover overlay */}
        <div className="card-actions absolute inset-0 bg-black/40 flex items-center justify-center gap-2">
          {/* Edit button */}
          <button
            onClick={handleEditClick}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            title="Edit description"
          >
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>

          {/* Delete button */}
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

      {/* Description preview */}
      <div className="text-xs text-gray-600 min-h-[2rem] line-clamp-2">
        {isPending ? (
          <span className="italic text-gray-400">Analyzing...</span>
        ) : (
          truncatedDescription || <span className="text-gray-400">No description</span>
        )}
      </div>

      {/* Description editor overlay */}
      {showEditor && (
        <div
          className="absolute inset-0 bg-white/95 flex items-center p-3 z-10 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <AvatarDescriptionEditor
            initialDescription={avatar.description || ''}
            isPending={isPending}
            onSave={async (description) => {
              await onUpdateDescription(description);
              setShowEditor(false);
            }}
            onClose={() => setShowEditor(false)}
          />
        </div>
      )}
    </div>
  );
}
