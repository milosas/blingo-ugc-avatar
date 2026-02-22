import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { usePostCreator } from '../hooks/usePostCreator';
import { AnimatedSection } from '../components/animation/AnimatedSection';
import { getPlaceholderForIndustry } from '../constants/industries';
import { IndustrySelect } from '../components/post-creator/IndustrySelect';
import { PostConfigPanel } from '../components/post-creator/PostConfig';
import { StreamingText } from '../components/post-creator/StreamingText';
import { SocialPreview } from '../components/post-creator/SocialPreview';
import { PostActionButtons } from '../components/post-creator/PostActionButtons';
import { ImageSourceToggle } from '../components/post-creator/ImageSourceToggle';

export default function PostCreator() {
  const { t } = useLanguage();
  const pc = usePostCreator();
  const location = useLocation();

  // Accept gallery image from navigation state
  const galleryImageUrl = (location.state as any)?.galleryImageUrl as string | undefined;

  useEffect(() => {
    if (galleryImageUrl) {
      pc.setImageSource('gallery');
      pc.setImagePreview(galleryImageUrl);
      // Clear navigation state so refresh doesn't re-apply
      window.history.replaceState({}, '');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const p = t.postCreatorPage || {} as any;
  const canGenerate = pc.industry && pc.prompt.trim().length >= 3;
  const isLoading = pc.isLoadingText || pc.isLoadingImage;

  // Resolve the displayed image: AI-generated, uploaded, or gallery preview
  const displayImageUrl = pc.generatedImageUrl || (['upload', 'gallery'].includes(pc.imageSource) ? pc.imagePreview : null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
        {p.title || 'Post Creator'}
      </h1>
      <p className="text-[#666] mb-8">
        {p.subtitle || 'Generate AI-powered social media posts'}
      </p>

      <div className="space-y-6">
        {/* 1. Industry Select */}
        <AnimatedSection delay={0}><IndustrySelect
          value={pc.industry}
          onChange={pc.setIndustry}
          label={p.industryLabel || 'Sritis'}
          placeholder={p.industryPlaceholder || 'Pasirinkite sritį...'}
        /></AnimatedSection>

        {/* 2. Topic Textarea */}
        <AnimatedSection delay={0.1}><div>
          <label className="flex items-center justify-between text-sm font-medium text-[#1A1A1A] mb-1.5">
            <span>{p.topicLabel || 'Tema'}</span>
            <button
              onClick={pc.improvise}
              disabled={!pc.industry || pc.isImprovising}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#FF6B35] hover:bg-[#FFF0EB] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pc.isImprovising ? (
                <div className="w-3 h-3 rounded-full border border-[#FF6B35] border-t-transparent animate-spin" />
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM19.5 10.5l-1 3-1-3-3-1 3-1 1-3 1 3 3 1-3 1z" />
                </svg>
              )}
              {pc.isImprovising ? 'Improvizuojama...' : 'Improvizuoti'}
            </button>
          </label>
          <textarea
            value={pc.prompt}
            onChange={(e) => pc.setPrompt(e.target.value)}
            placeholder={getPlaceholderForIndustry(pc.industry)}
            rows={3}
            className="w-full px-4 py-3 border border-[#E5E5E3] rounded-xl text-sm text-[#1A1A1A] placeholder-[#999] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/20 outline-none resize-none transition-colors"
          />
        </div></AnimatedSection>

        {/* 3. Image Source */}
        <AnimatedSection delay={0.2}><div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
            {p.imageLabel || 'Paveikslėlis'}
          </label>
          <ImageSourceToggle
            imageSource={pc.imageSource}
            onImageSourceChange={pc.setImageSource}
            imagePreview={pc.imagePreview}
            onFileSelect={(file, preview) => {
              pc.setImageFile(file);
              pc.setImagePreview(preview);
            }}
            onFileRemove={() => {
              pc.setImageFile(null);
              pc.setImagePreview(null);
            }}
            isLoadingImage={pc.isLoadingImage}
            labels={{
              upload: p.imageUpload || 'Įkelti',
              ai: p.imageAi || 'AI generuoti',
              uploadHint: p.imageUploadHint || 'JPG, PNG',
              aiHint: p.imageAiHint || 'AI sugeneruos paveikslėlį pagal temą',
              remove: p.imageRemove || 'Pašalinti',
              dragDrop: p.imageDragDrop || 'Paspauskite arba vilkite paveikslėlį',
            }}
          />
        </div></AnimatedSection>

        {/* 4. Post Config */}
        <AnimatedSection delay={0.3}><div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-3">
            {p.settingsLabel || 'Nustatymai'}
          </label>
          <div className="bg-[#F7F7F5] rounded-xl p-4">
            <PostConfigPanel
              tone={pc.tone}
              emoji={pc.emoji}
              length={pc.length}
              onToneChange={pc.setTone}
              onEmojiChange={pc.setEmoji}
              onLengthChange={pc.setLength}
              labels={{
                tone: p.toneLabel || 'Tonas',
                emoji: p.emojiLabel || 'Emoji',
                length: p.lengthLabel || 'Ilgis',
                tones: {
                  professional: p.toneProfessional || 'Profesionalus',
                  friendly: p.toneFriendly || 'Draugiškas',
                  motivating: p.toneMotivating || 'Motyvuojantis',
                  humorous: p.toneHumorous || 'Humoristinis',
                },
                emojis: {
                  yes: p.emojiYes || 'Taip',
                  no: p.emojiNo || 'Ne',
                  minimal: p.emojiMinimal || 'Minimaliai',
                },
                lengths: {
                  short: p.lengthShort || 'Trumpas',
                  medium: p.lengthMedium || 'Vidutinis',
                  long: p.lengthLong || 'Ilgas',
                },
              }}
            />
          </div>
        </div></AnimatedSection>

        {/* 5. Generate Button */}
        <button
          onClick={pc.generate}
          disabled={!canGenerate || isLoading}
          className="w-full py-3.5 bg-[#FF6B35] text-white font-semibold rounded-xl hover:bg-[#E55A2B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              {p.generating || 'Generuojama...'}
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {p.generate || 'Generuoti įrašą'}
            </>
          )}
        </button>

        {/* 6. Error Display */}
        {pc.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-600">{pc.error}</p>
          </div>
        )}

        {/* 7. Streaming Text */}
        {(pc.generatedText || pc.isStreaming) && (
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              {p.resultLabel || 'Sugeneruotas tekstas'}
            </label>
            <StreamingText
              text={pc.generatedText}
              isStreaming={pc.isStreaming}
              placeholder={p.resultPlaceholder}
            />
          </div>
        )}

        {/* 8. Social Preview */}
        {pc.generatedText && (
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              {p.previewLabel || 'Peržiūra'}
            </label>
            <SocialPreview
              text={pc.generatedText}
              imageUrl={displayImageUrl}
              labels={{
                facebook: p.previewFacebook || 'Facebook',
                instagram: p.previewInstagram || 'Instagram',
                mobile: p.previewMobile || 'Mobilus',
                desktop: p.previewDesktop || 'Kompiuteris',
              }}
            />
          </div>
        )}

        {/* 9. Action Buttons */}
        {pc.generatedText && (
          <PostActionButtons
            onCopy={pc.copyText}
            onRegenerateText={pc.regenerateText}
            onRegenerateImage={pc.regenerateImage}
            isLoadingText={pc.isLoadingText}
            isLoadingImage={pc.isLoadingImage}
            hasText={!!pc.generatedText}
            hasImage={pc.imageSource === 'ai'}
            labels={{
              copy: p.copy || 'Kopijuoti',
              copied: p.copied || 'Nukopijuota!',
              regenerateText: p.regenerateText || 'Naujas tekstas',
              regenerateImage: p.regenerateImage || 'Naujas paveikslėlis',
            }}
          />
        )}

        {/* 10. Save Status */}
        {(pc.isSaving || pc.savedPostId) && (
          <div className="text-center">
            {pc.isSaving ? (
              <p className="text-sm text-[#999] flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full border border-[#999] border-t-transparent animate-spin" />
                {p.saving || 'Saugoma...'}
              </p>
            ) : pc.savedPostId ? (
              <p className="text-sm text-green-600 flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {p.saved || 'Išsaugota'}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
