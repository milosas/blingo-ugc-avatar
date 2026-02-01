import { useState, useCallback, useEffect } from 'react';
import Lightbox, { useLightboxState, IconButton, createIcon } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { GeneratedImage } from '../../types/database';
import { downloadImage } from '../../utils/download';
import { useNotes } from '../../hooks/useNotes';

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

// Notes icon
const NotesIcon = createIcon(
  'NotesIcon',
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    stroke="currentColor"
    fill="none"
    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  />
);

// Extended slide type with metadata
interface GallerySlide {
  src: string;
  alt: string;
  id: string;
  storagePath: string;
  notes?: string | null;
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

  // We reset on index change via including currentIndex in the key to force re-render
  return (
    <IconButton
      key={`delete-${currentIndex}`}
      label="Delete"
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

// Notes panel component
interface NotesPanelProps {
  imageId: string;
  onClose: () => void;
}

function NotesPanel({ imageId, onClose }: NotesPanelProps) {
  const { note, loading, saveNote, deleteNote } = useNotes(imageId);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Sync text with note when note loads
  useEffect(() => {
    setText(note?.note_text || '');
  }, [note]);

  const handleSave = async () => {
    if (!text.trim()) return;
    setSaving(true);
    try {
      await saveNote(text);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    await deleteNote();
  };

  const charCount = text.length;
  const maxLength = 100;
  const showCounter = charCount >= 80;

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px',
      background: 'rgba(0, 0, 0, 0.85)',
      zIndex: 1000,
    }}>
      {loading ? (
        <div style={{ color: 'white', textAlign: 'center' }}>Loading...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, maxLength))}
            maxLength={maxLength}
            placeholder="Add a note..."
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #444',
              background: '#222',
              color: 'white',
              fontSize: '14px',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleSave}
                disabled={saving || text === (note?.note_text || '')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  background: saving ? '#666' : '#4f46e5',
                  color: 'white',
                  border: 'none',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                }}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              {note && (
                <button
                  onClick={handleDelete}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    background: confirmDelete ? '#ef4444' : '#374151',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  {confirmDelete ? 'Confirm' : 'Delete'}
                </button>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {showCounter && (
                <span style={{ color: charCount === maxLength ? '#ef4444' : '#9ca3af', fontSize: '12px' }}>
                  {charCount}/{maxLength}
                </span>
              )}
              <button
                onClick={onClose}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  background: '#374151',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Notes toggle button component
interface NotesToggleButtonProps {
  slides: GallerySlide[];
  showNotes: boolean;
  onToggle: () => void;
}

function NotesToggleButton({ showNotes, onToggle }: NotesToggleButtonProps) {
  return (
    <IconButton
      label="Close"
      icon={NotesIcon}
      onClick={onToggle}
      style={{
        color: showNotes ? '#4f46e5' : undefined,
      }}
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
  // Notes panel visibility state
  const [showNotes, setShowNotes] = useState(false);

  // Transform images to slides format with metadata
  const slides: GallerySlide[] = images.map((img, idx) => ({
    src: img.image_url,
    alt: `Generated image ${idx + 1}`,
    id: img.id,
    storagePath: img.storage_path,
    notes: img.prompt, // Using prompt as notes for now (notes field will be in Phase 7)
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
      plugins={[]}
      carousel={{
        finite: false, // Allow looping
      }}
      controller={{
        closeOnBackdropClick: true, // Close on click outside
      }}
      toolbar={{
        buttons: [
          <NotesToggleButton
            key="notes"
            slides={slides}
            showNotes={showNotes}
            onToggle={() => setShowNotes(!showNotes)}
          />,
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
        // Display notes panel when toggled
        slideFooter: ({ slide }) => {
          const gallerySlide = slide as GallerySlide;
          if (!showNotes) return null;

          return (
            <NotesPanel
              imageId={gallerySlide.id}
              onClose={() => setShowNotes(false)}
            />
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
