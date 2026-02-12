import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGallery } from '../hooks/useGallery';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { GalleryLightbox } from '../components/gallery/GalleryLightbox';
import { EmptyState } from '../components/gallery/EmptyState';
import { LoginModal } from '../components/auth/LoginModal';

export default function Gallery() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const { images, loading: galleryLoading, error, deleteImage, refresh } = useGallery();
  const navigate = useNavigate();

  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const loading = authLoading || galleryLoading;

  const handleDelete = async (imageId: string, storagePath: string) => {
    const currentIndex = lightboxIndex;
    const totalImages = images.length;

    await deleteImage(imageId, storagePath);

    if (currentIndex >= 0 && totalImages > 1) {
      if (currentIndex >= totalImages - 1) {
        setLightboxIndex(currentIndex - 1);
      }
    } else if (totalImages <= 1) {
      setLightboxIndex(-1);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="w-12 h-12 rounded-full border-2 border-[#FF6B35] border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
          {t.gallery?.title || 'My Gallery'}
        </h1>
        <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
          <EmptyState type="guest" onAction={() => setIsLoginModalOpen(true)} />
        </div>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
          {t.gallery?.title || 'My Gallery'}
        </h1>
        <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-red-500 mb-4">{t.gallery?.error || 'Failed to load gallery'}</p>
            <button
              onClick={refresh}
              className="px-6 py-3 bg-[#FF6B35] text-white rounded-full hover:bg-[#E55A2B] transition-all"
            >
              {t.actions?.regenerate || 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
          {t.gallery?.title || 'My Gallery'}
        </h1>
        <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
          <EmptyState type="empty" onAction={() => navigate('/')} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
          {t.gallery?.title || 'My Gallery'}
        </h1>
        <div className="flex items-center gap-3">
          <p className="text-[#999999] text-sm">
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </p>
          <button
            onClick={refresh}
            className="p-2 text-[#999999] hover:text-[#1A1A1A] hover:bg-[#F7F7F5] rounded-lg transition-all"
            title="Refresh"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      <GalleryGrid
        images={images}
        onImageClick={(index) => setLightboxIndex(index)}
        onDelete={handleDelete}
      />
      <GalleryLightbox
        images={images}
        open={lightboxIndex >= 0}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        onClose={() => setLightboxIndex(-1)}
        onIndexChange={setLightboxIndex}
        onDelete={handleDelete}
      />
    </div>
  );
}
