import { useLanguage } from '../../contexts/LanguageContext';
import { useAvatarCreator } from '../../hooks/useAvatarCreator';
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

const BATCH_POSES = ['standing-front', 'standing-side', 'walking', 'arms-crossed', 'hand-on-hip'];

interface AvatarCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetModelId?: string;
  onSaved?: () => void;
  models: import('../../types/database').AvatarModel[];
  createModel: (name: string, firstPhoto?: File) => Promise<import('../../types/database').AvatarModel | null>;
  addGeneratedPhotoToModel: (modelId: string, base64Data: string, description: string) => Promise<import('../../types/database').CustomAvatar | null>;
  deletePhoto: (photoId: string, storagePath: string, modelId: string) => Promise<void>;
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

export function AvatarCreatorModal({ isOpen, onClose, targetModelId, onSaved, models, createModel, addGeneratedPhotoToModel, deletePhoto }: AvatarCreatorModalProps) {
  const { language, t } = useLanguage();
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
    setGeneratedImage,
    clearImage,
    setPoseMode,
    reset,
  } = useAvatarCreator(language);

  const tc = t.avatarCreator;
  const tm = t.avatarModels;
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingPhoto, setIsDeletingPhoto] = useState<string | null>(null);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | 'new'>(targetModelId || 'new');
  const [newModelName, setNewModelName] = useState('');
  const [savedPhotos, setSavedPhotos] = useState<string[]>([]);
  const [createdModelId, setCreatedModelId] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isPoseMode, setIsPoseMode] = useState(false);
  const [modelBaseDescription, setModelBaseDescription] = useState('');

  // Batch generation state
  const [batchCount, setBatchCount] = useState(1);
  const [batchResults, setBatchResults] = useState<Array<{base64: string, description: string}>>([]);
  const [batchProgress, setBatchProgress] = useState(0); // 0 = not started, 1-N = generating Nth photo

  const effectiveModelId = createdModelId || (selectedModelId !== 'new' ? selectedModelId : null);
  const safeModels = models || [];
  const currentModel = effectiveModelId ? safeModels.find(m => m.id === effectiveModelId) : null;
  const totalPhotos = currentModel?.photos?.length || 0;
  const canAddMore = totalPhotos < 5;

  // Reset state when modal opens — always creates new model
  useEffect(() => {
    if (!isOpen) return;

    setSavedPhotos([]);
    setCreatedModelId(null);
    setSelectedModelId('new');
    setNewModelName('');
    setShowPrompt(false);
    setBatchCount(1);
    setBatchResults([]);
    setBatchProgress(0);
    setIsPoseMode(false);
    setModelBaseDescription('');
  }, [isOpen]);

  const handleClose = () => {
    reset();
    setIsPoseMode(false);
    setModelBaseDescription('');
    setBatchCount(1);
    setBatchResults([]);
    setBatchProgress(0);
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

  const handleDeletePhoto = async (photoId: string, storagePath: string) => {
    if (!effectiveModelId || isDeletingPhoto) return;
    setIsDeletingPhoto(photoId);
    try {
      await deletePhoto(photoId, storagePath, effectiveModelId);
      setSavedPhotos(prev => prev.filter(id => id !== photoId));
      await onSaved?.();
    } catch (err) {
      console.error('Failed to delete photo:', err);
    } finally {
      setIsDeletingPhoto(null);
    }
  };

  // Batch generation handler
  const handleBatchGenerate = async () => {
    if (batchCount === 1) {
      await handleGenerate();
      return;
    }

    setBatchResults([]);
    setBatchProgress(1);
    setGeneratedImage(null);

    const results: Array<{base64: string, description: string}> = [];
    let referenceUrl: string | null = null;

    for (let i = 0; i < batchCount; i++) {
      setBatchProgress(i + 1);

      // Set pose for this iteration
      const poseId = BATCH_POSES[i % BATCH_POSES.length];
      setTrait('pose', poseId);

      // Small delay to let prompt rebuild
      await new Promise(r => setTimeout(r, 150));

      const result = await generateAvatar(referenceUrl || undefined);
      if (!result) break;

      const description = buildTraitDescription(traits, language);
      results.push({ base64: result.base64, description });
      setBatchResults([...results]);

      // Use first photo's URL as reference for subsequent PuLID generations
      if (i === 0 && result.imageUrl) {
        referenceUrl = result.imageUrl;
      }
    }

    setBatchProgress(0);
    // Clear the single generatedImage so we show batch results grid instead
    setGeneratedImage(null);
  };

  // Save all batch results at once
  const handleBatchSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      let modelId = effectiveModelId;
      if (!modelId) {
        const description = batchResults[0]?.description || '';
        const name = newModelName.trim() || description.substring(0, 40);
        const model = await createModel(name);
        if (!model) throw new Error('Failed to create model');
        modelId = model.id;
        setCreatedModelId(model.id);
        setSelectedModelId(model.id);
      }

      for (const result of batchResults) {
        await addGeneratedPhotoToModel(modelId, result.base64, result.description);
      }

      await onSaved?.();
      handleClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save';
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
      await onSaved?.();
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
  const hasBatchResults = batchResults.length > 0;
  const isBatchMode = batchCount > 1;
  const isBatchGenerating = batchProgress > 0;

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
              {isPoseMode ? (tm?.addPose || 'Add pose') : tc.title}
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

        {/* Model photos strip */}
        {totalPhotos > 0 && (
          <div className="px-5 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-[#666666]">
                {tm?.savedPhotos || 'Modelio nuotraukos'} ({totalPhotos}/5)
              </label>
              {selectedPhotoId && (
                <button
                  onClick={() => {
                    const photo = currentModel?.photos?.find(p => p.id === selectedPhotoId);
                    if (photo) handleDeletePhoto(photo.id, photo.storage_path);
                  }}
                  disabled={!!isDeletingPhoto}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isDeletingPhoto ? (
                    <span className="w-3 h-3 border border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                  {tm?.deletePhoto || 'Delete'}
                </button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {currentModel?.photos?.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhotoId(selectedPhotoId === photo.id ? null : photo.id)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden relative transition-all ${
                    selectedPhotoId === photo.id
                      ? 'ring-2 ring-red-500 ring-offset-1'
                      : savedPhotos.includes(photo.id)
                        ? 'border-2 border-[#FF6B35]'
                        : 'border border-[#E5E5E3]'
                  }`}
                >
                  <img src={photo.image_url} alt="" className="w-full h-full object-cover object-top" />
                  <span className="absolute bottom-0 left-0 bg-black/50 text-white text-[8px] px-1 rounded-tr">{i + 1}</span>
                </button>
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
          {/* Model name input - always creates new model */}
          {!isPoseMode && !createdModelId && (
            <div>
              <label className="block text-xs font-medium text-[#666666] mb-1.5">
                {'Naujo modelio pavadinimas'}
              </label>
              <input
                value={newModelName}
                onChange={(e) => setNewModelName(e.target.value)}
                placeholder={'Modelio pavadinimas (neprivaloma)'}
                className="w-full px-3 py-2 bg-white border border-[#E5E5E3] rounded-xl text-sm text-[#1A1A1A] placeholder-[#999999] focus:outline-none focus:border-[#FF6B35]"
              />
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
            label={tm?.pose || 'Pose'}
            options={POSE_OPTIONS}
            value={traits.pose}
            onChange={(v) => setTrait('pose', v)}
            lang={language}
          />

          <TraitSelector
            label={tm?.mood || 'Mood'}
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

          {/* Batch count selector - only when NOT in pose mode */}
          {!isPoseMode && (
            <div>
              <label className="block text-xs font-medium text-[#666666] mb-1.5">
                {tm?.batchCount || 'Kiekis'}
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    onClick={() => setBatchCount(count)}
                    disabled={isBatchGenerating || isGenerating}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      batchCount === count
                        ? 'bg-[#FF6B35] text-white'
                        : 'bg-[#F7F7F5] text-[#666666] hover:bg-[#EFEFED] border border-[#E5E5E3]'
                    } disabled:opacity-50`}
                  >
                    {count}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#999999] mt-1">
                {batchCount === 1
                  ? 'FLUX 2 Pro (~$0.03)'
                  : `1x FLUX 2 Pro + ${batchCount - 1}x PuLID (~$${(0.03 * batchCount).toFixed(2)})`}
              </p>
            </div>
          )}

          {/* Prompt preview (collapsible) -- hidden in pose mode */}
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

          {/* Batch generation progress */}
          {isBatchGenerating && (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-12 h-12 border-3 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-[#999999]">
                Generuojama {batchProgress}/{batchCount}...
              </p>
              {/* Thumbnails of completed batch photos */}
              {batchResults.length > 0 && (
                <div className="flex gap-2 flex-wrap justify-center">
                  {batchResults.map((result, i) => (
                    <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-[#E5E5E3]">
                      <img src={result.base64} alt="" className="w-full h-full object-cover object-top" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Batch results grid (after batch generation completes) */}
          {!isBatchGenerating && hasBatchResults && (
            <div>
              <label className="block text-xs font-medium text-[#666666] mb-2">
                {tm?.generatedPhotos || 'Sugeneruotos nuotraukos'} ({batchResults.length})
              </label>
              <div className="grid grid-cols-3 gap-2">
                {batchResults.map((result, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-[#FF6B35]">
                    <img src={result.base64} alt="" className="w-full h-full object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Single generated image preview (non-batch mode) */}
          {!isBatchMode && generatedImage && !isBatchGenerating && (
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-[#FF6B35]">
                <img src={generatedImage} alt="Generated avatar" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          )}

          {/* Loading state (single generation) */}
          {!isBatchMode && isGenerating && !isBatchGenerating && (
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
            {hasSavedAny ? (tm?.done || 'Done') : tc.cancel}
          </button>

          {/* Batch results: show save all button */}
          {!isBatchGenerating && hasBatchResults ? (
            <button
              onClick={handleBatchSave}
              disabled={isSaving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#E55A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? tc.saving : `${tc.save} (${batchResults.length})`}
            </button>
          ) : !hasUnsavedImage && !isBatchGenerating ? (
            <button
              onClick={isBatchMode ? handleBatchGenerate : handleGenerate}
              disabled={isGenerating || !canAddMore || isBatchGenerating}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#E55A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating
                ? tc.generating
                : !canAddMore
                  ? (tm?.photoLimit || 'Limitas pasiektas')
                  : isBatchMode
                    ? `${tc.generate} (${batchCount})`
                    : tc.generate}
            </button>
          ) : hasUnsavedImage && !isBatchGenerating ? (
            <button
              onClick={handleSaveAndClose}
              disabled={isSaving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FF6B35] text-white text-sm font-medium hover:bg-[#E55A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? tc.saving : tc.save}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
