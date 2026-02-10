import { useRef, useState } from 'react';
import { Select } from '../ui/Select';
import { useLanguage } from '../../contexts/LanguageContext';
import { AVATARS, SCENES, MOODS, POSES, ASPECT_RATIOS, RESOLUTIONS, IMAGE_COUNTS, getRandomPlaceholder } from '../../constants/fluxOptions';
import type { Avatar, Scene, Mood, Pose, AspectRatioOption, ResolutionOption, ImageCountOption, Config } from '../../types';
import { useCustomAvatars } from '../../hooks/useCustomAvatars';
import { useAuth } from '../../hooks/useAuth';
import { SimpleAvatarCard } from '../avatars/SimpleAvatarCard';
import { AvatarCreatorModal } from '../avatars/AvatarCreatorModal';
import type { CustomAvatar } from '../../types/database';

interface ConfigPanelProps {
  config: Config;
  onConfigChange: (config: Config) => void;
}

export function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { avatars: customAvatars, createAvatar } = useCustomAvatars();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCreatorModal, setShowCreatorModal] = useState(false);

  const handleAvatarChange = (avatar: Avatar) => {
    // Toggle behavior: click again to deselect
    if (config.avatar?.id === avatar.id) {
      onConfigChange({ ...config, avatar: null });
    } else {
      onConfigChange({ ...config, avatar });
    }
  };

  const handleSceneChange = (scene: Scene) => {
    onConfigChange({ ...config, scene });
  };

  const handleMoodChange = (mood: Mood) => {
    onConfigChange({ ...config, mood });
  };

  const handlePoseChange = (pose: Pose) => {
    onConfigChange({ ...config, pose });
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onConfigChange({ ...config, userPrompt: e.target.value });
  };

  const handleAspectRatioChange = (option: AspectRatioOption) => {
    onConfigChange({ ...config, aspectRatio: option.id });
  };

  const handleResolutionChange = (option: ResolutionOption) => {
    onConfigChange({ ...config, resolution: option.id });
  };

  const handleImageCountChange = (option: ImageCountOption) => {
    onConfigChange({ ...config, imageCount: option.id });
  };

  const handleImprovise = () => {
    const randomPrompt = getRandomPlaceholder();
    onConfigChange({ ...config, userPrompt: randomPrompt });
  };

  const handleAddAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPEG and PNG files are allowed');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    try {
      await createAvatar(file);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to upload avatar: ${errorMessage}`);
    }

    // Reset input
    e.target.value = '';
  };

  // Convert custom avatar to Avatar type for selection
  const customAvatarToAvatar = (ca: CustomAvatar): Avatar => ({
    id: ca.id,
    name: t.customAvatars?.customAvatar || 'Custom Avatar',
    description: ca.description || t.customAvatars?.customAvatar || 'Custom avatar',
    imageUrl: ca.image_url,
    // IMPORTANT: Tell AI to use the reference image, not just "person"
    promptDescription: ca.description || 'the person shown in the reference image',
    isCustom: true
  });

  // Find selected options for Select components
  const selectedAspectRatio = ASPECT_RATIOS.find(ar => ar.id === config.aspectRatio) || null;
  const selectedResolution = RESOLUTIONS.find(r => r.id === config.resolution) || null;
  const selectedImageCount = IMAGE_COUNTS.find(ic => ic.id === config.imageCount) || null;

  // Get translated name for avatar
  const getAvatarName = (avatar: Avatar) => {
    if (avatar.isCustom) return t.customAvatars?.customAvatar || 'Custom Avatar';
    const translated = t.avatars[avatar.id as keyof typeof t.avatars];
    return translated?.name || avatar.name;
  };

  const getAvatarDescription = (avatar: Avatar) => {
    if (avatar.isCustom) return avatar.description;
    const translated = t.avatars[avatar.id as keyof typeof t.avatars];
    return translated?.description || avatar.description;
  };

  // Get translated name for scene
  const getSceneName = (scene: Scene) => {
    const translated = t.scenes[scene.id as keyof typeof t.scenes];
    return translated?.name || scene.name;
  };

  // Get translated name for mood
  const getMoodName = (mood: Mood) => {
    const translated = t.moods[mood.id as keyof typeof t.moods];
    return translated?.name || mood.name;
  };

  // Get translated name for pose
  const getPoseName = (pose: Pose) => {
    const translated = t.poses?.[pose.id as keyof typeof t.poses];
    return translated?.name || pose.name;
  };

  // Get translated name for resolution
  const getResolutionName = (res: ResolutionOption) => {
    const translated = t.resolutions[res.id as keyof typeof t.resolutions];
    return translated?.name || res.name;
  };

  // Get translated name for image count
  const getImageCountName = (ic: ImageCountOption) => {
    const translated = t.imageCounts[ic.id as keyof typeof t.imageCounts];
    return translated?.name || ic.name;
  };

  return (
    <div className="space-y-5">
      {/* Avatar Selection with Image Preview */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#1A1A1A]">
          {t.config.modelLabel}
        </label>

        {/* My Avatars Section - only show for logged in users */}
        {user && (
          <div className="mb-4">
            <p className="text-xs text-[#999999] mb-2">{t.customAvatars?.myAvatars || 'My Avatars'}</p>
            <div className="grid grid-cols-3 gap-2">
              {/* Custom avatar cards - simple selection only */}
              {customAvatars.map((ca) => (
                <SimpleAvatarCard
                  key={ca.id}
                  avatar={ca}
                  isSelected={config.avatar?.id === ca.id}
                  onSelect={() => handleAvatarChange(customAvatarToAvatar(ca))}
                />
              ))}

              {/* Upload photo button */}
              <button
                onClick={handleAddAvatarClick}
                className="relative p-2 rounded-xl border border-dashed border-[#D4D4D2] hover:border-[#FF6B35] hover:bg-[#FFF0EB] transition-all group"
                title={t.avatarCreator?.uploadPhoto || 'Upload photo'}
              >
                <div className="aspect-square flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#999999] group-hover:text-[#FF6B35] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs text-[#999999] text-center mt-1">{t.avatarCreator?.uploadPhoto || 'Upload'}</p>
              </button>

              {/* Create avatar button */}
              <button
                onClick={() => setShowCreatorModal(true)}
                className="relative p-2 rounded-xl border border-dashed border-[#D4D4D2] hover:border-[#FF6B35] hover:bg-[#FFF0EB] transition-all group"
                title={t.avatarCreator?.createAvatar || 'Create avatar'}
              >
                <div className="aspect-square flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#999999] group-hover:text-[#FF6B35] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-xs text-[#999999] text-center mt-1">{t.avatarCreator?.createAvatar || 'Create'}</p>
              </button>
            </div>

            {/* Empty state message */}
            {customAvatars.length === 0 && (
              <p className="text-xs text-[#999999] mt-2">{t.customAvatars?.uploadHint || 'Upload your own photos or art to use as avatars'}</p>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {/* Preset Avatars Section */}
        <div>
          {user && <p className="text-xs text-[#999999] mb-2">{t.customAvatars?.presets || 'Presets'}</p>}
          <div className="grid grid-cols-3 gap-2">
            {AVATARS.map((avatar) => {
              const isSelected = config.avatar?.id === avatar.id;
              return (
                <button
                  key={avatar.id}
                  onClick={() => handleAvatarChange(avatar)}
                  className={`relative p-2 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#FFF0EB] ring-2 ring-[#FF6B35]'
                      : 'bg-[#F7F7F5] hover:bg-[#EFEFED] border border-[#E5E5E3] hover:border-[#D4D4D2]'
                  }`}
                >
                  {/* Checkmark overlay when selected */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 z-10 bg-[#FF6B35] rounded-full p-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="aspect-square bg-[#EFEFED] rounded-lg mb-1 overflow-hidden">
                    <img
                      src={avatar.imageUrl}
                      alt={getAvatarName(avatar)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `<div class="flex items-center justify-center text-2xl w-full h-full">${avatar.id.includes('woman') ? '👩' : '👨'}</div>`;
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs font-medium text-[#666666] truncate">{getAvatarName(avatar)}</p>
                </button>
              );
            })}
          </div>
        </div>

        {config.avatar && (
          <p className="text-xs text-[#999999]">{getAvatarDescription(config.avatar)}</p>
        )}
      </div>

      {/* Pose Selection - Body position and framing */}
      <Select<Pose>
        value={config.pose}
        onChange={handlePoseChange}
        options={POSES}
        getLabel={getPoseName}
        label={t.config?.poseLabel || 'Poza'}
        placeholder={t.config.placeholder}
      />
      {config.pose && (
        <p className="text-xs text-[#999999] -mt-3">
          {t.poses?.[config.pose.id as keyof typeof t.poses]?.description || config.pose.description}
        </p>
      )}

      {/* Scene Selection */}
      <Select<Scene>
        value={config.scene}
        onChange={handleSceneChange}
        options={SCENES}
        getLabel={getSceneName}
        label={t.config.sceneLabel}
        placeholder={t.config.placeholder}
      />
      {config.scene && (
        <p className="text-xs text-[#999999] -mt-3">
          {t.scenes[config.scene.id as keyof typeof t.scenes]?.description || config.scene.description}
        </p>
      )}

      {/* Mood Selection */}
      <Select<Mood>
        value={config.mood}
        onChange={handleMoodChange}
        options={MOODS}
        getLabel={getMoodName}
        label={t.config.moodLabel}
        placeholder={t.config.placeholder}
      />
      {config.mood && (
        <p className="text-xs text-[#999999] -mt-3">
          {t.moods[config.mood.id as keyof typeof t.moods]?.description || config.mood.description}
        </p>
      )}

      {/* Divider */}
      <hr className="border-[#E5E5E3]" />

      {/* User Prompt Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-[#1A1A1A]">
            {t.config.promptLabel}
          </label>
          <button
            type="button"
            onClick={handleImprovise}
            className="text-xs bg-[#FFF0EB] text-[#FF6B35] px-3 py-1.5 rounded-full hover:bg-[#FFE0D6] transition-all flex items-center gap-1 border border-[#FF6B35]/20"
          >
            <span>✨</span> {t.config.improvise}
          </button>
        </div>
        <textarea
          value={config.userPrompt}
          onChange={handlePromptChange}
          placeholder={t.config.promptPlaceholder}
          rows={3}
          maxLength={500}
          className="w-full px-4 py-3 bg-white border border-[#E5E5E3] rounded-xl text-[#1A1A1A] placeholder-[#999999] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10 resize-none text-sm transition-all"
        />
        <p className="text-xs text-[#999999]">
          {t.config.promptHint}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-[#E5E5E3]" />

      {/* Technical Settings */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#666666]">{t.config.technicalSettings}</h3>

        {/* Image Count - Full Width */}
        <Select<ImageCountOption>
          value={selectedImageCount}
          onChange={handleImageCountChange}
          options={IMAGE_COUNTS}
          getLabel={getImageCountName}
          label={t.config.imageCount}
          placeholder={t.config.placeholder}
        />

        <div className="grid grid-cols-2 gap-3">
          {/* Aspect Ratio */}
          <Select<AspectRatioOption>
            value={selectedAspectRatio}
            onChange={handleAspectRatioChange}
            options={ASPECT_RATIOS}
            getLabel={(option) => option.name}
            label={t.config.format}
            placeholder={t.config.placeholder}
          />

          {/* Resolution */}
          <Select<ResolutionOption>
            value={selectedResolution}
            onChange={handleResolutionChange}
            options={RESOLUTIONS}
            getLabel={getResolutionName}
            label={t.config.quality}
            placeholder={t.config.placeholder}
          />
        </div>
        {selectedAspectRatio && (
          <p className="text-xs text-[#999999]">{selectedAspectRatio.description}</p>
        )}
      </div>

      {/* Avatar Creator Modal */}
      <AvatarCreatorModal
        isOpen={showCreatorModal}
        onClose={() => setShowCreatorModal(false)}
      />
    </div>
  );
}
