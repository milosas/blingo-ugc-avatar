import { useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLanguage } from '../../contexts/LanguageContext';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
  canAddMore: boolean;
}

export function ImageUploader({ onFilesSelected, disabled, canAddMore }: ImageUploaderProps) {
  const { t } = useLanguage();
  const cameraInputRef = useRef<HTMLInputElement>(null);

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
    <div>
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
      <div className="mt-3 flex justify-center">
        <button
          onClick={() => cameraInputRef.current?.click()}
          disabled={isDisabled}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#666666] bg-white border border-[#E5E5E3] rounded-xl hover:bg-[#F7F7F5] hover:border-[#D4D4D2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
          </svg>
          Fotografuoti
        </button>
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              onFilesSelected(Array.from(files));
            }
            e.target.value = '';
          }}
          className="hidden"
        />
      </div>
    </div>
  );
}
