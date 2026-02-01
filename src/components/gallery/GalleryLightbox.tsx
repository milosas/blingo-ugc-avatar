import { useState, useCallback } from 'react';
import Lightbox, { useLightboxState, IconButton, createIcon } from 'yet-another-react-lightbox';
import Download from 'yet-another-react-lightbox/plugins/download';
import 'yet-another-react-lightbox/styles.css';
import type { GeneratedImage } from '../../types/database';
import { downloadImage } from '../../utils/download';

interface GalleryLightboxProps {
  images: GeneratedImage[];
  open: boolean;
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  onDelete: (imageId: string, storagePath: string) => Promise<void>;
}

// Custom delete icon
const DeleteIcon = createIcon(
  'DeleteIcon',
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    stroke="currentColor"
    fill="none"
    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
  />
);

// Custom download icon (for custom download handler)
const CustomDownloadIcon = createIcon(
  'CustomDownloadIcon',
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    stroke="currentColor"
    fill="none"
    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
  />
);

// Extended slide type with metadata
interface GallerySlide {
  src: string;
  alt: string;
  id: string;
  storagePath: string;
  notes?: string | null;
  download: string; // For download plugin
}

// Delete button component that uses lightbox state
interface DeleteButtonProps {
  slides: GallerySlide[];
  onDelete: (id: string, storagePath: string) => Promise<void>;
  onClose: () => void;
}

function DeleteButton({ slides, onDelete, onClose }: DeleteButtonProps) {
  const { currentIndex } = useLightboxState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentSlide = slides[currentIndex];

  const handleClick = useCallback(async () => {
    if (!currentSlide) return;

    if (!confirmDelete) {
      setConfirmDelete(true);
      // Auto-reset confirmation after 3 seconds
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }

    // Confirmed - perform delete
    setIsDeleting(true);
    try {
      await onDelete(currentSlide.id, currentSlide.storagePath);
      // After delete, close if no more images, otherwise state will update
      if (slides.length <= 1) {
        onClose();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  }, [currentSlide, confirmDelete, onDelete, slides.length, onClose]);

  // Reset confirmation when slide changes
  const handleReset = useCallback(() => {
    setConfirmDelete(false);
  }, []);

  // We need to reset on index change - using a simple approach
  // by including currentIndex in the key to force re-render
  return (
    <IconButton
      key={`delete-${currentIndex}`}
      label={confirmDelete ? 'Confirm delete' : 'Delete'}
      icon={DeleteIcon}
      onClick={handleClick}
      disabled={isDeleting}
      style={{
        color: confirmDelete ? '#ef4444' : undefined,
        transform: confirmDelete ? 'scale(1.1)' : undefined,
        transition: 'all 0.2s ease',
      }}
    />
  );
}

// Custom download button with our download utility
interface CustomDownloadButtonProps {
  slides: GallerySlide[];
}

function CustomDownloadButton({ slides }: CustomDownloadButtonProps) {
  const { currentIndex } = useLightboxState();
  const currentSlide = slides[currentIndex];

  const handleDownload = useCallback(() => {
    if (!currentSlide) return;

    // Generate filename from creation date or fallback
    const filename = `generated-image-${currentIndex + 1}.jpg`;
    downloadImage(currentSlide.src, filename);
  }, [currentSlide, currentIndex]);

  return (
    <IconButton
      label="Download"
      icon={CustomDownloadIcon}
      onClick={handleDownload}
    />
  );
}

export function GalleryLightbox({
  images,
  open,
  index,
  onClose,
  onIndexChange,
  onDelete,
}: GalleryLightboxProps) {
  // Transform images to slides format with metadata
  const slides: GallerySlide[] = images.map((img, idx) => ({
    src: img.image_url,
    alt: `Generated image ${idx + 1}`,
    id: img.id,
    storagePath: img.storage_path,
    notes: img.prompt, // Using prompt as notes for now (notes field will be in Phase 7)
    download: img.image_url, // For download plugin fallback
  }));

  // Handle slide change
  const handleView = useCallback(({ index: newIndex }: { index: number }) => {
    onIndexChange(newIndex);
  }, [onIndexChange]);

  // Close lightbox if no images
  if (images.length === 0 && open) {
    onClose();
    return null;
  }

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      on={{ view: handleView }}
      plugins={[Download]}
      carousel={{
        finite: false, // Allow looping
      }}
      controller={{
        closeOnBackdropClick: true, // Close on click outside
      }}
      toolbar={{
        buttons: [
          <DeleteButton
            key="delete"
            slides={slides}
            onDelete={onDelete}
            onClose={onClose}
          />,
          <CustomDownloadButton key="download" slides={slides} />,
          'close',
        ],
      }}
      render={{
        // Display notes/prompt below the image if present
        slideFooter: ({ slide }) => {
          const gallerySlide = slide as GallerySlide;
          if (!gallerySlide.notes) return null;

          return (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px',
                background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
                color: 'white',
                fontSize: '14px',
                lineHeight: 1.5,
                pointerEvents: 'none',
              }}
            >
              {gallerySlide.notes}
            </div>
          );
        },
      }}
      labels={{
        Previous: 'Previous image',
        Next: 'Next image',
        Close: 'Close gallery',
      }}
    />
  );
}
