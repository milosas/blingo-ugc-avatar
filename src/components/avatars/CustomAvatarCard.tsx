import { useState, useEffect, useRef } from 'react';
import type { CustomAvatar } from '../../types/database';
import { useLanguage } from '../../contexts/LanguageContext';

interface CustomAvatarCardProps {
  avatar: CustomAvatar;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => Promise<void>;
  onEditDescription?: (description: string) => Promise<void>;
}

type LightboxState = 'closed' | 'enlarged' | 'menu';

export function CustomAvatarCard({
  avatar,
  isSelected,
  onSelect,
  onDelete,
  onEditDescription,
}: CustomAvatarCardProps) {
  const { t } = useLanguage();
  const [lightboxState, setLightboxState] = useState<LightboxState>('closed');
  const [deleting, setDeleting] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [description, setDescription] = useState(avatar.description || '');
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxState('closed');
        setEditingDescription(false);
      }
    };

    if (lightboxState !== 'closed') {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxState]);

  // Handle click on thumbnail - go to enlarged state OR select avatar
  const handleThumbnailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If not in lightbox, open enlarged view
    if (lightboxState === 'closed') {
      setLightboxState('enlarged');
    }
  };

  // Handle click on enlarged image - show menu
  const handleEnlargedImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxState === 'enlarged') {
      setLightboxState('menu');
    }
  };

  // Handle click on backdrop - close lightbox
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === lightboxRef.current) {
      setLightboxState('closed');
      setEditingDescription(false);
    }
  };

  // Handle select action from menu
  const handleSelectFromMenu = () => {
    onSelect();
    setLightboxState('closed');
  };

  // Handle delete action
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete();
      setLightboxState('closed');
    } catch (error) {
      setDeleting(false);
    }
  };

  // Handle description save
  const handleSaveDescription = async () => {
    if (onEditDescription) {
      try {
        await onEditDescription(description);
        setEditingDescription(false);
      } catch (error) {
        console.error('Failed to save description:', error);
      }
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <>
      {/* Thumbnail Card */}
      <div
        className={`group relative p-2 rounded-xl border-2 transition-all cursor-pointer ${
          isSelected
            ? 'border-[#FF6B35] bg-[#FFF0EB] ring-2 ring-[#FF6B35] ring-offset-1 ring-offset-white'
            : 'border-[#E5E5E3] hover:border-[#D4D4D2] bg-white'
        }`}
        onClick={handleThumbnailClick}
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

        {/* Magnify hint on hover */}
        <div className="card-actions absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none rounded-xl">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxState !== 'closed' && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-lg w-full mx-4">
            {/* Enlarged Image */}
            <div
              className={`relative bg-white rounded-xl overflow-hidden shadow-2xl transition-all ${
                lightboxState === 'menu' ? 'ring-2 ring-[#FF6B35]' : ''
              }`}
              onClick={handleEnlargedImageClick}
            >
              <img
                src={avatar.image_url}
                alt="Custom avatar"
                className="w-full h-auto max-h-[70vh] object-cover object-top cursor-pointer"
              />

              {/* Tap hint when enlarged but not showing menu */}
              {lightboxState === 'enlarged' && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
                  {t.customAvatars?.tapForOptions || 'Tap for options'}
                </div>
              )}
            </div>

            {/* Menu Panel - shows below image when in menu state */}
            {lightboxState === 'menu' && (
              <div className="mt-3 bg-white rounded-xl shadow-xl p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                {/* Select button */}
                <button
                  onClick={handleSelectFromMenu}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-[#FFF0EB] text-[#FF6B35]'
                      : 'bg-[#F7F7F5] hover:bg-[#FFF0EB] text-[#666666] hover:text-[#FF6B35]'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">
                    {isSelected
                      ? (t.customAvatars?.selected || 'Selected')
                      : (t.customAvatars?.selectAvatar || 'Select this avatar')}
                  </span>
                </button>

                {/* Description/Notes section */}
                <div className="border-t border-[#E5E5E3] pt-3">
                  <label className="block text-sm font-medium text-[#666666] mb-1">
                    {t.customAvatars?.notes || 'Notes'}
                  </label>
                  {editingDescription ? (
                    <div className="space-y-2">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={t.customAvatars?.descriptionPlaceholder || 'Describe this avatar...'}
                        className="w-full px-3 py-2 bg-white border border-[#E5E5E3] rounded-lg focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] text-[#1A1A1A] placeholder-[#999999] text-sm resize-none"
                        rows={3}
                        maxLength={200}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveDescription}
                          className="flex-1 px-3 py-2 bg-[#FF6B35] text-white rounded-lg text-sm font-medium hover:bg-[#E55A2B] transition-colors"
                        >
                          {t.customAvatars?.save || 'Save'}
                        </button>
                        <button
                          onClick={() => {
                            setEditingDescription(false);
                            setDescription(avatar.description || '');
                          }}
                          className="px-3 py-2 bg-[#F7F7F5] text-[#666666] rounded-lg text-sm font-medium hover:bg-[#EFEFED] transition-colors"
                        >
                          {t.customAvatars?.cancel || 'Cancel'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingDescription(true)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#F7F7F5] hover:bg-[#EFEFED] text-[#666666] transition-colors text-left"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="truncate">
                        {avatar.description || (t.customAvatars?.addDescription || 'Add description...')}
                      </span>
                    </button>
                  )}
                </div>

                {/* Delete button */}
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors disabled:opacity-50"
                >
                  {deleting ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                  <span className="font-medium">
                    {deleting
                      ? (t.customAvatars?.deleting || 'Deleting...')
                      : (t.customAvatars?.delete || 'Delete avatar')}
                  </span>
                </button>

                {/* Close hint */}
                <p className="text-center text-xs text-[#999999]">
                  {t.customAvatars?.clickOutsideToClose || 'Click outside to close'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
