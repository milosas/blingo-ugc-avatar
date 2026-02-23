import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useCustomAvatars } from '../hooks/useCustomAvatars';
import { useImageUpload } from '../hooks/useImageUpload';
import { useGeneration } from '../hooks/useGeneration';
import { usePostProcess } from '../hooks/usePostProcess';
import { useSupabaseStorage } from '../hooks/useSupabaseStorage';
import { useAuth } from '../hooks/useAuth';
import { LoginModal } from '../components/auth/LoginModal';
import { useLanguage } from '../contexts/LanguageContext';
import { AnimatedSection } from '../components/animation/AnimatedSection';
import { ImageUploader } from '../components/upload/ImageUploader';
import { ImagePreviewGrid } from '../components/upload/ImagePreviewGrid';
import { ConfigPanel } from '../components/config/ConfigPanel';
import { Button } from '../components/ui/Button';
import { LoadingOverlay } from '../components/generation/LoadingOverlay';
import { ResultsGallery } from '../components/generation/ResultsGallery';
import { ResultsActions } from '../components/generation/ResultsActions';
import { PostProcessToolbar } from '../components/generation/PostProcessToolbar';
import { ErrorMessage } from '../components/generation/ErrorMessage';
import type { Config } from '../types';
import { InsufficientCreditsModal } from '../components/credits/InsufficientCreditsModal';

export default function Generator() {
  const { t } = useLanguage();
  const { user } = useAuth();
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

  // Configuration state
  const [config, setConfig] = useState<Config>({
    avatar: null,
    qualityMode: 'balanced',
    imageCount: 1
  });

  // Generation state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { state, creditError, clearCreditError, generate, cancel, reset } = useGeneration();

  // Post-processing state
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const postProcess = usePostProcess();
  const [postProcessResult, setPostProcessResult] = useState<{ url: string; base64?: string } | null>(null);
  const { saveGeneratedImage } = useSupabaseStorage();

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
            name: t.customAvatars?.customAvatar || 'Custom Model',
            description: avatar.description || t.customAvatars?.customAvatar || 'Custom model',
            imageUrl: avatar.image_url,
            promptDescription: avatar.description || 'the person shown in the reference image',
            isCustom: true
          }
        }));
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, customAvatars, setSearchParams, t]);

  // Form validation — need avatar + clothing image
  const canGenerate = hasImages && config.avatar !== null;

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
    postProcess.reset();
    setPostProcessResult(null);
    setSelectedResultIndex(0);
    setConfig({
      avatar: null,
      qualityMode: 'balanced',
      imageCount: 1
    });
  };

  const handleErrorDismiss = () => {
    reset();
  };

  // Get the source image URL for post-processing
  const getSelectedImageUrl = (): string | null => {
    if (!state.results || state.results.length === 0) return null;
    return state.results[selectedResultIndex]?.url || null;
  };

  const savePostProcessResult = async (result: { url: string; base64?: string }, prompt: string) => {
    if (!user) return;
    try {
      await saveGeneratedImage({
        imageUrl: result.url,
        imageBase64: result.base64,
        prompt,
        config: { type: 'post-process' }
      });
    } catch (err) {
      console.error('Failed to save post-processed image:', err);
    }
  };

  const handleBackground = async (prompt: string) => {
    const sourceUrl = getSelectedImageUrl();
    if (!sourceUrl) return;
    const result = await postProcess.process('background', sourceUrl, { backgroundPrompt: prompt });
    if (result) {
      setPostProcessResult(result);
      await savePostProcessResult(result, `background: ${prompt}`);
    }
  };

  const handlePose = async (prompt: string) => {
    const sourceUrl = getSelectedImageUrl();
    if (!sourceUrl) return;
    const result = await postProcess.process('edit', sourceUrl, { editPrompt: prompt });
    if (result) {
      setPostProcessResult(result);
      await savePostProcessResult(result, `pose: ${prompt}`);
    }
  };

  const handleEdit = async (prompt: string) => {
    const sourceUrl = getSelectedImageUrl();
    if (!sourceUrl) return;
    const result = await postProcess.process('edit', sourceUrl, { editPrompt: prompt });
    if (result) {
      setPostProcessResult(result);
      await savePostProcessResult(result, `edit: ${prompt}`);
    }
  };

  return (
    <div className="">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!user ? (
          <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FFF0EB] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-[#666666] mb-4">
                {(t as any).generatorPage?.loginRequired || 'Prisijunkite, kad galėtumėte generuoti nuotraukas'}
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-3 bg-[#FF6B35] text-white rounded-full hover:bg-[#E55A2B] transition-all"
              >
                {t.auth?.signIn || 'Prisijungti'}
              </button>
            </div>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
          </div>
        ) : state.status === 'success' && state.results && state.results.length > 0 ? (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">
                {t.results.title}
              </h2>
            </div>
            <ResultsGallery
              images={state.results}
              selectedIndex={selectedResultIndex}
              onSelectImage={setSelectedResultIndex}
            />

            {/* Info notice */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <div className="flex items-start gap-2 bg-[#F7F7F5] border border-[#E5E5E3] rounded-xl px-4 py-3 flex-1">
                <svg className="w-4 h-4 text-[#FF6B35] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-xs text-[#666666] space-y-0.5">
                  <p>{t.results.downloadHint}</p>
                  <p>{t.results.selectToEdit}</p>
                </div>
              </div>
            </div>

            {/* Post-process result preview */}
            {postProcessResult && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
                  {(t as Record<string, unknown>).postProcess
                    ? ((t as Record<string, unknown>).postProcess as Record<string, string>).result || 'Post-apdorojimo rezultatas'
                    : 'Post-apdorojimo rezultatas'}
                </h3>
                <div className="max-w-md">
                  <img
                    src={postProcessResult.url}
                    alt="Post-processed result"
                    className="w-full h-auto rounded-lg ring-2 ring-[#FF6B35]"
                  />
                </div>
              </div>
            )}

            {/* Post-processing toolbar */}
            <PostProcessToolbar
              isProcessing={postProcess.isProcessing}
              onBackground={handleBackground}
              onPose={handlePose}
              onEdit={handleEdit}
            />

            {postProcess.error && (
              <p className="mt-2 text-sm text-red-500">{postProcess.error}</p>
            )}

            <ResultsActions
              onRegenerate={handleRegenerate}
              onNewUpload={handleNewUpload}
            />
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

      {/* Error Overlay - skip for insufficient credits since we show the modal */}
      {state.status === 'error' && state.error && state.error !== 'INSUFFICIENT_CREDITS' && (
        <ErrorMessage errorType={state.error} onDismiss={handleErrorDismiss} />
      )}

      {/* Insufficient credits modal */}
      {creditError && (
        <InsufficientCreditsModal
          isOpen={!!creditError}
          onClose={() => { clearCreditError(); handleErrorDismiss(); }}
          required={creditError.required}
          balance={creditError.balance}
        />
      )}
    </div>
  );
}
