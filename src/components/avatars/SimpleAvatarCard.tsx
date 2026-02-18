import type { CustomAvatar } from '../../types/database';

interface SimpleAvatarCardProps {
  avatar: CustomAvatar;
  isSelected: boolean;
  onSelect: () => void;
}

/**
 * Simple avatar card for ConfigPanel - just selection, no lightbox/menu.
 * For full management (delete, notes), use the Avatars page.
 */
export function SimpleAvatarCard({
  avatar,
  isSelected,
  onSelect,
}: SimpleAvatarCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <div
      className={`group relative p-2 rounded-xl border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-[#FF6B35] bg-[#FFF0EB] ring-2 ring-[#FF6B35] ring-offset-1 ring-offset-white'
          : 'border-[#E5E5E3] hover:border-[#D4D4D2] bg-white'
      }`}
      onClick={onSelect}
    >
      {/* Checkmark overlay when selected */}
      {isSelected && (
        <div className="absolute top-1 right-1 z-10 bg-[#FF6B35] rounded-full p-0.5 shadow-sm">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Image area */}
      <div className="aspect-square bg-[#F7F7F5] rounded-lg overflow-hidden">
        <img
          src={avatar.image_url}
          alt="Custom avatar"
          className="w-full h-full object-cover object-top"
          onError={handleImageError}
        />
      </div>
    </div>
  );
}
