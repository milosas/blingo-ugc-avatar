import { useState } from 'react';
import { useImageUpload } from './hooks/useImageUpload';
import { useGeneration } from './hooks/useGeneration';
import { ImageUploader } from './components/upload/ImageUploader';
import { ImagePreviewGrid } from './components/upload/ImagePreviewGrid';
import { ConfigPanel } from './components/config/ConfigPanel';
import { Button } from './components/ui/Button';
import { LoadingOverlay } from './components/generation/LoadingOverlay';
import { ResultsGallery } from './components/generation/ResultsGallery';
import { ResultsActions } from './components/generation/ResultsActions';
import { ErrorMessage } from './components/generation/ErrorMessage';
import { UI_TEXT } from './constants/ui';
import { DEFAULT_USER_PROMPT } from './constants/fluxOptions';
import type { Config } from './types';

function App() {
  // Image upload state
  const {
    images,
    addImages,
    removeImage,
    clearImages,
    canAddMore,
    hasImages
  } = useImageUpload();

  // Configuration state with flux-2/pro-image-to-image defaults
  const [config, setConfig] = useState<Config>({
    avatar: null,
    scene: null,
    style: null,
    mood: null,
    userPrompt: DEFAULT_USER_PROMPT,
    aspectRatio: '2:3',
    resolution: '1K',
    imageCount: 1
  });

  // Generation state
  const { state, generate, cancel, reset } = useGeneration();

  // Form validation - need image, avatar, and user prompt
  const isConfigValid = config.avatar !== null && config.userPrompt.trim().length >= 3;
  const canGenerate = hasImages && isConfigValid;

  // Handlers
  const handleGenerate = () => {
    if (!canGenerate) return;
    generate(config, images);
  };

  const handleRegenerate = () => {
    generate(config, images);
  };

  const handleNewUpload = () => {
    reset();
    clearImages();
    setConfig({
      avatar: null,
      scene: null,
      style: null,
      mood: null,
      userPrompt: DEFAULT_USER_PROMPT,
      aspectRatio: '2:3',
      resolution: '1K',
      imageCount: 1
    });
  };

  const handleErrorDismiss = () => {
    reset();
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
        {(state.status === 'success' || state.status === 'polling') && state.results && state.results.length > 0 ? (
          // Results View (including partial results while polling)
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {UI_TEXT.results.title}
              </h2>
              {state.status === 'polling' && (
                <span className="text-sm text-amber-600">
                  Generuojama... ({state.results.length}/3)
                </span>
              )}
            </div>
            <ResultsGallery images={state.results} />
            {state.status === 'success' && (
              <ResultsActions
                onRegenerate={handleRegenerate}
                onNewUpload={handleNewUpload}
              />
            )}
          </>
        ) : (
          // Upload & Config View (idle state)
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
                      <p className="text-sm text-gray-500">• Select an avatar</p>
                    )}
                    {config.userPrompt.trim().length < 3 && (
                      <p className="text-sm text-gray-500">• Add instructions (min 3 characters)</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500">
        Virtual Clothing Model Generator &copy; 2025
      </footer>

      {/* Loading Overlay (fixed on top when loading, hidden during polling) */}
      {state.status === 'loading' && (
        <LoadingOverlay progress={state.progress} onCancel={cancel} />
      )}

      {/* Error Overlay (fixed on top when error) */}
      {state.status === 'error' && state.error && (
        <ErrorMessage errorType={state.error} onDismiss={handleErrorDismiss} />
      )}
    </div>
  );
}

export default App;
