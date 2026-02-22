import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGallery } from '../hooks/useGallery';
import { usePostProcess } from '../hooks/usePostProcess';
import { useSupabaseStorage } from '../hooks/useSupabaseStorage';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { GalleryLightbox } from '../components/gallery/GalleryLightbox';
import { EmptyState } from '../components/gallery/EmptyState';
import { PostProcessToolbar } from '../components/generation/PostProcessToolbar';
import { LoginModal } from '../components/auth/LoginModal';

export default function Gallery() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const { images, loading: galleryLoading, error, deleteImage, refresh } = useGallery();
  const navigate = useNavigate();

  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Editing state
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const postProcess = usePostProcess();
  const [postProcessResult, setPostProcessResult] = useState<{ url: string; base64?: string } | null>(null);
  const editSectionRef = useRef<HTMLDivElement>(null);
  const { saveGeneratedImage } = useSupabaseStorage();

  const loading = authLoading || galleryLoading;

  // Scroll to edit section when it appears
  useEffect(() => {
    if (editingIndex !== null && editSectionRef.current) {
      editSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [editingIndex]);

  const handleDelete = async (imageId: string, storagePath: string) => {
    const currentIndex = lightboxIndex;
    const totalImages = images.length;

    // Clear editing if deleted image was being edited
    if (editingIndex !== null) {
      const deletedIndex = images.findIndex(img => img.id === imageId);
      if (deletedIndex === editingIndex) {
        setEditingIndex(null);
        setPostProcessResult(null);
        postProcess.reset();
      } else if (deletedIndex < editingIndex) {
        setEditingIndex(editingIndex - 1);
      }
    }

    await deleteImage(imageId, storagePath);

    if (currentIndex >= 0 && totalImages > 1) {
      if (currentIndex >= totalImages - 1) {
        setLightboxIndex(currentIndex - 1);
      }
    } else if (totalImages <= 1) {
      setLightboxIndex(-1);
    }
  };

  const handleCreatePost = (index: number) => {
    const image = images[index];
    if (image) {
      navigate('/post-creator', { state: { galleryImageUrl: image.image_url, galleryImageId: image.id } });
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setPostProcessResult(null);
    postProcess.reset();
  };

  const handleCloseEdit = () => {
    setEditingIndex(null);
    setPostProcessResult(null);
    postProcess.reset();
  };

  const getEditingImageUrl = (): string | null => {
    if (editingIndex === null || !images[editingIndex]) return null;
    return images[editingIndex].image_url;
  };

  const saveAndRefresh = async (result: { url: string; base64?: string }, prompt: string) => {
    if (!user) return;
    try {
      await saveGeneratedImage({
        imageUrl: result.url,
        imageBase64: result.base64,
        prompt,
        config: { type: 'post-process' }
      });
      refresh();
    } catch (err) {
      console.error('Failed to save post-processed image:', err);
    }
  };

  const handleBackground = async (prompt: string) => {
    const sourceUrl = getEditingImageUrl();
    if (!sourceUrl) return;
    const result = await postProcess.process('background', sourceUrl, { backgroundPrompt: prompt });
    if (result) {
      setPostProcessResult(result);
      await saveAndRefresh(result, `background: ${prompt}`);
    }
  };

  const handlePose = async (prompt: string) => {
    const sourceUrl = getEditingImageUrl();
    if (!sourceUrl) return;
    const result = await postProcess.process('edit', sourceUrl, { editPrompt: prompt });
    if (result) {
      setPostProcessResult(result);
      await saveAndRefresh(result, `pose: ${prompt}`);
    }
  };

  const handleEditPrompt = async (prompt: string) => {
    const sourceUrl = getEditingImageUrl();
    if (!sourceUrl) return;
    const result = await postProcess.process('edit', sourceUrl, { editPrompt: prompt });
    if (result) {
      setPostProcessResult(result);
      await saveAndRefresh(result, `edit: ${prompt}`);
    }
  };

  const pp = (t as Record<string, unknown>).postProcess as Record<string, string> | undefined;

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

  const editingImage = editingIndex !== null ? images[editingIndex] : null;

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
        onEdit={handleEdit}
        onCreatePost={handleCreatePost}
      />

      {/* Edit section — appears when Edit icon is clicked on a photo */}
      {editingImage && (
        <div ref={editSectionRef} className="mt-8">
          {/* Editing header with preview */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F7F7F5] flex-shrink-0 ring-2 ring-[#FF6B35]">
              <img
                src={editingImage.image_url}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#1A1A1A]">
                {pp?.title || 'Redaguoti nuotrauką'}
              </h3>
            </div>
            <button
              onClick={handleCloseEdit}
              className="p-2 text-[#999999] hover:text-[#1A1A1A] hover:bg-[#F7F7F5] rounded-lg transition-colors"
              title={t.actions?.cancel || 'Uždaryti'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Post-process result */}
          {postProcessResult && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-[#1A1A1A] mb-2">
                {pp?.result || 'Redaguota nuotrauka'}
              </h4>
              <div className="max-w-md">
                <img
                  src={postProcessResult.url}
                  alt="Post-processed result"
                  className="w-full h-auto rounded-lg ring-2 ring-[#FF6B35]"
                />
              </div>
            </div>
          )}

          {/* PostProcess toolbar */}
          <PostProcessToolbar
            isProcessing={postProcess.isProcessing}
            onBackground={handleBackground}
            onPose={handlePose}
            onEdit={handleEditPrompt}
          />

          {postProcess.error && (
            <p className="mt-2 text-sm text-red-500">{postProcess.error}</p>
          )}
        </div>
      )}

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
