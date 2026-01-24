import { useDropzone } from 'react-dropzone';
import { UI_TEXT } from '../../constants/ui';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
  canAddMore: boolean;
}

export function ImageUploader({ onFilesSelected, disabled, canAddMore }: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 3,
    disabled: disabled || !canAddMore,
    onDrop: onFilesSelected
  });

  const isDisabled = disabled || !canAddMore;

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
        ${isDragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }
        ${isDisabled
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:bg-gray-100'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <div className="text-4xl">📷</div>
        <p className="text-gray-700 font-medium">
          {UI_TEXT.upload.description}
        </p>
        <p className="text-sm text-gray-500">
          {UI_TEXT.upload.hint}
        </p>
        {!canAddMore && (
          <p className="text-sm text-amber-600 font-medium">
            Maksimalus nuotrauku skaicius pasiektas
          </p>
        )}
      </div>
    </div>
  );
}
