import { useLanguage } from '../../contexts/LanguageContext';
import { useAvatarCreator } from '../../hooks/useAvatarCreator';
import { useAvatarModels } from '../../hooks/useAvatarModels';
import { useState, useEffect, useCallback } from 'react';
import {
  GENDER_OPTIONS,
  ETHNICITY_OPTIONS,
  HAIR_LENGTH_OPTIONS,
  HAIR_COLOR_OPTIONS,
  AGE_OPTIONS,
  FRAMING_OPTIONS,
  POSE_OPTIONS,
  MOOD_OPTIONS,
  buildTraitDescription,
} from '../../constants/avatarTraits';
import type { TraitOption } from '../../constants/avatarTraits';
import type { Language } from '../../i18n/translations';

interface AvatarCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetModelId?: string;
  onSaved?: () => void;
}

function TraitSelector({
  label,
  options,
  value,
  onChange,
  lang,
  compact,
}: {
  label: string;
  options: TraitOption[];
  value: string;
  onChange: (id: string) => void;
  lang: Language;
  compact?: boolean;
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
              className={`${compact ? 'px-2.5 py-1' : 'px-3 py-1.5'} rounded-lg text-xs font-medium transition-all ${
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

export function AvatarCreatorModal({ isOpen, onClose, targetModelId, onSaved }: AvatarCreatorModalProps) {
  const { language, t } = useLanguage();
  const { models, createModel, addGeneratedPhotoToModel } = useAvatarModels();
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
    clearImage,
    setPoseMode,
    reset,
  } = useAvatarCreator(language);

  const tc = t.avatarCreator;
  const tm = t.avatarModels;
  const [isSaving, setIsSaving] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string | 'new'>(targetModelId || 'new');
  const [newModelName, setNewModelName] = useState('');
  const [savedPhotos, setSavedPhotos] = useState<string[]>([]); // Tracks IDs of photos added in this session
  const [createdModelId, setCreatedModelId] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  // "pose mode" = adding to existing model (identity locked, only pose/mood/framing)
  const [isPoseMode, setIsPoseMode] = useState(false);
  // Store the base description for pose mode
  const [modelBaseDescription, setModelBaseDescription] = useState('');

  const effectiveModelId = createdModelId || (selectedModelId !== 'new' ? selectedModelId : null);
  const currentModel = effectiveModelId ? models.find(m => m.id === effectiveModelId) : null;
  // After fetchModels(), currentModel.photos already includes saved photos — no need to double-count
  const totalPhotos = currentModel?.photos?.length || 0;
  const canAddMore = totalPhotos < 5;

  // Detect if we're adding to existing model with photos
  useEffect(() => {
    if (!isOpen) return;

    setSavedPhotos([]);
    setCreatedModelId(null);
    setSelectedModelId(targetModelId || 'new');
    setNewModelName('');
    setShowPrompt(false);

    if (targetModelId) {
      const model = models.find(m => m.id === targetModelId);
      if (model && (model.photos?.length || 0) > 0) {
        // Existing model with photos -> pose mode with PuLID reference
        const firstPhoto = model.photos![0];
        const desc = firstPhoto.description || model.name;
        setIsPoseMode(true);
        setModelBaseDescription(desc);
        setPoseMode(desc, firstPhoto.image_url);
        return;
      }
    }
    // New model or model without photos -> full trait mode
    setIsPoseMode(false);
    setModelBaseDescription('');
  }, [isOpen, targetModelId, models, setPoseMode]);

  const handleClose = () => {
    reset();
    setIsPoseMode(false);
    setModelBaseDescription('');
    onClose();
  };

  const handleGenerate = useCallback(async () => {
    await generateAvatar();
  }, [generateAvatar]);

  // Enter pose mode after first save (lock traits, use PuLID reference for subsequent photos)
  const enterPoseModeAfterSave = useCallback((description: string, referenceUrl?: string) => {
    setIsPoseMode(true);
    setModelBaseDescription(description);
    setPoseMode(description, referenceUrl);
  }, [setPoseMode]);

  const handleSaveAndContinue = async () => {
    if (!generatedImage) return;

    setIsSaving(true);
    setError(null);
    try {
      const description = buildTraitDescription(traits, language);
      let modelId = effectiveModelId;

      if (!modelId) {
        const name = newModelName.trim() || description.substring(0, 40);
        const model = await createModel(name);
        if (!model) throw new Error('Failed to create model');
        modelId = model.id;
        setCreatedModelId(model.id);
        setSelectedModelId(model.id);
      }

      const savedPhoto = await addGeneratedPhotoToModel(modelId, generatedImage, description);
      if (savedPhoto) {
        setSavedPhotos(prev => [...prev, savedPhoto.id]);
        onSaved?.();
      }

      // Switch to pose mode with PuLID reference (lock identity, use saved photo as reference)
      if (!isPoseMode && savedPhoto?.image_url) {
        enterPoseModeAfterSave(description, savedPhoto.image_url);
      }

      // Auto-advance pose
      const currentPoseIndex = POSE_OPTIONS.findIndex(p => p.id === traits.pose);
      const nextPoseIndex = (currentPoseIndex + 1) % POSE_OPTIONS.length;
      if (nextPoseIndex !== currentPoseIndex) {
        setTrait('pose', POSE_OPTIONS[nextPoseIndex].id);
      }

      clearImage();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save avatar';
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndClose = async () => {
    if (!generatedImage) {
      handleClose();
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      const description = buildTraitDescription(traits, language);
      let modelId = effectiveModelId;

      if (!modelId) {
        const name = newModelName.trim() || description.substring(0, 40);
        const model = await createModel(name);
        if (!model) throw new Error('Failed to create model');
        modelId = model.id;
      }

      await addGeneratedPhotoToModel(modelId, generatedImage, description);
      onSaved?.();
      handleClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save avatar';
      setError(message);
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const hasSavedAny = savedPhotos.length > 0;
  const hasUnsavedImage = !!generatedImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={handleClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5E5E3]">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">
              {isPoseMode ? (tm?.addPose || 'Pridėti pozą') : tc.title}
            </h2>
            {(hasSavedAny || totalPhotos > 0) && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0EB] text-[#FF6B35] text-xs font-semibold">
                {totalPhotos}/5
              </span>
            )}
          </div>
          <button onClick={handleClose} className="p-1 rounded-lg hover:bg-[#F7F7F5] transition-colors">
            <svg className="w-5 h-5 text-[#999999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Model photos strip — single source of truth from DB */}
        {totalPhotos > 0 && (
          <div className="px-5 pt-4">
            <label className="block text-xs font-medium text-[#666666] mb-2">
              {tm?.savedPhotos || 'Modelio nuotraukos'} ({totalPhotos}/5)
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {currentModel?.photos?.map((photo, i) => (
                <div key={photo.id} className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden ${
                  savedPhotos.includes(photo.id) ? 'border-2 border-[#FF6B35]' : 'border border-[#E5E5E3]'
                } relative`}>
                  <img src={photo.image_url} alt="" className="w-full h-full object-cover object-top" />
                  <span className="absolute bottom-0 left-0 bg-black/50 text-white text-[8px] px-1 rounded-tr">{i + 1}</span>
                </div>
              ))}
              {Array.from({ length: Math.max(0, 5 - totalPhotos) }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-shrink-0 w-14 h-14 rounded-lg border-2 border-dashed border-[#E5E5E3] flex items-center justify-center">
                  <span className="text-[10px] text-[#CCCCCC]">{totalPhotos + i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Model selection - only when opened without a target model */}
          {!isPoseMode && !createdModelId && !targetModelId && (
            <div>
              <label className="block text-xs font-medium text-[#666666] mb-1.5">
                {tm?.selectModel || 'Išsaugoti į modelį'}
              </label>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E5E5E3] rounded-xl text-sm text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35]"
              >
                <option value="new">{tm?.createNewModel || '+ Naujas modelis'}</option>
                {models.map(m => (
                  <option key={m.id} value={m.id} disabled={(m.photos?.length || 0) >= 5}>
                    {m.name} ({m.photos?.length || 0}/5)
                  </option>
                ))}
              </select>
              {selectedModelId === 'new' && (
                <input
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder={tm?.modelName || 'Modelio pavadinimas (neprivaloma)'}
                  className="w-full mt-2 px-3 py-2 bg-white border border-[#E5E5E3] rounded-xl text-sm text-[#1A1A1A] placeholder-[#999999] focus:outline-none focus:border-[#FF6B35]"
                />
              )}
            </div>
          )}

          {/* Model identity badge (pose mode) */}
          {isPoseMode && currentModel && (
            <div className="flex items-center gap-2 px-3 py-2 bg-[#F7F7F5] rounded-xl">
              {currentModel.photos?.[0] && (
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={currentModel.photos[0].image_url} alt="" className="w-full h-full object-cover object-top" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#1A1A1A] truncate">{currentModel.name}</p>
                <p className="text-[10px] text-[#999999] truncate">{modelBaseDescription}</p>
              </div>
            </div>
          )}

          {/* Identity traits - ONLY when creating new model (not in pose mode) */}
          {!isPoseMode && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TraitSelector label={tc.gender} options={GENDER_OPTIONS} value={traits.gender} onChange={(v) => setTrait('gender', v)} lang={language} />
              <TraitSelector label={tc.age} options={AGE_OPTIONS} value={traits.age} onChange={(v) => setTrait('age', v)} lang={language} />
              <TraitSelector label={tc.ethnicity} options={ETHNICITY_OPTIONS} value={traits.ethnicity} onChange={(v) => setTrait('ethnicity', v)} lang={language} />
              <TraitSelector label={tc.hairLength || 'Hair length'} options={HAIR_LENGTH_OPTIONS} value={traits.hairLength} onChange={(v) => setTrait('hairLength', v)} lang={language} />
              {traits.hairLength !== 'bald' && (
                <TraitSelector label={tc.hairColor || 'Hair color'} options={HAIR_COLOR_OPTIONS} value={traits.hairColor} onChange={(v) => setTrait('hairColor', v)} lang={language} />
              )}
            </div>
          )}

          {/* Variable traits: Pose, Mood, Framing - always visible */}
          <TraitSelector
            label={tm?.pose || 'Poza'}
            options={POSE_OPTIONS}
            value={traits.pose}
            onChange={(v) => setTrait('pose', v)}
            lang={language}
          />

          <TraitSelector
            label={tm?.mood || 'Nuotaika'}
            options={MOOD_OPTIONS}
            value={traits.mood}
            onChange={(v) => setTrait('mood', v)}
            lang={language}
          />

          <TraitSelector
            label={tc.framing}
            options={FRAMING_OPTIONS}
            value={traits.framing}
            onChange={(v) => setTrait('framing', v)}
            lang={language}
          />

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

          {/* Prompt preview (collapsible) — hidden in pose mode since InstantID uses face reference */}
          {!isPoseMode && (
            <div>
              <button
                onClick={() => setShowPrompt(!showPrompt)}
                className="flex items-center gap-1.5 text-xs text-[#999999] hover:text-[#666666] transition-colors"
              >
                <svg className={`w-3 h-3 transition-transform ${showPrompt ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {tc.prompt}
              </button>
              {showPrompt && (
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  className="w-full mt-2 px-3 py-2 bg-[#F7F7F5] border border-[#E5E5E3] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10 resize-none text-xs font-mono"
                />
              )}
            </div>
          )}

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
                <img src={generatedImage} alt="Generated avatar" className="w-full h-full object-cover object-top" />
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
            className="px-4 py-2.5 rounded-xl border border-[#E5E5E3] text-[#666666] text-sm font-medium hover:bg-[#F7F7F5] transition-colors"
          >
            {hasSavedAny ? (tm?.done || 'Baigti') : tc.cancel}
          </button>

          {!hasUnsavedImage ? (
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !canAddMore}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#E55A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating
                ? tc.generating
                : !canAddMore
                  ? (tm?.photoLimit || 'Limitas pasiektas')
                  : tc.generate}
            </button>
          ) : (
            <>
              {canAddMore && (totalPhotos < 4) && (
                <button
                  onClick={handleSaveAndContinue}
                  disabled={isGenerating || isSaving}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#FF6B35] text-[#FF6B35] text-sm font-medium hover:bg-[#FFF0EB] transition-colors disabled:opacity-50"
                >
                  {isSaving ? tc.saving : (tm?.saveAndNext || 'Išsaugoti ir kita poza')}
                </button>
              )}
              <button
                onClick={handleSaveAndClose}
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
