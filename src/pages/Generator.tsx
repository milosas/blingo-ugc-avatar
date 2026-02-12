import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useCustomAvatars } from '../hooks/useCustomAvatars';
import { useImageUpload } from '../hooks/useImageUpload';
import { useGeneration } from '../hooks/useGeneration';
import { useLanguage } from '../contexts/LanguageContext';
import { AnimatedSection } from '../components/animation/AnimatedSection';
import { ImageUploader } from '../components/upload/ImageUploader';
import { ImagePreviewGrid } from '../components/upload/ImagePreviewGrid';
import { ConfigPanel } from '../components/config/ConfigPanel';
import { Button } from '../components/ui/Button';
import { LoadingOverlay } from '../components/generation/LoadingOverlay';
import { ResultsGallery } from '../components/generation/ResultsGallery';
import { ResultsActions } from '../components/generation/ResultsActions';
import { ErrorMessage } from '../components/generation/ErrorMessage';
import { DEFAULT_USER_PROMPT } from '../constants/fluxOptions';
import type { Config } from '../types';

export default function Generator() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { avatars: customAvatars } = useCustomAvatars();

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
    mood: null,
    pose: null,
    userPrompt: DEFAULT_USER_PROMPT,
    aspectRatio: '1:1',
    resolution: '1K',
    imageCount: 1
  });

  // Generation state
  const { state, generate, cancel, reset } = useGeneration();

  // Handle avatar selection from URL param (from Avatars page)
  useEffect(() => {
    const selectAvatarId = searchParams.get('selectAvatar');
    if (selectAvatarId && customAvatars.length > 0) {
      const avatar = customAvatars.find(a => a.id === selectAvatarId);
      if (avatar) {
        setConfig(prev => ({
          ...prev,
          avatar: {
            id: avatar.id,
            name: t.customAvatars?.customAvatar || 'Custom Avatar',
            description: avatar.description || t.customAvatars?.customAvatar || 'Custom avatar',
            imageUrl: avatar.image_url,
            promptDescription: avatar.description || 'the person shown in the reference image',
            isCustom: true
          }
        }));
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, customAvatars, setSearchParams, t]);

  // Form validation
  const isConfigValid = config.avatar !== null && config.userPrompt.trim().length >= 3;
  const canGenerate = hasImages && isConfigValid;

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
      mood: null,
      pose: null,
      userPrompt: DEFAULT_USER_PROMPT,
      aspectRatio: '1:1',
      resolution: '1K',
      imageCount: 1
    });
  };

  const handleErrorDismiss = () => {
    reset();
  };

  return (
    <div className="">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {(state.status === 'success' || state.status === 'polling') && state.results && state.results.length > 0 ? (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">
                {t.results.title}
              </h2>
              {state.status === 'polling' && (
                <span className="text-sm text-[#FF6B35] animate-pulse">
                  {t.loading.generating} ({state.results.length}/3)
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
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column: Upload */}
            <AnimatedSection direction="left" className="w-full lg:w-1/2">
              <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-sm text-white font-bold">
                    1
                  </span>
                  {t.upload.title}
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
                  <p className="mt-4 text-sm text-[#FF6B35]">
                    {t.validation.noImages}
                  </p>
                )}
              </div>
            </AnimatedSection>

            {/* Right Column: Configuration */}
            <AnimatedSection direction="right" delay={0.1} className="w-full lg:w-1/2">
              <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-sm text-white font-bold">
                    2
                  </span>
                  {t.config.title}
                </h2>
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
                  {t.actions.generate}
                </Button>

                {!canGenerate && (
                  <div className="mt-3 space-y-1">
                    {!hasImages && (
                      <p className="text-sm text-[#999999] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                        {t.validation.noImages}
                      </p>
                    )}
                    {!config.avatar && (
                      <p className="text-sm text-[#999999] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                        {t.validation.noAvatar}
                      </p>
                    )}
                    {config.userPrompt.trim().length < 3 && (
                      <p className="text-sm text-[#999999] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                        {t.validation.noPrompt}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {state.status === 'loading' && (
        <LoadingOverlay progress={state.progress} onCancel={cancel} />
      )}

      {/* Error Overlay */}
      {state.status === 'error' && state.error && (
        <ErrorMessage errorType={state.error} onDismiss={handleErrorDismiss} />
      )}
    </div>
  );
}
