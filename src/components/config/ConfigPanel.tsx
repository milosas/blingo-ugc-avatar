import { useRef } from 'react';
import { Select } from '../ui/Select';
import { useLanguage } from '../../contexts/LanguageContext';
import { AVATARS, SCENES, STYLES, MOODS, ASPECT_RATIOS, RESOLUTIONS, IMAGE_COUNTS, getRandomPlaceholder } from '../../constants/fluxOptions';
import type { Avatar, Scene, Style, Mood, AspectRatioOption, ResolutionOption, ImageCountOption, Config } from '../../types';
import { useCustomAvatars } from '../../hooks/useCustomAvatars';
import { useAuth } from '../../hooks/useAuth';
import { CustomAvatarCard } from '../avatars/CustomAvatarCard';
import type { CustomAvatar } from '../../types/database';

interface ConfigPanelProps {
  config: Config;
  onConfigChange: (config: Config) => void;
}

export function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { avatars: customAvatars, createAvatar, updateDescription, deleteAvatar, loading: loadingAvatars } = useCustomAvatars();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (avatar: Avatar) => {
    onConfigChange({ ...config, avatar });
  };

  const handleSceneChange = (scene: Scene) => {
    onConfigChange({ ...config, scene });
  };

  const handleStyleChange = (style: Style) => {
    onConfigChange({ ...config, style });
  };

  const handleMoodChange = (mood: Mood) => {
    onConfigChange({ ...config, mood });
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
      alert('Failed to upload avatar. You may have reached the limit (10 avatars).');
    }

    // Reset input
    e.target.value = '';
  };

  // Convert custom avatar to Avatar type for selection
  const customAvatarToAvatar = (ca: CustomAvatar): Avatar => ({
    id: ca.id,
    name: 'Custom Avatar',
    description: ca.description || 'Custom avatar',
    imageUrl: ca.image_url,
    promptDescription: ca.description || 'person',
    isCustom: true
  });

  // Find selected options for Select components
  const selectedAspectRatio = ASPECT_RATIOS.find(ar => ar.id === config.aspectRatio) || null;
  const selectedResolution = RESOLUTIONS.find(r => r.id === config.resolution) || null;
  const selectedImageCount = IMAGE_COUNTS.find(ic => ic.id === config.imageCount) || null;

  // Get translated name for avatar
  const getAvatarName = (avatar: Avatar) => {
    if (avatar.isCustom) return 'Custom Avatar';
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

  // Get translated name for style
  const getStyleName = (style: Style) => {
    const translated = t.styles[style.id as keyof typeof t.styles];
    return translated?.name || style.name;
  };

  // Get translated name for mood
  const getMoodName = (mood: Mood) => {
    const translated = t.moods[mood.id as keyof typeof t.moods];
    return translated?.name || mood.name;
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
      <h2 className="text-lg font-semibold text-gray-900">
        {t.config.title}
      </h2>

      {/* Avatar Selection with Image Preview */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {t.config.modelLabel} <span className="text-red-500">*</span>
        </label>

        {/* My Avatars Section - only show for logged in users */}
        {user && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">My Avatars</p>
            <div className="grid grid-cols-3 gap-2">
              {/* Custom avatar cards */}
              {customAvatars.map((ca) => (
                <CustomAvatarCard
                  key={ca.id}
                  avatar={ca}
                  isSelected={config.avatar?.id === ca.id}
                  onSelect={() => handleAvatarChange(customAvatarToAvatar(ca))}
                  onUpdateDescription={(desc) => updateDescription(ca.id, desc)}
                  onDelete={() => deleteAvatar(ca.id, ca.storage_path)}
                />
              ))}

              {/* Add button */}
              <button
                onClick={handleAddAvatarClick}
                className="relative p-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                title="Add custom avatar"
              >
                <div className="aspect-square flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">Add</p>
              </button>
            </div>

            {/* Empty state message */}
            {customAvatars.length === 0 && (
              <p className="text-xs text-gray-400 mt-1">Upload your own photos or art to use as avatars</p>
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
          {user && <p className="text-xs text-gray-500 mb-2">Presets</p>}
          <div className="grid grid-cols-3 gap-2">
            {AVATARS.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => handleAvatarChange(avatar)}
                className={`relative p-2 rounded-lg border-2 transition-all ${
                  config.avatar?.id === avatar.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="aspect-square bg-gray-100 rounded-md mb-1 overflow-hidden">
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
                <p className="text-xs font-medium text-gray-700 truncate">{getAvatarName(avatar)}</p>
              </button>
            ))}
          </div>
        </div>

        {config.avatar && (
          <p className="text-xs text-gray-500">{getAvatarDescription(config.avatar)}</p>
        )}
      </div>

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
        <p className="text-xs text-gray-500 -mt-3">
          {t.scenes[config.scene.id as keyof typeof t.scenes]?.description || config.scene.description}
        </p>
      )}

      {/* Style Selection */}
      <Select<Style>
        value={config.style}
        onChange={handleStyleChange}
        options={STYLES}
        getLabel={getStyleName}
        label={t.config.styleLabel}
        placeholder={t.config.placeholder}
      />
      {config.style && (
        <p className="text-xs text-gray-500 -mt-3">
          {t.styles[config.style.id as keyof typeof t.styles]?.description || config.style.description}
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
        <p className="text-xs text-gray-500 -mt-3">
          {t.moods[config.mood.id as keyof typeof t.moods]?.description || config.mood.description}
        </p>
      )}

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* User Prompt Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            {t.config.promptLabel} <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={handleImprovise}
            className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md hover:bg-indigo-200 transition-colors flex items-center gap-1"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm"
        />
        <p className="text-xs text-gray-500">
          {t.config.promptHint}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Technical Settings */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">{t.config.technicalSettings}</h3>

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
          <p className="text-xs text-gray-500">{selectedAspectRatio.description}</p>
        )}
      </div>
    </div>
  );
}
