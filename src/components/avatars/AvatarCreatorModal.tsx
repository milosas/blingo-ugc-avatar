import { useLanguage } from '../../contexts/LanguageContext';
import { useAvatarCreator } from '../../hooks/useAvatarCreator';
import { useCustomAvatars } from '../../hooks/useCustomAvatars';
import { useState } from 'react';
import {
  GENDER_OPTIONS,
  ETHNICITY_OPTIONS,
  SKIN_TONE_OPTIONS,
  HAIR_COLOR_OPTIONS,
  HAIR_LENGTH_OPTIONS,
  AGE_OPTIONS,
  BODY_TYPE_OPTIONS,
  FRAMING_OPTIONS,
  buildTraitDescription,
} from '../../constants/avatarTraits';
import type { TraitOption } from '../../constants/avatarTraits';
import type { Language } from '../../i18n/translations';

interface AvatarCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function TraitSelector({
  label,
  options,
  value,
  onChange,
  lang,
}: {
  label: string;
  options: TraitOption[];
  value: string;
  onChange: (id: string) => void;
  lang: Language;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#666666] mb-1.5">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-[#F7F7F5] text-[#666666] hover:bg-[#EFEFED] border border-[#E5E5E3]'
              }`}
            >
              {option.labels[lang]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AvatarCreatorModal({ isOpen, onClose }: AvatarCreatorModalProps) {
  const { language, t } = useLanguage();
  const { saveGeneratedAvatar } = useCustomAvatars();
  const {
    traits,
    specialFeatures,
    prompt,
    generatedImage,
    isGenerating,
    error,
    setTrait,
    setSpecialFeatures,
    setPrompt,
    setError,
    generateAvatar,
    reset,
  } = useAvatarCreator();

  const tc = t.avatarCreator;
  const [isSaving, setIsSaving] = useState(false);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = async () => {
    if (!generatedImage) return;

    setIsSaving(true);
    setError(null);
    try {
      const description = buildTraitDescription(traits, language);
      await saveGeneratedAvatar(generatedImage, description);
      handleClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save avatar';
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={handleClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5E5E3]">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">{tc.title}</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-[#F7F7F5] transition-colors"
          >
            <svg className="w-5 h-5 text-[#999999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Trait selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TraitSelector
              label={tc.gender}
              options={GENDER_OPTIONS}
              value={traits.gender}
              onChange={(v) => setTrait('gender', v)}
              lang={language}
            />
            <TraitSelector
              label={tc.age}
              options={AGE_OPTIONS}
              value={traits.age}
              onChange={(v) => setTrait('age', v)}
              lang={language}
            />
            <TraitSelector
              label={tc.ethnicity}
              options={ETHNICITY_OPTIONS}
              value={traits.ethnicity}
              onChange={(v) => setTrait('ethnicity', v)}
              lang={language}
            />
            <TraitSelector
              label={tc.skinTone}
              options={SKIN_TONE_OPTIONS}
              value={traits.skinTone}
              onChange={(v) => setTrait('skinTone', v)}
              lang={language}
            />
            <TraitSelector
              label={tc.hairColor}
              options={HAIR_COLOR_OPTIONS}
              value={traits.hairColor}
              onChange={(v) => setTrait('hairColor', v)}
              lang={language}
            />
            <TraitSelector
              label={tc.hairLength}
              options={HAIR_LENGTH_OPTIONS}
              value={traits.hairLength}
              onChange={(v) => setTrait('hairLength', v)}
              lang={language}
            />
            <TraitSelector
              label={tc.bodyType}
              options={BODY_TYPE_OPTIONS}
              value={traits.bodyType}
              onChange={(v) => setTrait('bodyType', v)}
              lang={language}
            />
            <TraitSelector
              label={tc.framing}
              options={FRAMING_OPTIONS}
              value={traits.framing}
              onChange={(v) => setTrait('framing', v)}
              lang={language}
            />
          </div>

          {/* Special features */}
          <div>
            <label className="block text-xs font-medium text-[#666666] mb-1.5">{tc.specialFeatures}</label>
            <textarea
              value={specialFeatures}
              onChange={(e) => setSpecialFeatures(e.target.value)}
              placeholder={tc.specialFeaturesPlaceholder}
              rows={2}
              className="w-full px-3 py-2 bg-white border border-[#E5E5E3] rounded-xl text-[#1A1A1A] placeholder-[#999999] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10 resize-none text-sm"
            />
          </div>

          {/* Prompt preview (editable) */}
          <div>
            <label className="block text-xs font-medium text-[#666666] mb-1.5">{tc.prompt}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E3] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10 resize-none text-xs font-mono"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Generated image preview */}
          {generatedImage && (
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-[#FF6B35]">
                <img
                  src={generatedImage}
                  alt="Generated avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Loading state */}
          {isGenerating && (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-12 h-12 border-3 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[#999999]">{tc.generating}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-[#E5E5E3]">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E5E3] text-[#666666] text-sm font-medium hover:bg-[#F7F7F5] transition-colors"
          >
            {tc.cancel}
          </button>

          {!generatedImage ? (
            <button
              onClick={generateAvatar}
              disabled={isGenerating}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#E55A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? tc.generating : tc.generate}
            </button>
          ) : (
            <>
              <button
                onClick={generateAvatar}
                disabled={isGenerating}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#FF6B35] text-[#FF6B35] text-sm font-medium hover:bg-[#FFF0EB] transition-colors disabled:opacity-50"
              >
                {tc.regenerate}
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#E55A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? tc.saving : tc.save}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
