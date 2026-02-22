import Masonry from 'react-masonry-css';
import { ImageCard } from './ImageCard';
import type { GeneratedImage } from '../../types/database';

interface GalleryGridProps {
  images: GeneratedImage[];
  onImageClick: (index: number) => void;
  onDelete: (imageId: string, storagePath: string) => Promise<void>;
  onEdit?: (index: number) => void;
  onCreatePost?: (index: number) => void;
  /** Offset added to local index for callbacks (used when passing a sliced subset) */
  indexOffset?: number;
}

const breakpointColumns = {
  default: 4,  // Desktop
  1024: 3,     // Laptop
  768: 2,      // Tablet
  640: 2       // Mobile - 2 columns
};

export function GalleryGrid({ images, onImageClick, onDelete, onEdit, onCreatePost, indexOffset = 0 }: GalleryGridProps) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-column"
    >
      {images.map((image, index) => {
        const globalIndex = index + indexOffset;
        return (
          <div key={image.id}>
            <ImageCard
              image={image}
              onClick={() => onImageClick(globalIndex)}
              onDelete={onDelete}
              onEdit={onEdit ? () => onEdit(globalIndex) : undefined}
              onCreatePost={onCreatePost ? () => onCreatePost(globalIndex) : undefined}
            />
          </div>
        );
      })}
    </Masonry>
  );
}
