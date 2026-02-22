import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { usePostCreator } from '../hooks/usePostCreator';
import { LoginModal } from '../components/auth/LoginModal';
import { AnimatedSection } from '../components/animation/AnimatedSection';
import { PostConfigPanel } from '../components/post-creator/PostConfig';
import { StreamingText } from '../components/post-creator/StreamingText';
import { SocialPreview } from '../components/post-creator/SocialPreview';
import { PostActionButtons } from '../components/post-creator/PostActionButtons';
import { ImageSourceToggle } from '../components/post-creator/ImageSourceToggle';

export default function PostCreator() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
  const canGenerate = pc.prompt.trim().length >= 3;
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

      {!user ? (
        <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF0EB] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-[#666666] mb-4">
              Prisijunkite, kad galėtumėte kurti įrašus
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
      ) : (
      <div className="space-y-6">
        {/* 1. Topic Textarea */}
        <AnimatedSection delay={0}><div>
          <label className="flex items-center justify-between text-sm font-medium text-[#1A1A1A] mb-1.5">
            <span>{p.topicLabel || 'Tema'}</span>
            <button
              onClick={pc.improvise}
              disabled={pc.isImprovising}
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
            placeholder="Pvz.: Nauja kolekcija, vasaros nuolaidos, produkto pristatymas..."
            rows={3}
            className="w-full px-4 py-3 border border-[#E5E5E3] rounded-xl text-sm text-[#1A1A1A] placeholder-[#999] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/20 outline-none resize-none transition-colors"
          />
        </div></AnimatedSection>

        {/* 2. Image Source */}
        <AnimatedSection delay={0.1}><div>
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

        {/* 3. Post Config */}
        <AnimatedSection delay={0.2}><div>
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

        {/* 4. Generate Button */}
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

        {/* 5. Error Display */}
        {pc.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-600">{pc.error}</p>
          </div>
        )}

        {/* 6. Streaming Text */}
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

        {/* 7. Social Preview */}
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

        {/* 8. Action Buttons */}
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

        {/* 10. Social Publish Hint */}
        {pc.generatedText && (
          <div className="flex items-center gap-3 justify-center pt-2">
            <span className="text-sm text-[#999]">Skelbti:</span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#1877F2] text-white hover:bg-[#1877F2]/90 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90 transition-opacity">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </button>
          </div>
        )}

        {/* 11. Save Status */}
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
      )}
    </div>
  );
}
