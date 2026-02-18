import type { AvatarModel, CustomAvatar } from '../../types/database';
import type { Avatar } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ModelCardProps {
  model: AvatarModel;
  isExpanded: boolean;
  selectedPhotoId: string | null;
  onToggleExpand: () => void;
  onSelectPhoto: (avatar: Avatar) => void;
  onAddPhoto?: (modelId: string) => void;
}

function photoToAvatar(photo: CustomAvatar, modelName: string): Avatar {
  return {
    id: photo.id,
    name: modelName,
    description: photo.description || modelName,
    imageUrl: photo.image_url,
    promptDescription: photo.description || 'the person shown in the reference image',
    isCustom: true,
  };
}

export function ModelCard({
  model,
  isExpanded,
  selectedPhotoId,
  onToggleExpand,
  onSelectPhoto,
  onAddPhoto,
}: ModelCardProps) {
  const { t } = useLanguage();
  const photos = model.photos || [];
  const coverPhoto = photos.find(p => p.id === model.cover_photo_id) || photos[0];
  const isModelSelected = photos.some(p => p.id === selectedPhotoId);

  return (
    <div
      className={`rounded-xl border-2 transition-all overflow-hidden ${
        isModelSelected
          ? 'border-[#FF6B35] bg-[#FFF0EB]'
          : 'border-[#E5E5E3] bg-white hover:border-[#D4D4D2]'
      }`}
    >
      {/* Collapsed header */}
      <button
        onClick={onToggleExpand}
        className="w-full flex items-center gap-2 p-2 text-left"
      >
        {/* Cover thumbnail */}
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F7F7F5] flex-shrink-0">
          {coverPhoto ? (
            <img
              src={coverPhoto.image_url}
              alt={model.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#999999]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>

        {/* Name + count */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#1A1A1A] truncate">{model.name}</p>
          <p className="text-xs text-[#999999]">{photos.length}/5 {t.avatarModels?.photosCount || 'nuotraukos'}</p>
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-[#999999] transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded photo strip */}
      {isExpanded && (
        <div className="px-2 pb-2">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {photos.map((photo) => {
              const isSelected = photo.id === selectedPhotoId;
              return (
                <button
                  key={photo.id}
                  onClick={() => onSelectPhoto(photoToAvatar(photo, model.name))}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    isSelected
                      ? 'border-[#FF6B35] ring-2 ring-[#FF6B35] ring-offset-1'
                      : 'border-transparent hover:border-[#D4D4D2]'
                  }`}
                >
                  <img
                    src={photo.image_url}
                    alt={photo.description || model.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {isSelected && (
                    <div className="absolute top-0.5 right-0.5 bg-[#FF6B35] rounded-full p-0.5">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}

            {/* Add photo button */}
            {photos.length < 5 && onAddPhoto && (
              <button
                onClick={() => onAddPhoto(model.id)}
                className="flex-shrink-0 w-16 h-16 rounded-lg border-2 border-dashed border-[#D4D4D2] hover:border-[#FF6B35] hover:bg-[#FFF0EB] transition-all flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-[#999999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
