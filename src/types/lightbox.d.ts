// Type augmentation for yet-another-react-lightbox custom labels
import 'yet-another-react-lightbox';

declare module 'yet-another-react-lightbox' {
  interface Labels {
    Delete?: string;
    Download?: string;
  }
}
