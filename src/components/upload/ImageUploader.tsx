import { useDropzone } from 'react-dropzone';
import { useLanguage } from '../../contexts/LanguageContext';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
  canAddMore: boolean;
}

export function ImageUploader({ onFilesSelected, disabled, canAddMore }: ImageUploaderProps) {
  const { t } = useLanguage();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    disabled: disabled || !canAddMore,
    onDrop: onFilesSelected
  });

  const isDisabled = disabled || !canAddMore;

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
        ${isDragActive
          ? 'border-[#FF6B35] bg-[#FFF0EB]'
          : 'border-[#D4D4D2] hover:border-[#FF6B35]/50 bg-[#F7F7F5]'
        }
        ${isDisabled
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:bg-[#EFEFED]'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FFF0EB] flex items-center justify-center">
          <svg className="w-8 h-8 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-[#1A1A1A] font-medium">
          {t.upload.description}
        </p>
        <p className="text-sm text-[#999999]">
          {t.upload.hint}
        </p>
        {!canAddMore && (
          <p className="text-sm text-[#FF6B35] font-medium">
            {t.upload.imageOf}
          </p>
        )}
      </div>
    </div>
  );
}
