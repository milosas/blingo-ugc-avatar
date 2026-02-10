import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useCustomAvatars } from '../hooks/useCustomAvatars';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { LoginModal } from '../components/auth/LoginModal';
import { AvatarDescriptionEditor } from '../components/avatars/AvatarDescriptionEditor';
import { AvatarCreatorModal } from '../components/avatars/AvatarCreatorModal';
import type { CustomAvatar } from '../types/database';

export default function Avatars() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const { avatars, loading: avatarsLoading, createAvatar, deleteAvatar, refresh } = useCustomAvatars();
  const navigate = useNavigate();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState<CustomAvatar | null>(null);
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loading = authLoading || avatarsLoading;

  const handleSelectAvatar = (avatarId: string) => {
    navigate(`/?selectAvatar=${avatarId}`);
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert(t.avatarsPage?.invalidFileType || 'Only JPEG and PNG files are allowed');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(t.avatarsPage?.fileTooLarge || 'File size must be less than 10MB');
      return;
    }

    try {
      await createAvatar(file);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`${t.avatarsPage?.uploadFailed || 'Failed to upload avatar'}: ${errorMessage}`);
    }

    e.target.value = '';
  };

  const handleDelete = async (avatarId: string, storagePath: string) => {
    try {
      await deleteAvatar(avatarId, storagePath);
    } catch (error) {
      console.error('Failed to delete avatar:', error);
    }
  };

  if (loading) {
    return (
      <div className="page-enter max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="w-12 h-12 rounded-full border-2 border-[#FF6B35] border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-enter max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
          {t.avatarsPage?.title || 'My Avatars'}
        </h1>
        <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF0EB] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-[#666666] mb-4">
              {t.avatarsPage?.loginRequired || 'Log in to manage your custom avatars'}
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 bg-[#FF6B35] text-white rounded-full hover:bg-[#E55A2B] transition-all"
            >
              {t.auth?.signIn || 'Sign In'}
            </button>
          </div>
        </div>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="page-enter max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
        {t.avatarsPage?.title || 'My Avatars'}
      </h1>
      <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
        {/* Header with add button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[#999999] text-sm">
              {avatars.length > 0
                ? `${avatars.length} ${t.avatarsPage?.avatarCount || 'avatar(s)'}`
                : t.avatarsPage?.noAvatars || 'No avatars yet'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddClick}
              className="px-4 py-2 bg-[#F7F7F5] text-[#1A1A1A] border border-[#E5E5E3] rounded-full hover:bg-[#EFEFED] transition-all flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t.avatarCreator?.uploadPhoto || 'Upload photo'}
            </button>
            <button
              onClick={() => setShowCreatorModal(true)}
              className="px-4 py-2 bg-[#FF6B35] text-white rounded-full hover:bg-[#E55A2B] transition-all flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t.avatarCreator?.createAvatar || 'Create avatar'}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Empty state */}
        {avatars.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF0EB] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[#1A1A1A] mb-2">
              {t.avatarsPage?.emptyTitle || 'No custom avatars yet'}
            </p>
            <p className="text-[#999999] text-sm mb-4">
              {t.avatarsPage?.emptyHint || 'Upload your photos or artwork to use as avatars in generation'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAddClick}
                className="px-4 py-2 bg-[#F7F7F5] text-[#1A1A1A] border border-[#E5E5E3] rounded-full hover:bg-[#EFEFED] transition-all text-sm"
              >
                {t.avatarCreator?.uploadPhoto || 'Upload photo'}
              </button>
              <button
                onClick={() => setShowCreatorModal(true)}
                className="px-4 py-2 bg-[#FF6B35] text-white rounded-full hover:bg-[#E55A2B] transition-all text-sm"
              >
                {t.avatarCreator?.createAvatar || 'Create avatar'}
              </button>
            </div>
          </div>
        )}

        {/* Avatars grid */}
        {avatars.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {avatars.map((avatar) => (
              <AvatarCard
                key={avatar.id}
                avatar={avatar}
                onEdit={() => setEditingAvatar(avatar)}
                onDelete={() => handleDelete(avatar.id, avatar.storage_path)}
                onSelect={() => handleSelectAvatar(avatar.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Avatar creator modal */}
      <AvatarCreatorModal
        isOpen={showCreatorModal}
        onClose={() => setShowCreatorModal(false)}
      />

      {/* Description editor modal */}
      {editingAvatar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-[#E5E5E3] rounded-2xl max-w-md w-full mx-4 p-6 animate-slide-up shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1A1A1A]">
                {t.avatarsPage?.editDescription || 'Edit Description'}
              </h3>
              <button
                onClick={() => setEditingAvatar(null)}
                className="p-1 hover:bg-[#F7F7F5] rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-[#999999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <img
                src={editingAvatar.image_url}
                alt="Avatar"
                className="w-32 h-32 object-cover rounded-xl mx-auto"
              />
            </div>
            <AvatarDescriptionEditor
              avatarId={editingAvatar.id}
              initialDescription={editingAvatar.description || ''}
              isPending={editingAvatar.avatar_type === 'pending'}
              onSave={() => {
                refresh();
                setEditingAvatar(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Avatar card component
interface AvatarCardProps {
  avatar: CustomAvatar;
  onEdit: () => void;
  onDelete: () => Promise<void>;
  onSelect: () => void;
}

function AvatarCard({ avatar, onEdit, onDelete, onSelect }: AvatarCardProps) {
  const { t } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleCardClick = () => {
    if (!deleting && avatar.avatar_type !== 'pending') {
      setShowMenu(true);
    }
  };

  const handleCloseMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    setConfirming(false);
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }

    setDeleting(true);
    setShowMenu(false);
    try {
      await onDelete();
    } catch {
      setDeleting(false);
      setConfirming(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    onEdit();
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    onSelect();
  };

  const isPending = avatar.avatar_type === 'pending';

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden bg-[#F7F7F5] aspect-square cursor-pointer border border-[#E5E5E3] hover:border-[#D4D4D2] transition-all ${
        deleting ? 'animate-pulse opacity-50' : ''
      }`}
      onClick={handleCardClick}
    >
      <img
        src={avatar.image_url}
        alt="Custom avatar"
        className="w-full h-full object-cover"
      />

      {isPending && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white border border-[#E5E5E3] rounded-xl px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-[#FF6B35] border-t-transparent animate-spin" />
              <span className="text-[#666666] text-sm">{t.avatarsPage?.analyzing || 'Analyzing...'}</span>
            </div>
          </div>
        </div>
      )}

      {showMenu && !isPending && (
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2 p-3"
          onClick={handleCloseMenu}
        >
          <button
            onClick={handleSelectClick}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-[#FF6B35] rounded-xl hover:bg-[#E55A2B] transition-all text-white text-sm font-medium min-h-[44px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t.avatarsPage?.selectForGenerator || 'Use in generator'}
          </button>

          <button
            onClick={handleEditClick}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition-all text-white text-sm font-medium min-h-[44px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {t.avatarsPage?.edit || 'Edit'}
          </button>

          <button
            onClick={handleDeleteClick}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all text-sm font-medium min-h-[44px] ${
              confirming
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-white/20 hover:bg-red-500/50 text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {confirming ? (t.avatarsPage?.confirmDelete || 'Confirm delete') : (t.avatarsPage?.delete || 'Delete')}
          </button>
        </div>
      )}

      {avatar.description && !isPending && !showMenu && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-white text-sm line-clamp-2">{avatar.description}</p>
        </div>
      )}
    </div>
  );
}
