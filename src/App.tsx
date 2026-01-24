import { useState } from 'react';
import { useImageUpload } from './hooks/useImageUpload';
import { ImageUploader } from './components/upload/ImageUploader';
import { ImagePreviewGrid } from './components/upload/ImagePreviewGrid';
import { ConfigPanel } from './components/config/ConfigPanel';
import { Button } from './components/ui/Button';
import { UI_TEXT } from './constants/ui';
import type { Config } from './types';

function App() {
  // Image upload state
  const {
    images,
    addImages,
    removeImage,
    canAddMore,
    hasImages
  } = useImageUpload();

  // Configuration state
  const [config, setConfig] = useState<Config>({
    avatar: null,
    scene: null,
    style: null
  });

  // Form validation
  const isConfigComplete = config.avatar && config.scene && config.style;
  const canGenerate = hasImages && isConfigComplete;

  // Generate handler (placeholder for Phase 3)
  const handleGenerate = () => {
    if (!canGenerate) return;

    // TODO: Phase 3 - Send to n8n backend
    console.log('Generate clicked', {
      images: images.map(img => img.file.name),
      config: {
        avatar: config.avatar?.id,
        scene: config.scene?.id,
        style: config.style?.id
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {UI_TEXT.header.title}
          </h1>
          <p className="mt-1 text-gray-600">
            {UI_TEXT.header.subtitle}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Responsive two-column layout: stacked on mobile, side-by-side on md+ */}
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Column: Upload */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {UI_TEXT.upload.title}
              </h2>

              <ImageUploader
                onFilesSelected={addImages}
                canAddMore={canAddMore}
              />

              <ImagePreviewGrid
                images={images}
                onRemove={removeImage}
              />

              {!hasImages && (
                <p className="mt-4 text-sm text-amber-600">
                  {UI_TEXT.validation.noImages}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Configuration */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ConfigPanel
                config={config}
                onConfigChange={setConfig}
              />
            </div>

            {/* Generate Button */}
            <div className="mt-6">
              <Button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="w-full text-lg py-4"
              >
                {UI_TEXT.actions.generate}
              </Button>

              {/* Validation Messages */}
              {!canGenerate && (
                <div className="mt-3 space-y-1">
                  {!hasImages && (
                    <p className="text-sm text-gray-500">• {UI_TEXT.validation.noImages}</p>
                  )}
                  {!config.avatar && (
                    <p className="text-sm text-gray-500">• {UI_TEXT.validation.noAvatar}</p>
                  )}
                  {!config.scene && (
                    <p className="text-sm text-gray-500">• {UI_TEXT.validation.noScene}</p>
                  )}
                  {!config.style && (
                    <p className="text-sm text-gray-500">• {UI_TEXT.validation.noStyle}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        Virtual Clothing Model Generator &copy; 2025
      </footer>
    </div>
  );
}

export default App;
