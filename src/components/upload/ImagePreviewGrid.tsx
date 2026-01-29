import type { UploadedImage } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ImagePreviewGridProps {
  images: UploadedImage[];
  onRemove: (index: number) => void;
}

export function ImagePreviewGrid({ images, onRemove }: ImagePreviewGridProps) {
  const { t } = useLanguage();

  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {images.map((image, index) => (
        <div key={image.previewUrl} className="relative group">
          <img
            src={image.previewUrl}
            alt={`${t.upload.imageOf} ${index + 1}`}
            className="w-full aspect-square object-cover rounded-lg shadow-sm"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label={`${t.upload.remove} ${t.upload.imageOf} ${index + 1}`}
          >
            ×
          </button>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {index + 1}/1
          </div>
        </div>
      ))}
    </div>
  );
}
