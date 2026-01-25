import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { GeneratedImage } from '../../types/generation';
import { downloadImage } from '../../utils/download';

interface ResultsGalleryProps {
  images: GeneratedImage[];
}

const angleLabels = {
  far: 'Toli',
  medium: 'Arti',
  close: 'Labai arti'
};

export function ResultsGallery({ images }: ResultsGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleDownload = (image: GeneratedImage) => {
    downloadImage(image.url, `rezultatas-${angleLabels[image.angle]}.jpg`);
  };

  // Map images to lightbox slides format
  const slides = images.map(img => ({ src: img.url }));

  return (
    <>
      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            {/* Image */}
            <img
              src={image.url}
              alt={`Rezultatas - ${angleLabels[image.angle]}`}
              className="w-full h-auto rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openLightbox(index)}
            />

            {/* Angle Label Overlay */}
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-sm">
              {angleLabels[image.angle]}
            </div>

            {/* Download Button Overlay */}
            <button
              onClick={() => handleDownload(image)}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded transition-colors"
              aria-label={`Atsisiųsti ${angleLabels[image.angle]}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={slides}
      />

      {/* CSS for fade-in animation */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </>
  );
}
