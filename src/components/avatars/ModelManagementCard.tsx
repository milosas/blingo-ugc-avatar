import { useState, useRef } from 'react';
import type { AvatarModel, CustomAvatar } from '../../types/database';
import { useLanguage } from '../../contexts/LanguageContext';

interface ModelManagementCardProps {
  model: AvatarModel;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRename: (modelId: string, name: string) => Promise<void>;
  onDeleteModel: (modelId: string) => Promise<void>;
  onDeletePhoto: (photoId: string, storagePath: string, modelId: string) => Promise<void>;
  onSetCover: (modelId: string, photoId: string) => Promise<void>;
}

export function ModelManagementCard({
  model,
  isExpanded,
  onToggleExpand,
  onRename,
  onDeleteModel,
  onDeletePhoto,
  onSetCover,
}: ModelManagementCardProps) {
  const { t } = useLanguage();
  const photos = model.photos || [];
  const coverPhoto = photos.find(p => p.id === model.cover_photo_id) || photos[0];

  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(model.name);
  const [confirmingDeleteModel, setConfirmingDeleteModel] = useState(false);
  const [activePhotoMenu, setActivePhotoMenu] = useState<string | null>(null);
  const [confirmingDeletePhoto, setConfirmingDeletePhoto] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<CustomAvatar | null>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const handleRenameSubmit = async () => {
    if (renameValue.trim() && renameValue.trim() !== model.name) {
      await onRename(model.id, renameValue.trim());
    }
    setIsRenaming(false);
  };

  const handleDeleteModel = async () => {
    if (!confirmingDeleteModel) {
      setConfirmingDeleteModel(true);
      setTimeout(() => setConfirmingDeleteModel(false), 3000);
      return;
    }
    await onDeleteModel(model.id);
  };

  const handleDeletePhoto = async (photo: CustomAvatar) => {
    if (confirmingDeletePhoto !== photo.id) {
      setConfirmingDeletePhoto(photo.id);
      setTimeout(() => setConfirmingDeletePhoto(null), 3000);
      return;
    }
    await onDeletePhoto(photo.id, photo.storage_path, model.id);
    setActivePhotoMenu(null);
    setConfirmingDeletePhoto(null);
  };

  return (
    <div
      className="rounded-2xl border-2 border-[#E5E5E3] bg-white hover:border-[#D4D4D2] transition-all overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        {/* Cover thumbnail */}
        <button onClick={onToggleExpand} className="flex-shrink-0">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F7F7F5]">
            {coverPhoto ? (
              <img
                src={coverPhoto.image_url}
                alt={model.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#999999]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        </button>

        {/* Name + count */}
        <button onClick={onToggleExpand} className="flex-1 min-w-0 text-left">
          {isRenaming ? (
            <input
              ref={renameInputRef}
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameSubmit();
                if (e.key === 'Escape') setIsRenaming(false);
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full text-sm font-medium text-[#1A1A1A] bg-transparent border-b border-[#FF6B35] outline-none"
              autoFocus
            />
          ) : (
            <p className="text-sm font-medium text-[#1A1A1A] truncate">{model.name}</p>
          )}
          <p className="text-xs text-[#999999]">{photos.length}/5 {t.avatarModels?.photosCount || 'nuotraukos'}</p>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => { setIsRenaming(true); setRenameValue(model.name); }}
            className="p-1.5 rounded-lg hover:bg-[#F7F7F5] transition-colors"
            title={t.avatarModels?.renameModel || 'Rename'}
          >
            <svg className="w-4 h-4 text-[#999999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDeleteModel}
            className={`p-1.5 rounded-lg transition-colors ${
              confirmingDeleteModel
                ? 'bg-red-500 text-white'
                : 'hover:bg-red-50 text-[#999999] hover:text-red-500'
            }`}
            title={confirmingDeleteModel ? (t.avatarsPage?.confirmDelete || 'Confirm') : (t.avatarModels?.deleteModel || 'Delete')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          {/* Expand chevron */}
          <button onClick={onToggleExpand} className="p-1.5">
            <svg
              className={`w-4 h-4 text-[#999999] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded photo strip */}
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-[#E5E5E3] pt-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {photos.map((photo) => {
              const isCover = photo.id === model.cover_photo_id;
              return (
                <div
                  key={photo.id}
                  className="relative flex-shrink-0 cursor-pointer"
                  onClick={() => setPreviewPhoto(photo)}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#E5E5E3] hover:ring-2 hover:ring-[#FF6B35]/40 transition-all">
                    <img
                      src={photo.image_url}
                      alt={photo.description || model.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>

                  {/* Cover badge */}
                  {isCover && (
                    <div className="absolute top-0.5 left-0.5 bg-[#FF6B35] rounded-full px-1.5 py-0.5 pointer-events-none">
                      <span className="text-[8px] text-white font-bold">COVER</span>
                    </div>
                  )}

                  {/* Photo menu button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setActivePhotoMenu(activePhotoMenu === photo.id ? null : photo.id); }}
                    className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>

                  {/* Photo context menu */}
                  {activePhotoMenu === photo.id && (
                    <div className="absolute top-7 right-0 z-20 bg-white border border-[#E5E5E3] rounded-xl shadow-lg py-1 min-w-[140px]" onClick={(e) => e.stopPropagation()}>
                      {!isCover && (
                        <button
                          onClick={() => { onSetCover(model.id, photo.id); setActivePhotoMenu(null); }}
                          className="w-full px-3 py-1.5 text-left text-xs text-[#1A1A1A] hover:bg-[#F7F7F5] transition-colors"
                        >
                          {t.avatarModels?.setCover || 'Set as cover'}
                        </button>
                      )}
                      <button
                        onClick={() => handleDeletePhoto(photo)}
                        className={`w-full px-3 py-1.5 text-left text-xs transition-colors ${
                          confirmingDeletePhoto === photo.id
                            ? 'text-red-600 bg-red-50'
                            : 'text-red-500 hover:bg-red-50'
                        }`}
                      >
                        {confirmingDeletePhoto === photo.id
                          ? (t.avatarsPage?.confirmDelete || 'Confirm')
                          : (t.avatarsPage?.delete || 'Delete')}
                      </button>

                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>
      )}

      {/* Photo lightbox preview */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <div className="relative max-w-lg max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewPhoto.image_url}
              alt={previewPhoto.description || model.name}
              className="w-full h-auto max-h-[85vh] object-cover object-top rounded-2xl"
            />
            {previewPhoto.description && (
              <p className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent text-white text-sm rounded-b-2xl">
                {previewPhoto.description}
              </p>
            )}
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
