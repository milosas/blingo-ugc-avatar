import Masonry from 'react-masonry-css';
import { ImageCard } from './ImageCard';
import type { GeneratedImage } from '../../types/database';

interface GalleryGridProps {
  images: GeneratedImage[];
  onImageClick: (index: number) => void;
  onDelete: (imageId: string, storagePath: string) => Promise<void>;
}

const breakpointColumns = {
  default: 4,  // Desktop
  1024: 3,     // Laptop
  768: 2,      // Tablet
  640: 2       // Mobile - 2 columns
};

export function GalleryGrid({ images, onImageClick, onDelete }: GalleryGridProps) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-column"
    >
      {images.map((image, index) => (
        <div key={image.id}>
          <ImageCard
            image={image}
            onClick={() => onImageClick(index)}
            onDelete={onDelete}
          />
        </div>
      ))}
    </Masonry>
  );
}
