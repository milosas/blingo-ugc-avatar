import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useGallery } from '../hooks/useGallery';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { GalleryLightbox } from '../components/gallery/GalleryLightbox';
import { EmptyState } from '../components/gallery/EmptyState';
import { AuthButton } from '../components/auth/AuthButton';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { LoginModal } from '../components/auth/LoginModal';

export default function Gallery() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const { images, loading: galleryLoading, error, deleteImage, refresh } = useGallery();
  const navigate = useNavigate();

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Login modal state for guest users
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Combined loading state
  const loading = authLoading || galleryLoading;

  // Handle delete with lightbox index adjustment
  const handleDelete = async (imageId: string, storagePath: string) => {
    const currentIndex = lightboxIndex;
    const totalImages = images.length;

    await deleteImage(imageId, storagePath);

    // Adjust lightbox index after delete
    if (currentIndex >= 0 && totalImages > 1) {
      // If we deleted the last image, move to previous
      if (currentIndex >= totalImages - 1) {
        setLightboxIndex(currentIndex - 1);
      }
      // Otherwise index stays the same (next image shifts into place)
    } else if (totalImages <= 1) {
      // No more images, close lightbox
      setLightboxIndex(-1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <PageHeader />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          </div>
        </main>
      </div>
    );
  }

  // Guest user - show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <PageHeader />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <EmptyState type="guest" onAction={() => setIsLoginModalOpen(true)} />
          </div>
        </main>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <PageHeader />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-red-600 mb-4">{t.gallery?.error || 'Failed to load gallery'}</p>
              <button
                onClick={refresh}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {t.actions?.regenerate || 'Try Again'}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // No images - show empty state
  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <PageHeader />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <EmptyState type="empty" onAction={() => navigate('/')} />
          </div>
        </main>
      </div>
    );
  }

  // Gallery with images
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <PageHeader />
      <main className="max-w-5xl mx-auto px-4 py-8">
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
      </main>
    </div>
  );
}

// Page header component
function PageHeader() {
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t.gallery?.title || 'My Gallery'}
            </h1>
            <Link
              to="/"
              className="mt-1 text-indigo-600 hover:text-indigo-700 text-sm inline-flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {t.gallery?.actions?.back || 'Back to Generator'}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <AuthButton />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
